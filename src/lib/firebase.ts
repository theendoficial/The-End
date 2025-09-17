
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import getConfig from 'next/config';

// Este é um padrão singleton robusto para Next.js
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

export const getFirebaseServices = () => {
  // A verificação `getApps().length` garante que não inicializamos o app múltiplas vezes.
  if (!getApps().length) {
    const { publicRuntimeConfig } = getConfig();
    const firebaseConfig = publicRuntimeConfig?.firebaseConfig;
    
    // Esta verificação agora acontece no momento certo.
    if (!firebaseConfig?.apiKey || !firebaseConfig?.projectId) {
      throw new Error('Firebase config is missing or incomplete. Please check your environment variables and next.config.ts');
    }
    
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    // Se já foi inicializado, apenas pegamos as instâncias existentes.
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  }

  return { app, auth, db };
};
