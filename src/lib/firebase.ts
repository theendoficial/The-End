
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Now read from environment variables.
// We check for both server-side and client-side variables.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
// We check if the config keys are present before initializing.
// This is a less strict check to avoid build errors while still providing a warning.
let app;
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
} else {
    console.warn('Firebase config is missing. Firebase services will not be available.');
}

// Initialize services only if the app was successfully initialized.
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;


// It's useful to export the app object as well if you need it elsewhere
// We export a function to get the initialized services to ensure they are not null.
// This is a safer pattern.
const getFirebaseServices = () => {
    if (!app || !db || !auth) {
        // This will throw an error at runtime if Firebase is not configured, 
        // which is better than crashing at build time.
        throw new Error('Firebase has not been initialized. Please check your environment variables.');
    }
    return { app, db, auth };
};

// For direct import, we still export the potentially null values,
// but usage should ideally be through the getter function.
export { app, db, auth, getFirebaseServices };
