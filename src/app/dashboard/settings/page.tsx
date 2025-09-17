
'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';


const settingsSchema = z.object({
  companyName: z.string().min(1, 'O nome da empresa é obrigatório.'),
  email: z.string().email('Por favor, insira um e-mail válido.'),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const LOGGED_IN_CLIENT_ID = 'user@example.com';
  const { getClient } = useAppContext();
  const clientData = getClient(LOGGED_IN_CLIENT_ID);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: clientData?.name || '',
      email: clientData?.email || '',
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    // Simula uma chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Dados enviados para aprovação:', data);

    toast({
      title: 'Solicitação Enviada!',
      description: 'Seu pedido de alteração de dados foi enviado para aprovação do administrador.',
      variant: 'success',
    });
  };

  return (
    <>
      <div className="flex items-center mb-6 gap-3">
        <Settings className="h-6 w-6" />
        <h1 className="text-lg font-semibold md:text-2xl">Configurações da Conta</h1>
      </div>

      <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
            <CardDescription>
              Solicite a alteração do nome e e-mail da sua empresa. As alterações precisarão ser aprovadas por um administrador.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nome da Empresa</Label>
              <Input
                id="companyName"
                {...register('companyName')}
                className="bg-background/50 dark:bg-black/20"
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail de Contato</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="bg-background/50 dark:bg-black/20"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/10 px-6 py-4">
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? 'Enviando...' : 'Salvar e Enviar para Aprovação'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
