# Aboor Scanner - Project Structure

Complete overview of the React-based scanner application.

## 📂 Directory Structure

```
aboor-scanner/
│
├── public/                      # Static assets
│   ├── index.html              # HTML template (RTL Arabic)
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt              # SEO configuration
│   ├── favicon.ico             # App icon
│   ├── logo192.png             # PWA icon (192x192)
│   └── logo512.png             # PWA icon (512x512)
│
├── src/                        # Source code
│   ├── components/             # React components
│   │   ├── QRScanner.js       # Main QR scanner with camera
│   │   ├── QRScanner.css      # Scanner styles
│   │   ├── StatusCard.js      # Status display component
│   │   ├── StatusCard.css     # Status card styles
│   │   ├── TicketInfo.js      # Ticket information display
│   │   ├── TicketInfo.css     # Ticket info styles
│   │   ├── StepIndicator.js   # Step progress indicator
│   │   ├── StepIndicator.css  # Step indicator styles
│   │   ├── ConfigSection.js   # API URL configuration
│   │   └── ConfigSection.css  # Config section styles
│   │
│   ├── services/               # Service layer
│   │   └── api.js             # API calls (switchQR, verifySecondaryQR)
│   │
│   ├── App.js                  # Main application component
│   ├── App.css                 # Main application styles
│   ├── index.js                # Application entry point
│   └── index.css               # Global styles
│
├── .env                        # Environment variables (gitignored)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── .dockerignore               # Docker ignore rules
│
├── package.json                # Dependencies and scripts
├── package-lock.json           # Dependency lock file
│
├── Dockerfile                  # Docker build configuration
├── docker-compose.yml          # Docker Compose configuration
├── nginx.conf                  # Nginx configuration for production
│
├── README.md                   # Main documentation
├── DEPLOYMENT.md               # Detailed deployment guide
├── QUICK_START.md              # Quick start guide
└── PROJECT_STRUCTURE.md        # This file
```

## 🧩 Component Architecture

```
App.js (Main Container)
│
├── ConfigSection.js            # API URL configuration
│   └── Input for API URL
│
├── StepIndicator.js            # Visual step progress
│   ├── Step 1: Scan QR 1
│   ├── Step 2: Wait
│   └── Step 3: Scan QR 2
│
├── QRScanner.js                # Scanner component
│   ├── Camera Scanner (html5-qrcode)
│   └── Manual Input (fallback)
│
├── StatusCard.js               # Status feedback
│   ├── Waiting state (yellow)
│   ├── Success state (green)
│   └── Error state (red)
│
└── TicketInfo.js               # Ticket details display
    ├── Ticket ID
    ├── Match info
    ├── Seat info
    └── Status
```

## 📦 Dependencies

### Core Dependencies
- **react** (^18.2.0) - UI library
- **react-dom** (^18.2.0) - React DOM bindings
- **react-scripts** (5.0.1) - Build tooling

### Third-party Libraries
- **html5-qrcode** (^2.3.8) - QR code scanning
- **axios** (^1.6.0) - HTTP client

## 🎨 Styling Approach

- **Modular CSS**: Each component has its own CSS file
- **Global Styles**: `index.css` for body and root styles
- **No CSS Preprocessor**: Plain CSS3 with modern features
- **Responsive Design**: Mobile-first approach
- **RTL Support**: Right-to-left for Arabic text

## 🔄 Data Flow

```
User Action → Component State → API Service → Backend
     ↓              ↓               ↓            ↓
  UI Update    React State    Axios Request   Database
```

### State Management

Uses React Hooks (useState, useEffect):
- `currentStep` - Current verification step (1, 2, or 3)
- `scannedQR1` - First QR code scanned
- `ticketData` - Ticket information from backend
- `status` - Current status (waiting, success, error)
- `countdown` - Countdown timer between scans
- `isPaused` - Scanner pause state
- `apiUrl` - Backend API URL

## 🔌 API Integration

### Service Layer (`src/services/api.js`)

**switchQR(qrCode, apiUrl)**
- Endpoint: `POST /api/tickets/switch-qr`
- Purpose: Verify first QR and switch to secondary
- Returns: Ticket data and success status

**verifySecondaryQR(qrCode, apiUrl)**
- Endpoint: `POST /api/tickets/verify-secondary-qr`
- Purpose: Verify second QR for entry
- Returns: Verification result and user data

## 🚀 Build & Deployment

### Development Build
```bash
npm start
```
- Runs on port 3000
- Hot module reloading
- Source maps enabled
- Development mode optimizations

### Production Build
```bash
npm run build
```
- Optimized bundle
- Minified assets
- Code splitting
- Asset hashing for cache busting

### Build Output
```
build/
├── static/
│   ├── css/
│   │   └── main.[hash].css
│   ├── js/
│   │   ├── main.[hash].js
│   │   └── [number].[hash].chunk.js
│   └── media/
│       └── [assets]
├── index.html
├── manifest.json
└── robots.txt
```

## 🐳 Docker Deployment

### Multi-stage Build
1. **Build Stage**: Node.js (builds React app)
2. **Production Stage**: Nginx (serves static files)

### Container Details
- **Base Images**: 
  - Build: `node:18-alpine`
  - Production: `nginx:alpine`
- **Exposed Port**: 80
- **Health Check**: Enabled
- **Size**: ~25MB (compressed)

## 📱 Progressive Web App (PWA)

The app includes PWA capabilities:
- `manifest.json` for app metadata
- Service worker ready (via react-scripts)
- Installable on mobile devices
- Offline-ready (when configured)

## 🔒 Security Features

### Browser Security
- Camera API requires HTTPS
- CORS handling
- Input sanitization

### Nginx Security Headers
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: enabled

## 📊 Performance Optimizations

### Build Optimizations
- Code splitting
- Tree shaking
- Minification
- Asset optimization

### Runtime Optimizations
- Lazy loading
- Memoization potential
- Efficient re-renders

### Nginx Optimizations
- Gzip compression
- Static asset caching (1 year)
- Browser caching headers

## 🔧 Configuration

### Environment Variables
```bash
REACT_APP_API_URL=http://localhost:5001  # Backend API URL
NODE_ENV=production                       # Production mode
GENERATE_SOURCEMAP=false                  # Disable source maps
```

### Build-time Configuration
- Environment variables are embedded at build time
- Cannot be changed without rebuilding
- Prefix with `REACT_APP_` to expose to frontend

## 📝 Code Standards

### File Naming
- Components: PascalCase (e.g., `QRScanner.js`)
- Services: camelCase (e.g., `api.js`)
- Styles: Same name as component (e.g., `QRScanner.css`)

### Component Structure
```javascript
// Imports
import React, { useState, useEffect } from 'react';
import './Component.css';

// Component
const Component = ({ props }) => {
  // State
  // Effects
  // Handlers
  // Render
};

// Export
export default Component;
```

## 🧪 Testing Strategy

Currently no tests included, but recommended structure:
```
src/
├── components/
│   ├── __tests__/
│   │   ├── QRScanner.test.js
│   │   ├── StatusCard.test.js
│   │   └── ...
```

## 📈 Future Enhancements

Potential additions:
- Unit tests with Jest
- Integration tests
- E2E tests with Cypress
- TypeScript migration
- State management (Redux/Zustand)
- Advanced PWA features
- Offline support
- Analytics integration
- Error boundary components

## 🔗 Related Projects

- **aboor-backend** - Backend API
- **aboor-ui** - Customer-facing app
- **scanner-app.html** - Original HTML version

## 📞 File Purposes

| File | Purpose | Can Delete? |
|------|---------|-------------|
| `README.md` | Main documentation | No |
| `DEPLOYMENT.md` | Deployment guide | Optional |
| `QUICK_START.md` | Quick start guide | Optional |
| `PROJECT_STRUCTURE.md` | This file | Optional |
| `Dockerfile` | Docker build | Only if not using Docker |
| `docker-compose.yml` | Docker Compose | Only if not using Docker |
| `nginx.conf` | Nginx config | Only if not using Docker/Nginx |
| `.dockerignore` | Docker ignore | Only if not using Docker |

---

**Last Updated**: December 2025
**Version**: 1.0.0
**Maintainer**: Aboor Team
