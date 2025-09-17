
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

// Initialize Firebase
let app;
// A less strict check to prevent build errors while still providing a warning.
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
} else {
    // This warning helps during development if variables are missing.
    console.warn('Firebase config is missing. Firebase services might not be available.');
}

// Initialize services only if the app was successfully initialized.
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;


// Export a function to get the initialized services to ensure they are not null.
export const getFirebaseServices = () => {
    if (!app || !db || !auth) {
        // This will throw an error at runtime if Firebase is not configured, 
        // which is better than crashing at build time.
        throw new Error('Firebase has not been initialized. Please check your environment variables on your hosting provider.');
    }
    return { app, db, auth };
};

// For direct import, we still export the potentially null values,
// but usage should ideally be through the getter function.
export { app, db, auth };
