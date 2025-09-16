
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { MoreHorizontal, UserPlus, Users, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { allProjects } from '@/app/dashboard/projects/page';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AdminClientsPage() {
    const [clients, setClients] = useState<any[]>([
        {
            id: 'major-style-barbearia',
            name: 'Major Style - Barbearia',
            email: 'majorstylemkt@gmail.com',
            password: 'Barbeariaconteudos010102',
            logo: 'https://instagram.fcgh2-1.fna.fbcdn.net/v/t51.2885-19/505749727_17862883392419934_6871962705883407866_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4zMjAuYzIifQ&_nc_ht=instagram.fcgh2-1.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QEpRz7AiJPJvBRKa8KlS-dW2cMVN8TzuCNbzgE_z49xazIpgA-PWVjZfsuGeiwhyhyAZr5Y6jAxAUnkXQXpxNDp&_nc_ohc=0_zeMtGquPkQ7kNvwFZtDj9&_nc_gid=D-4UUHwMxstS5iH-C5C03g&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfY7-D26PBrUArYKGduva9J-hU9VPFs2yI9U4CC2_gHKfg&oe=68CE7482&_nc_sid=7a9f4b',
            projects: allProjects.filter(p => [6]),
            pendingApprovals: 0,
        }
    ]);
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    
    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logo, setLogo] = useState('');
    const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

    const handleSelectProject = (projectId: number) => {
        setSelectedProjects(prev => 
            prev.includes(projectId) 
                ? prev.filter(id => id !== projectId) 
                : [...prev, projectId]
        );
    };
    
    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setLogo('');
        setSelectedProjects([]);
        setShowPassword(false);
        setIsEditing(null);
    }
    
    const handleOpenNew = () => {
        resetForm();
        setOpen(true);
    };

    const handleOpenEdit = (client: any) => {
        setIsEditing(client.id);
        setName(client.name);
        setEmail(client.email);
        setPassword(client.password);
        setLogo(client.logo);
        setSelectedProjects(client.projects.map((p: any) => p.id));
        setOpen(true);
    };

    const handleSaveClient = () => {
        if (isEditing) {
            // Update existing client
             setClients(prev => prev.map(c => 
                c.id === isEditing 
                    ? { ...c, name, email, password, logo, projects: allProjects.filter(p => selectedProjects.includes(p.id)) } 
                    : c
            ));
        } else {
            // Add new client
            const newClient = {
                id: name.toLowerCase().replace(/\s+/g, '-'),
                name,
                email,
                password,
                logo: logo || `https://ui-avatars.com/api/?name=${name.replace(/\s+/g, '+')}&background=random`,
                projects: allProjects.filter(p => selectedProjects.includes(p.id)),
                pendingApprovals: 0,
            };
            setClients(prev => [...prev, newClient]);
        }
        setOpen(false);
        resetForm();
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
                <Dialog open={open} onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) resetForm();
                }}>
                    <DialogTrigger asChild>
                        <Button onClick={handleOpenNew}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Adicionar Cliente
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
                            <DialogDescription>
                                {isEditing ? 'Altere os dados do cliente abaixo.' : 'Preencha os dados abaixo para cadastrar um novo cliente.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            <div className="space-y-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Nome
                                    </Label>
                                    <Input id="name" placeholder="Nome da Empresa" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 bg-background/50 dark:bg-black/20" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input id="email" type="email" placeholder="email@cliente.com" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3 bg-background/50 dark:bg-black/20" />
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
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
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
                                    <Input id="logo" placeholder="https://..." value={logo} onChange={(e) => setLogo(e.target.value)} className="col-span-3 bg-background/50 dark:bg-black/20" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Serviços Contratados</Label>
                                <ScrollArea className="h-48 w-full rounded-md border p-4 bg-background/50 dark:bg-black/20">
                                    <div className="space-y-2">
                                        {allProjects.map((project) => (
                                            <div key={project.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`project-${project.id}`}
                                                    checked={selectedProjects.includes(project.id)}
                                                    onCheckedChange={() => handleSelectProject(project.id)}
                                                />
                                                <label
                                                    htmlFor={`project-${project.id}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {project.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                Cancelar
                                </Button>
                            </DialogClose>
                             <Button type="button" onClick={handleSaveClient}>Salvar Cliente</Button>
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
                                        <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10 cursor-pointer" onClick={() => handleOpenEdit(client)}>Editar</DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10 cursor-pointer text-red-500 focus:text-red-500">Excluir</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-between">
                                <div>
                                    <CardDescription className="mb-4">Projetos Ativos:</CardDescription>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {client.projects.map((p: any) => <Badge key={p.id} variant="secondary">{p.name}</Badge>)}
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
