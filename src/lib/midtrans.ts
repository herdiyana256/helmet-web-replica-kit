import { OrderData } from "@/components/CheckoutForm";

// Midtrans configuration
const MIDTRANS_CLIENT_KEY = "Mid-client-wcUq_Ikil3zz7JmC";
const MIDTRANS_SERVER_KEY = "Mid-server-Xj71tQsLY7yWY1kZZisNqadW";
const MERCHANT_ID = "G345387238";

// Note: In a real implementation, server key should never be exposed in frontend
// This should be handled by your backend API

interface MidtransConfig {
  server_key: string;
  production: boolean;
}

interface TransactionDetails {
  order_id: string;
  gross_amount: number;
}

interface ItemDetail {
  id: string;
  price: number;
  quantity: number;
  name: string;
}

interface CustomerDetails {
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
}

interface MidtransPayload {
  transaction_details: TransactionDetails;
  item_details: ItemDetail[];
  customer_details: CustomerDetails;
  enabled_payments: string[];
  callbacks: {
    finish: string;
  };
}

export class MidtransPayment {
  private config: MidtransConfig;

  constructor() {
    this.config = {
      server_key: MIDTRANS_SERVER_KEY,
      production: false // Set to true for production
    };
  }

  private getBaseUrl(): string {
    return this.config.production 
      ? 'https://api.midtrans.com/v2'
      : 'https://api.sandbox.midtrans.com/v2';
  }

  private getSnapUrl(): string {
    return this.config.production
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';
  }

  private createAuthHeader(): string {
    return btoa(this.config.server_key + ':');
  }

  private formatCustomerDetails(orderData: OrderData): CustomerDetails {
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
      postal_code: orderData.customerInfo.postalCode || '',
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

  async createTransaction(orderData: OrderData): Promise<string> {
    const payload: MidtransPayload = {
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
        'credit_card', 'mandiri_clickpay', 'cimb_clicks',
        'bca_klikbca', 'bca_klikpay', 'bri_epay', 'echannel', 'permata_va',
        'bca_va', 'bni_va', 'other_va', 'gopay', 'indomaret',
        'danamon_online', 'akulaku'
      ],
      callbacks: {
        finish: window.location.origin + '/payment-success'
      }
    };

    try {
      const response = await fetch(`${this.getBaseUrl()}/charge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${this.createAuthHeader()}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.redirect_url || result.token;
    } catch (error) {
      console.error('Midtrans API Error:', error);
      throw new Error('Failed to create payment transaction');
    }
  }

  loadSnapScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.snap) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = this.getSnapUrl();
      script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Midtrans Snap script'));
      document.head.appendChild(script);
    });
  }

  async processPayment(orderData: OrderData): Promise<void> {
    try {
      await this.loadSnapScript();
      const snapToken = await this.createTransaction(orderData);
      
      // Use Snap.js for payment
      window.snap.pay(snapToken, {
        onSuccess: function(result: any) {
          console.log('Payment success:', result);
          window.location.href = '/payment-success?order_id=' + orderData.orderId;
        },
        onPending: function(result: any) {
          console.log('Payment pending:', result);
          window.location.href = '/payment-pending?order_id=' + orderData.orderId;
        },
        onError: function(result: any) {
          console.log('Payment error:', result);
          alert('Payment failed. Please try again.');
        },
        onClose: function() {
          console.log('Payment popup closed');
        }
      });
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }
}

// Global type declarations for Midtrans Snap
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

export const midtransPayment = new MidtransPayment();