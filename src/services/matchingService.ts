import { getDoc, doc, getDocs, collection, query, where, serverTimestamp } from 'firebase/firestore';
import { getFirebaseDb } from './firebase';
import type { ProviderProfile, Job, GeoPoint, ServiceType, ProviderState } from '../types';
import { DEFAULT_SERVICE_RADIUS_MILES } from '../constants/config';

const calculateDistance = (
  point1: GeoPoint,
  point2: GeoPoint
): number => {
  const R = 3959;
  const dLat = toRad(point2.latitude - point1.latitude);
  const dLon = toRad(point2.longitude - point1.longitude);
  const lat1 = toRad(point1.latitude);
  const lat2 = toRad(point2.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const toRad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const findMatchingProviders = async (
  pickupLocation: GeoPoint,
  serviceType: ServiceType,
  radiusMiles: number = DEFAULT_SERVICE_RADIUS_MILES
): Promise<ProviderProfile[]> => {
  const db = getFirebaseDb();
  const providersRef = collection(db, 'providerProfiles');
  
  const q = query(
    providersRef,
    where('state', '==', 'approved' as ProviderState),
    where('isOnline', '==', true),
    where('services', 'array-contains', serviceType)
  );

  const snapshot = await getDocs(q);
  
  const providers = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as ProviderProfile[];

  return providers
    .filter(p => p.operatingArea || p.currentLocation)
    .map(p => {
      const providerLocation = p.currentLocation || p.operatingArea;
      if (!providerLocation) return null;
      
      const distance = calculateDistance(pickupLocation, providerLocation);
      return { ...p, _distance: distance };
    })
    .filter(p => p !== null && p._distance <= (p?.serviceRadius || radiusMiles))
    .sort((a: ProviderProfile & { _distance?: number }, b: ProviderProfile & { _distance?: number }) => {
      const scoreA = calculateMatchScore(a, pickupLocation);
      const scoreB = calculateMatchScore(b, pickupLocation);
      return scoreB - scoreA;
    }) as ProviderProfile[];
};

const calculateMatchScore = (
  provider: ProviderProfile & { _distance?: number },
  jobLocation: GeoPoint
): number => {
  let score = 100;

  if (provider._distance) {
    score -= provider._distance * 2;
  }

  if (provider.rating) {
    score += (provider.rating - 4) * 20;
  }

  if (provider.totalJobs) {
    score += Math.min(provider.totalJobs / 10, 20);
  }

  return Math.max(0, score);
};

export const sendJobNotifications = async (
  job: Job,
  providers: ProviderProfile[]
): Promise<void> => {
  for (const provider of providers) {
    console.log(`Would notify provider ${provider.id} about job ${job.id}`);
  }
};

export const getProviderAvailability = async (
  providerId: string
): Promise<boolean> => {
  const db = getFirebaseDb();
  const providerDoc = await getDoc(doc(db, 'providerProfiles', providerId));
  
  if (!providerDoc.exists()) return false;
  
  const provider = providerDoc.data() as ProviderProfile;
  return provider.state === 'approved' && provider.isOnline;
};

export const setProviderOnline = async (
  providerId: string,
  isOnline: boolean,
  location?: GeoPoint
): Promise<void> => {
  const db = getFirebaseDb();
  const updates: Record<string, unknown> = {
    isOnline,
    updatedAt: serverTimestamp(),
  };

  if (location) {
    updates.currentLocation = location;
  }

  await updateDoc(doc(db, 'providerProfiles', providerId), updates);
};