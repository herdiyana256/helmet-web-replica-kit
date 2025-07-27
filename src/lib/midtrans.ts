// Midtrans integration untuk pembayaran
// Menggunakan Snap API untuk kemudahan integrasi

export interface OrderData {
  orderId: string;
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
  shippingCost?: number;
  adminFee?: number;
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
    // Prepare item details including shipping and admin fee
    const itemDetails = orderData.items.map(item => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      name: item.name
    }));

    // Add shipping cost as separate item if exists
    if (orderData.shippingCost && orderData.shippingCost > 0) {
      itemDetails.push({
        id: 'SHIPPING',
        price: orderData.shippingCost,
        quantity: 1,
        name: 'Biaya Pengiriman'
      });
    }

    // Add admin fee as separate item if exists
    if (orderData.adminFee && orderData.adminFee > 0) {
      itemDetails.push({
        id: 'ADMIN_FEE',
        price: orderData.adminFee,
        quantity: 1,
        name: 'Biaya Admin'
      });
    }

    const payload: MidtransSnapPayload = {
      transaction_details: {
        order_id: orderData.orderId,
        gross_amount: orderData.total
      },
      item_details: itemDetails,
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
      // Call backend API to create transaction
      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Backend API error: ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();
      
      if (!result.token) {
        throw new Error('No token received from Midtrans');
      }

      return result.token;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new Error(`Gagal membuat transaksi: ${error.message}`);
    }
  }

  // Process payment menggunakan Snap
  async processPayment(orderData: OrderData): Promise<void> {
    try {
      console.log('Processing payment for order:', orderData.orderId);
      
      // Load Snap script
      await this.loadSnapScript();
      
      // Create transaction token
      const snapToken = await this.createTransactionToken(orderData);
      
      // Save order data for reference
      sessionStorage.setItem(`order_${orderData.orderId}`, JSON.stringify(orderData));

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
      throw new Error(`Gagal memproses pembayaran: ${error.message}`);
    }
  }

  // Handle payment success
  private handlePaymentSuccess(orderData: OrderData, result: any) {
    // Simpan hasil pembayaran
    localStorage.setItem('last_payment_result', JSON.stringify({
      ...result,
      order_data: orderData,
      timestamp: Date.now(),
      status: 'success'
    }));
    
    // Clear order from session storage
    sessionStorage.removeItem(`order_${orderData.orderId}`);
    
    // Redirect ke halaman sukses
    window.location.href = `/payment-success?order_id=${orderData.orderId}&status=success&transaction_id=${result.transaction_id || result.order_id}`;
  }

  // Handle payment pending
  private handlePaymentPending(orderData: OrderData, result: any) {
    // Simpan hasil pembayaran
    localStorage.setItem('last_payment_result', JSON.stringify({
      ...result,
      order_data: orderData,
      timestamp: Date.now(),
      status: 'pending'
    }));
    
    // Redirect ke halaman pending
    window.location.href = `/payment-pending?order_id=${orderData.orderId}&status=pending&transaction_id=${result.transaction_id || result.order_id}`;
  }

  // Handle payment error
  private handlePaymentError(orderData: OrderData, result: any) {
    console.error('Payment failed:', result);
    
    // Simpan error untuk debugging
    localStorage.setItem('last_payment_error', JSON.stringify({
      ...result,
      order_data: orderData,
      timestamp: Date.now()
    }));
    
    alert(`Pembayaran gagal: ${result.status_message || 'Terjadi kesalahan sistem'}\n\nSilakan coba lagi.`);
  }

  // Handle payment popup close
  private handlePaymentClose() {
    console.log('Payment cancelled by user');
    // Tidak perlu redirect, biarkan user tetap di halaman checkout
  }

  // Verify payment status (untuk dipanggil dari halaman success/pending)
  async verifyPaymentStatus(orderId: string): Promise<any> {
    try {
      const response = await fetch(`/api/payment-status/${orderId}`);
      if (!response.ok) {
        throw new Error('Failed to verify payment status');
      }
      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      
      // Fallback: check localStorage for payment result
      const lastPaymentResult = localStorage.getItem('last_payment_result');
      if (lastPaymentResult) {
        const paymentData = JSON.parse(lastPaymentResult);
        if (paymentData.order_data?.orderId === orderId) {
          return {
            order_id: orderId,
            transaction_status: paymentData.transaction_status || 'settlement',
            payment_type: paymentData.payment_type || 'unknown',
            fraud_status: paymentData.fraud_status || 'accept',
            transaction_id: paymentData.transaction_id,
            gross_amount: paymentData.order_data.total
          };
        }
      }
      
      throw error;
    }
  }

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
  return `ORDER-${timestamp}-${random}`;
};

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

export const isPaymentSuccess = (status: string): boolean => {
  return ['capture', 'settlement'].includes(status);
};

export const isPaymentPending = (status: string): boolean => {
  return status === 'pending';
};

export const isPaymentFailed = (status: string): boolean => {
  return ['deny', 'cancel', 'expire', 'failure'].includes(status);
};