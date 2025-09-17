
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
  name: z.string().min(1, 'O nome da empresa é obrigatório.'),
  email: z.string().email('Por favor, insira um e-mail válido.'),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const { user, getClient, updateClient } = useAppContext();
  const clientData = user ? getClient(user.email!) : null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    values: {
      name: clientData?.name || '',
      email: clientData?.email || '',
    },
  });

  // Keep form in sync if clientData changes
  React.useEffect(() => {
    reset({
      name: clientData?.name || '',
      email: clientData?.email || '',
    });
  }, [clientData, reset]);

  const onSubmit = async (data: SettingsFormValues) => {
    if (!clientData) return;

    const changes: Partial<Omit<typeof clientData, 'id'>> = {};
    if (data.name !== clientData.name) {
        changes.name = data.name;
    }
    // Email changes are typically handled differently (e.g., verification)
    // Here we'll just log it and not update it directly.
    if (data.email !== clientData.email) {
        console.log(`User requested email change from ${clientData.email} to ${data.email}. This requires admin approval and a verification process.`);
        toast({
            title: "Alteração de E-mail",
            description: "A alteração de e-mail de login requer aprovação do administrador. Entre em contato com o suporte.",
            variant: "default"
        });
    }

    if (Object.keys(changes).length > 0) {
        try {
            await updateClient(clientData.id, changes);
            toast({
                title: 'Dados Salvos!',
                description: 'O nome da sua empresa foi atualizado.',
                variant: 'success',
            });
            reset(data); // Resets the form's dirty state
        } catch (error) {
            toast({
                title: 'Erro ao Salvar',
                description: 'Não foi possível atualizar seus dados. Tente novamente.',
                variant: 'destructive',
            });
        }
    }
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
              Você pode atualizar o nome da sua empresa. A alteração do e-mail de login requer contato com o suporte.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Empresa</Label>
              <Input
                id="name"
                {...register('name')}
                className="bg-background/50 dark:bg-black/20"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail de Login</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                disabled // Disable email editing directly in the form
                className="bg-background/50 dark:bg-black/20 disabled:opacity-70"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/10 px-6 py-4">
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
