import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Truck, Receipt, Download, ArrowLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { midtransPayment, getPaymentStatusText, getPaymentMethodText, formatCurrency } from "@/lib/midtrans";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PaymentData {
  order_id: string;
  transaction_status: string;
  payment_type: string;
  transaction_id: string;
  gross_amount: string;
  transaction_time?: string;
}

interface OrderData {
  orderId: string;
  items: any[];
  total: number;
  customerInfo: any;
  shippingCost?: number;
  adminFee?: number;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const orderId = searchParams.get('order_id');
  const status = searchParams.get('status');
  const transactionId = searchParams.get('transaction_id');
  const paymentType = searchParams.get('payment_type');
  const grossAmount = searchParams.get('gross_amount');

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
        if (orderId && status === 'success') {
          setPaymentData({
            order_id: orderId,
            transaction_status: 'settlement',
            payment_type: paymentType || 'unknown',
            transaction_id: transactionId || orderId,
            gross_amount: grossAmount || '0'
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

    // Clean up payment result after displaying
    return () => {
      if (orderId) {
        setTimeout(() => {
          midtransPayment.clearPaymentResult();
        }, 5000);
      }
    };
  }, [orderId, status, transactionId, paymentType, grossAmount]);

  const handleDownloadInvoice = () => {
    // Implement invoice download functionality
    window.print();
  };

  const handleTrackOrder = () => {
    // Redirect to order tracking page
    window.location.href = `/orders/${orderId}`;
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
                  <CheckCircle className="w-16 h-16 mx-auto" />
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
          
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pembayaran Berhasil! 🎉
            </h1>
            <p className="text-gray-600 text-lg">
              Terima kasih atas pembelian Anda. Pesanan sedang diproses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Payment Information */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Payment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Detail Pembayaran
                  </CardTitle>
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
                        <Badge className="bg-green-100 text-green-800 border-green-200">
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
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Total Pembayaran</Label>
                      <p className="text-lg font-bold text-red-600">
                        {formatCurrency(parseInt(paymentData.gross_amount))}
                      </p>
                    </div>
                    {paymentData.transaction_time && (
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Waktu Pembayaran</Label>
                        <p className="text-sm">
                          {new Date(paymentData.transaction_time).toLocaleString('id-ID')}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              {orderData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Item Pesanan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orderData.items.map((item, index) => (
                        <div key={index} className="flex gap-4 p-4 border rounded-lg">
                          <img
                            src={item.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              {item.brand} • Size: {item.size || 'M'} • Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-bold text-red-600">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {/* Order Summary */}
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
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Shipping Information */}
              {orderData?.customerInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Informasi Pengiriman
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-medium">{orderData.customerInfo.name}</p>
                      <p className="text-sm text-gray-600">{orderData.customerInfo.phone}</p>
                      <p className="text-sm text-gray-600">{orderData.customerInfo.email}</p>
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-600">Alamat Pengiriman:</p>
                        <p className="text-sm">
                          {orderData.customerInfo.address}<br />
                          {orderData.customerInfo.city} {orderData.customerInfo.postalCode}
                        </p>
                      </div>
                      {orderData.customerInfo.notes && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-600">Catatan:</p>
                          <p className="text-sm">{orderData.customerInfo.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Actions Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Langkah Selanjutnya</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Pesanan Anda akan diproses dalam 1-2 hari kerja. Kami akan mengirimkan email konfirmasi dan nomor resi setelah pesanan dikirim.
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={handleTrackOrder}
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Lacak Pesanan
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={handleDownloadInvoice}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Invoice
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => window.location.href = '/helm'}
                    >
                      Lanjut Belanja
                    </Button>
                    
                    <Button 
                      variant="ghost"
                      className="w-full"
                      onClick={() => window.location.href = '/'}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Kembali ke Beranda
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      💡 Tips untuk Anda:
                    </p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Simpan order ID untuk referensi</li>
                      <li>• Cek email untuk konfirmasi pengiriman</li>
                      <li>• Hubungi CS jika ada pertanyaan</li>
                    </ul>
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

export default PaymentSuccess;