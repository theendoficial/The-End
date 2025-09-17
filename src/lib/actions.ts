'use server';

import { redirect } from 'next/navigation';
import { LoginSchema, ForgotPasswordSchema, VerifyCodeSchema, ClientSchema } from './schemas';
import { google } from 'googleapis';
import { getGoogleDriveCredentials } from './google-drive-credentials';
import { Client } from '@/contexts/AppContext';
import { db, auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
    server?: string[];
  };
  message?: string | null;
};

export async function login(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to login.',
    };
  }

  const { email, password } = validatedFields.data;

  // Admin check remains the same
  if (email === 'admin@example.com' && password === 'password123') {
    redirect('/admin/dashboard');
  }
  
  try {
    // Use Firebase Auth to sign in
    await signInWithEmailAndPassword(auth, email, password);
    // On success, Firebase handles session management. Redirect to dashboard.
    redirect('/dashboard');
  } catch (error: any) {
     console.error("Firebase Auth Error:", error);
     let errorMessage = 'Invalid email or password. Please try again.';
     // Handle specific Firebase Auth error codes
     if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'E-mail ou senha inválidos. Tente novamente.';
     } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Acesso bloqueado temporariamente devido a muitas tentativas. Tente novamente mais tarde.';
     } else {
        errorMessage = 'Ocorreu um erro no servidor. Tente novamente mais tarde.';
     }

     return {
      errors: {
        server: [errorMessage],
      },
      message: errorMessage,
    };
  }
}


export type ForgotPasswordState = {
    errors?: {
      email?: string[];
      server?: string[];
    };
    message?: string | null;
    success?: boolean;
};

export async function forgotPassword(
    prevState: ForgotPasswordState,
    formData: FormData,
): Promise<ForgotPasswordState> {
    const validatedFields = ForgotPasswordSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid email.',
            success: false,
        };
    }

    // Mock sending email
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Sending password reset link to ${validatedFields.data.email}`);
    
    // In a real app with Firebase Auth, you would call sendPasswordResetEmail(auth, email)
    
    return {
        message: 'If an account with this email exists, a password reset link has been sent.',
        success: true,
    };
}


export type VerifyState = {
  errors?: {
    code?: string[];
    server?: string[];
  };
  message?: string | null;
};

export async function verifyCode(
  prevState: VerifyState,
  formData: FormData,
): Promise<VerifyState> {
  const validatedFields = VerifyCodeSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid code format.',
    };
  }
  
  const { code } = validatedFields.data;

  // Mock code verification: 123456
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (code !== '123456') {
     return {
      errors: {
        server: ['The code you entered is incorrect. Please try again.'],
      },
      message: 'Verification failed.',
    };
  }
  // This is a simplified redirect logic. In a real app, you'd check the user's role.
  // For now, we assume a verified user is a client.
  redirect('/dashboard');
}


export type CreateClientState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    logo?: string[];
    server?: string[];
  };
  message?: string | null;
  success: boolean;
};

export async function createClient(prevState: CreateClientState, formData: FormData): Promise<CreateClientState> {
    const validatedFields = ClientSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos inválidos. Falha ao criar cliente.',
            success: false,
        };
    }

    const { name, email, password, logo } = validatedFields.data;

    try {
        // 1. Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Create Google Drive folder
        const { client_email, private_key, folderId: parentFolderId } = getGoogleDriveCredentials();
        
        const authClient = new google.auth.GoogleAuth({
            credentials: { client_email, private_key },
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        const drive = google.drive({ version: 'v3', auth: authClient });

        const folderMetadata = {
            name: name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [parentFolderId],
        };

        const folder = await drive.files.create({
            requestBody: folderMetadata,
            fields: 'id',
        });
        const folderId = folder.data.id;

        if (!folderId) {
             throw new Error('Falha ao obter o ID da pasta criada no Google Drive.');
        }

        // 3. Create client document in Firestore (without password)
        const newClient: Client = {
            id: email, // Use email as a unique ID
            name,
            email,
            logo: logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
            driveFolderId: folderId,
            projects: [],
            posts: [],
            documents: [],
            reports: [],
            notifications: [],
            pendingApprovals: 0,
        };

        await setDoc(doc(db, "clients", newClient.id), newClient);

        console.log(`[CLIENT CREATED] Client "${name}" created successfully. Auth UID: ${user.uid}, Drive Folder ID: ${folderId}`);

        return { success: true, message: `Cliente "${name}" criado com sucesso!` };

    } catch (error: any) {
        console.error('Error creating client:', error);
        
        let serverError = 'Ocorreu um erro no servidor ao tentar criar o cliente.';
        if (error.code === 'auth/email-already-in-use') {
            serverError = 'Este e-mail já está em uso por outra conta.';
        } else if (error.code === 'auth/weak-password') {
            serverError = 'A senha é muito fraca. Tente uma senha mais forte.';
        } else if (error.message.includes('credentials')) {
            serverError = 'As credenciais do Google Drive não estão configuradas corretamente no servidor.';
        }

        return { 
            success: false, 
            message: serverError,
            errors: { server: [serverError] }
        };
    }
}
