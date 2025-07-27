import { useState, useEffect } from "react";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, MapPin, User, Phone, Mail, Truck, Tag, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { midtransPayment } from "@/lib/midtrans";
import { rajaOngkirService, ShippingOption, Province, City } from "@/api/rajaongkir";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cartStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
  province?: string;
  cityId?: string;
}

interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  minOrder?: number;
  maxDiscount?: number;
  isActive: boolean;
}

interface OrderData {
  orderId: string;
  items: any[];
  total: number;
  customerInfo: CustomerInfo;
  shippingCost: number;
  adminFee: number;
  promoDiscount: number;
}

// Available promo codes
const availablePromoCodes: PromoCode[] = [
  {
    code: "HIDEKI10",
    type: "percentage",
    value: 10,
    description: "Diskon 10% untuk semua produk",
    minOrder: 500000,
    maxDiscount: 100000,
    isActive: true
  },
  {
    code: "WELCOME50",
    type: "fixed",
    value: 50000,
    description: "Diskon Rp 50.000 untuk pelanggan baru",
    minOrder: 300000,
    isActive: true
  },
  {
    code: "HELMET20",
    type: "percentage",
    value: 20,
    description: "Diskon 20% khusus pembelian helm",
    minOrder: 1000000,
    maxDiscount: 200000,
    isActive: true
  },
  {
    code: "MEGA100",
    type: "fixed",
    value: 100000,
    description: "Mega diskon Rp 100.000",
    minOrder: 2000000,
    isActive: true
  }
];

const Checkout = () => {
  const { toast } = useToast();
  const { items: cartItems, updateQuantity, removeItem, clearCart } = useCartStore();
  
  const [currentStep, setCurrentStep] = useState<'cart' | 'checkout' | 'payment'>('cart');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    province: '',
    cityId: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Promo code states
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Shipping related states
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const adminFee = 1000; // Biaya admin
  const shippingCost = selectedShipping?.cost || 0;
  
  // Calculate promo discount
  const calculatePromoDiscount = (promo: PromoCode | null, subtotal: number): number => {
    if (!promo || !promo.isActive) return 0;
    
    // Check minimum order
    if (promo.minOrder && subtotal < promo.minOrder) return 0;
    
    let discount = 0;
    if (promo.type === 'percentage') {
      discount = (subtotal * promo.value) / 100;
      if (promo.maxDiscount) {
        discount = Math.min(discount, promo.maxDiscount);
      }
    } else {
      discount = promo.value;
    }
    
    return discount;
  };

  const promoDiscount = calculatePromoDiscount(appliedPromo, subtotal);
  const total = subtotal + shippingCost + adminFee - promoDiscount;

  // Load provinces on mount
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const provinceData = await rajaOngkirService.getProvinces();
        setProvinces(provinceData);
      } catch (error) {
        console.error('Error loading provinces:', error);
        toast({
          title: "Error",
          description: "Gagal memuat data provinsi",
          variant: "destructive"
        });
      }
    };
    loadProvinces();
  }, []);

  // Load cities when province changes
  useEffect(() => {
    if (customerInfo.province) {
      const loadCities = async () => {
        setIsLoadingCities(true);
        try {
          const cityData = await rajaOngkirService.getCities(customerInfo.province!);
          setCities(cityData);
        } catch (error) {
          console.error('Error loading cities:', error);
          toast({
            title: "Error",
            description: "Gagal memuat data kota",
            variant: "destructive"
          });
        } finally {
          setIsLoadingCities(false);
        }
      };
      loadCities();
    } else {
      setCities([]);
    }
  }, [customerInfo.province]);

  // Load shipping options when city is selected
  useEffect(() => {
    if (customerInfo.cityId && cartItems.length > 0) {
      const loadShippingOptions = async () => {
        setIsLoadingShipping(true);
        try {
          const weight = rajaOngkirService.calculateWeight(cartItems);
          const origin = "151"; // Jakarta Barat (asal pengiriman)
          const destination = customerInfo.cityId!;
          
          const options = await rajaOngkirService.getShippingOptions(
            origin,
            destination,
            weight,
            subtotal
          );
          setShippingOptions(options);
          
          // Auto select cheapest option
          if (options.length > 0) {
            setSelectedShipping(options[0]);
          }
        } catch (error) {
          console.error('Error loading shipping options:', error);
          toast({
            title: "Error",
            description: "Gagal memuat opsi pengiriman",
            variant: "destructive"
          });
        } finally {
          setIsLoadingShipping(false);
        }
      };
      loadShippingOptions();
    } else {
      setShippingOptions([]);
      setSelectedShipping(null);
    }
  }, [customerInfo.cityId, cartItems]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast({
      title: "Item dihapus",
      description: "Item telah dihapus dari keranjang",
    });
  };

  const handleApplyPromo = () => {
    setIsApplyingPromo(true);
    
    // Find promo code
    const foundPromo = availablePromoCodes.find(
      promo => promo.code.toLowerCase() === promoCode.toLowerCase() && promo.isActive
    );
    
    if (!foundPromo) {
      toast({
        title: "Kode Promo Tidak Valid",
        description: "Kode promo yang Anda masukkan tidak ditemukan atau sudah tidak berlaku",
        variant: "destructive"
      });
      setIsApplyingPromo(false);
      return;
    }
    
    // Check minimum order
    if (foundPromo.minOrder && subtotal < foundPromo.minOrder) {
      toast({
        title: "Minimum Pembelian Tidak Terpenuhi",
        description: `Minimum pembelian untuk kode promo ini adalah Rp ${foundPromo.minOrder.toLocaleString('id-ID')}`,
        variant: "destructive"
      });
      setIsApplyingPromo(false);
      return;
    }
    
    setAppliedPromo(foundPromo);
    toast({
      title: "Kode Promo Berhasil Diterapkan!",
      description: `${foundPromo.description} telah diterapkan`,
    });
    
    setIsApplyingPromo(false);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    toast({
      title: "Kode Promo Dihapus",
      description: "Kode promo telah dihapus dari pesanan",
    });
  };

  const handleContinueToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Keranjang Kosong",
        description: "Silakan tambahkan produk ke keranjang terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep('checkout');
  };

  const handleBackToCart = () => {
    setCurrentStep('cart');
  };

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset city when province changes
    if (field === 'province') {
      setCustomerInfo(prev => ({
        ...prev,
        cityId: '',
        city: ''
      }));
      setSelectedShipping(null);
    }
  };

  const handleProvinceChange = (provinceId: string) => {
    const selectedProvince = provinces.find(p => p.province_id === provinceId);
    if (selectedProvince) {
      handleCustomerInfoChange('province', provinceId);
    }
  };

  const handleCityChange = (cityId: string) => {
    const selectedCity = cities.find(c => c.city_id === cityId);
    if (selectedCity) {
      handleCustomerInfoChange('cityId', cityId);
      handleCustomerInfoChange('city', selectedCity.city_name);
    }
  };

  const handleContinueToPayment = () => {
    // Validate customer info
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || 
        !customerInfo.address || !customerInfo.province || !customerInfo.cityId) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi semua data yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    if (!selectedShipping) {
      toast({
        title: "Pilih Pengiriman",
        description: "Mohon pilih metode pengiriman",
        variant: "destructive"
      });
      return;
    }

    setCurrentStep('payment');
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    
    try {
      const orderData: OrderData = {
        orderId: `HD-${Date.now()}`,
        items: cartItems,
        total: total,
        customerInfo,
        shippingCost,
        adminFee,
        promoDiscount
      };

      const result = await midtransPayment.createTransaction(orderData);
      
      if (result.token) {
        // Open Midtrans payment popup
        window.snap.pay(result.token, {
          onSuccess: function(result: any) {
            clearCart();
            toast({
              title: "Pembayaran Berhasil!",
              description: "Terima kasih telah berbelanja di Hideki",
            });
            window.location.href = '/payment-success';
          },
          onPending: function(result: any) {
            toast({
              title: "Pembayaran Pending",
              description: "Menunggu konfirmasi pembayaran",
            });
            window.location.href = '/payment-pending';
          },
          onError: function(result: any) {
            toast({
              title: "Pembayaran Gagal",
              description: "Terjadi kesalahan dalam proses pembayaran",
              variant: "destructive"
            });
          }
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memproses pembayaran",
        variant: "destructive"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const getShippingDisplayName = (option: ShippingOption): string => {
    return `${option.service} - ${option.description} (${option.etd})`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {['cart', 'checkout', 'payment'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep === step 
                    ? 'bg-red-600 text-white' 
                    : index < ['cart', 'checkout', 'payment'].indexOf(currentStep)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 font-medium capitalize ${
                  currentStep === step ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {step === 'cart' ? 'Keranjang' : step === 'checkout' ? 'Checkout' : 'Pembayaran'}
                </span>
                {index < 2 && <div className="w-8 h-0.5 bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {currentStep === 'cart' && (
            <>
              <h1 className="text-3xl font-bold font-gothic">Keranjang Belanja</h1>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold">{item.name}</h3>
                                  <p className="text-sm text-gray-600">{item.brand}</p>
                                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="font-medium min-w-[2rem] text-center">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold text-red-600">
                                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    @Rp {item.price.toLocaleString('id-ID')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                          Keranjang Belanja Kosong
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Belum ada produk dalam keranjang Anda
                        </p>
                        <Button onClick={() => window.location.href = '/helm'}>
                          Mulai Belanja
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Ringkasan Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Promo Code Section */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span className="text-sm font-medium">Kode Promo</span>
                        </div>
                        {!appliedPromo ? (
                          <div className="flex gap-2">
                            <Input
                              placeholder="Masukkan kode promo"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                              className="flex-1"
                            />
                            <Button 
                              variant="outline" 
                              onClick={handleApplyPromo}
                              disabled={!promoCode || isApplyingPromo}
                              className="px-4"
                            >
                              {isApplyingPromo ? "..." : "Terapkan"}
                            </Button>
                          </div>
                        ) : (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Gift className="w-4 h-4 text-green-600" />
                                <div>
                                  <p className="text-sm font-medium text-green-800">{appliedPromo.code}</p>
                                  <p className="text-xs text-green-600">{appliedPromo.description}</p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleRemovePromo}
                                className="text-red-600 hover:text-red-700 h-auto p-1"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {/* Available Promo Codes */}
                        <div className="text-xs text-gray-500">
                          <p className="mb-1">Kode promo tersedia:</p>
                          <div className="space-y-1">
                            {availablePromoCodes.filter(promo => promo.isActive).map(promo => (
                              <div key={promo.code} className="flex justify-between">
                                <span className="font-medium">{promo.code}</span>
                                <span>{promo.type === 'percentage' ? `${promo.value}%` : `Rp ${promo.value.toLocaleString('id-ID')}`}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <span>Subtotal ({cartItems.length} item)</span>
                        <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                      </div>
                      
                      {appliedPromo && promoDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Diskon ({appliedPromo.code})</span>
                          <span>-Rp {promoDiscount.toLocaleString('id-ID')}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Ongkos Kirim</span>
                        <span className="text-gray-500">Hitung di checkout</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Biaya Admin</span>
                        <span>Rp {adminFee.toLocaleString('id-ID')}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-red-600">
                          Rp {(subtotal - promoDiscount + adminFee).toLocaleString('id-ID')}+
                        </span>
                      </div>
                      
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={handleContinueToCheckout}
                        disabled={cartItems.length === 0}
                      >
                        Lanjut ke Checkout
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}

          {currentStep === 'checkout' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold font-gothic">Checkout</h1>
                <Button variant="outline" onClick={handleBackToCart}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Keranjang
                </Button>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Customer Information Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Informasi Pribadi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input
                            id="name"
                            placeholder="Masukkan nama lengkap"
                            value={customerInfo.name}
                            onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Nomor Telepon</Label>
                          <Input
                            id="phone"
                            placeholder="08xxxxxxxxxx"
                            value={customerInfo.phone}
                            onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="nama@email.com"
                          value={customerInfo.email}
                          onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Alamat Pengiriman
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="province">Provinsi</Label>
                          <Select
                            value={customerInfo.province}
                            onValueChange={handleProvinceChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih provinsi" />
                            </SelectTrigger>
                            <SelectContent>
                              {provinces.map((province) => (
                                <SelectItem key={province.province_id} value={province.province_id}>
                                  {province.province}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="city">Kota/Kabupaten</Label>
                          <Select
                            value={customerInfo.cityId}
                            onValueChange={handleCityChange}
                            disabled={!customerInfo.province || isLoadingCities}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={isLoadingCities ? "Loading..." : "Pilih kota"} />
                            </SelectTrigger>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city.city_id} value={city.city_id}>
                                  {city.type} {city.city_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Alamat Lengkap</Label>
                        <Textarea
                          id="address"
                          placeholder="Masukkan alamat lengkap (jalan, nomor rumah, RT/RW, dll)"
                          value={customerInfo.address}
                          onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Kode Pos</Label>
                        <Input
                          id="postalCode"
                          placeholder="12345"
                          value={customerInfo.postalCode}
                          onChange={(e) => handleCustomerInfoChange('postalCode', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Catatan (Opsional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Catatan tambahan untuk pengiriman"
                          value={customerInfo.notes || ''}
                          onChange={(e) => handleCustomerInfoChange('notes', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Options */}
                  {shippingOptions.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Truck className="w-5 h-5" />
                          Metode Pengiriman
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {shippingOptions.map((option, index) => (
                          <div
                            key={index}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedShipping?.service === option.service
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedShipping(option)}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{option.service}</p>
                                <p className="text-sm text-gray-600">{option.description}</p>
                                <p className="text-xs text-gray-500">Estimasi: {option.etd}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-red-600">
                                  Rp {option.cost.toLocaleString('id-ID')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {isLoadingShipping && (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Mengitung ongkos kirim...</p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Ringkasan Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Items Summary */}
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="flex-1">{item.name} (x{item.quantity})</span>
                            <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                      </div>
                      
                      {appliedPromo && promoDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Diskon ({appliedPromo.code})</span>
                          <span>-Rp {promoDiscount.toLocaleString('id-ID')}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Ongkos Kirim</span>
                        <span>
                          {selectedShipping ? (
                            <>Rp {selectedShipping.cost.toLocaleString('id-ID')}</>
                          ) : (
                            <span className="text-gray-500">Pilih metode pengiriman</span>
                          )}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Biaya Admin</span>
                        <span>Rp {adminFee.toLocaleString('id-ID')}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-red-600">Rp {total.toLocaleString('id-ID')}</span>
                      </div>
                      
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={handleContinueToPayment}
                        disabled={!selectedShipping}
                      >
                        Lanjut ke Pembayaran
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}

          {currentStep === 'payment' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold font-gothic">Pembayaran</h1>
                <Button variant="outline" onClick={() => setCurrentStep('checkout')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Checkout
                </Button>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Metode Pembayaran
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <CreditCard className="w-6 h-6 text-blue-600" />
                          <h3 className="font-semibold text-blue-900">Midtrans Payment Gateway</h3>
                        </div>
                        <p className="text-sm text-blue-700 mb-4">
                          Kami menggunakan Midtrans untuk memproses pembayaran Anda dengan aman. 
                          Setelah klik "Bayar Sekarang", Anda akan diarahkan ke halaman pembayaran Midtrans.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="bg-white rounded-lg p-3 border">
                              <img src="/payment-icons/bca.png" alt="BCA" className="h-8 mx-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                              <p className="text-xs mt-1">Virtual Account</p>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="bg-white rounded-lg p-3 border">
                              <img src="/payment-icons/mandiri.png" alt="Mandiri" className="h-8 mx-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                              <p className="text-xs mt-1">Virtual Account</p>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="bg-white rounded-lg p-3 border">
                              <img src="/payment-icons/gopay.png" alt="GoPay" className="h-8 mx-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                              <p className="text-xs mt-1">E-Wallet</p>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="bg-white rounded-lg p-3 border">
                              <img src="/payment-icons/ovo.png" alt="OVO" className="h-8 mx-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                              <p className="text-xs mt-1">E-Wallet</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Metode Pembayaran Tersedia:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Virtual Account (BCA, Mandiri, BNI, BRI, Permata)</li>
                          <li>• E-Wallet (GoPay, OVO, DANA, LinkAja, ShopeePay)</li>
                          <li>• Transfer Bank</li>
                          <li>• Kartu Kredit/Debit (Visa, MasterCard)</li>
                          <li>• QRIS</li>
                          <li>• Akulaku</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Final Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Konfirmasi Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Customer Info Summary */}
                      <div className="text-sm space-y-2">
                        <div>
                          <p className="font-medium">Dikirim ke:</p>
                          <p>{customerInfo.name}</p>
                          <p>{customerInfo.phone}</p>
                          <p className="text-gray-600">{customerInfo.address}</p>
                          <p className="text-gray-600">{customerInfo.city}, {customerInfo.postalCode}</p>
                        </div>
                        
                        {selectedShipping && (
                          <div>
                            <p className="font-medium">Pengiriman:</p>
                            <p>{getShippingDisplayName(selectedShipping)}</p>
                          </div>
                        )}
                      </div>
                      
                      <Separator />
                      
                      {/* Items */}
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="flex-1">{item.name} (x{item.quantity})</span>
                            <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                      </div>
                      
                      {appliedPromo && promoDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Diskon ({appliedPromo.code})</span>
                          <span>-Rp {promoDiscount.toLocaleString('id-ID')}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Ongkos Kirim</span>
                        <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Biaya Admin</span>
                        <span>Rp {adminFee.toLocaleString('id-ID')}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Pembayaran</span>
                        <span className="text-red-600">Rp {total.toLocaleString('id-ID')}</span>
                      </div>
                      
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={handlePayment}
                        disabled={isProcessingPayment}
                      >
                        {isProcessingPayment ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Memproses...
                          </div>
                        ) : (
                          'Bayar Sekarang'
                        )}
                      </Button>
                      
                      <p className="text-xs text-gray-500 text-center">
                        Dengan melanjutkan pembayaran, Anda menyetujui syarat dan ketentuan yang berlaku.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Checkout