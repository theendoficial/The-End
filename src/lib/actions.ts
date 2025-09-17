'use server';

import { redirect } from 'next/navigation';
import { LoginSchema, ForgotPasswordSchema, VerifyCodeSchema, ClientSchema } from './schemas';
import { google } from 'googleapis';
import { googleDriveCredentials } from './google-drive-credentials';

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

  const isAdmin = (email === 'admin@example.com' || email === 'jhokkehgames@gmail.com') && password === 'password123';

  if (isAdmin) {
    redirect('/admin');
  }

  const isClient = email === 'user@example.com' && password === 'password123';

  if (isClient) {
    redirect('/dashboard');
  }

  return {
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

    const { name } = validatedFields.data;

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: googleDriveCredentials.client_email,
                private_key: googleDriveCredentials.private_key,
            },
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        const drive = google.drive({ version: 'v3', auth });

        const folderMetadata = {
            name: name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [googleDriveCredentials.folderId],
        };

        const folder = await drive.files.create({
            requestBody: folderMetadata,
            fields: 'id',
        });
        const folderId = folder.data.id;

        if (!folderId) {
             throw new Error('Falha ao obter o ID da pasta criada no Google Drive.');
        }

        // Aqui você salvaria os dados do cliente no seu banco de dados,
        // incluindo o 'folderId' que acabou de ser criado.
        // Como estamos usando um mock, vamos apenas simular o sucesso.
        console.log(`Cliente "${name}" criado com sucesso. ID da pasta no Drive: ${folderId}`);

        return { success: true, message: `Cliente "${name}" criado com sucesso!` };

    } catch (error: any) {
        console.error('Erro ao criar cliente ou pasta no Drive:', error);
        return { 
            success: false, 
            message: 'Ocorreu um erro no servidor ao tentar criar o cliente. Verifique as configurações da API do Google Drive.',
            errors: { server: ['Falha na integração com o Google Drive.'] }
        };
    }
}
