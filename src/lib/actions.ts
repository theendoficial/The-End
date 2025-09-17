'use server';

import { redirect } from 'next/navigation';
import { LoginSchema, ForgotPasswordSchema, VerifyCodeSchema, ClientSchema } from './schemas';
import { google } from 'googleapis';
import { getGoogleDriveCredentials } from './google-drive-credentials';
import { Client } from '@/contexts/AppContext';
import { db, auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

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

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // After successful sign-in, check if the user is an admin.
    if (user.email === 'admin@example.com') {
      redirect('/admin/dashboard');
    } else {
      // For any other user, redirect to the client dashboard.
      redirect('/dashboard');
    }

  } catch (error: any) {
     console.error("Firebase Auth Error:", error);
     let errorMessage = 'Invalid email or password. Please try again.';
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

    const { email } = validatedFields.data;

    try {
        await sendPasswordResetEmail(auth, email);
        return {
            message: 'Se uma conta com este e-mail existir, um link para redefinição de senha foi enviado.',
            success: true,
        };
    } catch (error: any) {
        console.error("Forgot Password Error:", error);
        // Don't reveal if a user exists or not, for security reasons.
        // Return a generic success message regardless of the outcome.
        return {
            message: 'Se uma conta com este e-mail existir, um link para redefinição de senha foi enviado.',
            success: true,
        };
    }
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

  // This is a placeholder for a real 2FA verification logic.
  // In a real app, you would use a library to verify the code against the user's secret.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (code !== '123456') {
     return {
      errors: {
        server: ['The code you entered is incorrect. Please try again.'],
      },
      message: 'Verification failed.',
    };
  }
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
        // Step 1: Create user in Firebase Auth.
        // This handles secure password storage automatically.
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Step 2: Create a Google Drive folder for the client.
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

        // Step 3: Create the client's data document in Firestore.
        // The document ID is the client's email for easy lookup.
        // **Crucially, we do NOT store the password here.**
        const newClient: Omit<Client, 'id'> = {
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

        await setDoc(doc(db, "clients", email), newClient);

        console.log(`[CLIENT CREATED] Client "${name}" created successfully. Auth UID: ${user.uid}, Drive Folder ID: ${folderId}`);

        return { success: true, message: `Cliente "${name}" criado com sucesso!` };

    } catch (error: any) {
        console.error('Error creating client:', error);
        
        let serverError = 'Ocorreu um erro no servidor ao tentar criar o cliente.';
        if (error.code === 'auth/email-already-in-use') {
            serverError = 'Este e-mail já está em uso por outra conta.';
        } else if (error.code === 'auth/weak-password') {
            serverError = 'A senha é muito fraca. Tente uma senha com pelo menos 6 caracteres.';
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
