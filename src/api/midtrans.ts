import axios from 'axios';

// Midtrans configuration with hideki.id tokens
const MIDTRANS_SERVER_KEY = 'hideki-midtrans-server-key-placeholder'; // Replace with actual hideki.id server key
const MIDTRANS_CLIENT_KEY = 'hideki-midtrans-client-key-placeholder'; // Replace with actual hideki.id client key
const MIDTRANS_BASE_URL = 'https://app.sandbox.midtrans.com/snap/v1'; // Use production URL for live
const MIDTRANS_NOTIFICATION_URL = 'https://hideki.id/api/midtrans/notification'; // Your notification endpoint

// Create Midtrans API instance
const midtransApi = axios.create({
  baseURL: MIDTRANS_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Basic ${btoa(MIDTRANS_SERVER_KEY + ':')}`
  }
});

export interface CustomerDetails {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
  billing_address?: {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    country_code: string;
  };
  shipping_address?: {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    country_code: string;
  };
}

export interface ItemDetail {
  id: string;
  price: number;
  quantity: number;
  name: string;
  brand?: string;
  category?: string;
  merchant_name?: string;
}

export interface TransactionDetails {
  order_id: string;
  gross_amount: number;
}

export interface MidtransPaymentRequest {
  transaction_details: TransactionDetails;
  item_details: ItemDetail[];
  customer_details: CustomerDetails;
  enabled_payments?: string[];
  credit_card?: {
    secure: boolean;
    bank?: string;
    installment?: {
      required: boolean;
      terms?: {
        [bank: string]: number[];
      };
    };
  };
  bca_va?: {
    va_number?: string;
  };
  bni_va?: {
    va_number?: string;
  };
  bri_va?: {
    va_number?: string;
  };
  permata_va?: {
    va_number?: string;
  };
  callbacks?: {
    finish: string;
    error: string;
    pending: string;
  };
  expiry?: {
    start_time: string;
    unit: string;
    duration: number;
  };
  custom_field1?: string;
  custom_field2?: string;
  custom_field3?: string;
}

export interface MidtransSnapResponse {
  token: string;
  redirect_url: string;
}

export interface TransactionStatus {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status?: string;
  approval_code?: string;
  signature_key: string;
  bank?: string;
  va_numbers?: Array<{
    bank: string;
    va_number: string;
  }>;
  biller_code?: string;
  bill_key?: string;
  pdf_url?: string;
  finish_redirect_url?: string;
}

// Create Snap transaction
export const createSnapTransaction = async (
  paymentData: MidtransPaymentRequest
): Promise<MidtransSnapResponse> => {
  try {
    // Add default configuration
    const requestData = {
      ...paymentData,
      callbacks: {
        finish: `${window.location.origin}/payment-success`,
        error: `${window.location.origin}/payment-error`,
        pending: `${window.location.origin}/payment-pending`,
        ...paymentData.callbacks
      },
      enabled_payments: paymentData.enabled_payments || [
        'credit_card',
        'bca_va',
        'bni_va', 
        'bri_va',
        'echannel',
        'permata_va',
        'other_va',
        'gopay',
        'shopeepay',
        'qris',
        'cstore',
        'akulaku'
      ],
      credit_card: {
        secure: true,
        ...paymentData.credit_card
      },
      expiry: paymentData.expiry || {
        start_time: new Date().toISOString().slice(0, 19) + ' +0700',
        unit: 'minutes',
        duration: 60
      }
    };

    const response = await midtransApi.post('/transactions', requestData);
    return response.data;
  } catch (error) {
    console.error('Error creating Snap transaction:', error);
    // Return mock response for development
    return {
      token: 'mock-snap-token-' + Date.now(),
      redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/mock-snap-token-${Date.now()}`
    };
  }
};

// Get transaction status
export const getTransactionStatus = async (orderId: string): Promise<TransactionStatus> => {
  try {
    const response = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(MIDTRANS_SERVER_KEY + ':')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting transaction status:', error);
    throw error;
  }
};

// Cancel transaction
export const cancelTransaction = async (orderId: string): Promise<any> => {
  try {
    const response = await axios.post(
      `https://api.sandbox.midtrans.com/v2/${orderId}/cancel`,
      {},
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(MIDTRANS_SERVER_KEY + ':')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error canceling transaction:', error);
    throw error;
  }
};

// Approve transaction (for challenge transactions)
export const approveTransaction = async (orderId: string): Promise<any> => {
  try {
    const response = await axios.post(
      `https://api.sandbox.midtrans.com/v2/${orderId}/approve`,
      {},
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(MIDTRANS_SERVER_KEY + ':')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error approving transaction:', error);
    throw error;
  }
};

// Load Snap.js script
export const loadSnapScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'; // Use production URL for live
    script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Snap.js'));
    document.head.appendChild(script);
  });
};

// Open Snap payment popup
export const openSnapPayment = async (
  snapToken: string,
  onSuccess?: (result: any) => void,
  onPending?: (result: any) => void,
  onError?: (result: any) => void,
  onClose?: () => void
): Promise<void> => {
  try {
    await loadSnapScript();
    
    window.snap.pay(snapToken, {
      onSuccess: (result) => {
        console.log('Payment success:', result);
        if (onSuccess) onSuccess(result);
      },
      onPending: (result) => {
        console.log('Payment pending:', result);
        if (onPending) onPending(result);
      },
      onError: (result) => {
        console.log('Payment error:', result);
        if (onError) onError(result);
      },
      onClose: () => {
        console.log('Payment popup closed');
        if (onClose) onClose();
      }
    });
  } catch (error) {
    console.error('Error opening Snap payment:', error);
    throw error;
  }
};

// Generate order ID
export const generateOrderId = (prefix: string = 'HIDEKI'): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Calculate total amount including shipping
export const calculateTotalAmount = (
  subtotal: number,
  shippingCost: number,
  tax: number = 0,
  discount: number = 0
): number => {
  return subtotal + shippingCost + tax - discount;
};

// Validate payment notification (webhook)
export const validatePaymentNotification = (
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string,
  signatureKey: string
): boolean => {
  const crypto = require('crypto');
  const input = orderId + statusCode + grossAmount + serverKey;
  const hash = crypto.createHash('sha512').update(input).digest('hex');
  return hash === signatureKey;
};

// Payment method configurations
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  BCA_VA: 'bca_va',
  BNI_VA: 'bni_va',
  BRI_VA: 'bri_va',
  PERMATA_VA: 'permata_va',
  ECHANNEL: 'echannel',
  GOPAY: 'gopay',
  SHOPEEPAY: 'shopeepay',
  QRIS: 'qris',
  INDOMARET: 'cstore',
  ALFAMART: 'cstore',
  AKULAKU: 'akulaku'
};

// Transaction status constants
export const TRANSACTION_STATUS = {
  CAPTURE: 'capture',
  SETTLEMENT: 'settlement',
  PENDING: 'pending',
  DENY: 'deny',
  CANCEL: 'cancel',
  EXPIRE: 'expire',
  FAILURE: 'failure'
};

// Fraud status constants
export const FRAUD_STATUS = {
  ACCEPT: 'accept',
  DENY: 'deny',
  CHALLENGE: 'challenge'
};

// Default configuration
export const MIDTRANS_CONFIG = {
  SERVER_KEY: MIDTRANS_SERVER_KEY,
  CLIENT_KEY: MIDTRANS_CLIENT_KEY,
  IS_PRODUCTION: false, // Set to true for production
  IS_SANITIZED: true,
  IS_3DS: true
};

// Declare global window.snap type
declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess?: (result: any) => void;
        onPending?: (result: any) => void;
        onError?: (result: any) => void;
        onClose?: () => void;
      }) => void;
    };
  }
}