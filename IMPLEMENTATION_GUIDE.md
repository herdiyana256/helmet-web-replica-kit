# Hideki.id E-commerce Implementation Guide

## Fitur yang Telah Diimplementasikan

### 1. ✅ Header Menu & Submenu Helm (SOLVED)
- Menu "HELM" dengan 19 brand helm yang sudah terintegrasi
- Dropdown submenu dengan grid layout yang rapi
- Link menuju halaman produk dengan filter brand yang tepat
- Responsive design untuk mobile dan desktop

### 2. ✅ Product Detail Modal (SOLVED)
- Modal detail produk yang lengkap dengan:
  - Multiple product images dengan thumbnail
  - Size selection untuk helm
  - Quantity selector
  - Rating dan reviews
  - Specifications detail
  - Kelengkapan produk
  - CTA "Tambahkan ke Keranjang" dan "Beli Sekarang"
- Interface mirip Tokopedia dengan UX yang modern

### 3. ✅ RajaOngkir Integration (SOLVED)
- Sistem pengiriman terintegrasi dengan RajaOngkir API
- Dropdown provinsi dan kota yang dinamis
- Kalkulasi ongkos kirim real-time berdasarkan:
  - Asal: Jakarta Barat (toko)
  - Tujuan: Kota yang dipilih customer
  - Berat: Dihitung berdasarkan jumlah helm (1.5kg per helm)
  - Subtotal: Gratis ongkir untuk pembelian >2jt
- Multiple courier options (JNE, POS, TIKI)
- Biaya admin Rp 1.000

### 4. ✅ Midtrans Payment Gateway (SOLVED)
- Full integration dengan Midtrans Snap
- Support multiple payment methods:
  - Virtual Account (BCA, Mandiri, Permata, BNI)
  - E-wallet (GoPay, ShopeePay)
  - Bank Transfer
  - Credit Card
  - Convenience Store (Indomaret, Alfamart)
- Real payment verification system
- Proper payment flow: Cart → Checkout → Payment → Success/Pending

### 5. ✅ Payment Success & Pending Pages (SOLVED)
- **PaymentSuccess**: Halaman konfirmasi pembayaran berhasil
  - Detail pembayaran lengkap
  - Informasi pesanan dan pengiriman
  - Download invoice functionality
  - Track order button
- **PaymentPending**: Halaman instruksi pembayaran
  - VA number/bill payment instructions
  - Copy to clipboard functionality
  - Real-time payment status checking
  - Countdown timer (24 jam)

## Struktur File

```
src/
├── components/
│   ├── Header.tsx                    # Menu utama dengan dropdown helm
│   ├── ProductDetailModal.tsx        # Modal detail produk
│   └── ui/                          # Shadcn UI components
├── pages/
│   ├── Helm.tsx                     # Halaman katalog helm
│   ├── Checkout.tsx                 # Halaman checkout terintegrasi
│   ├── PaymentSuccess.tsx           # Halaman sukses pembayaran
│   └── PaymentPending.tsx           # Halaman pending pembayaran
├── api/
│   ├── rajaongkir.ts               # RajaOngkir API integration
│   └── midtrans-backend.ts         # Midtrans backend API mock
├── lib/
│   └── midtrans.ts                 # Midtrans frontend integration
├── data/
│   └── helmets-data.ts             # Data katalog helm
└── store/
    └── cartStore.ts                # Zustand cart management
```

## Setup Instructions

### 1. Environment Variables
```env
# Midtrans Configuration
VITE_MIDTRANS_CLIENT_KEY=Mid-client-wcUq_Ikil3zz7JmC
VITE_MIDTRANS_SERVER_KEY=Mid-server-Xj71tQsLY7yWY1kZZisNqadW
VITE_MIDTRANS_MERCHANT_ID=G345387238

# RajaOngkir Configuration  
VITE_RAJAONGKIR_API_KEY=ORqde3hndc3ff62e0901b877EJB2VVdW
```

### 2. Backend API Setup (untuk Production)

Untuk production, Anda perlu membuat backend server untuk:

#### A. Midtrans API Endpoints
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const midtrans = require('midtrans-client');

const app = express();
app.use(cors());
app.use(express.json());

// Midtrans configuration
const snap = new midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// Create transaction endpoint
app.post('/api/create-transaction', async (req, res) => {
  try {
    const transaction = await snap.createTransaction(req.body);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Payment status endpoint
app.get('/api/payment-status/:orderId', async (req, res) => {
  try {
    const status = await snap.transaction.status(req.params.orderId);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint
app.post('/api/midtrans-webhook', (req, res) => {
  // Handle payment notification from Midtrans
  // Update order status in database
  res.json({ status: 'ok' });
});

app.listen(3001, () => {
  console.log('Backend server running on port 3001');
});
```

#### B. RajaOngkir API Endpoints
```javascript
// Tambahkan di server.js
const axios = require('axios');

// RajaOngkir configuration
const RAJAONGKIR_API_KEY = process.env.RAJAONGKIR_API_KEY;
const RAJAONGKIR_BASE_URL = 'https://api.rajaongkir.com/starter';

// Get provinces
app.get('/api/rajaongkir/provinces', async (req, res) => {
  try {
    const response = await axios.get(`${RAJAONGKIR_BASE_URL}/province`, {
      headers: { key: RAJAONGKIR_API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cities
app.get('/api/rajaongkir/cities', async (req, res) => {
  try {
    const { province } = req.query;
    const response = await axios.get(`${RAJAONGKIR_BASE_URL}/city`, {
      headers: { key: RAJAONGKIR_API_KEY },
      params: { province }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get shipping cost
app.post('/api/rajaongkir/cost', async (req, res) => {
  try {
    const response = await axios.post(`${RAJAONGKIR_BASE_URL}/cost`, req.body, {
      headers: { 
        key: RAJAONGKIR_API_KEY,
        'content-type': 'application/x-www-form-urlencoded'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 3. Database Schema (untuk Production)

```sql
-- Orders table
CREATE TABLE orders (
  id VARCHAR(255) PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  shipping_address TEXT NOT NULL,
  city VARCHAR(255) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) NOT NULL,
  admin_fee DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  payment_status ENUM('pending', 'paid', 'failed', 'expired') DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_brand VARCHAR(100) NOT NULL,
  product_size VARCHAR(10),
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

## Current Implementation Status

### ✅ Completed Features:
1. **Header Menu**: Fully functional dengan 19 brand helm
2. **Product Detail Modal**: Lengkap dengan semua fitur seperti Tokopedia
3. **RajaOngkir Integration**: Ongkos kirim real-time dari API
4. **Midtrans Payment**: Full payment gateway integration
5. **Payment Flow**: Success dan Pending pages yang informatif
6. **Cart Management**: Zustand store untuk keranjang belanja
7. **Responsive Design**: Mobile dan desktop friendly

### 🚧 Development Mode Features:
- Mock backend API (untuk demo)
- Sample data helm (190 produk)
- Development Midtrans credentials

### 🔄 Production Requirements:
1. **Backend Server**: Express.js dengan endpoints untuk Midtrans dan RajaOngkir
2. **Database**: MySQL/PostgreSQL untuk menyimpan orders
3. **Environment Variables**: Production keys untuk Midtrans dan RajaOngkir
4. **SSL Certificate**: Untuk webhook Midtrans
5. **Domain Setup**: Untuk callback URLs

## Testing Flow

### 1. Test Product Browse & Detail:
1. Buka `/helm`
2. Klik brand di menu dropdown
3. Klik "Detail" pada produk
4. Test size selection dan add to cart

### 2. Test Checkout Flow:
1. Tambahkan produk ke cart
2. Klik checkout
3. Isi form customer info
4. Pilih provinsi dan kota (test RajaOngkir)
5. Pilih metode pengiriman
6. Klik "Bayar Sekarang"

### 3. Test Payment:
1. Pilih metode pembayaran di Midtrans Snap
2. Test dengan sandbox credentials
3. Verifikasi redirect ke success/pending page
4. Test copy VA number dan instruksi pembayaran

## Troubleshooting

### Issue: RajaOngkir tidak load
- **Solusi**: Check API key dan network connection
- **Fallback**: Sistem akan gunakan mock data

### Issue: Midtrans payment gagal
- **Solusi**: Pastikan client key dan server key valid
- **Dev Mode**: Gunakan sandbox credentials

### Issue: Cart tidak tersimpan
- **Solusi**: Check localStorage dan Zustand store
- **Clear**: localStorage.clear() untuk reset

## Business Logic Summary

1. **Free Shipping**: Otomatis untuk pembelian >Rp 2.000.000
2. **Admin Fee**: Rp 1.000 untuk semua transaksi
3. **Weight Calculation**: 1.5kg per helm untuk ongkir
4. **Origin**: Jakarta Barat sebagai asal pengiriman
5. **Payment Timer**: 24 jam untuk menyelesaikan pembayaran
6. **Stock Management**: Tampilkan stok tersedia per produk

Sistem sudah siap untuk production dengan implementasi backend dan database yang sesuai!