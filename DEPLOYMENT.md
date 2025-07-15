# Deployment Guide - Airaa Jewels Ecommerce

## 🚀 Deployment Options

This guide covers multiple deployment strategies for the Airaa Jewels ecommerce platform.

## 🎯 Recommended: Vercel Deployment

### Prerequisites
- GitHub account
- Vercel account
- Domain name (optional)

### Step 1: Prepare Repository
\`\`\`bash
# Clone and prepare the repository
git clone https://github.com/yourusername/airaa-jewels-ecommerce.git
cd airaa-jewels-ecommerce

# Install dependencies
npm install

# Test build locally
npm run build
\`\`\`

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
\`\`\`

#### Option B: GitHub Integration
1. Push code to GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings (auto-detected)
6. Deploy

### Step 3: Environment Variables
In Vercel dashboard, add these environment variables:

\`\`\`env
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
\`\`\`

### Step 4: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning

## 🐳 Docker Deployment

### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
\`\`\`

### Docker Compose
\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - RAZORPAY_KEY_ID=${RAZORPAY_KEY_ID}
      - RAZORPAY_KEY_SECRET=${RAZORPAY_KEY_SECRET}
      - NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
\`\`\`

### Deploy with Docker
\`\`\`bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
\`\`\`

## ☁️ AWS Deployment

### Using AWS Amplify

#### Step 1: Install Amplify CLI
\`\`\`bash
npm install -g @aws-amplify/cli
amplify configure
\`\`\`

#### Step 2: Initialize Amplify
\`\`\`bash
amplify init
\`\`\`

#### Step 3: Add Hosting
\`\`\`bash
amplify add hosting
# Choose: Amazon CloudFront and S3
\`\`\`

#### Step 4: Deploy
\`\`\`bash
amplify publish
\`\`\`

### Using EC2 with PM2

#### Step 1: Launch EC2 Instance
- Choose Ubuntu 22.04 LTS
- Select t3.medium or larger
- Configure security groups (HTTP, HTTPS, SSH)

#### Step 2: Setup Server
\`\`\`bash
# Connect to EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
\`\`\`

#### Step 3: Deploy Application
\`\`\`bash
# Clone repository
git clone https://github.com/yourusername/airaa-jewels-ecommerce.git
cd airaa-jewels-ecommerce

# Install dependencies
npm install

# Build application
npm run build

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'airaa-jewels',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      RAZORPAY_KEY_ID: 'your_key_id',
      RAZORPAY_KEY_SECRET: 'your_secret_key',
      NEXT_PUBLIC_SITE_URL: 'https://your-domain.com'
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
\`\`\`

#### Step 4: Configure Nginx
\`\`\`nginx
# /etc/nginx/sites-available/airaa-jewels
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

\`\`\`bash
# Enable site
sudo ln -s /etc/nginx/sites-available/airaa-jewels /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
\`\`\`

## 🌐 Netlify Deployment

### Step 1: Build Configuration
Create `netlify.toml`:
\`\`\`toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
\`\`\`

### Step 2: Deploy
1. Connect GitHub repository to Netlify
2. Configure build settings
3. Add environment variables
4. Deploy

## 📊 Performance Optimization

### Next.js Configuration
\`\`\`javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
}

module.exports = nextConfig
\`\`\`

### CDN Configuration
\`\`\`javascript
// For static assets
const CDN_URL = process.env.CDN_URL || ''

export const getAssetUrl = (path) => {
  return CDN_URL ? \`\${CDN_URL}\${path}\` : path
}
\`\`\`

## 🔒 Security Configuration

### Environment Variables
\`\`\`env
# Production Environment Variables
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://airaajewels.com

# Payment Gateway
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_live_secret_key

# Security
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://airaajewels.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
\`\`\`

### Security Headers
\`\`\`javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
\`\`\`

## 📈 Monitoring Setup

### Error Tracking
\`\`\`bash
# Install Sentry
npm install @sentry/nextjs

# Configure Sentry
npx @sentry/wizard -i nextjs
\`\`\`

### Analytics
\`\`\`javascript
// Google Analytics 4
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
\`\`\`

### Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake
- AWS CloudWatch

## 🔄 CI/CD Pipeline

### GitHub Actions
\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

## 🚨 Rollback Strategy

### Vercel Rollback
\`\`\`bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
\`\`\`

### Docker Rollback
\`\`\`bash
# Tag current version
docker tag airaa-jewels:latest airaa-jewels:backup

# Rollback to previous version
docker-compose down
docker-compose up -d
\`\`\`

## 📋 Post-Deployment Checklist

### Immediate Checks (5 minutes)
- [ ] Site loads correctly
- [ ] SSL certificate is active
- [ ] All pages are accessible
- [ ] Forms are working
- [ ] Payment gateway is functional

### Comprehensive Testing (30 minutes)
- [ ] User registration/login
- [ ] Product catalog browsing
- [ ] Add to cart functionality
- [ ] Checkout process
- [ ] Admin dashboard access
- [ ] Mobile responsiveness
- [ ] Performance metrics

### Monitoring Setup
- [ ] Error tracking configured
- [ ] Analytics tracking active
- [ ] Uptime monitoring enabled
- [ ] Performance monitoring setup
- [ ] Backup systems verified

---

This deployment guide ensures a smooth and secure launch of the Airaa Jewels ecommerce platform across multiple hosting providers.
\`\`\`
