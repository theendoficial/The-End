
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminSettingsPage() {
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
                        <Input id="name" defaultValue="Admin" className="bg-background/50 dark:bg-black/20" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="admin@example.com" className="bg-background/50 dark:bg-black/20" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="password">Nova Senha</Label>
                        <Input id="password" type="password" placeholder="Deixe em branco para não alterar" className="bg-background/50 dark:bg-black/20" />
                    </div>
                </CardContent>
                <CardFooter className="border-t border-border/10 px-6 py-4">
                    <Button>Salvar Alterações</Button>
                </CardFooter>
            </Card>
        </>
    );
}
