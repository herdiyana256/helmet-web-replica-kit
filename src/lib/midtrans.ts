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

// Midtrans configuration - Using environment variables
const MIDTRANS_CONFIG = {
  clientKey: import.meta.env.VITE_MIDTRANS_CLIENT_KEY || "Mid-client-wcUq_Ikil3zz7JmC",
  serverKey: import.meta.env.MIDTRANS_SERVER_KEY || "Mid-server-Xj71tQsLY7yWY1kZZisNqadW",
  merchantId: import.meta.env.VITE_MIDTRANS_MERCHANT_ID || "G345387238",
  isProduction: import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === 'true',
  snapUrl: import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === 'true' 
    ? "https://app.midtrans.com/snap/snap.js" 
    : "https://app.sandbox.midtrans.com/snap/snap.js"
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
      // Call backend API to create transaction - use production API
      const result = await midtransBackendAPI.createTransaction(payload);
      
      if (!result.token) {
        throw new Error('No token received from Midtrans');
      }

      return result.token;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new Error('Failed to create payment transaction. Please try again.');
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
      console.error('Error in processPayment:', error);
      throw error;
    }
  }

  // Handle successful payment
  private handlePaymentSuccess(orderData: OrderData, result: any): void {
    // Store payment result
    sessionStorage.setItem('payment_result', JSON.stringify(result));
    sessionStorage.setItem('order_data', JSON.stringify(orderData));
    
    // Redirect to success page
    window.location.href = '/payment-success';
  }

  // Handle pending payment
  private handlePaymentPending(orderData: OrderData, result: any): void {
    // Store payment result
    sessionStorage.setItem('payment_result', JSON.stringify(result));
    sessionStorage.setItem('order_data', JSON.stringify(orderData));
    
    // Redirect to pending page
    window.location.href = '/payment-pending';
  }

  // Handle payment error
  private handlePaymentError(orderData: OrderData, result: any): void {
    console.error('Payment failed:', result);
    
    // Show error message
    alert('Payment failed. Please try again.');
  }

  // Handle payment popup close
  private handlePaymentClose(): void {
    console.log('Payment popup was closed by user');
    // Optionally show a message or redirect
  }

  // Check payment status
  async checkPaymentStatus(orderId: string): Promise<any> {
    try {
      const result = await midtransBackendAPI.getPaymentStatus(orderId);
      return result;
    } catch (error) {
      console.error('Error checking payment status:', error);
      throw error;
    }
  }
}

// Export instance
export const midtransPayment = new MidtransPayment();

// Export default untuk kompatibilitas
export default midtransPayment;
