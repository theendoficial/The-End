
'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PlusCircle, Upload, Link as LinkIcon, Bell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarWidget, ProjectUpcomingPostsList, PostsProvider, usePosts, PostType, Post, Status, statusConfig, PostDialogContent } from '@/components/dashboard/dashboard-components';
import { KanbanBoard, FullCalendar } from '@/components/dashboard/calendar-components';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


// Mock data, this would come from a DB
const clients = [
    { id: 'major-style-barbearia', name: 'Major Style - Barbearia' },
    { id: 'fitness-club', name: 'Fitness Club' },
    { id: 'doce-sonho', name: 'Doceria Doce Sonho' },
];

function ClientDashboard() {
    const { addPost } = usePosts();
    const [openNewPost, setOpenNewPost] = React.useState(false);

    // New Post Form State
    const [title, setTitle] = React.useState('');
    const [dateTime, setDateTime] = React.useState('');
    const [type, setType] = React.useState<PostType | ''>('');
    const [description, setDescription] = React.useState('');
    const [socials, setSocials] = React.useState<string[]>([]);
    const [file, setFile] = React.useState<File | null>(null);
    const [fileName, setFileName] = React.useState('');
    const [postUrl, setPostUrl] = React.useState('');
    const [videoCoverFile, setVideoCoverFile] = React.useState<File | null>(null);
    const [videoCoverFileName, setVideoCoverFileName] = React.useState('');

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const videoCoverInputRef = React.useRef<HTMLInputElement>(null);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleVideoCoverFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setVideoCoverFile(selectedFile);
            setVideoCoverFileName(selectedFile.name);
        }
    };
    
    const handleSavePost = () => {
        if (!title || !dateTime || !type || !description) {
            // Basic validation
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const date = new Date(dateTime);
        const formattedDate = format(date, "dd 'de' MMM, yyyy", { locale: ptBR });

        const newPost: Omit<Post, 'id' | 'status'> = {
            title,
            date: formattedDate,
            type,
            description,
            socials: socials as any, // Cast for now
            // In a real app, you would handle file upload and get a URL
            // For now, we use a placeholder or the provided URL
            imageUrl: file ? URL.createObjectURL(file) : (videoCoverFile ? URL.createObjectURL(videoCoverFile) : 'https://picsum.photos/seed/newpost/600/400'),
            imageHint: 'new post',
            url: postUrl,
        };

        addPost(newPost);
        
        setOpenNewPost(false);
        // Reset form
        setTitle('');
        setDateTime('');
        setType('');
        setDescription('');
        setSocials([]);
        setFile(null);
        setFileName('');
        setPostUrl('');
        setVideoCoverFile(null);
        setVideoCoverFileName('');
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
                                <Label htmlFor="date" className="text-right">Data e Hora</Label>
                                <Input id="date" type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} className="col-span-3 bg-background/50 dark:bg-black/20" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="attachment" className="text-right">Conteúdo</Label>
                                <div className="col-span-3 flex items-center gap-2">
                                     <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Anexar Arquivo
                                    </Button>
                                    <Input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden" 
                                        onChange={handleFileChange}
                                    />
                                    {fileName && <span className="text-xs text-muted-foreground truncate max-w-xs">{fileName}</span>}
                                </div>
                            </div>
                             {type === 'video' && (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="video-cover" className="text-right">Capa do Vídeo</Label>
                                    <div className="col-span-3 flex items-center gap-2">
                                        <Button variant="outline" onClick={() => videoCoverInputRef.current?.click()}>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Anexar Capa
                                        </Button>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            ref={videoCoverInputRef}
                                            className="hidden"
                                            onChange={handleVideoCoverFileChange}
                                        />
                                        {videoCoverFileName && <span className="text-xs text-muted-foreground truncate max-w-xs">{videoCoverFileName}</span>}
                                    </div>
                                </div>
                            )}
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="postUrl" className="text-right">URL</Label>
                                <div className="col-span-3 relative flex items-center">
                                    <LinkIcon className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="postUrl" placeholder="https://..." value={postUrl} onChange={(e) => setPostUrl(e.target.value)} className="col-span-3 bg-background/50 dark:bg-black/20 pl-10" />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">Tipo de Post</Label>
                                <Select onValueChange={(value) => setType(value as PostType)} value={type}>
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
                <div></div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Fila de Conteúdo</h3>
                <ProjectUpcomingPostsList />
            </div>
        </div>
    )
}

const getPostImage = (post: Post): string => {
    if (post.type === 'carousel' && post.images && post.images.length > 0) {
        return post.images[0].url;
    }
    return post.imageUrl || `https://picsum.photos/seed/post${post.id}/600/400`;
};

const getImageHint = (post: Post): string => {
    if (post.type === 'carousel' && post.images && post.images.length > 0) {
        return post.images[0].hint;
    }
    return post.imageHint || 'placeholder';
}

function AdminApprovalCard({ post, onNotify }: { post: Post, onNotify: (postId: number) => void }) {
    const imageUrl = getPostImage(post);
    const imageHint = getImageHint(post);
    const statusInfo = statusConfig[post.status];

    return (
        <Dialog>
            <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl overflow-hidden group w-full flex flex-col h-full">
                <DialogTrigger asChild>
                    <div className="relative aspect-square cursor-pointer">
                        <Image
                            src={imageUrl}
                            alt={`Capa do post: ${post.title}`}
                            fill
                            className="object-cover"
                            data-ai-hint={imageHint}
                        />
                    </div>
                </DialogTrigger>
                <CardContent className="p-3 flex flex-col flex-grow">
                    <DialogTrigger asChild>
                        <h3 className="font-semibold text-sm mb-2 leading-tight h-10 cursor-pointer hover:underline">{post.title}</h3>
                    </DialogTrigger>
                    <div className={cn("text-xs font-semibold px-2 py-1 rounded-md text-center border mb-3", statusInfo.className)}>
                        {statusInfo.label}
                    </div>
                    <div className="mt-auto">
                        {post.status !== 'notified' && (
                            <Button size="sm" className="w-full" onClick={() => onNotify(post.id)}>
                                <Bell className="mr-2 h-4 w-4" />
                                Notificar Cliente
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
            <PostDialogContent post={post} />
        </Dialog>

    );
}

function ClientApprovals() {
    const { posts, updatePostStatus } = usePosts();
    const { toast } = useToast();

    const handleNotify = (postId: number) => {
        updatePostStatus(postId, 'notified');
        toast({
            title: "Cliente Notificado!",
            description: "O cliente foi notificado sobre o novo post para aprovação.",
            variant: "success",
        });
    };
    
    const awaitingApprovalPosts = posts.filter(p => p.status === 'awaiting_approval');
    const notifiedPosts = posts.filter(p => p.status === 'notified');
    const otherPosts = posts.filter(p => ['in_revision', 'approved', 'scheduled'].includes(p.status));

    const postsToShow = [...awaitingApprovalPosts, ...notifiedPosts, ...otherPosts];

    return (
        <>
            {postsToShow.length > 0 ? (
                <div className="space-y-8">
                     <div>
                        <h2 className="text-xl font-semibold mb-4">Aguardando Aprovação</h2>
                        {awaitingApprovalPosts.length > 0 ? (
                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {awaitingApprovalPosts.map((post) => (
                                    <AdminApprovalCard key={post.id} post={post} onNotify={handleNotify} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Nenhum post aguardando para ser enviado para aprovação.</p>
                        )}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Notificado</h2>
                        {notifiedPosts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {notifiedPosts.map((post) => (
                                    <AdminApprovalCard key={post.id} post={post} onNotify={handleNotify} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Nenhum post pendente de aprovação do cliente.</p>
                        )}
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Outros Status</h2>
                         {otherPosts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {otherPosts.map((post) => (
                                <AdminApprovalCard key={post.id} post={post} onNotify={handleNotify} />
                                ))}
                            </div>
                        ) : (
                             <p className="text-sm text-muted-foreground">Nenhum post com outros status.</p>
                        )}
                    </div>
                </div>

            ) : (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-card/60 dark:bg-black/40 backdrop-blur-lg min-h-[40vh]">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">Nenhum post na fila</h3>
                        <p className="text-sm text-muted-foreground">Crie um novo post para enviar para aprovação.</p>
                    </div>
                </div>
            )}
        </>
    );
}


function ClientCalendar() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-base font-semibold md:text-xl mb-3">Quadro Semanal</h2>
                <KanbanBoard />
            </div>
            <div>
                <h2 className="text-base font-semibold md:text-xl mb-3">Calendário de Conteúdo</h2>
                <FullCalendar />
            </div>
        </div>
    );
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
