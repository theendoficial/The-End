
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const clients = [
    {
        id: 'major-style-barbearia',
        name: 'Major Style - Barbearia',
        logo: 'https://picsum.photos/seed/client1/100/100',
        pendingApprovals: 3,
        projects: ['Gestão de Mídias Sociais', 'Identidade Visual'],
    },
    {
        id: 'fitness-club',
        name: 'Fitness Club',
        logo: 'https://picsum.photos/seed/client2/100/100',
        pendingApprovals: 1,
        projects: ['Gestão de Mídias Sociais', 'Trafego Pago'],
    },
    {
        id: 'doce-sonho',
        name: 'Doceria Doce Sonho',
        logo: 'https://picsum.photos/seed/client3/100/100',
        pendingApprovals: 4,
        projects: ['Gestão de Mídias Sociais'],
    },
];

export default function AdminClientsPage() {
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Cliente
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                    <Card key={client.id} className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl flex flex-col group">
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div className="flex items-center gap-4">
                                <img src={client.logo} alt={client.name} className="h-12 w-12 rounded-full border-2 border-border" data-ai-hint="logo" />
                                <CardTitle className="text-lg font-semibold">{client.name}</CardTitle>
                            </div>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-popover dark:bg-black/80 backdrop-blur-lg text-popover-foreground dark:text-white border-border dark:border-white/20">
                                    <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10 cursor-pointer">Editar</DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10 cursor-pointer text-red-500 focus:text-red-500">Excluir</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-between">
                            <div>
                                <CardDescription className="mb-4">Projetos Ativos:</CardDescription>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {client.projects.map(p => <Badge key={p} variant="secondary">{p}</Badge>)}
                                </div>
                            </div>
                            <Link href={`/admin/clients/${client.id}`} className="w-full">
                                <Button className="w-full transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                                    Gerenciar Cliente
                                    {client.pendingApprovals > 0 && (
                                        <Badge variant="destructive" className="ml-2">{client.pendingApprovals} pendente(s)</Badge>
                                    )}
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
