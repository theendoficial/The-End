
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { MoreHorizontal, PlusCircle, UserPlus, Users, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const clients: any[] = [
   
];

export default function AdminClientsPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Adicionar Cliente
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
                        <DialogHeader>
                            <DialogTitle>Novo Cliente</DialogTitle>
                            <DialogDescription>
                                Preencha os dados abaixo para cadastrar um novo cliente.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nome
                                </Label>
                                <Input id="name" placeholder="Nome da Empresa" className="col-span-3 bg-background/50 dark:bg-black/20" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input id="email" type="email" placeholder="email@cliente.com" className="col-span-3 bg-background/50 dark:bg-black/20" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 relative">
                                <Label htmlFor="password" className="text-right">
                                    Senha
                                </Label>
                                <div className="col-span-3 relative">
                                    <Input 
                                        id="password" 
                                        type={showPassword ? 'text' : 'password'} 
                                        placeholder="••••••••" 
                                        className="bg-background/50 dark:bg-black/20 pr-10" 
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute inset-y-0 right-0 h-full px-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        <span className="sr-only">{showPassword ? 'Ocultar senha' : 'Mostrar senha'}</span>
                                    </Button>
                                </div>
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="logo" className="text-right">
                                    URL do Logo
                                </Label>
                                <Input id="logo" placeholder="https://..." className="col-span-3 bg-background/50 dark:bg-black/20" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                Cancelar
                                </Button>
                            </DialogClose>
                             <Button type="submit">Salvar Cliente</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            {clients.length > 0 ? (
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
            ) : (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-card/60 dark:bg-black/40 backdrop-blur-lg min-h-[60vh]">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <Users className="h-12 w-12 text-muted-foreground" />
                        <h3 className="text-2xl font-bold tracking-tight">
                        Nenhum cliente encontrado
                        </h3>
                        <p className="text-sm text-muted-foreground">
                        Comece adicionando seu primeiro cliente para gerenciar seus projetos e aprovações.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
