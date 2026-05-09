export const SERVICE_TYPES = {
  TIRE_CHANGE: 'tire_change',
  TOWING: 'towing',
  BATTERY_JUMP: 'battery_jump',
  FUEL_DELIVERY: 'fuel_delivery',
  LOCKOUT: 'lockout',
  MECHANIC: 'mechanic',
} as const;

export const SERVICE_LABELS: Record<string, string> = {
  [SERVICE_TYPES.TIRE_CHANGE]: 'Tire Change',
  [SERVICE_TYPES.TOWING]: 'Towing',
  [SERVICE_TYPES.BATTERY_JUMP]: 'Battery Jump',
  [SERVICE_TYPES.FUEL_DELIVERY]: 'Fuel Delivery',
  [SERVICE_TYPES.LOCKOUT]: 'Lockout Assistance',
  [SERVICE_TYPES.MECHANIC]: 'Mobile Mechanic',
};

export const SERVICE_ICONS: Record<string, string> = {
  [SERVICE_TYPES.TIRE_CHANGE]: '❕',
  [SERVICE_TYPES.TOWING]: '🚗',
  [SERVICE_TYPES.BATTERY_JUMP]: '🔋',
  [SERVICE_TYPES.FUEL_DELIVERY]: '⛽',
  [SERVICE_TYPES.LOCKOUT]: '🔐',
  [SERVICE_TYPES.MECHANIC]: '🔧',
};

export const PROVIDER_STATES = {
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
} as const;

export const JOB_STATES = {
  REQUESTED: 'requested',
  ACCEPTED: 'accepted',
  ARRIVING: 'arriving',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DISPUTED: 'disputed',
} as const;

export const PRICING_MODES = {
  FIXED: 'fixed',
  RANGE: 'range',
  BID: 'bid',
} as const;

export const OFFER_STATES = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  COUNTERED: 'countered',
  EXPIRED: 'expired',
} as const;

export const PLATFORM_FEE_PERCENT = 20;
export const DEFAULT_SERVICE_RADIUS_MILES = 25;
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_OFFERS_PER_JOB = 10;
export const OFFER_EXPIRY_HOURS = 24;
export const JOB_TIMEOUT_HOURS = 72;

export const FIREBASE_CONFIG = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export const MAPBOX_TOKEN = "YOUR_MAPBOX_TOKEN";
export const STRIPE_PUBLISHABLE_KEY = "pk_test_YOUR_STRIPE_KEY";