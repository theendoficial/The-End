import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const VerifyCodeSchema = z.object({
  code: z.string().length(6, { message: "Your one-time code must be 6 characters." }),
});

export const ClientSchema = z.object({
    name: z.string().min(2, { message: 'O nome da empresa é obrigatório.' }),
    email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
    password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
    logo: z.string().url({ message: 'Por favor, insira uma URL válida para o logo.' }).optional().or(z.literal('')),
});
