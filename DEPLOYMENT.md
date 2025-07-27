# Deployment Guide - Hideki Helmet Store

## Production Setup

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Midtrans Configuration (Production)
VITE_MIDTRANS_CLIENT_KEY=Mid-client-wcUq_Ikil3zz7JmC
MIDTRANS_SERVER_KEY=Mid-server-Xj71tQsLY7yWY1kZZisNqadW
VITE_MIDTRANS_MERCHANT_ID=G345387238
VITE_MIDTRANS_IS_PRODUCTION=true

# RajaOngkir Configuration
VITE_RAJAONGKIR_API_KEY=ORqde3hndc3ff62e0901b877EJB2VVdW

# Application Configuration
VITE_APP_URL=https://your-production-domain.com
VITE_APP_NAME=Hideki Helmet Store
```

### 2. API Configuration

#### Midtrans Setup
- **Account**: Production Midtrans account is configured
- **Client Key**: `Mid-client-wcUq_Ikil3zz7JmC`
- **Server Key**: `Mid-server-Xj71tQsLY7yWY1kZZisNqadW`
- **Merchant ID**: `G345387238`

#### RajaOngkir Setup
- **API Key**: `ORqde3hndc3ff62e0901b877EJB2VVdW`
- **Coverage**: All Indonesia (provinces, cities/regencies)
- **Couriers**: JNE, POS, TIKI, SiCepat, J&T, Ninja, AnterAja

### 3. Build and Deploy

#### Development
```bash
npm install
npm run dev
```

#### Production Build
```bash
npm install
npm run build
npm run preview
```

#### Deploy to Vercel/Netlify
1. Connect your repository to Vercel/Netlify
2. Add environment variables in the dashboard
3. Deploy from main branch

### 4. Payment Flow

#### Customer Journey
1. **Browse Products**: Customer browses helmet catalog
2. **Product Details**: Click product to view detailed information
3. **Add to Cart**: Add products with selected size and quantity
4. **Checkout Form**: Fill customer information and shipping address
5. **Shipping Selection**: Choose shipping method and cost
6. **Payment**: Pay using Midtrans payment gateway
7. **Confirmation**: Receive payment confirmation

#### Payment Gateway Features
- Multiple payment methods (Credit Card, Bank Transfer, E-wallets)
- Real-time payment status
- Automatic redirects
- Secure transaction processing

### 5. Shipping Integration

#### Coverage
- **All Indonesia**: 34 provinces covered
- **Cities/Regencies**: Complete coverage
- **Real-time Costs**: API-based shipping calculations
- **Multiple Couriers**: 7+ courier options

#### Features
- Free shipping for orders > Rp 2,000,000
- Real-time shipping cost calculation
- Estimated delivery time
- Courier tracking integration

### 6. Security Considerations

#### API Keys
- Store sensitive keys in environment variables
- Never commit API keys to repository
- Use different keys for development/production

#### CORS Setup
```javascript
// Add to your backend if needed
app.use(cors({
  origin: ['https://your-domain.com', 'http://localhost:5173'],
  credentials: true
}));
```

### 7. Performance Optimization

#### Build Optimization
- Code splitting enabled
- Asset optimization
- Tree shaking
- Lazy loading for routes

#### CDN Setup
- Configure CDN for static assets
- Enable Gzip compression
- Optimize images

### 8. Monitoring and Analytics

#### Error Tracking
- Monitor payment failures
- Track API errors
- Log shipping calculation errors

#### Performance Monitoring
- Page load times
- API response times
- User journey analytics

### 9. Backup and Recovery

#### Data Backup
- Order data
- Customer information
- Payment records

#### Recovery Plan
- Database restoration
- API failover
- Emergency contact procedures

### 10. Testing

#### Pre-deployment Checklist
- [ ] Payment gateway working
- [ ] Shipping calculations accurate
- [ ] Product details displaying correctly
- [ ] Form validation working
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

#### Payment Testing
```javascript
// Test different payment scenarios
- Credit card payments
- Bank transfer
- E-wallet payments
- Failed payments
- Pending payments
```

### 11. Go-Live Steps

1. **Final Testing**: Complete end-to-end testing
2. **Environment Switch**: Set `VITE_MIDTRANS_IS_PRODUCTION=true`
3. **DNS Configuration**: Point domain to production
4. **SSL Certificate**: Ensure HTTPS is enabled
5. **Webhook Setup**: Configure Midtrans webhooks
6. **Monitoring**: Enable all monitoring tools
7. **Announcement**: Notify stakeholders

### 12. Post-Deployment

#### Monitor First 24 Hours
- Payment success rate
- Shipping calculations
- User feedback
- Error rates

#### Support
- Customer service team briefed
- Technical support on standby
- Issue escalation procedures

---

## Troubleshooting

### Common Issues

#### Payment Not Working
- Check Midtrans credentials
- Verify production mode setting
- Check API key permissions

#### Shipping Costs Not Showing
- Verify RajaOngkir API key
- Check city/province selection
- Validate API response

#### Product Details Not Showing
- Check product data integrity
- Verify image URLs
- Check modal component

### Support Contacts
- **Technical**: tech-support@hideki.id
- **Payment**: payment-support@hideki.id
- **General**: support@hideki.id