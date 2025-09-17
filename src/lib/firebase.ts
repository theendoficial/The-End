
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// This function implements a robust singleton pattern for Firebase initialization.
export const getFirebaseServices = () => {
  // Check if Firebase has already been initialized.
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  
  // Ensure essential config is present before trying to get services.
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error('Firebase config is missing or incomplete. Please check your NEXT_PUBLIC_FIREBASE environment variables.');
  }

  const auth: Auth = getAuth(app);
  const db: Firestore = getFirestore(app);

  return { app, db, auth };
};
