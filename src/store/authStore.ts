import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from '../services/firebase';
import type { User, CustomerProfile, ProviderProfile, ProviderState } from '../types';

interface AuthState {
  user: FirebaseUser | null;
  userProfile: User | null;
  customerProfile: CustomerProfile | null;
  providerProfile: ProviderProfile | null;
  role: 'customer' | 'provider' | 'admin' | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  
  initializeAuth: () => Promise<void>;
  signUp: (email: string, password: string, name: string, phone: string, role: 'customer' | 'provider') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  userProfile: null,
  customerProfile: null,
  providerProfile: null,
  role: null,
  loading: false,
  error: null,
  initialized: false,

  initializeAuth: async () => {
    const auth = getFirebaseAuth();
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const db = getFirebaseDb();
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data() as User | undefined;
        
        let customerProfile: CustomerProfile | null = null;
        let providerProfile: ProviderProfile | null = null;
        
        if (userData?.role === 'customer') {
          const cpDoc = await getDoc(doc(db, 'customerProfiles', firebaseUser.uid));
          customerProfile = cpDoc.data() as CustomerProfile | undefined || null;
        } else if (userData?.role === 'provider') {
          const ppDoc = await getDoc(doc(db, 'providerProfiles', firebaseUser.uid));
          providerProfile = ppDoc.data() as ProviderProfile | undefined || null;
        }
        
        set({ 
          user: firebaseUser, 
          userProfile: userData || null,
          customerProfile,
          providerProfile,
          role: userData?.role as 'customer' | 'provider' | 'admin' | null,
          initialized: true 
        });
      } else {
        set({ 
          user: null, 
          userProfile: null,
          customerProfile: null,
          providerProfile: null,
          role: null,
          initialized: true 
        });
      }
    });
  },

  signUp: async (email: string, password: string, name: string, phone: string, role: 'customer' | 'provider') => {
    set({ loading: true, error: null });
    try {
      const auth = getFirebaseAuth();
      const db = getFirebaseDb();
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      await updateProfile(firebaseUser, { displayName: name });
      
      const userData: User = {
        id: firebaseUser.uid,
        email,
        phone,
        name,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      if (role === 'customer') {
        const customerProfile: CustomerProfile = {
          id: firebaseUser.uid,
          userId: firebaseUser.uid,
          vehicles: [],
          savedAddresses: [],
        };
        await setDoc(doc(db, 'customerProfiles', firebaseUser.uid), customerProfile);
      } else if (role === 'provider') {
        const providerProfile: ProviderProfile = {
          id: firebaseUser.uid,
          userId: firebaseUser.uid,
          phone,
          services: [],
          state: 'pending' as ProviderState,
          rating: 0,
          totalReviews: 0,
          totalJobs: 0,
          completedJobs: 0,
          pricingMode: 'fixed',
          serviceRadius: 25,
          stripeOnboardingComplete: false,
          isOnline: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await setDoc(doc(db, 'providerProfiles', firebaseUser.uid), {
          ...providerProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      
      set({ 
        user: firebaseUser, 
        userProfile: userData,
        role,
        loading: false 
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
      set({ loading: false, error: errorMessage });
      throw error;
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const auth = getFirebaseAuth();
      const db = getFirebaseDb();
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      const userData = userDoc.data() as User | undefined;
      
      set({ 
        user: firebaseUser, 
        userProfile: userData || null,
        role: userData?.role as 'customer' | 'provider' | 'admin' | null,
        loading: false 
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed';
      set({ loading: false, error: errorMessage });
      throw error;
    }
  },

  signOut: async () => {
    set({ loading: true });
    try {
      const auth = getFirebaseAuth();
      await firebaseSignOut(auth);
      set({ 
        user: null, 
        userProfile: null,
        customerProfile: null,
        providerProfile: null,
        role: null,
        loading: false 
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Sign out failed';
      set({ loading: false, error: errorMessage });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));