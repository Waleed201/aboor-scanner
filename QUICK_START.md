# Quick Start Guide - Aboor Scanner

Get the Aboor Scanner up and running in minutes!

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
cd aboor-scanner
npm install
```

### Step 2: Configure Backend URL

Edit `.env` file:
```bash
REACT_APP_API_URL=http://localhost:5001
```

Or use the default (already set).

### Step 3: Run the App

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

---

## 📱 Using the Scanner

### Method 1: Camera Scanning (Default)

1. **Allow camera permissions** when prompted
2. **Point camera** at the QR code
3. **Hold steady** for 1-2 seconds
4. **Wait for automatic detection**

### Method 2: Manual Input

1. Click **"⌨️ إدخال يدوي"** button
2. **Type or paste** the QR code
3. Click **"✅ تحقق من الرمز"**

---

## 🔄 Verification Flow

```
1. Scan QR Code 1 
   ↓
2. Backend switches QR
   ↓
3. Wait 3 seconds
   ↓
4. User refreshes ticket app
   ↓
5. Scan new QR Code 2
   ↓
6. Entry granted/denied
```

---

## 🐳 Docker Quick Start

### Using Docker Compose (Easiest)

```bash
# Start
docker-compose up -d

# Access at http://localhost:3001
```

### Using Docker Directly

```bash
# Build
docker build -t aboor-scanner .

# Run
docker run -p 3001:80 aboor-scanner
```

---

## 🛠️ Common Issues

### Issue: Camera not working
**Fix:** 
- Use HTTPS (required for camera access)
- Check browser permissions
- Try manual input as fallback

### Issue: Can't connect to backend
**Fix:**
- Ensure backend is running on port 5001
- Check `.env` file has correct URL
- Verify CORS is enabled on backend

### Issue: QR not scanning
**Fix:**
- Improve lighting
- Hold phone steady
- Get closer (15-30cm)
- Use manual input

---

## 📋 Pre-flight Checklist

Before using the scanner:

- [ ] Backend API is running
- [ ] Camera permissions granted
- [ ] Good lighting conditions
- [ ] HTTPS enabled (for production)
- [ ] Test QR codes ready

---

## 🔧 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (advanced)
npm run eject
```

---

## 📦 What's Included

- ✅ QR code camera scanner
- ✅ Manual input fallback
- ✅ Step-by-step UI
- ✅ Real-time verification
- ✅ Anti-screenshot detection
- ✅ Arabic RTL support
- ✅ Responsive design
- ✅ Production-ready

---

## 🌐 Production Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=build
```

### Docker
```bash
docker-compose up -d
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guides.

---

## 📞 Need Help?

1. Check [README.md](./README.md) for full documentation
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment options
3. Ensure backend API is accessible
4. Check browser console for errors

---

## 🎯 Test the Scanner

### With Backend Running:

1. **Start backend** (in another terminal):
   ```bash
   cd ../aboor-backend
   npm start
   ```

2. **Start scanner**:
   ```bash
   cd aboor-scanner
   npm start
   ```

3. **Test with a real ticket**:
   - Login to Aboor app
   - View a ticket
   - Scan the QR code

### Without Backend (Test UI Only):

You can test the UI components without the backend, but verification won't work.

---

**Ready to scan! 🎫✨**

Visit [http://localhost:3000](http://localhost:3000) to get started.
