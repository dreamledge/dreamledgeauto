import { getFirebaseDb } from './firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import type { ProviderProfile } from '../types';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

interface StripeConnectAccount {
  id: string;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  details_submitted: boolean;
}

export const createConnectAccount = async (
  providerId: string,
  email: string
): Promise<string> => {
  const response = await fetch('https://api.stripe.com/v1/accounts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      type: 'express',
      country: 'US',
      email,
      capabilities: JSON.stringify({
        card_payments: { requested: true },
        transfers: { requested: true },
      }),
    }),
  });

  const account = await response.json();
  
  const db = getFirebaseDb();
  await updateDoc(doc(db, 'providerProfiles', providerId), {
    stripeAccountId: account.id,
    updatedAt: serverTimestamp(),
  });

  return account.id;
};

export const createAccountLink = async (
  providerId: string,
  stripeAccountId: string,
  refreshUrl: string,
  returnUrl: string
): Promise<string> => {
  const response = await fetch('https://api.stripe.com/v1/account_links', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      account: stripeAccountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    }),
  });

  const accountLink = await response.json();
  return accountLink.url;
};

export const createPaymentIntent = async (
  amount: number,
  customerId: string,
  connectedAccountId: string,
  jobId: string
): Promise<{ clientSecret: string; paymentIntentId: string }> => {
  const platformFee = Math.round(amount * 0.2);

  const response = await fetch('https://api.stripe.com/v1/payment_intents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      amount: String(amount * 100),
      currency: 'usd',
      customer: customerId,
      application_fee_amount: String(platformFee),
      transfer_data: JSON.stringify({
        destination: connectedAccountId,
      }),
      metadata: JSON.stringify({
        jobId,
        type: 'roadside_assistance',
      }),
    }),
  });

  const paymentIntent = await response.json();
  
  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
};

export const createTransfer = async (
  amount: number,
  destinationAccountId: string,
  jobId: string
): Promise<string> => {
  const response = await fetch('https://api.stripe.com/v1/transfers', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      amount: String(amount * 100),
      currency: 'usd',
      destination: destinationAccountId,
      metadata: JSON.stringify({
        jobId,
      }),
    }),
  });

  const transfer = await response.json();
  return transfer.id;
};

export const getAccountStatus = async (
  stripeAccountId: string
): Promise<StripeConnectAccount> => {
  const response = await fetch(`https://api.stripe.com/v1/account/${stripeAccountId}`, {
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
    },
  });

  return await response.json();
};

export const refundPayment = async (
  paymentIntentId: string,
  amount?: number
): Promise<string> => {
  const body = new URLSearchParams({
    payment_intent: paymentIntentId,
  });

  if (amount) {
    body.append('amount', String(amount * 100));
  }

  const response = await fetch('https://api.stripe.com/v1/refunds', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  });

  const refund = await response.json();
  return refund.id;
};

export const createCustomer = async (
  email: string,
  name: string,
  phone?: string
): Promise<string> => {
  const response = await fetch('https://api.stripe.com/v1/customers', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      email,
      name,
      ...(phone && { phone }),
    }),
  });

  const customer = await response.json();
  return customer.id;
};