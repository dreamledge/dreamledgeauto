import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { getFirebaseDb } from './firebase';
import type { Job, ServiceType, GeoPoint, JobState } from '../types';

export const createJob = async (
  customerId: string,
  serviceType: ServiceType,
  description: string,
  pickupLocation: GeoPoint,
  pickupAddress: string,
  vehicleInfo?: string
): Promise<string> => {
  const db = getFirebaseDb();
  
  const jobData: Omit<Job, 'id'> = {
    customerId,
    serviceType,
    description,
    pickupLocation,
    pickupAddress,
    status: 'requested' as JobState,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (vehicleInfo) {
    (jobData as Record<string, unknown>).vehicle = { info: vehicleInfo };
  }

  const docRef = await addDoc(collection(db, 'jobs'), {
    ...jobData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

export const acceptJob = async (
  jobId: string,
  providerId: string
): Promise<void> => {
  const db = getFirebaseDb();
  const jobRef = doc(db, 'jobs', jobId);
  
  await updateDoc(jobRef, {
    providerId,
    status: 'accepted',
    updatedAt: serverTimestamp(),
  });
};

export const updateJobStatus = async (
  jobId: string,
  status: JobState
): Promise<void> => {
  const db = getFirebaseDb();
  const jobRef = doc(db, 'jobs', jobId);
  
  const updates: Record<string, unknown> = {
    status,
    updatedAt: serverTimestamp(),
  };

  if (status === 'in_progress') {
    updates.startedAt = serverTimestamp();
  } else if (status === 'completed') {
    updates.completedAt = serverTimestamp();
  }

  await updateDoc(jobRef, updates);
};

export const getCustomerJobs = async (customerId: string): Promise<Job[]> => {
  const db = getFirebaseDb();
  const jobsRef = collection(db, 'jobs');
  
  const q = query(
    jobsRef,
    where('customerId', '==', customerId),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Job[];
};

export const getProviderJobs = async (providerId: string): Promise<Job[]> => {
  const db = getFirebaseDb();
  const jobsRef = collection(db, 'jobs');
  
  const q = query(
    jobsRef,
    where('providerId', '==', providerId),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Job[];
};

export const getNearbyJobs = async (
  serviceType: ServiceType,
  location: GeoPoint,
  radiusMiles: number
): Promise<Job[]> => {
  const db = getFirebaseDb();
  const jobsRef = collection(db, 'jobs');
  
  const q = query(
    jobsRef,
    where('serviceType', '==', serviceType),
    where('status', '==', 'requested'),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Job[];
};

export const cancelJob = async (
  jobId: string,
  reason?: string
): Promise<void> => {
  const db = getFirebaseDb();
  const jobRef = doc(db, 'jobs', jobId);
  
  await updateDoc(jobRef, {
    status: 'cancelled',
    cancellationReason: reason || 'Customer cancelled',
    updatedAt: serverTimestamp(),
  });
};