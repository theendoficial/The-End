'use server';

import { redirect } from 'next/navigation';
import { LoginSchema, ForgotPasswordSchema, VerifyCodeSchema } from './schemas';

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

  if (email === 'admin@example.com' && password === 'password123') {
    redirect('/admin');
  }

  const validUser1 = email === 'user@example.com' && password === 'password123';
  const validUser2 = email === 'jhokkehgames@gmail.com' && password === '1234567890';

  if (!validUser1 && !validUser2) {
    return {
      errors: {
        server: ['Invalid email or password. Please try again.'],
      },
      message: 'Invalid email or password.',
    };
  }
  
  redirect('/dashboard');
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
