import { SERVICE_TYPES, PROVIDER_STATES, JOB_STATES, PRICING_MODES, OFFER_STATES } from '../constants/config';

export type ServiceType = typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES];
export type ProviderState = typeof PROVIDER_STATES[keyof typeof PROVIDER_STATES];
export type JobState = typeof JOB_STATES[keyof typeof JOB_STATES];
export type PricingMode = typeof PRICING_MODES[keyof typeof PRICING_MODES];
export type OfferState = typeof OFFER_STATES[keyof typeof OFFER_STATES];

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface User {
  id: string;
  email?: string;
  phone: string;
  name: string;
  photoUrl?: string;
  role: 'customer' | 'provider' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerProfile {
  id: string;
  userId: string;
  vehicles?: Vehicle[];
  savedAddresses?: SavedAddress[];
  stripeCustomerId?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate?: string;
  vin?: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  address: string;
  geoPoint: GeoPoint;
  isDefault: boolean;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  businessName?: string;
  phone: string;
  services: ServiceType[];
  state: ProviderState;
  rating: number;
  totalReviews: number;
  totalJobs: number;
  completedJobs: number;
  pricingMode: PricingMode;
  basePrice?: number;
  minPrice?: number;
  maxPrice?: number;
  serviceRadius: number;
  operatingArea?: GeoPoint;
  operatingAreaName?: string;
  stripeAccountId?: string;
  stripeOnboardingComplete: boolean;
  isOnline: boolean;
  currentLocation?: GeoPoint;
  verificationDocuments?: string[];
  verifiedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  customerId: string;
  providerId?: string;
  serviceType: ServiceType;
  description: string;
  vehicle?: Vehicle;
  pickupLocation: GeoPoint;
  pickupAddress: string;
  destinationLocation?: GeoPoint;
  destinationAddress?: string;
  status: JobState;
  price?: number;
  finalPrice?: number;
  estimatedArrival?: Date;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Offer {
  id: string;
  jobId: string;
  providerId: string;
  price: number;
  message?: string;
  status: OfferState;
  createdAt: Date;
  updatedAt: Date;
}

export interface Negotiation {
  id: string;
  jobId: string;
  messages: NegotiationMessage[];
  lastOfferAmount?: number;
  lastOfferBy?: string;
  status: 'active' | 'agreed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface NegotiationMessage {
  id: string;
  senderId: string;
  senderType: 'customer' | 'provider';
  content: string;
  offerAmount?: number;
  createdAt: Date;
}

export interface Payment {
  id: string;
  jobId: string;
  customerId: string;
  providerId: string;
  amount: number;
  platformFee: number;
  providerPayout: number;
  stripePaymentId?: string;
  stripeTransferId?: string;
  status: 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded';
  createdAt: Date;
  capturedAt?: Date;
}

export interface Review {
  id: string;
  jobId: string;
  customerId: string;
  providerId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  jobId: string;
  senderId: string;
  senderType: 'customer' | 'provider' | 'admin';
  content: string;
  type: 'text' | 'image' | 'location';
  read: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'job' | 'offer' | 'payment' | 'message' | 'system';
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: Date;
}

export interface Dispute {
  id: string;
  jobId: string;
  customerId: string;
  providerId: string;
  reason: string;
  description: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  resolution?: string;
  refundAmount?: number;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface AdminAction {
  id: string;
  adminId: string;
  action: string;
  targetType: 'user' | 'provider' | 'job' | 'payment';
  targetId: string;
  details: string;
  createdAt: Date;
}