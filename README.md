# Aboor Scanner - QR Code Verification App

A React-based QR code scanner application for verifying Aboor tickets with anti-screenshot security.

## 🎯 Features

- **Dual QR Verification**: Two-step QR code scanning process
- **Anti-Screenshot Detection**: Detects if the same QR code is scanned twice
- **Real-time Camera Scanning**: Uses device camera for QR code scanning
- **Manual Input Option**: Fallback option for manual QR code entry
- **Step-by-Step UI**: Clear visual indicators for the verification process
- **Responsive Design**: Works on mobile and desktop devices
- **Arabic RTL Support**: Fully supports right-to-left Arabic text

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A running instance of the Aboor backend API

## 🚀 Installation

1. **Clone or navigate to the project**:
   ```bash
   cd aboor-scanner
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Update `REACT_APP_API_URL` with your backend API URL
   ```bash
   cp .env.example .env
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm start
```
- Opens at [http://localhost:3000](http://localhost:3000)
- Hot reloading enabled
- Changes reflect immediately

### Production Build
```bash
npm run build
```
- Creates optimized production build in `build/` folder
- Ready for deployment

## 📱 How to Use

### Verification Process

1. **Step 1 - Scan QR Code 1**:
   - Point camera at user's ticket QR code
   - Wait for automatic detection
   - System will verify and switch to secondary QR

2. **Step 2 - Wait**:
   - 3-second countdown
   - Backend switches the QR code
   - User refreshes their ticket app

3. **Step 3 - Scan QR Code 2**:
   - Point camera at the NEW QR code
   - System verifies it's different (anti-screenshot)
   - Grant or deny entry based on verification

### Manual Input Option

If camera scanning fails:
1. Click "⌨️ إدخال يدوي" button
2. Type or paste the QR code
3. Click "✅ تحقق من الرمز"

## 🎨 Project Structure

```
aboor-scanner/
├── public/
│   ├── index.html          # HTML template
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO configuration
├── src/
│   ├── components/
│   │   ├── QRScanner.js    # Main scanner component
│   │   ├── StatusCard.js   # Status display component
│   │   ├── TicketInfo.js   # Ticket information display
│   │   ├── StepIndicator.js # Step progress indicator
│   │   └── ConfigSection.js # API URL configuration
│   ├── services/
│   │   └── api.js          # API service layer
│   ├── App.js              # Main application component
│   ├── App.css             # Main application styles
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🔧 Configuration

### API URL Configuration

You can configure the backend API URL in two ways:

1. **Environment Variable** (Recommended for deployment):
   ```bash
   # .env file
   REACT_APP_API_URL=http://localhost:5001
   ```

2. **In-App Configuration**:
   - Use the "Backend API URL" input field in the app
   - Changes persist during the session

## 📦 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=build
   ```

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/aboor-scanner",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Deploy to Docker

1. Create `Dockerfile`:
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. Build and run:
   ```bash
   docker build -t aboor-scanner .
   docker run -p 80:80 aboor-scanner
   ```

## 🔒 Security Features

- **Dual QR Verification**: Prevents screenshot-based fraud
- **Time-Limited QR Codes**: QR codes expire after use
- **Real-time Verification**: Immediate validation with backend
- **Screenshot Detection**: Detects if the same QR is scanned twice

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **html5-qrcode**: QR code scanning library
- **Axios**: HTTP client for API calls
- **CSS3**: Modern styling with animations
- **React Scripts**: Build tooling

## 📝 API Integration

The app connects to the Aboor backend API with two endpoints:

1. **Switch QR** (`POST /api/tickets/switch-qr`):
   - Verifies first QR code
   - Switches to secondary QR
   - Returns ticket information

2. **Verify Secondary QR** (`POST /api/tickets/verify-secondary-qr`):
   - Verifies second QR code
   - Confirms entry authorization
   - Returns final verification status

## 🐛 Troubleshooting

### Camera Not Working
- Ensure browser has camera permissions
- Use HTTPS (cameras require secure context)
- Try manual input as fallback

### API Connection Errors
- Verify backend is running
- Check API URL configuration
- Ensure CORS is enabled on backend

### QR Code Not Scanning
- Improve lighting conditions
- Hold device steady
- Ensure QR code is fully visible
- Try manual input option

## 📄 License

ISC

## 👥 Support

For issues or questions:
- Check the backend API documentation
- Ensure backend is running and accessible
- Verify environment variables are set correctly

## 🚀 Future Enhancements

- [ ] Offline mode support
- [ ] Sound/haptic feedback
- [ ] Multi-language support
- [ ] Scan history
- [ ] Advanced analytics
- [ ] PWA capabilities

---

**Built with ❤️ for the Aboor platform**
