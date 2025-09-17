
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// This configuration now exclusively reads from public environment variables.
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton pattern to initialize Firebase services safely.
let app;
let auth;
let db;

function initializeFirebase() {
    if (!getApps().length) {
        // A simple check to ensure essential config is present.
        if (firebaseConfig.apiKey && firebaseConfig.projectId) {
            app = initializeApp(firebaseConfig);
            auth = getAuth(app);
            db = getFirestore(app);
        } else {
            // This warning is crucial for debugging on Vercel/production
            console.warn('Firebase config is missing or incomplete from environment variables. Firebase services will not be available.');
        }
    } else {
        app = getApp();
        auth = getAuth(app);
        db = getFirestore(app);
    }
}

// Initialize on first load
initializeFirebase();

// Export a function to get the initialized services.
// This ensures that any part of the app gets the same, single instance.
export const getFirebaseServices = () => {
    if (!app || !db || !auth) {
        // This will now only happen if the initial configuration was missing.
        throw new Error('Firebase has not been initialized. Please check your environment variables on your hosting provider.');
    }
    return { app, db, auth };
};
