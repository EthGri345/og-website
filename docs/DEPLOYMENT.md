# Deployment Guide

## Pre-Deployment Checklist

### Required Configuration

- [ ] Logo file added to `/public/logo.png`
- [ ] Contract address updated in `/app/page.tsx:11`
- [ ] Telegram link updated in `/app/page.tsx:13`
- [ ] Package dependencies installed (`npm install`)
- [ ] Build test successful (`npm run build`)
- [ ] Type check passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)

### Optional Configuration

- [ ] Custom domain configured
- [ ] Analytics tracking added
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Environment variables configured
- [ ] Social media meta images

## Deployment Options

## Option 1: Vercel (Recommended)

### Why Vercel?
- **Zero Configuration**: Automatic Next.js optimization
- **Global CDN**: Fast worldwide delivery
- **Automatic HTTPS**: SSL certificates included
- **Preview Deployments**: Every push gets a URL
- **Analytics**: Built-in performance monitoring

### Deployment Steps

#### Initial Setup

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

#### Configuration

Vercel auto-detects Next.js projects. No configuration needed!

**Optional Settings**:
- **Custom Domain**: Settings → Domains → Add
- **Environment Variables**: Settings → Environment Variables
- **Analytics**: Settings → Analytics → Enable

#### Updates

Every push to main automatically deploys:
```bash
git push origin main
# ✓ Automatic deployment triggered
```

### Custom Domain Setup

1. **Add Domain in Vercel**
   - Settings → Domains
   - Add your domain (e.g., onlygoon.com)

2. **Update DNS Records**
   ```
   Type: CNAME
   Name: @ (or www)
   Value: cname.vercel-dns.com
   ```

3. **Wait for Propagation** (5-30 minutes)

## Option 2: Netlify

### Deployment Steps

1. **Push to GitHub** (if not already done)

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site"
   - Choose "Import an existing project"
   - Select GitHub repository

3. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

### Custom Domain
- Site settings → Domain management → Add custom domain

## Option 3: Self-Hosted (VPS/Cloud)

### Prerequisites
- Node.js 18+ installed
- PM2 or similar process manager
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt)

### Deployment Steps

1. **Build the Application**
   ```bash
   npm install
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   # or with PM2
   pm2 start npm --name "onlygoon" -- start
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Setup SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

## Option 4: Docker

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t onlygoon-website .

# Run container
docker run -p 3000:3000 onlygoon-website

# Or with docker-compose
docker-compose up -d
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## Environment Variables

### Configuration

Create `.env.local` for local development:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=your_address
NEXT_PUBLIC_TELEGRAM_LINK=https://t.me/your_group
NEXT_PUBLIC_GA_ID=your_analytics_id
```

### Platform-Specific Setup

**Vercel**:
- Settings → Environment Variables → Add

**Netlify**:
- Site settings → Environment variables → Add

**Self-Hosted**:
- Create `.env.production` file
- Never commit to version control

## Post-Deployment Verification

### 1. Functionality Check
- [ ] Website loads correctly
- [ ] Logo displays properly
- [ ] Lock screen animates smoothly
- [ ] Unlock button works
- [ ] Telegram link opens correctly
- [ ] Contract address copies to clipboard
- [ ] $OG ticker displays
- [ ] Mobile responsive (test on real device)

### 2. Performance Check
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] No console errors

### 3. SEO Check
- [ ] Meta tags present
- [ ] OpenGraph tags correct
- [ ] Twitter cards work
- [ ] Sitemap accessible

## Monitoring & Maintenance

### Performance Monitoring

**Vercel Analytics** (if using Vercel):
- Automatic Web Vitals tracking
- Real user monitoring
- Performance insights

**Google Lighthouse**:
```bash
npm install -g lighthouse
lighthouse https://yourdomain.com
```

### Error Tracking

**Recommended: Sentry**

1. Install Sentry:
   ```bash
   npm install @sentry/nextjs
   ```

2. Configure:
   ```bash
   npx @sentry/wizard -i nextjs
   ```

3. Add DSN to environment variables

### Uptime Monitoring

**Free Options**:
- UptimeRobot
- Pingdom
- StatusCake

### Backup Strategy

**Version Control**: Git (primary backup)
**Database**: Not applicable (static site)
**Assets**: Store logo in multiple locations

## CI/CD Pipeline

### GitHub Actions Example

`.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Rollback Procedures

### Vercel
- Deployments → Previous deployment → Promote to Production

### Netlify
- Deploys → Previous deploy → Publish deploy

### Self-Hosted
```bash
git checkout previous-commit-hash
npm run build
pm2 restart onlygoon
```

### Docker
```bash
docker pull onlygoon-website:previous-tag
docker-compose up -d
```

## Scaling Considerations

### Traffic Scaling

**Vercel/Netlify**: Automatic scaling included

**Self-Hosted**:
- Load balancer (Nginx/HAProxy)
- Multiple server instances
- CDN for static assets (CloudFlare)

### Geographic Distribution

**Use CDN**:
- CloudFlare
- Fastly
- AWS CloudFront

## Security Hardening

### HTTPS
- Required in production
- Automatic with Vercel/Netlify
- Let's Encrypt for self-hosted

### Security Headers

Add to `next.config.ts`:
```typescript
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
];
```

### Rate Limiting

Consider Cloudflare for:
- DDoS protection
- Rate limiting
- Bot mitigation

## Cost Estimates

### Vercel
- **Hobby Plan**: Free (suitable for most projects)
- **Pro Plan**: $20/month (unlimited bandwidth)

### Netlify
- **Starter**: Free (100GB bandwidth)
- **Pro**: $19/month (1TB bandwidth)

### Self-Hosted (AWS/DigitalOcean)
- **Basic VPS**: $5-10/month
- **SSL**: Free (Let's Encrypt)
- **Domain**: $10-15/year

## Troubleshooting

### Build Fails

**Type Errors**:
```bash
npm run type-check
# Fix reported errors
```

**Missing Dependencies**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Runtime Errors

**Check Logs**:
- Vercel: Deployments → Function Logs
- Netlify: Deploys → Function logs
- Self-hosted: `pm2 logs`

### Performance Issues

**Check Bundle Size**:
```bash
npm run build
# Check .next/static/* size
```

**Optimize Images**:
- Ensure logo is optimized
- Use WebP format if possible
- Compress with TinyPNG

---

**Need Help?** Check the [Next.js Deployment docs](https://nextjs.org/docs/deployment) or [contact support](mailto:support@onlygoon.com).
