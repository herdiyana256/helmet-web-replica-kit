// Backend API endpoints untuk Midtrans integration
// File ini akan digunakan untuk membuat mock backend atau sebagai referensi untuk implementasi backend

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

// Mock API implementation untuk development
class MidtransBackendAPI {
  private serverKey = "Mid-server-Xj71tQsLY7yWY1kZZisNqadW";
  private isProduction = false;
  private baseUrl = this.isProduction 
    ? "https://api.midtrans.com/v2" 
    : "https://api.sandbox.midtrans.com/v2";

  // Create transaction token
  async createTransaction(payload: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    // Untuk development, kita akan membuat mock response
    // Pada production, ini harus diganti dengan call ke Midtrans API yang sebenarnya
    
    try {
      // Mock successful response
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockToken = `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        token: mockToken,
        redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${mockToken}`
      };
      
      // Production implementation:
      /*
      const response = await fetch(`${this.baseUrl}/charge`, {
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
        throw new Error(`Midtrans API error: ${errorData.error_messages?.[0] || 'Unknown error'}`);
      }

      return await response.json();
      */
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }

  // Get payment status
  async getPaymentStatus(orderId: string): Promise<PaymentStatusResponse> {
    try {
      // Mock successful response
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        order_id: orderId,
        transaction_status: 'settlement',
        payment_type: 'bank_transfer',
        fraud_status: 'accept',
        transaction_id: `TXN-${Date.now()}`,
        gross_amount: '100000',
        status_message: 'Success, transaction is found',
        transaction_time: new Date().toISOString()
      };

      // Production implementation:
      /*
      const response = await fetch(`${this.baseUrl}/${orderId}/status`, {
        headers: {
          'Authorization': `Basic ${btoa(this.serverKey + ':')}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Midtrans API error: ${errorData.error_messages?.[0] || 'Unknown error'}`);
      }

      return await response.json();
      */
    } catch (error) {
      console.error('Error getting payment status:', error);
      throw new Error(`Failed to get payment status: ${error.message}`);
    }
  }

  // Handle webhook notification from Midtrans
  async handleWebhook(notificationData: any): Promise<PaymentStatusResponse> {
    try {
      // Verify notification authenticity
      const isValidNotification = await this.verifyNotification(notificationData);
      
      if (!isValidNotification) {
        throw new Error('Invalid notification signature');
      }

      // Get full transaction status
      return await this.getPaymentStatus(notificationData.order_id);
    } catch (error) {
      console.error('Error handling webhook:', error);
      throw new Error(`Failed to handle webhook: ${error.message}`);
    }
  }

  // Verify notification signature
  private async verifyNotification(notificationData: any): Promise<boolean> {
    // Production implementation would verify the signature hash
    // For mock purposes, we'll return true
    return true;
    
    /*
    const orderId = notificationData.order_id;
    const statusCode = notificationData.status_code;
    const grossAmount = notificationData.gross_amount;
    const signatureKey = notificationData.signature_key;

    const expectedSignature = crypto
      .createHash('sha512')
      .update(orderId + statusCode + grossAmount + this.serverKey)
      .digest('hex');

    return signatureKey === expectedSignature;
    */
  }
}

// Export singleton instance
export const midtransBackendAPI = new MidtransBackendAPI();

// Express.js route handlers (untuk referensi backend implementation)
export const createMidtransRoutes = () => {
  const routes = {
    // POST /api/create-transaction
    createTransaction: async (req: any, res: any) => {
      try {
        const result = await midtransBackendAPI.createTransaction(req.body);
        res.json(result);
      } catch (error) {
        res.status(500).json({ 
          error: true, 
          message: error.message 
        });
      }
    },

    // GET /api/payment-status/:orderId
    getPaymentStatus: async (req: any, res: any) => {
      try {
        const { orderId } = req.params;
        const result = await midtransBackendAPI.getPaymentStatus(orderId);
        res.json(result);
      } catch (error) {
        res.status(500).json({ 
          error: true, 
          message: error.message 
        });
      }
    },

    // POST /api/midtrans-webhook
    handleWebhook: async (req: any, res: any) => {
      try {
        const result = await midtransBackendAPI.handleWebhook(req.body);
        
        // Update order status in database based on payment status
        await updateOrderStatus(result.order_id, result.transaction_status);
        
        res.json({ status: 'ok' });
      } catch (error) {
        res.status(500).json({ 
          error: true, 
          message: error.message 
        });
      }
    }
  };

  return routes;
};

// Helper function to update order status (implement based on your database)
async function updateOrderStatus(orderId: string, status: string) {
  // Implement database update logic here
  console.log(`Updating order ${orderId} status to: ${status}`);
  
  // Example implementation:
  /*
  await database.orders.update(
    { order_id: orderId },
    { 
      payment_status: status,
      updated_at: new Date()
    }
  );
  */
}

// Utility functions for frontend integration
export const mockBackendEndpoints = {
  createTransaction: async (payload: CreateTransactionRequest): Promise<CreateTransactionResponse> => {
    // Simulate network request
    const response = await fetch('/api/create-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }

    return await response.json();
  },

  getPaymentStatus: async (orderId: string): Promise<PaymentStatusResponse> => {
    const response = await fetch(`/api/payment-status/${orderId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get payment status');
    }

    return await response.json();
  }
};

// Development server setup instructions
export const setupInstructions = `
To setup backend for Midtrans integration:

1. Install required dependencies:
   npm install express cors body-parser crypto

2. Create backend server (server.js):
   const express = require('express');
   const cors = require('cors');
   const { createMidtransRoutes } = require('./src/api/midtrans-backend');
   
   const app = express();
   app.use(cors());
   app.use(express.json());
   
   const midtransRoutes = createMidtransRoutes();
   app.post('/api/create-transaction', midtransRoutes.createTransaction);
   app.get('/api/payment-status/:orderId', midtransRoutes.getPaymentStatus);
   app.post('/api/midtrans-webhook', midtransRoutes.handleWebhook);
   
   app.listen(3001, () => {
     console.log('Backend server running on port 3001');
   });

3. Update frontend to use real backend:
   - Change baseUrl in midtrans.ts to 'http://localhost:3001'
   - Remove mock implementation and use real API calls

4. Production deployment:
   - Use environment variables for Midtrans credentials
   - Implement proper database integration
   - Setup SSL certificate for webhook endpoint
   - Configure proper CORS settings
`;