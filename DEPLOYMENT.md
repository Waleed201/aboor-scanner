# Aboor Scanner - Deployment Guide

Complete guide for deploying the Aboor Scanner application to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] Backend API is deployed and accessible
- [ ] Environment variables are configured
- [ ] Application tested locally
- [ ] Production build tested
- [ ] HTTPS enabled (required for camera access)
- [ ] CORS configured on backend

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Advantages:**
- Automatic HTTPS
- Fast global CDN
- Easy environment variable management
- Automatic deployments from Git
- Free tier available

**Steps:**

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd aboor-scanner
   vercel
   ```

4. **Set Environment Variables** (in Vercel dashboard):
   - Go to Project Settings > Environment Variables
   - Add: `REACT_APP_API_URL` = `your-backend-url`

5. **Redeploy**:
   ```bash
   vercel --prod
   ```

**Automatic Deployment from GitHub:**
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables
4. Auto-deploy on every push

---

### Option 2: Netlify

**Advantages:**
- Simple deployment
- Great for React apps
- Free SSL
- Form handling (if needed)

**Steps:**

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the app**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=build
   ```

4. **Set Environment Variables**:
   ```bash
   netlify env:set REACT_APP_API_URL "your-backend-url"
   ```

**Or use the Netlify Dashboard:**
1. Drag and drop the `build` folder
2. Configure environment variables in Site Settings

---

### Option 3: AWS S3 + CloudFront

**Advantages:**
- Highly scalable
- Low cost
- Full AWS integration

**Steps:**

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://aboor-scanner
   aws s3 website s3://aboor-scanner --index-document index.html
   ```

3. **Upload build files**:
   ```bash
   aws s3 sync build/ s3://aboor-scanner
   ```

4. **Configure CloudFront** (optional but recommended):
   - Create CloudFront distribution
   - Point to S3 bucket
   - Enable HTTPS
   - Set error page to index.html (for SPA routing)

---

### Option 4: Firebase Hosting

**Advantages:**
- Easy integration with Firebase services
- Fast CDN
- Free tier available

**Steps:**

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```
   - Choose: `build` as public directory
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. **Build and deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

---

### Option 5: Docker + Any Cloud Provider

**Advantages:**
- Portable
- Consistent environments
- Works on any cloud provider

**Dockerfile:**

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration (if needed)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

**Build and Deploy:**

```bash
# Build image
docker build -t aboor-scanner:latest .

# Test locally
docker run -p 8080:80 aboor-scanner:latest

# Tag for registry
docker tag aboor-scanner:latest your-registry/aboor-scanner:latest

# Push to registry
docker push your-registry/aboor-scanner:latest

# Deploy to cloud (example with Docker on AWS ECS, GCP, Azure, etc.)
```

---

### Option 6: Traditional Web Server (Apache/Nginx)

**Steps:**

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Copy to server**:
   ```bash
   scp -r build/* user@server:/var/www/aboor-scanner
   ```

3. **Configure Nginx**:
   ```nginx
   server {
       listen 80;
       server_name scanner.aboor.sa;
       root /var/www/aboor-scanner;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # SSL configuration (recommended)
       listen 443 ssl;
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
   }
   ```

4. **Restart Nginx**:
   ```bash
   sudo systemctl restart nginx
   ```

---

## 🔒 SSL/HTTPS Configuration

**IMPORTANT:** Camera access requires HTTPS in modern browsers.

### Let's Encrypt (Free SSL)

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d scanner.aboor.sa

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 🔧 Environment Variables for Production

### Required Variables:

```bash
REACT_APP_API_URL=https://api.aboor.sa
```

### Optional Variables:

```bash
# Enable production optimizations
NODE_ENV=production

# Build-time configuration
GENERATE_SOURCEMAP=false
```

---

## 📊 Post-Deployment Testing

1. **Test Camera Access**:
   - Open app on mobile device
   - Grant camera permissions
   - Verify QR scanning works

2. **Test API Connection**:
   - Scan a test QR code
   - Verify API calls succeed
   - Check network tab for errors

3. **Test Manual Input**:
   - Try manual QR entry
   - Verify validation works

4. **Cross-Browser Testing**:
   - Test on Chrome, Safari, Firefox
   - Test on iOS and Android

5. **Performance Check**:
   - Use Lighthouse for performance audit
   - Check load times
   - Verify caching works

---

## 🚨 Common Deployment Issues

### Issue: Camera Not Working

**Solution:**
- Ensure HTTPS is enabled
- Check browser permissions
- Verify camera API is supported

### Issue: API Connection Failed

**Solution:**
- Check CORS configuration on backend
- Verify API URL is correct
- Ensure backend is accessible from client

### Issue: White Screen After Deployment

**Solution:**
- Check console for errors
- Verify build completed successfully
- Check routing configuration
- Ensure all assets are uploaded

### Issue: Environment Variables Not Working

**Solution:**
- Prefix with `REACT_APP_`
- Rebuild after changing env vars
- Check deployment platform's env var settings

---

## 📈 Monitoring and Analytics

### Recommended Tools:

1. **Sentry** - Error tracking
2. **Google Analytics** - Usage analytics
3. **LogRocket** - Session replay
4. **Hotjar** - User behavior

### Setup Example (Sentry):

```bash
npm install @sentry/react
```

```javascript
// src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
});
```

---

## 🔄 CI/CD Pipeline Example

### GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          REACT_APP_API_URL: ${{ secrets.API_URL }}
      
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📝 Deployment Checklist

- [ ] Build completes without errors
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Camera permissions work
- [ ] API connection successful
- [ ] Manual input works
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Performance optimized
- [ ] Error tracking enabled
- [ ] Monitoring configured
- [ ] Backup plan ready

---

## 🆘 Rollback Plan

If deployment fails:

1. **Vercel/Netlify**: Use dashboard to rollback to previous deployment
2. **Docker**: Redeploy previous image tag
3. **S3**: Restore from backup
4. **Manual**: Keep previous build folder as backup

---

## 📞 Support

For deployment issues:
- Check logs on your platform
- Review browser console errors
- Verify backend API is accessible
- Test with curl/Postman first

---

**Happy Deploying! 🚀**
