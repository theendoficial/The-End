// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "projectId": "studio-8648578678-4ae81",
  "appId": "1:1053401401829:web:36888ed0631f3b89c8070c",
  "storageBucket": "studio-8648578678-4ae81.firebasestorage.app",
  "apiKey": "AIzaSyAkwd7Ip0pVCG17NYNSNOqH-u2QJtHMMIQ",
  "authDomain": "studio-8648578678-4ae81.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1053401401829"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
