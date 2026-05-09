import { addDoc, collection, doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseDb } from './firebase';
import type { Offer, ServiceType, OfferState } from '../types';
import { PLATFORM_FEE_PERCENT, MAX_OFFERS_PER_JOB } from '../constants/config';

export const createOffer = async (
  jobId: string,
  providerId: string,
  price: number,
  message?: string
): Promise<string> => {
  const db = getFirebaseDb();
  
  const offerData: Omit<Offer, 'id'> = {
    jobId,
    providerId,
    price,
    message,
    status: 'pending' as OfferState,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const docRef = await addDoc(collection(db, 'offers'), {
    ...offerData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

export const acceptOffer = async (
  offerId: string,
  jobId: string,
  price: number
): Promise<void> => {
  const db = getFirebaseDb();
  
  await updateDoc(doc(db, 'offers', offerId), {
    status: 'accepted',
    updatedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, 'jobs', jobId), {
    finalPrice: price,
    status: 'accepted',
    updatedAt: serverTimestamp(),
  });
};

export const rejectOffer = async (offerId: string): Promise<void> => {
  const db = getFirebaseDb();
  
  await updateDoc(doc(db, 'offers', offerId), {
    status: 'rejected',
    updatedAt: serverTimestamp(),
  });
};

export const counterOffer = async (
  offerId: string,
  newPrice: number,
  message?: string
): Promise<void> => {
  const db = getFirebaseDb();
  
  await updateDoc(doc(db, 'offers', offerId), {
    status: 'countered',
    counterPrice: newPrice,
    counterMessage: message,
    updatedAt: serverTimestamp(),
  });
};

export const calculatePlatformFee = (amount: number): number => {
  return Math.round(amount * (PLATFORM_FEE_PERCENT / 100));
};

export const calculateProviderPayout = (amount: number): number => {
  return amount - calculatePlatformFee(amount);
};

export const createPayment = async (
  jobId: string,
  customerId: string,
  providerId: string,
  amount: number
): Promise<string> => {
  const db = getFirebaseDb();
  
  const platformFee = calculatePlatformFee(amount);
  const providerPayout = calculateProviderPayout(amount);

  const paymentData = {
    jobId,
    customerId,
    providerId,
    amount,
    platformFee,
    providerPayout,
    status: 'pending',
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, 'payments'), paymentData);

  return docRef.id;
};

export const capturePayment = async (
  paymentId: string,
  stripePaymentIntentId: string
): Promise<void> => {
  const db = getFirebaseDb();
  
  await updateDoc(doc(db, 'payments', paymentId), {
    status: 'captured',
    stripePaymentIntentId,
    capturedAt: serverTimestamp(),
  });
};

export const refundPayment = async (
  paymentId: string,
  reason?: string
): Promise<void> => {
  const db = getFirebaseDb();
  
  await updateDoc(doc(db, 'payments', paymentId), {
    status: 'refunded',
    refundReason: reason,
    refundedAt: serverTimestamp(),
  });
};