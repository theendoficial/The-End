
'use server';

import { redirect } from 'next/navigation';
import { LoginSchema, ForgotPasswordSchema, VerifyCodeSchema, ClientSchema } from './schemas';
import { google } from 'googleapis';
import { getGoogleDriveCredentials } from './google-drive-credentials';
import { Client } from '@/contexts/AppContext';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

  // Mock authentication
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

  // Check for admin
  if (email === 'admin@example.com' && password === 'password123') {
    redirect('/admin');
  }
  
  try {
    const clientDocRef = doc(db, 'clients', email);
    const clientDoc = await getDoc(clientDocRef);

    if (clientDoc.exists()) {
      const clientData = clientDoc.data() as Client;
      if (clientData.password === password) {
        // In a real app, you'd set a session cookie here.
        // For this demo, we are simply redirecting. A real auth system is needed.
        redirect('/dashboard');
      }
    }
  } catch (error) {
     return {
      errors: {
        server: ['Failed to connect to the database. Please try again later.'],
      },
      message: 'Server error.',
    };
  }

  return {
    ...prevState,
    errors: {
      server: ['Invalid email or password. Please try again.'],
    },
    message: 'Invalid email or password.',
  };
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
        const { client_email, private_key, folderId: parentFolderId } = getGoogleDriveCredentials();
        
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email,
                private_key,
            },
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        const drive = google.drive({ version: 'v3', auth });

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

        const newClient: Client = {
            id: email, // Use email as a unique ID
            name,
            email,
            password, // Storing password directly is not secure. Use Firebase Auth in production.
            logo: logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
            driveFolderId: folderId,
            projects: [],
            posts: [],
            documents: [],
            reports: [],
            notifications: [],
            pendingApprovals: 0,
        };

        // Save to Firestore
        await setDoc(doc(db, "clients", newClient.id), newClient);

        console.log(`[CLIENT CREATED] Client "${name}" created successfully. Drive Folder ID: ${folderId}`);

        return { success: true, message: `Cliente "${name}" criado com sucesso!` };

    } catch (error: any) {
        console.error('Error creating client or Drive folder:', error);
        
        let serverError = 'Falha na integração com o Google Drive.';
        if (error.message.includes('credentials')) {
            serverError = 'As credenciais do Google Drive não estão configuradas corretamente no servidor.';
        }

        return { 
            success: false, 
            message: 'Ocorreu um erro no servidor ao tentar criar o cliente. Verifique as configurações da API do Google Drive.',
            errors: { server: [serverError] }
        };
    }
}
