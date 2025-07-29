# Hideki Helmets E-commerce Application

A modern React-based e-commerce application for helmet sales, inspired by RSV Helmets design, featuring comprehensive authentication, product catalog, shipping integration, and payment processing.

## 🚀 Features

### 🔐 Authentication System
- **Dual Login System**: Separate login for customers and admins (similar to RSV Helmets)
- **User Registration**: Complete user registration with profile management
- **Role-based Access**: Different interfaces for customers and administrators
- **Persistent Sessions**: Auto-login with secure session management

**Demo Credentials:**
- **Customer**: `user@example.com` / `user123`
- **Admin**: `admin@hideki.id` / `admin123`

### 🏍️ Product Catalog
- **Complete Helmet Database**: 19+ helmet brands with detailed specifications
- **Brand Filtering**: All specified brands including KYT, ARRAY, MLA, ALV, JS, NIELS, VRC, RSV, INK, NHK, MDS, ZEUS, BMC, GM, AGV, Arai, Shoei, HIU, Bogo
- **Advanced Search**: Filter by brand, price range, category, and specifications
- **Product Details**: Comprehensive product information with multiple images, specifications, and reviews
- **Responsive Design**: Optimized for all device sizes

### 🛒 Shopping Cart & Checkout
- **Persistent Cart**: Items saved across sessions
- **Quantity Management**: Easy quantity updates and item removal
- **Real-time Calculations**: Dynamic pricing with shipping and fees
- **Guest Checkout**: Purchase without account registration

### 🚚 Shipping Integration (Raja Ongkir API)
- **Real-time Shipping Costs**: Integration with Raja Ongkir API using hideki.id tokens
- **Multiple Couriers**: JNE, POS Indonesia, TIKI support
- **Automatic Selection**: Cheapest shipping option auto-selected
- **Province & City Selection**: Complete Indonesian address system
- **Weight Calculation**: Accurate shipping cost based on product weight

### 💳 Payment Processing (Midtrans Snap)
- **Secure Payments**: Midtrans Snap integration with hideki.id API keys
- **Multiple Payment Methods**: 
  - Credit/Debit Cards
  - Bank Transfer (BCA, BNI, BRI, Permata)
  - E-wallets (GoPay, ShopeePay)
  - QRIS
  - Convenience Stores (Indomaret, Alfamart)
  - Installments (Akulaku)
- **Real-time Status**: Payment status tracking and notifications
- **Secure Processing**: PCI-compliant payment handling

### 🎨 UI/UX Design
- **RSV Helmets Inspired**: Modern, professional design similar to RSV Helmets
- **Dark Theme**: Sleek dark interface with red accent colors
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: Enhanced user experience with transitions
- **Accessible Design**: WCAG compliant interface elements

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality UI components
- **Zustand**: Lightweight state management
- **React Router**: Client-side routing
- **React Query**: Server state management

### APIs & Services
- **Raja Ongkir**: Shipping cost calculation
- **Midtrans Snap**: Payment processing
- **Custom APIs**: Product management and order processing

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Raja Ongkir API key (hideki.id)
- Midtrans API keys (hideki.id)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hideki-helmets
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Keys**
   
   Update the following files with your hideki.id API keys:
   
   **src/api/rajaOngkir.ts:**
   ```typescript
   const RAJA_ONGKIR_API_KEY = 'your-hideki-raja-ongkir-api-key';
   ```
   
   **src/api/midtrans.ts:**
   ```typescript
   const MIDTRANS_SERVER_KEY = 'your-hideki-midtrans-server-key';
   const MIDTRANS_CLIENT_KEY = 'your-hideki-midtrans-client-key';
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Application Structure

```
src/
├── api/                    # API integrations
│   ├── midtrans.ts        # Midtrans payment integration
│   └── rajaOngkir.ts      # Raja Ongkir shipping integration
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   ├── Header.tsx        # Main navigation with auth
│   ├── Footer.tsx        # Site footer
│   └── ProductDetailModal.tsx
├── data/                 # Static data and configurations
│   └── helmets-data.ts   # Complete helmet catalog
├── pages/                # Application pages
│   ├── Index.tsx         # Homepage
│   ├── Helm.tsx          # Helmet catalog
│   ├── Login.tsx         # Authentication
│   ├── Register.tsx      # User registration
│   └── Checkout.tsx      # Checkout process
├── store/                # State management
│   ├── authStore.ts      # Authentication state
│   └── cartStore.ts      # Shopping cart state
└── hooks/                # Custom React hooks
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Raja Ongkir Configuration
VITE_RAJA_ONGKIR_API_KEY=your-hideki-raja-ongkir-key
VITE_RAJA_ONGKIR_BASE_URL=https://api.rajaongkir.com/starter

# Midtrans Configuration  
VITE_MIDTRANS_CLIENT_KEY=your-hideki-midtrans-client-key
VITE_MIDTRANS_SERVER_KEY=your-hideki-midtrans-server-key
VITE_MIDTRANS_IS_PRODUCTION=false

# Application Configuration
VITE_APP_NAME=Hideki Helmets
VITE_APP_URL=https://hideki.id
```

### API Configuration

**Raja Ongkir Setup:**
1. Obtain API key from hideki.id
2. Configure in `src/api/rajaOngkir.ts`
3. Set default origin city (store location)

**Midtrans Setup:**
1. Get Server Key and Client Key from hideki.id
2. Configure in `src/api/midtrans.ts`
3. Set up webhook endpoints for payment notifications

## 🎯 Key Features Implementation

### Authentication Flow
```typescript
// Login with role selection
const { login } = useAuthStore();
await login(email, password, 'user' | 'admin');

// Auto-redirect based on role
if (role === 'admin') navigate('/admin/dashboard');
else navigate('/');
```

### Product Catalog
```typescript
// Brand filtering from URL params
const brandFilter = searchParams.get('brand');
const filteredProducts = helmetsData.filter(
  helmet => helmet.brand === brandFilter
);
```

### Shipping Calculation
```typescript
// Real-time shipping cost calculation
const shippingOptions = await rajaOngkirService.getShippingOptions(
  origin, destination, weight, subtotal
);
```

### Payment Processing
```typescript
// Midtrans Snap integration
const snapResponse = await createSnapTransaction({
  transaction_details: { order_id, gross_amount },
  item_details: cartItems,
  customer_details: customerInfo
});

await openSnapPayment(snapResponse.token);
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Admin login and dashboard access
- [ ] Product catalog browsing and filtering
- [ ] Product detail modal functionality
- [ ] Shopping cart operations
- [ ] Shipping cost calculation
- [ ] Checkout process completion
- [ ] Payment processing (sandbox mode)
- [ ] Responsive design on mobile devices

### Test Accounts
Use the provided demo credentials for testing:
- **Customer Account**: Full shopping experience
- **Admin Account**: Administrative features access

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Checklist
- [ ] Update API keys to production values
- [ ] Set `VITE_MIDTRANS_IS_PRODUCTION=true`
- [ ] Configure production domain in Midtrans
- [ ] Set up SSL certificate
- [ ] Configure CDN for static assets
- [ ] Set up monitoring and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@hideki.id
- Documentation: [Project Wiki]
- Issues: [GitHub Issues]

## 🙏 Acknowledgments

- **RSV Helmets**: UI/UX design inspiration
- **Raja Ongkir**: Shipping cost calculation service
- **Midtrans**: Payment processing platform
- **Shadcn/ui**: Beautiful UI components
- **Tailwind CSS**: Utility-first CSS framework

---

**Built with ❤️ for the Indonesian motorcycle community**
