
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';


type AdminSettingsPageProps = {
    adminData?: {
        name: string;
        email: string;
        avatar: string;
    };
    onUpdateAdminData?: (newData: any) => void;
}

export default function AdminSettingsPage({ adminData, onUpdateAdminData }: AdminSettingsPageProps) {
    const { toast } = useToast();
    const [name, setName] = React.useState(adminData?.name || '');
    const [email, setEmail] = React.useState(adminData?.email || '');
    const [avatar, setAvatar] = React.useState(adminData?.avatar || '');
    const [password, setPassword] = React.useState('');

    const handleSave = () => {
        if (onUpdateAdminData) {
            onUpdateAdminData({ name, email, avatar });
            toast({
                title: "Configurações Salvas!",
                description: "Suas informações de perfil foram atualizadas.",
                variant: "success",
            });
        }
    }

    React.useEffect(() => {
        if (adminData) {
            setName(adminData.name);
            setEmail(adminData.email);
            setAvatar(adminData.avatar);
        }
    }, [adminData]);
    
    if (!adminData) return null;

    return (
        <>
            <div className="flex items-center mb-6">
                <h1 className="text-lg font-semibold md:text-2xl">Configurações</h1>
            </div>

            <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Perfil do Administrador</CardTitle>
                    <CardDescription>
                        Gerencie suas informações de conta e preferências.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-background/50 dark:bg-black/20" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background/50 dark:bg-black/20" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="avatar">URL do Avatar</Label>
                        <Input id="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://..." className="bg-background/50 dark:bg-black/20" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="password">Nova Senha</Label>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Deixe em branco para não alterar" className="bg-background/50 dark:bg-black/20" />
                    </div>
                </CardContent>
                <CardFooter className="border-t border-border/10 px-6 py-4">
                    <Button onClick={handleSave}>Salvar Alterações</Button>
                </CardFooter>
            </Card>
        </>
    );
}
