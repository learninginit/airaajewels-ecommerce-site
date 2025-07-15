# Airaa Jewels - Premium Jewelry Ecommerce Platform

A modern, production-ready ecommerce platform for premium jewelry with buy and rent options.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse jewelry by categories with advanced filtering
- **Buy & Rent Options**: Purchase or rent jewelry for special occasions
- **User Authentication**: Secure sign-in/sign-up with persistent sessions
- **Shopping Cart**: Add items, manage quantities, apply promo codes
- **Wishlist**: Save favorite items for later
- **User Profile**: Manage personal information, addresses, and preferences
- **Order Management**: Track orders, view history, download invoices
- **Rental Management**: Track active rentals, extend periods, manage returns
- **Search**: Advanced search by name, product code, or category
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Admin Features
- **Inventory Management**: Add, edit, and manage products
- **Order Processing**: View and manage customer orders
- **Rental Tracking**: Monitor active rentals and returns
- **Analytics Dashboard**: Sales metrics and performance insights
- **Product Status**: Control product visibility and availability

### Technical Features
- **State Management**: Zustand for client-side state persistence
- **Authentication**: Secure user sessions with local storage
- **Payment Integration**: Razorpay payment gateway ready
- **SEO Optimized**: Meta tags, sitemap, robots.txt
- **Performance**: Optimized images, lazy loading, caching
- **Accessibility**: WCAG compliant with screen reader support

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand
- **Icons**: Lucide React
- **Payment**: Razorpay
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/airaa-jewels-ecommerce.git
   cd airaa-jewels-ecommerce
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your environment variables:
   \`\`\`env
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   NEXT_PUBLIC_SITE_URL=https://airaajewels.com
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   \`\`\`bash
   npm i -g vercel
   vercel
   \`\`\`

2. **Set environment variables in Vercel dashboard**
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `NEXT_PUBLIC_SITE_URL`

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Manual Deployment

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start production server**
   \`\`\`bash
   npm start
   \`\`\`

## 🧪 Testing

### Run Tests
\`\`\`bash
npm test
\`\`\`

### Run Tests in Watch Mode
\`\`\`bash
npm run test:watch
\`\`\`

### Generate Coverage Report
\`\`\`bash
npm run test:coverage
\`\`\`

## 📁 Project Structure

\`\`\`
airaa-jewels-ecommerce/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── products/          # Product pages
│   ├── profile/           # User profile
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── auth/              # Authentication components
│   ├── admin/             # Admin components
│   └── profile/           # Profile components
├── lib/                   # Utilities and configurations
│   ├── store.ts           # Zustand store
│   └── utils.ts           # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
\`\`\`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RAZORPAY_KEY_ID` | Razorpay public key | Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO | Yes |

### Admin Access

For admin features, use the separate admin subdomain:
- Production: `https://admin.airaajewels.com`
- Development: Access via user menu when signed in

## 📱 Mobile Optimization

The application is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🔒 Security Features

- **Authentication**: Secure user sessions
- **Data Validation**: Input sanitization and validation
- **HTTPS**: SSL/TLS encryption
- **Payment Security**: PCI DSS compliant payment processing
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Built-in Next.js protection

## 🎨 Customization

### Brand Colors
Update colors in `tailwind.config.ts`:
\`\`\`javascript
colors: {
  primary: {
    50: '#fefce8',
    500: '#eab308',
    600: '#ca8a04',
  }
}
\`\`\`

### Logo
Replace logo in `components/header.tsx` and add your logo files to `public/`

## 📊 Analytics

The platform is ready for analytics integration:
- Google Analytics 4
- Facebook Pixel
- Custom event tracking
- Conversion tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@airaajewels.com
- Documentation: [docs.airaajewels.com](https://docs.airaajewels.com)
- Issues: [GitHub Issues](https://github.com/yourusername/airaa-jewels-ecommerce/issues)

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Virtual try-on feature
- [ ] Subscription service
- [ ] Loyalty program
- [ ] Social media integration

---

Made with ❤️ for Airaa Jewels
\`\`\`
