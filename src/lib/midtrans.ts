// Midtrans integration untuk pembayaran
// Menggunakan Snap API untuk kemudahan integrasi

import { midtransBackendAPI } from '@/api/midtrans-backend';

export interface OrderData {
  orderId: string;
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  brand?: string;
  size?: string;
}

export interface CustomerInfo {
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

// Midtrans configuration
const MIDTRANS_CONFIG = {
  clientKey: "Mid-client-wcUq_Ikil3zz7JmC", // Client key untuk frontend
  serverKey: "Mid-server-Xj71tQsLY7yWY1kZZisNqadW", // Server key (seharusnya di backend)
  merchantId: "G345387238",
  isProduction: false, // Set true untuk production
  snapUrl: "https://app.sandbox.midtrans.com/snap/snap.js" // Sandbox URL
};

// Interface untuk Midtrans Snap
interface MidtransSnapPayload {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  item_details: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
  customer_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    billing_address: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      postal_code: string;
      country_code: string;
    };
    shipping_address: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      postal_code: string;
      country_code: string;
    };
  };
  enabled_payments: string[];
  callbacks: {
    finish: string;
  };
}

// Global type untuk Midtrans Snap
declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess: (result: any) => void;
        onPending: (result: any) => void;
        onError: (result: any) => void;
        onClose: () => void;
      }) => void;
    };
  }
}

export class MidtransPayment {
  private config = MIDTRANS_CONFIG;

  // Load Midtrans Snap script
  private loadSnapScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script already loaded
      if (window.snap) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = this.config.snapUrl;
      script.setAttribute('data-client-key', this.config.clientKey);
      script.type = 'text/javascript';
      
      script.onload = () => {
        console.log('Midtrans Snap script loaded successfully');
        resolve();
      };
      
      script.onerror = () => {
        console.error('Failed to load Midtrans Snap script');
        reject(new Error('Failed to load Midtrans Snap script'));
      };
      
      document.head.appendChild(script);
    });
  }

  // Format customer details untuk Midtrans
  private formatCustomerDetails(orderData: OrderData) {
    const nameParts = orderData.customerInfo.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const addressData = {
      first_name: firstName,
      last_name: lastName,
      email: orderData.customerInfo.email,
      phone: orderData.customerInfo.phone,
      address: orderData.customerInfo.address,
      city: orderData.customerInfo.city,
      postal_code: orderData.customerInfo.postalCode,
      country_code: 'IDN'
    };

    return {
      first_name: firstName,
      last_name: lastName,
      email: orderData.customerInfo.email,
      phone: orderData.customerInfo.phone,
      billing_address: addressData,
      shipping_address: addressData
    };
  }

  // Create transaction token via backend API
  private async createTransactionToken(orderData: OrderData): Promise<string> {
    const payload: MidtransSnapPayload = {
      transaction_details: {
        order_id: orderData.orderId,
        gross_amount: orderData.total
      },
      item_details: orderData.items.map(item => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name
      })),
      customer_details: this.formatCustomerDetails(orderData),
      enabled_payments: [
        'credit_card', 
        'mandiri_clickpay', 
        'cimb_clicks',
        'bca_klikbca', 
        'bca_klikpay', 
        'bri_epay', 
        'echannel', 
        'permata_va',
        'bca_va', 
        'bni_va', 
        'other_va', 
        'gopay', 
        'shopeepay',
        'indomaret', 
        'alfamart',
        'danamon_online', 
        'akulaku'
      ],
      callbacks: {
        finish: `${window.location.origin}/payment-success`
      }
    };

    try {
<<<<<<< Updated upstream
      // Call backend API to create transaction using mock API for development
      const result = await midtransBackendAPI.createTransaction(payload);
      
      if (!result.token) {
        throw new Error('No token received from Midtrans');
      }

=======
      // Dalam implementasi nyata, ini harus dikirim ke backend API Anda
      // Backend yang akan berkomunikasi dengan Midtrans menggunakan server key
      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Fallback: simulasi response untuk demo
        // JANGAN gunakan ini di production!
        console.warn('Backend API tidak tersedia, menggunakan mock token untuk demo');
        return this.createMockToken(orderData);
      }

      const result = await response.json();
>>>>>>> Stashed changes
      return result.token;
    } catch (error) {
      console.error('Error creating transaction:', error);
      // Fallback untuk demo
      return this.createMockToken(orderData);
    }
  }

  // Mock token creation untuk demo (JANGAN gunakan di production!)
  private createMockToken(orderData: OrderData): string {
    console.warn('Menggunakan mock token - JANGAN gunakan di production!');
    
    // Simulasi pembuatan token
    const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simpan order data untuk referensi
    sessionStorage.setItem(`order_${orderData.orderId}`, JSON.stringify(orderData));
    
    return mockToken;
  }

  // Process payment menggunakan Snap
  async processPayment(orderData: OrderData): Promise<void> {
    try {
      console.log('Processing payment for order:', orderData.orderId);
      
      // Load Snap script
      await this.loadSnapScript();
      
      // Create transaction token
      const snapToken = await this.createTransactionToken(orderData);
      
      if (snapToken.startsWith('mock_token_')) {
        // Handle mock payment untuk demo
        this.handleMockPayment(orderData, snapToken);
        return;
      }

      // Use Snap to process payment
      window.snap.pay(snapToken, {
        onSuccess: (result: any) => {
          console.log('Payment success:', result);
          this.handlePaymentSuccess(orderData, result);
        },
        onPending: (result: any) => {
          console.log('Payment pending:', result);
          this.handlePaymentPending(orderData, result);
        },
        onError: (result: any) => {
          console.error('Payment error:', result);
          this.handlePaymentError(orderData, result);
        },
        onClose: () => {
          console.log('Payment popup closed by user');
          this.handlePaymentClose();
        }
      });

    } catch (error) {
      console.error('Payment processing error:', error);
      throw new Error('Gagal memproses pembayaran. Silakan coba lagi.');
    }
  }

  // Handle mock payment untuk demo
  private handleMockPayment(orderData: OrderData, mockToken: string) {
    console.log('Handling mock payment with token:', mockToken);
    
    // Simulasi dialog pembayaran
    const paymentMethods = [
      'Transfer Bank BCA',
      'Transfer Bank Mandiri', 
      'Transfer Bank BNI',
      'GoPay',
      'ShopeePay',
      'Credit Card'
    ];
    
    const selectedMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    
    if (confirm(`Demo Payment\n\nOrder: ${orderData.orderId}\nTotal: Rp ${orderData.total.toLocaleString('id-ID')}\nMetode: ${selectedMethod}\n\nLanjutkan pembayaran?`)) {
      // Simulasi pembayaran berhasil
      setTimeout(() => {
        this.handlePaymentSuccess(orderData, {
          order_id: orderData.orderId,
          payment_type: selectedMethod.toLowerCase().replace(/\s+/g, '_'),
          transaction_status: 'settlement',
          fraud_status: 'accept'
        });
      }, 2000);
    } else {
      this.handlePaymentClose();
    }
  }

  // Handle payment success
  private handlePaymentSuccess(orderData: OrderData, result: any) {
    // Simpan hasil pembayaran
    localStorage.setItem('last_payment_result', JSON.stringify({
      ...result,
      order_data: orderData,
      timestamp: Date.now()
    }));
    
<<<<<<< Updated upstream
    // Clear order from session storage
    sessionStorage.removeItem(`order_${orderData.orderId}`);
    
    // Redirect ke halaman sukses dengan parameter yang lengkap
    const params = new URLSearchParams({
      order_id: orderData.orderId,
      status: 'success',
      transaction_id: result.transaction_id || result.order_id,
      payment_type: result.payment_type || 'unknown',
      gross_amount: orderData.total.toString()
    });
    
    window.location.href = `/payment-success?${params.toString()}`;
=======
    // Redirect ke halaman sukses
    window.location.href = `/payment-success?order_id=${orderData.orderId}&status=success`;
>>>>>>> Stashed changes
  }

  // Handle payment pending
  private handlePaymentPending(orderData: OrderData, result: any) {
    // Simpan hasil pembayaran
    localStorage.setItem('last_payment_result', JSON.stringify({
      ...result,
      order_data: orderData,
      timestamp: Date.now()
    }));
    
<<<<<<< Updated upstream
    // Redirect ke halaman pending dengan parameter yang lengkap
    const params = new URLSearchParams({
      order_id: orderData.orderId,
      status: 'pending',
      transaction_id: result.transaction_id || result.order_id,
      payment_type: result.payment_type || 'unknown',
      va_number: result.va_numbers?.[0]?.va_number || '',
      bank: result.va_numbers?.[0]?.bank || result.payment_type || ''
    });
    
    window.location.href = `/payment-pending?${params.toString()}`;
=======
    // Redirect ke halaman pending
    window.location.href = `/payment-pending?order_id=${orderData.orderId}&status=pending`;
>>>>>>> Stashed changes
  }

  // Handle payment error
  private handlePaymentError(orderData: OrderData, result: any) {
    console.error('Payment failed:', result);
<<<<<<< Updated upstream
    
    // Simpan error untuk debugging
    localStorage.setItem('last_payment_error', JSON.stringify({
      ...result,
      order_data: orderData,
      timestamp: Date.now()
    }));
    
    // Show detailed error message
    const errorMessage = result.status_message || 
                        result.error_messages?.join(', ') || 
                        'Terjadi kesalahan sistem';
    
    alert(`Pembayaran gagal: ${errorMessage}\n\nSilakan coba lagi atau hubungi customer service jika masalah berlanjut.`);
=======
    alert(`Pembayaran gagal: ${result.status_message || 'Terjadi kesalahan sistem'}\n\nSilakan coba lagi.`);
>>>>>>> Stashed changes
  }

  // Handle payment popup close
  private handlePaymentClose() {
    console.log('Payment cancelled by user');
    // Tidak perlu redirect, biarkan user tetap di halaman checkout
  }

  // Verify payment status (untuk dipanggil dari halaman success/pending)
  async verifyPaymentStatus(orderId: string): Promise<any> {
    try {
      const result = await midtransBackendAPI.getPaymentStatus(orderId);
      return result;
    } catch (error) {
      console.error('Error verifying payment:', error);
      // Return mock status untuk demo
      return {
        order_id: orderId,
        transaction_status: 'settlement',
        payment_type: 'bank_transfer',
        fraud_status: 'accept'
      };
    }
  }
<<<<<<< Updated upstream

  // Get payment result from localStorage
  getLastPaymentResult(): any {
    const result = localStorage.getItem('last_payment_result');
    return result ? JSON.parse(result) : null;
  }

  // Clear payment result from localStorage
  clearPaymentResult(): void {
    localStorage.removeItem('last_payment_result');
    localStorage.removeItem('last_payment_error');
  }

  // Get order data from sessionStorage
  getOrderData(orderId: string): OrderData | null {
    const orderData = sessionStorage.getItem(`order_${orderId}`);
    return orderData ? JSON.parse(orderData) : null;
  }
=======
>>>>>>> Stashed changes
}

// Export singleton instance
export const midtransPayment = new MidtransPayment();

// Utility functions
export const formatCurrency = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `HIDEKI-${timestamp}-${random}`;
};

<<<<<<< Updated upstream
export const getPaymentStatusText = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    'capture': 'Pembayaran Berhasil',
    'settlement': 'Pembayaran Berhasil',
    'pending': 'Menunggu Pembayaran',
    'deny': 'Pembayaran Ditolak',
    'cancel': 'Pembayaran Dibatalkan',
    'expire': 'Pembayaran Kedaluwarsa',
    'failure': 'Pembayaran Gagal'
  };
  
  return statusMap[status] || 'Status Tidak Dikenal';
};

export const getPaymentMethodText = (paymentType: string): string => {
  const methodMap: { [key: string]: string } = {
    'bank_transfer': 'Transfer Bank',
    'echannel': 'Mandiri Bill Payment',
    'permata_va': 'Permata Virtual Account',
    'bca_va': 'BCA Virtual Account',
    'bni_va': 'BNI Virtual Account',
    'other_va': 'Virtual Account',
    'gopay': 'GoPay',
    'shopeepay': 'ShopeePay',
    'credit_card': 'Kartu Kredit',
    'cstore': 'Indomaret/Alfamart',
    'akulaku': 'Akulaku'
  };
  
  return methodMap[paymentType] || paymentType.replace('_', ' ').toUpperCase();
};

export const isPaymentSuccess = (status: string): boolean => {
  return ['capture', 'settlement'].includes(status);
};

export const isPaymentPending = (status: string): boolean => {
  return status === 'pending';
};

export const isPaymentFailed = (status: string): boolean => {
  return ['deny', 'cancel', 'expire', 'failure'].includes(status);
};
=======
>>>>>>> Stashed changes
