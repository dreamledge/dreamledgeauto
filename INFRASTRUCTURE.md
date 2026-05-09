# Dreamledge Auto - MVP Infrastructure Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Mobile App (Expo)                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ Custom er  │  │ Provider   │  │   Web      │  │    Map     │  │
│  │   App      │  │   App      │  │   (PWA)    │  │   (Mapbox) │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    Firebase / Cloud Functions                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Auth     │  │  Firestore   │  │  Storage   │  │  Functions  │  │
│  │            │  │  (Real-time) │  │  (Files)   │  │  (API)      │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        External Services                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  Stripe     │  │  Mapbox     │  │  Push       │  │    SMS      │  │
│  │  Connect    │  │  Maps       │  │  Notifs     │  │  (Twilio)   │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Service | Tool | Free Tier Limit |
|---------|------|-----------------|
| Frontend | Expo (React Native) | Free |
| Backend | Firebase Functions | 2M invocations/month |
| Database | Firebase Realtime DB | 100 concurrent |
| Auth | Firebase Auth | Unlimited |
| Storage | Firebase Storage | 5GB |
| Maps | Mapbox | 50K requests/month |
| Hosting | Vercel / Netlify | Free |
| Payments | Stripe Connect | 2.9% + $0.30/transfer |

## Deployment Steps

### 1. Firebase Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Create project in Firebase Console
# Then initialize:
firebase init
```

### 2. Environment Configuration
```bash
# Copy .env.example to .env and fill in values
cp .env.example .env
```

### 3. Deploy Functions
```bash
firebase deploy --only functions
```

### 4. Build Mobile App
```bash
# Generate native projects
expo prebuild

# Build for iOS (requires Apple Developer account)
expo run:ios

# Build for Android
expo run:android
```

### 5. Deploy Web Dashboard
```bash
# Using Vercel
vercel
# OR using Netlify
netlify deploy --prod
```

## Database Schema (Firestore/Realtime)

```
users/
  {uid}/
    - email
    - phone
    - name
    - role (customer|provider|admin)
    - createdAt
    - updatedAt

customerProfiles/
  {uid}/
    - vehicles[]
    - savedAddresses[]
    - stripeCustomerId

providerProfiles/
  {uid}/
    - businessName
    - phone
    - services[]
    - state (pending|approved|rejected)
    - rating
    - totalJobs
    - serviceRadius
    - operatingArea {lat, lng}
    - isOnline
    - currentLocation {lat, lng}
    - stripeAccountId

jobs/
  {jobId}/
    - customerId
    - providerId
    - serviceType
    - description
    - pickupLocation {lat, lng}
    - pickupAddress
    - status
    - price
    - createdAt

offers/
  {offerId}/
    - jobId
    - providerId
    - price
    - message
    - status (pending|accepted|rejected)

payments/
  {paymentId}/
    - jobId
    - customerId
    - providerId
    - amount
    - platformFee
    - providerPayout
    - status
    - createdAt
```

## Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Providers can read their own profile
    match /providerProfiles/{providerId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == providerId;
    }
    
    // Jobs - customers own theirs, providers read all pending
    match /jobs/{jobId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.customerId 
                    || request.auth.uid == resource.data.providerId;
    }
    
    // Offers - only provider who made it can update
    match /offers/{offerId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.providerId;
    }
  }
}
```

## API Routes (Firebase Functions)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/jobs` | POST | Create new job |
| `/jobs/:id/accept` | POST | Provider accepts job |
| `/jobs/:id/complete` | POST | Mark job complete |
| `/offers` | POST | Create offer |
| `/offers/:id/respond` | POST | Accept/reject offer |
| `/payments/create` | POST | Create payment |
| `/payments/:id/capture` | POST | Capture payment |
| `/stripe/webhook` | POST | Stripe webhook |
| `/providers/online` | POST | Toggle online |
| `/matching` | POST | Find nearby providers |

## Environment Variables

```env
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
MAPBOX_ACCESS_TOKEN=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Scaling Plan (Post-MVP)

### Phase 1: MVP (0-500 users)
- Firebase free tier
- Mapbox free tier
- Single Stripe Connect account

### Phase 2: Growth (500-5000 users)
- Upgrade to Firebase Blaze ($25/month)
- Add Redis caching
- Multiple admin accounts

### Phase 3: Scale (5000-50000 users)
- Consider PostgreSQL migration
- Custom domain/CNAME
- Custom push notification server

## Monitoring

```javascript
// Firebase Analytics events to track
- job_created
- job_accepted
- job_completed
- payment_successful
- provider_rating
- search_radius_changed
```

## Error Tracking

- Use Sentry or Crashlytics for mobile
- Use LogRocket for web debugging
- Set up Firebase Crashlytics alerts

## Compliance

- [ ] Terms of Service page
- [ ] Privacy Policy page
- [ ] Disclaimer (independent contractor model)
- [ ] GDPR compliance (if EU users)
- [ ] CCPA compliance (if CA users)