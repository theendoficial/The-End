
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

// Este é um padrão singleton robusto para Next.js
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

export const getFirebaseServices = () => {
  // A verificação `getApps().length` garante que não inicializamos o app múltiplas vezes.
  if (!getApps().length) {
    // As variáveis de ambiente com prefixo NEXT_PUBLIC_ são expostas ao cliente automaticamente.
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    
    // Esta verificação garante que as variáveis de ambiente essenciais estão presentes.
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error('A configuração do Firebase está ausente ou incompleta. Verifique suas variáveis de ambiente NEXT_PUBLIC_');
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
