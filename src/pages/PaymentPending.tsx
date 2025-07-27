import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Copy, CreditCard, Building2, Smartphone, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { midtransPayment, getPaymentStatusText, getPaymentMethodText, formatCurrency } from "@/lib/midtrans";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PaymentData {
  order_id: string;
  transaction_status: string;
  payment_type: string;
  transaction_id: string;
  gross_amount: string;
  va_numbers?: Array<{
    bank: string;
    va_number: string;
  }>;
  bill_key?: string;
  biller_code?: string;
}

interface OrderData {
  orderId: string;
  items: any[];
  total: number;
  customerInfo: any;
  shippingCost?: number;
  adminFee?: number;
}

const PaymentPending = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(24 * 60 * 60); // 24 hours in seconds
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const orderId = searchParams.get('order_id');
  const status = searchParams.get('status');
  const transactionId = searchParams.get('transaction_id');
  const paymentType = searchParams.get('payment_type');
  const vaNumber = searchParams.get('va_number');
  const bank = searchParams.get('bank');

  useEffect(() => {
    const loadPaymentData = async () => {
      if (!orderId) {
        setError('Order ID tidak ditemukan');
        setIsLoading(false);
        return;
      }

      try {
        // Try to get verified payment status from backend
        const verifiedData = await midtransPayment.verifyPaymentStatus(orderId);
        setPaymentData(verifiedData);

        // Get order data from session storage
        const storedOrderData = midtransPayment.getOrderData(orderId);
        if (storedOrderData) {
          setOrderData(storedOrderData);
        } else {
          // Fallback: get from last payment result
          const lastResult = midtransPayment.getLastPaymentResult();
          if (lastResult?.order_data) {
            setOrderData(lastResult.order_data);
          }
        }

      } catch (error) {
        console.error('Error loading payment data:', error);
        
        // Fallback: use URL parameters
        if (orderId && status === 'pending') {
          setPaymentData({
            order_id: orderId,
            transaction_status: 'pending',
            payment_type: paymentType || 'bank_transfer',
            transaction_id: transactionId || orderId,
            gross_amount: '0',
            va_numbers: vaNumber ? [{ bank: bank || 'BCA', va_number: vaNumber }] : undefined
          });
          
          const lastResult = midtransPayment.getLastPaymentResult();
          if (lastResult?.order_data) {
            setOrderData(lastResult.order_data);
          }
        } else {
          setError('Gagal memuat data pembayaran');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPaymentData();
  }, [orderId, status, transactionId, paymentType, vaNumber, bank]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Berhasil Disalin",
      description: `${label} telah disalin ke clipboard`,
    });
  };

  const refreshPaymentStatus = async () => {
    setIsRefreshing(true);
    try {
      const verifiedData = await midtransPayment.verifyPaymentStatus(orderId!);
      
      if (verifiedData.transaction_status === 'settlement' || verifiedData.transaction_status === 'capture') {
        // Payment completed, redirect to success page
        window.location.href = `/payment-success?order_id=${orderId}&status=success&transaction_id=${verifiedData.transaction_id}`;
      } else {
        setPaymentData(verifiedData);
        toast({
          title: "Status Diperbarui",
          description: `Status: ${getPaymentStatusText(verifiedData.transaction_status)}`,
        });
      }
    } catch (error) {
      toast({
        title: "Gagal Memperbarui",
        description: "Tidak dapat memperbarui status pembayaran",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getPaymentInstructions = () => {
    if (!paymentData) return null;

    const { payment_type, va_numbers, bill_key, biller_code } = paymentData;

    switch (payment_type) {
      case 'bank_transfer':
      case 'bca_va':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Cara Pembayaran BCA Virtual Account:</h4>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-blue-900 mb-2">Nomor Virtual Account:</p>
              <div className="flex items-center gap-2 bg-white p-3 rounded border">
                <code className="flex-1 font-mono text-lg font-bold">
                  {va_numbers?.[0]?.va_number || '12345678901234567'}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(va_numbers?.[0]?.va_number || '', 'Nomor VA')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="font-medium text-gray-900">Langkah-langkah pembayaran:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Login ke BCA mobile atau internet banking</li>
                <li>Pilih menu "Transfer" → "Virtual Account"</li>
                <li>Masukkan nomor Virtual Account di atas</li>
                <li>Konfirmasi pembayaran sebesar <span className="font-bold">{formatCurrency(parseInt(paymentData.gross_amount || '0'))}</span></li>
                <li>Simpan bukti pembayaran</li>
              </ol>
            </div>
          </div>
        );

      case 'permata_va':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Cara Pembayaran Permata Virtual Account:</h4>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-medium text-purple-900 mb-2">Nomor Virtual Account:</p>
              <div className="flex items-center gap-2 bg-white p-3 rounded border">
                <code className="flex-1 font-mono text-lg font-bold">
                  {va_numbers?.[0]?.va_number || '1234567890123456'}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(va_numbers?.[0]?.va_number || '', 'Nomor VA')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="font-medium text-gray-900">Langkah-langkah pembayaran:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Login ke Permata mobile banking atau ATM</li>
                <li>Pilih menu "Transfer" → "Virtual Account"</li>
                <li>Masukkan nomor Virtual Account di atas</li>
                <li>Konfirmasi pembayaran</li>
                <li>Simpan bukti pembayaran</li>
              </ol>
            </div>
          </div>
        );

      case 'echannel':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Cara Pembayaran Mandiri Bill Payment:</h4>
            <div className="bg-yellow-50 p-4 rounded-lg space-y-3">
              <div>
                <p className="font-medium text-yellow-900 mb-2">Company Code:</p>
                <div className="flex items-center gap-2 bg-white p-3 rounded border">
                  <code className="flex-1 font-mono text-lg font-bold">
                    {biller_code || '70012'}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(biller_code || '70012', 'Company Code')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="font-medium text-yellow-900 mb-2">Bill Key:</p>
                <div className="flex items-center gap-2 bg-white p-3 rounded border">
                  <code className="flex-1 font-mono text-lg font-bold">
                    {bill_key || '123456789012'}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(bill_key || '', 'Bill Key')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="font-medium text-gray-900">Langkah-langkah pembayaran:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Login ke Livin' by Mandiri atau ATM Mandiri</li>
                <li>Pilih menu "Pembayaran" → "Multi Payment"</li>
                <li>Masukkan Company Code dan Bill Key di atas</li>
                <li>Konfirmasi pembayaran</li>
                <li>Simpan bukti pembayaran</li>
              </ol>
            </div>
          </div>
        );

      case 'gopay':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Pembayaran GoPay:</h4>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Smartphone className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-green-900 font-medium">
                Silakan buka aplikasi Gojek Anda untuk menyelesaikan pembayaran
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Instruksi Pembayaran:</h4>
            <p className="text-gray-700">
              Silakan ikuti instruksi pembayaran yang diberikan oleh {getPaymentMethodText(payment_type)}
            </p>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memverifikasi pembayaran...</p>
        </div>
      </div>
    );
  }

  if (error || !paymentData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <div className="text-red-600 mb-4">
                  <AlertCircle className="w-16 h-16 mx-auto" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Terjadi Kesalahan</h2>
                <p className="text-gray-600 mb-4">
                  {error || 'Data pembayaran tidak ditemukan'}
                </p>
                <Button onClick={() => window.location.href = '/'}>
                  Kembali ke Beranda
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Pending Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Menunggu Pembayaran
            </h1>
            <p className="text-gray-600 text-lg">
              Silakan selesaikan pembayaran sebelum batas waktu berakhir
            </p>
            
            {/* Countdown Timer */}
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="font-mono text-xl font-bold text-red-600">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-red-600 text-sm">tersisa</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Payment Instructions */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Payment Details */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Detail Pembayaran
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshPaymentStatus}
                    disabled={isRefreshing}
                  >
                    {isRefreshing ? (
                      <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Refresh Status
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Order ID</Label>
                      <p className="font-mono text-sm bg-gray-50 p-2 rounded">
                        {paymentData.order_id}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Transaction ID</Label>
                      <p className="font-mono text-sm bg-gray-50 p-2 rounded">
                        {paymentData.transaction_id}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Status Pembayaran</Label>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          {getPaymentStatusText(paymentData.transaction_status)}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Metode Pembayaran</Label>
                      <p className="font-medium">
                        {getPaymentMethodText(paymentData.payment_type)}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium text-gray-600">Total Pembayaran</Label>
                      <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(parseInt(paymentData.gross_amount || '0'))}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Instruksi Pembayaran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getPaymentInstructions()}
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Penting:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Pastikan nominal pembayaran sesuai dengan yang tertera</li>
                        <li>• Simpan bukti pembayaran untuk referensi</li>
                        <li>• Pembayaran akan dikonfirmasi otomatis maksimal 15 menit</li>
                        <li>• Hubungi customer service jika ada kendala</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderData && (
                    <>
                      <div className="space-y-3">
                        {orderData.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="flex gap-3">
                            <img
                              src={item.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-600">
                                Qty: {item.quantity} • {formatCurrency(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {orderData.items.length > 3 && (
                          <p className="text-sm text-gray-600">
                            +{orderData.items.length - 3} item lainnya
                          </p>
                        )}
                      </div>
                      
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>
                            {formatCurrency(orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                          </span>
                        </div>
                        {orderData.shippingCost !== undefined && (
                          <div className="flex justify-between text-sm">
                            <span>Ongkos Kirim</span>
                            <span>
                              {orderData.shippingCost === 0 ? 'GRATIS' : formatCurrency(orderData.shippingCost)}
                            </span>
                          </div>
                        )}
                        {orderData.adminFee !== undefined && (
                          <div className="flex justify-between text-sm">
                            <span>Biaya Admin</span>
                            <span>{formatCurrency(orderData.adminFee)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total</span>
                          <span className="text-red-600">{formatCurrency(orderData.total)}</span>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={refreshPaymentStatus}
                      disabled={isRefreshing}
                    >
                      {isRefreshing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Memuat...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Cek Status Pembayaran
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => window.location.href = '/'}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Kembali ke Beranda
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      💬 Butuh Bantuan?
                    </p>
                    <p className="text-xs text-blue-700">
                      WhatsApp: +62 812-3456-7890<br />
                      Email: support@hideki.id
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={className}>{children}</label>
);

export default PaymentPending;