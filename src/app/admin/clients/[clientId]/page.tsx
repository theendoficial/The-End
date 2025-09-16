
'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarWidget, ProjectUpcomingPostsList, PostsProvider, usePosts } from '@/components/dashboard/dashboard-components';
import * as React from 'react';

// Mock data, this would come from a DB
const clients = [
    { id: 'major-style-barbearia', name: 'Major Style - Barbearia' },
    { id: 'fitness-club', name: 'Fitness Club' },
    { id: 'doce-sonho', name: 'Doceria Doce Sonho' },
];

function ClientDashboard() {
    const { posts, updatePostStatus } = usePosts();
    const [openNewPost, setOpenNewPost] = React.useState(false);

    // New Post Form State
    const [title, setTitle] = React.useState('');
    const [date, setDate] = React.useState('');
    const [type, setType] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [socials, setSocials] = React.useState<string[]>([]);
    
    const handleSavePost = () => {
        // Here you would typically add the new post to your state management
        console.log({ title, date, type, description, socials });
        // For now, we just log it and close the dialog
        setOpenNewPost(false);
        // Reset form
        setTitle('');
        setDate('');
        setType('');
        setDescription('');
        setSocials([]);
    };
    
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Visão Geral</h2>
                <Dialog open={openNewPost} onOpenChange={setOpenNewPost}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Novo Post
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
                        <DialogHeader>
                            <DialogTitle>Criar Novo Post para Aprovação</DialogTitle>
                            <DialogDescription>
                                Preencha os detalhes do post abaixo. Ele será enviado para o cliente para aprovação.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">Título</Label>
                                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3 bg-background/50 dark:bg-black/20" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">Data de Publicação</Label>
                                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="col-span-3 bg-background/50 dark:bg-black/20" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">Tipo de Post</Label>
                                <Select onValueChange={setType} value={type}>
                                    <SelectTrigger className="col-span-3 bg-background/50 dark:bg-black/20">
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="image">Imagem</SelectItem>
                                        <SelectItem value="video">Vídeo/Reels</SelectItem>
                                        <SelectItem value="carousel">Carrossel</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Legenda</Label>
                                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3 bg-background/50 dark:bg-black/20" />
                            </div>
                             <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right pt-2">Redes</Label>
                                <div className="col-span-3 flex flex-col gap-2">
                                    {['instagram', 'tiktok', 'youtube'].map(social => (
                                        <div key={social} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={social} 
                                                checked={socials.includes(social)}
                                                onCheckedChange={(checked) => {
                                                    setSocials(prev => checked ? [...prev, social] : prev.filter(s => s !== social))
                                                }}
                                            />
                                            <label htmlFor={social} className="text-sm font-medium leading-none capitalize">{social}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                             <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancelar</Button>
                            </DialogClose>
                            <Button type="button" onClick={handleSavePost}>Salvar e Enviar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CalendarWidget />
                 {/* This would be a summary of pending approvals, we can build it out later */}
                <div></div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Fila de Conteúdo</h3>
                <ProjectUpcomingPostsList />
            </div>
        </div>
    )
}
function ClientApprovals() {
    return <div>Aprovações</div>
}
function ClientCalendar() {
    return <div>Calendário</div>
}
function ClientProjects() {
    return <div>Projetos</div>
}
function ClientReports() {
    return <div>Relatórios</div>
}
function ClientDocuments() {
    return <div>Documentos</div>
}
function ClientSettings() {
    return <div>Configurações</div>
}

function ClientManagementPageContent() {
    const params = useParams();
    const { clientId } = params;
    const client = clients.find(c => c.id === clientId);

    if (!client) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-2xl font-bold">Cliente não encontrado</h2>
                <Link href="/admin/clients">
                    <Button variant="link">Voltar para a lista de clientes</Button>
                </Link>
            </div>
        );
    }
    
    return (
        <div>
            <div className="mb-6 flex items-center gap-4">
                 <Link href="/admin/clients" className="p-2 rounded-md hover:bg-muted">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-lg font-semibold md:text-2xl">{client.name}</h1>
            </div>

            <Tabs defaultValue="dashboard">
                <TabsList className="grid w-full grid-cols-7 mb-4">
                    <TabsTrigger value="dashboard">Painel</TabsTrigger>
                    <TabsTrigger value="approvals">Aprovações</TabsTrigger>
                    <TabsTrigger value="calendar">Calendário</TabsTrigger>
                    <TabsTrigger value="projects">Projetos</TabsTrigger>
                    <TabsTrigger value="reports">Relatórios</TabsTrigger>
                    <TabsTrigger value="documents">Documentos</TabsTrigger>
                    <TabsTrigger value="settings">Configurações</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard"><ClientDashboard /></TabsContent>
                <TabsContent value="approvals"><ClientApprovals /></TabsContent>
                <TabsContent value="calendar"><ClientCalendar /></TabsContent>
                <TabsContent value="projects"><ClientProjects /></TabsContent>
                <TabsContent value="reports"><ClientReports /></TabsContent>
                <TabsContent value="documents"><ClientDocuments /></TabsContent>
                <TabsContent value="settings"><ClientSettings /></TabsContent>
            </Tabs>
        </div>
    );
}

export default function ClientManagementPage() {
    return (
        <PostsProvider>
            <ClientManagementPageContent />
        </PostsProvider>
    );
}
