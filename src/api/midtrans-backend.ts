// Backend API endpoints untuk Midtrans integration
// Production implementation untuk real payment processing

export interface CreateTransactionRequest {
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

export interface CreateTransactionResponse {
  token: string;
  redirect_url: string;
}

export interface PaymentStatusResponse {
  order_id: string;
  transaction_status: string;
  payment_type: string;
  fraud_status: string;
  transaction_id: string;
  gross_amount: string;
  status_message: string;
  transaction_time: string;
}

// Production API implementation
class MidtransBackendAPI {
  private serverKey = import.meta.env.MIDTRANS_SERVER_KEY || "Mid-server-Xj71tQsLY7yWY1kZZisNqadW";
  private isProduction = import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === 'true';
  private baseUrl = this.isProduction 
    ? "https://api.midtrans.com/v2" 
    : "https://api.sandbox.midtrans.com/v2";
  private snapUrl = this.isProduction
    ? "https://app.midtrans.com/snap/v1/transactions"
    : "https://app.sandbox.midtrans.com/snap/v1/transactions";

  // Create transaction token via Midtrans Snap API
  async createTransaction(payload: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    try {
      console.log('Creating transaction with Midtrans API...');
      
      // Prepare the request to Midtrans Snap API
      const response = await fetch(this.snapUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(this.serverKey + ':')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Midtrans API error:', errorData);
        throw new Error(errorData.error_messages?.[0] || 'Failed to create transaction');
      }

      const result = await response.json();
      
      if (!result.token) {
        throw new Error('No token received from Midtrans');
      }

      console.log('Transaction created successfully');
      return {
        token: result.token,
        redirect_url: result.redirect_url
      };

    } catch (error) {
      console.error('Error creating transaction:', error);
      
      // For development/fallback, you can uncomment the lines below
      // But for production, always throw the error
      throw error;
      
      // Development fallback (uncomment for testing):
      /*
      console.warn('Using fallback for development');
      const mockToken = `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        token: mockToken,
        redirect_url: `https://app.midtrans.com/snap/v2/vtweb/${mockToken}`
      };
      */
    }
  }

  // Get payment status from Midtrans
  async getPaymentStatus(orderId: string): Promise<PaymentStatusResponse> {
    try {
      console.log('Checking payment status for order:', orderId);
      
      const response = await fetch(`${this.baseUrl}/${orderId}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(this.serverKey + ':')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error checking payment status:', errorData);
        throw new Error(errorData.error_messages?.[0] || 'Failed to check payment status');
      }

      const result = await response.json();
      
      return {
        order_id: result.order_id,
        transaction_status: result.transaction_status,
        payment_type: result.payment_type,
        fraud_status: result.fraud_status,
        transaction_id: result.transaction_id,
        gross_amount: result.gross_amount,
        status_message: result.status_message,
        transaction_time: result.transaction_time
      };

    } catch (error) {
      console.error('Error getting payment status:', error);
      throw error;
    }
  }

  // Cancel transaction
  async cancelTransaction(orderId: string): Promise<any> {
    try {
      console.log('Cancelling transaction for order:', orderId);
      
      const response = await fetch(`${this.baseUrl}/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(this.serverKey + ':')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error cancelling transaction:', errorData);
        throw new Error(errorData.error_messages?.[0] || 'Failed to cancel transaction');
      }

      const result = await response.json();
      console.log('Transaction cancelled successfully');
      
      return result;

    } catch (error) {
      console.error('Error cancelling transaction:', error);
      throw error;
    }
  }

  // Refund transaction
  async refundTransaction(orderId: string, amount?: number, reason?: string): Promise<any> {
    try {
      console.log('Processing refund for order:', orderId);
      
      const refundData: any = {};
      if (amount) refundData.refund_amount = amount;
      if (reason) refundData.reason = reason;
      
      const response = await fetch(`${this.baseUrl}/${orderId}/refund`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(this.serverKey + ':')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(refundData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error processing refund:', errorData);
        throw new Error(errorData.error_messages?.[0] || 'Failed to process refund');
      }

      const result = await response.json();
      console.log('Refund processed successfully');
      
      return result;

    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const midtransBackendAPI = new MidtransBackendAPI();

// Export default untuk kompatibilitas
export default midtransBackendAPI;

// Utility functions untuk payment processing
export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `HIDEKI-${timestamp}-${random}`;
};

export const formatCurrency = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
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