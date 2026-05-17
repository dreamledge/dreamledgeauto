import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  Auth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  Timestamp,
  serverTimestamp,
  GeoPoint as FirebaseGeoPoint
} from 'firebase/firestore';
import {
  getStorage,
  Storage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { FIREBASE_CONFIG } from '../constants/config';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: Storage | null = null;

export const initializeFirebase = () => {
  if (!getApps().length) {
    app = initializeApp(FIREBASE_CONFIG);
  } else {
    app = getApps()[0];
  }
  
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  return { app, auth, db, storage };
};

export const getFirebaseApp = () => {
  if (!app) initializeFirebase();
  return app!;
};

export const getFirebaseAuth = () => {
  if (!auth) initializeFirebase();
  return auth!;
};

export const getFirebaseDb = () => {
  if (!db) initializeFirebase();
  return db!;
};

export const getFirebaseStorage = () => {
  if (!storage) initializeFirebase();
  return storage!;
};

export type { Auth, Firestore, Storage }; 
export type { FirebaseGeoPoint }; 
export type { FirebaseApp }; 
  
export { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  collection,
  addDoc,
  Timestamp,
  serverTimestamp,
  ref,
  uploadBytes,
  getDownloadURL,
  updateProfile,
  sendPasswordResetEmail
};