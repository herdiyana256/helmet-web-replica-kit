import { useState, useEffect } from "react";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, MapPin, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { midtransPayment } from "@/lib/midtrans";
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
}

interface OrderData {
  orderId: string;
  items: any[];
  total: number;
  customerInfo: CustomerInfo;
}

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
    notes: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 2000000 ? 0 : 50000; // Free shipping over 2M
  const total = subtotal + shippingCost;

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
  };

  const validateCustomerInfo = (): boolean => {
    const required = ['name', 'email', 'phone', 'address', 'city', 'postalCode'];
    for (const field of required) {
      if (!customerInfo[field as keyof CustomerInfo]) {
        toast({
          title: "Data Tidak Lengkap",
          description: `Silakan lengkapi ${field}`,
          variant: "destructive"
        });
        return false;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      toast({
        title: "Email Tidak Valid",
        description: "Silakan masukkan alamat email yang valid",
        variant: "destructive"
      });
      return false;
    }

    // Validate phone format
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      toast({
        title: "Nomor Telepon Tidak Valid",
        description: "Silakan masukkan nomor telepon yang valid",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleProceedToPayment = async () => {
    if (!validateCustomerInfo()) return;

    setIsProcessingPayment(true);
    
    try {
      const orderData: OrderData = {
        orderId: `ORDER-${Date.now()}`,
        items: cartItems,
        total: total,
        customerInfo: customerInfo
      };

      await midtransPayment.processPayment(orderData);
      
      // Clear cart after successful payment initiation
      clearCart();
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Gagal Memproses Pembayaran",
        description: "Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Redirect to products if cart is empty and not in checkout process
  useEffect(() => {
    if (cartItems.length === 0 && currentStep === 'cart') {
      // Don't redirect immediately, let user see empty cart message
    }
  }, [cartItems.length, currentStep]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center ${currentStep === 'cart' ? 'text-red-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'cart' ? 'bg-red-600 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className="ml-2 font-medium">Keranjang</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200"></div>
              <div className={`flex items-center ${currentStep === 'checkout' ? 'text-red-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'checkout' ? 'bg-red-600 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium">Checkout</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200"></div>
              <div className={`flex items-center ${currentStep === 'payment' ? 'text-red-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'payment' ? 'bg-red-600 text-white' : 'bg-gray-200'
                }`}>
                  3
                </div>
                <span className="ml-2 font-medium">Pembayaran</span>
              </div>
            </div>
          </div>

          {currentStep === 'cart' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold font-gothic">Keranjang Belanja</h1>
                <Button variant="outline" onClick={() => window.location.href = '/helm'}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Lanjut Belanja
                </Button>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <Card key={`${item.id}-${item.size || 'default'}`}>
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <img
                              src={item.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <Badge variant="outline" className="mb-2">
                                    {item.brand || 'Hideki'}
                                  </Badge>
                                  <h3 className="font-semibold text-lg">{item.name}</h3>
                                  {item.size && (
                                    <p className="text-sm text-gray-600">Ukuran: {item.size}</p>
                                  )}
                                  {item.color && (
                                    <p className="text-sm text-gray-600">Warna: {item.color}</p>
                                  )}
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
                                <div className="flex items-center gap-3">
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
                      <div className="flex justify-between">
                        <span>Subtotal ({cartItems.length} item)</span>
                        <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ongkos Kirim</span>
                        <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                          {shippingCost === 0 ? 'GRATIS' : `Rp ${shippingCost.toLocaleString('id-ID')}`}
                        </span>
                      </div>
                      {shippingCost === 0 && (
                        <p className="text-sm text-green-600">
                          🎉 Selamat! Anda mendapat gratis ongkir
                        </p>
                      )}
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-red-600">Rp {total.toLocaleString('id-ID')}</span>
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Informasi Pembeli
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nama Lengkap *</Label>
                          <Input
                            id="name"
                            value={customerInfo.name}
                            onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                            placeholder="Masukkan nama lengkap"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                            placeholder="contoh@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Nomor Telepon *</Label>
                        <Input
                          id="phone"
                          value={customerInfo.phone}
                          onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Alamat Pengiriman
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="address">Alamat Lengkap *</Label>
                        <Textarea
                          id="address"
                          value={customerInfo.address}
                          onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                          placeholder="Masukkan alamat lengkap termasuk nama jalan, nomor rumah, RT/RW"
                          rows={3}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Kota *</Label>
                          <Input
                            id="city"
                            value={customerInfo.city}
                            onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
                            placeholder="Masukkan nama kota"
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Kode Pos *</Label>
                          <Input
                            id="postalCode"
                            value={customerInfo.postalCode}
                            onChange={(e) => handleCustomerInfoChange('postalCode', e.target.value)}
                            placeholder="12345"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="notes">Catatan Tambahan</Label>
                        <Textarea
                          id="notes"
                          value={customerInfo.notes || ''}
                          onChange={(e) => handleCustomerInfoChange('notes', e.target.value)}
                          placeholder="Catatan untuk kurir atau instruksi khusus"
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary & Payment */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Order Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Pesanan Anda</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={`${item.id}-${item.size || 'default'}`} className="flex gap-3">
                          <img
                            src={item.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-600">
                              {item.brand || 'Hideki'} • Size: {item.size || 'M'} • Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-bold text-red-600">
                              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Payment Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Ringkasan Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ongkos Kirim</span>
                        <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                          {shippingCost === 0 ? 'GRATIS' : `Rp ${shippingCost.toLocaleString('id-ID')}`}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Pembayaran</span>
                        <span className="text-red-600">Rp {total.toLocaleString('id-ID')}</span>
                      </div>
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={handleProceedToPayment}
                        disabled={isProcessingPayment || cartItems.length === 0}
                      >
                        {isProcessingPayment ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Memproses...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4 mr-2" />
                            Bayar Sekarang
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;