# Dreamledge Auto 🚗

Mobile-first roadside assistance and mobile mechanic marketplace platform for Dayton, Ohio.

## Features

### For Customers
- 📍 Request roadside assistance (tire change, towing, battery jump, fuel delivery, lockout, mechanic)
- 🗺️ View nearby providers on map
- 💬 Negotiate pricing with providers
- 📡 Live provider tracking
- 💳 Secure in-app payments (20% platform fee)
- ⭐ Rate and review providers

### For Providers
- 🔧 Multi-service offering
- 📍 GPS location services
- 💰 Set your own pricing
- 💵 80% payout on completed jobs
- 📊 Earnings dashboard
- ✅ Provider verification system

### For Admins
- 👥 Provider approval/rejection
- 📊 Job analytics
- 💸 Commission tracking
- ⚠️ Dispute management

## Tech Stack

| Category | Technology |
|----------|-------------|
| Frontend | React Native (Expo) |
| Backend | Firebase Cloud Functions |
| Database | Firebase Realtime DB |
| Maps | Mapbox |
| Payments | Stripe Connect |
| Auth | Firebase Auth |
| Push | Firebase Cloud Messaging |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/dreamledge-auto.git
cd dreamledge-auto

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development
npm start
```

### Firebase Setup

1. Create a project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (Email/Password)
3. Enable Realtime Database
4. Create a .env file with your Firebase config:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### Mapbox Setup

1. Create account at [mapbox.com](https://mapbox.com)
2. Copy your access token to .env

### Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Enable Connect in dashboard
3. Add API keys to .env

## Project Structure

```
├── app/                    # Screen routes (Expo Router)
│   ├── (auth)/            # Auth screens
│   ├── customer/          # Customer screens
│   ├── provider/         # Provider screens
│   └── admin/            # Admin screens
├── src/
│   ├── components/       # Reusable components
│   ├── constants/        # Theme & config
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services
│   ├── store/           # Zustand stores
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── functions/           # Firebase Cloud Functions
└── assets/              # Images & fonts
```

## App Flow

### Customer Flow
1. Sign up → Select service → Describe issue → View providers → Accept offer → Track → Pay → Rate

### Provider Flow
1. Sign up → Select services → Set location → Get approved → Toggle online → Accept jobs → Complete → Get paid

## Scripts

```bash
npm start           # Start Expo
npm run android    # Build Android
npm run ios         # Build iOS
npm run prebuild   # Generate native projects
npm run lint       # Run ESLint
npm run typecheck  # TypeScript check
```

## Environment Variables

See `.env.example` for required variables.

## License

MIT License - see LICENSE file for details.

## Support

- Email: support@dreamledgeauto.com
- Phone: (937) 555-HELP

## Roadmap

- [ ] MVP Launch (Dayton, OH)
- [ ] Provider verification system
- [ ] Real-time GPS tracking
- [ ] In-app messaging
- [ ] Push notifications
- [ ] Earnings dashboard
- [ ] Admin dispute system
- [ ] Web dashboard (PWA)
- [ ] Multi-city expansion