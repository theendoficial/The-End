

'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, FileWarning, CheckCircle2, MoreHorizontal, Instagram, Youtube, Send, ArrowRight, ArrowLeft, Download, Edit, Clock, Check, Trash2 } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { ptBR, set } from 'date-fns/locale';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { buttonVariants, Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent as UiDialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
);


export const projects = [
    // Creative
    { id: 1, name: 'Identidade Visual' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Elaboração de sites' },
    { id: 4, name: 'Roteiros - Estratégia de conteúdo' },
    // Marketing
    { id: 5, name: 'Trafego Pago' },
    { id: 6, name: 'Gestão de Mídias Sociais' },
    { id: 7, name: 'Análise de perfil' },
    { id: 8, name: 'Estratégia de Marketing' },
    // Audiovisual
    { id: 9, name: 'Vídeos curtos' },
    { id: 10, name: 'Vídeos Longos' },
    { id: 11, name: 'Vídeos sequenciais' },
];

export const initialPostsData: Post[] = [];

type PostsContextType = {
    posts: Post[];
    scheduledPosts: Post[];
    updatePostStatus: (postId: number, newStatus: Status) => void;
    addPost: (newPostData: Omit<Post, 'id' | 'status'>) => void;
};

const PostsContext = React.createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = React.useState<Post[]>(initialPostsData);
    const [scheduledPosts, setScheduledPosts] = React.useState<Post[]>([]);

    const addPost = (newPostData: Omit<Post, 'id' | 'status'>) => {
        const newPost: Post = {
            ...newPostData,
            id: Date.now(), // simple unique ID for demo purposes
            status: 'awaiting_approval',
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const updatePostStatus = (postId: number, newStatus: Status) => {
        if (newStatus === 'approved') {
            const postToSchedule = posts.find(p => p.id === postId);
            if (postToSchedule) {
                setScheduledPosts(prev => [...prev, { ...postToSchedule, status: 'scheduled' }]);
                setPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
            }
        } else if (newStatus === 'canceled') {
            setPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
        } else {
            setPosts(currentPosts => currentPosts.map(p =>
                p.id === postId ? { ...p, status: newStatus } : p
            ));
        }
    };

    return (
        <PostsContext.Provider value={{ posts, scheduledPosts, updatePostStatus, addPost }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => {
    const context = React.useContext(PostsContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
};

export type PostType = 'image' | 'video' | 'carousel' | 'meeting' | 'delivery' | 'strategy';
type SocialNetwork = 'instagram' | 'tiktok' | 'youtube';

export const postColors: Record<string, string> = {
  image: 'bg-blue-500',
  video: 'bg-pink-500',
  carousel: 'bg-yellow-500',
  meeting: 'bg-purple-500',
  delivery: 'bg-green-500',
  strategy: 'bg-cyan-500'
};

export const postLegends: Record<string, string> = {
    image: 'Imagem',
    video: 'Vídeo/Reels',
    carousel: 'Carrossel'
}

const allPostLegends: Record<string, string> = {
    ...postLegends,
    meeting: 'Reunião',
    delivery: 'Entrega',
    strategy: 'Estratégia'
}

export type Status = 'awaiting_approval' | 'approved' | 'in_revision' | 'scheduled' | 'canceled' | 'completed';

export type PostImage = {
    url: string;
    hint: string;
};

export type Post = {
    id: number;
    title: string;
    date: string;
    status: Status;
    imageUrl?: string;
    imageHint?: string;
    images?: PostImage[];
    type: PostType;
    description: string;
    socials: SocialNetwork[];
    url?: string;
};

export const statusConfig: Record<Status, { label: string; className: string }> = {
    awaiting_approval: { label: 'Aguardando aprovação', className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    approved: { label: 'Aprovado', className: 'bg-green-400/20 text-green-300 border-green-400/30' },
    in_revision: { label: 'Em alteração', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    scheduled: { label: 'Agendado', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    canceled: { label: 'Cancelado', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
    completed: { label: 'Concluído', className: 'bg-green-600/20 text-green-500 border-green-600/30' }
};

const socialIcons: Record<SocialNetwork, React.ComponentType<any>> = {
    instagram: (props) => <Instagram {...props} />,
    tiktok: (props) => <TiktokIcon className="h-4 w-4" {...props} />,
    youtube: (props) => <Youtube {...props} />,
};

function parseDate(dateStr: string): Date {
    // Handles both 'YYYY-MM-DD' and 'DD de Mmm, YYYY'
    if (dateStr.includes('-')) {
        return new Date(dateStr + 'T00:00:00'); // Assume start of day for YYYY-MM-DD
    }

    const months: { [key: string]: number } = {
        'Jan': 0, 'Fev': 1, 'Mar': 2, 'Abr': 3, 'Mai': 4, 'Jun': 5,
        'Jul': 6, 'Ago': 7, 'Set': 8, 'Out': 9, 'Nov': 10, 'Dez': 11
    };
    // "20 de Set, 2025" -> ["20", "Set", "2025"]
    const parts = dateStr.replace(/,/g, '').replace('de ', '').split(' ');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = months[parts[1]];
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && month !== undefined && !isNaN(year)) {
            return new Date(year, month, day);
        }
    }
    // Fallback for invalid formats
    return new Date();
}


function CalendarDots({ day, events }: { day: Date, events: Record<string, { type: any }[]> }) {
    const dateString = day.toISOString().split('T')[0];
    const postsForDay = events[dateString];

    if (postsForDay) {
        return (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1">
                {postsForDay.slice(0, 3).map((post, index) => (
                    <span
                        key={index}
                        className={cn('h-1 w-1 rounded-full', postColors[post.type])}
                    />
                ))}
            </div>
        );
    }
    return null;
}

export function CalendarWidget() {
    const { scheduledPosts } = usePosts();
    const [date, setDate] = React.useState<Date>(new Date());

    const allScheduledEvents = React.useMemo(() => {
        const events: Record<string, { type: any }[]> = {};
        scheduledPosts.forEach(post => {
            const postDate = parseDate(post.date);
            const dateString = postDate.toISOString().split('T')[0];
            if (!events[dateString]) {
                events[dateString] = [];
            }
            events[dateString].push({ type: post.type });
        });
        return events;
    }, [scheduledPosts]);

    const scheduledDays = React.useMemo(() => {
        return Object.keys(allScheduledEvents).map(dateStr => new Date(dateStr + 'T00:00:00'));
    }, [allScheduledEvents]);

    return (
        <Card className="hover:bg-accent/50 dark:hover:bg-white/10 transition-colors bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl h-full">
            <CardHeader className="p-3">
                <Link href="/dashboard/calendar" className="text-center">
                    <CardTitle className="font-headline text-sm font-normal">Calendário de Conteúdo</CardTitle>
                </Link>
            </CardHeader>
            <CardContent className="p-3 pt-0">
                <DayPicker
                    locale={ptBR}
                    month={date}
                    onMonthChange={setDate}
                    modifiers={{
                        scheduled: scheduledDays
                    }}
                    components={{
                        DayContent: (props) => (
                            <div className="relative h-full w-full flex items-center justify-center">
                                <span className="relative z-10">{props.date.getDate()}</span>
                                <CalendarDots day={props.date} events={allScheduledEvents} />
                            </div>
                        ),
                        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                    }}
                    className="p-0"
                    classNames={{
                        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                        month: 'space-y-2 w-full',
                        caption: 'flex justify-center pt-1 relative items-center text-foreground',
                        caption_label: 'text-xs font-semibold font-headline',
                        nav: 'space-x-1 flex items-center',
                        nav_button: cn(
                            buttonVariants({ variant: 'outline' }),
                            'h-5 w-5 bg-transparent p-0 opacity-50 hover:opacity-100 border-muted-foreground/50 text-foreground'
                        ),
                        nav_button_previous: 'absolute left-1',
                        nav_button_next: 'absolute right-1',
                        table: 'w-full border-collapse space-y-1',
                        head_row: 'flex',
                        head_cell: 'text-muted-foreground rounded-md w-full font-normal text-[0.6rem]',
                        row: 'flex w-full mt-1',
                        cell: 'text-center text-xs p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 w-full rounded-md',
                        day: cn(
                            buttonVariants({ variant: 'ghost' }),
                            'h-7 w-7 p-0 font-normal aria-selected:opacity-100 rounded-md'
                        ),
                        day_selected:
                            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                        day_today: 'bg-accent text-accent-foreground',
                        day_outside: 'text-muted-foreground opacity-50',
                        day_disabled: 'text-muted-foreground opacity-50',
                        day_range_middle:
                            'aria-selected:bg-accent aria-selected:text-accent-foreground',
                        day_hidden: 'invisible',
                    }}
                />
                <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
                    {Object.entries(allPostLegends).map(([type, label]) => (
                        <div key={type} className="flex items-center gap-1.5">
                            <span className={cn('h-1.5 w-1.5 rounded-full', postColors[type])} />
                            <span className="text-xs text-muted-foreground">{label}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export function PendingApprovalsWidget() {
    const { posts } = usePosts();
    const pendingApprovalsCount = posts.filter(p => p.status === 'awaiting_approval').length;
    const hasApprovals = pendingApprovalsCount > 0;

    return (
        <Link href={hasApprovals ? "/dashboard/approvals" : "#"} className="block h-full">
            <Card className="flex flex-col bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl h-full hover:bg-accent/50 dark:hover:bg-white/10 transition-colors">
                <CardHeader>
                    <CardTitle className="text-sm font-normal text-center">Conteúdos para Aprovar</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow items-center justify-center text-center p-4 pt-0">
                    {hasApprovals ? (
                        <>
                            <div className="relative">
                                <FileWarning className="h-8 w-8 text-yellow-500" />
                                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">{pendingApprovalsCount}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Aguardando sua revisão</p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center gap-2">
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                            <p className="font-semibold text-sm mt-2">Nenhuma pendência!</p>
                            <p className="text-xs text-muted-foreground">Você está em dia com suas tarefas.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}


export function UpcomingPostsList() {
    const { posts, scheduledPosts } = usePosts();
    const allPosts = [...posts, ...scheduledPosts].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

    return (
        <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
             <CardHeader className="p-3">
                <Link href="/dashboard/approvals">
                    <CardTitle className="font-headline text-sm font-normal">Próximos Posts</CardTitle>
                    <CardDescription className="text-xs">
                        Acompanhe o status das próximas publicações.
                    </CardDescription>
                </Link>
            </CardHeader>
            <CardContent className="flex flex-col gap-1.5 p-3 pt-0">
                {allPosts.length > 0 ? (
                    allPosts.map((post) => (
                        <PostListItem key={post.id} post={post} />
                    ))
                ) : (
                    <p className="text-xs text-muted-foreground text-center py-4">Nenhum post agendado.</p>
                )}
            </CardContent>
          </Card>
    )
}

export function ProjectUpcomingPostsList() {
    const { posts, scheduledPosts, updatePostStatus } = usePosts();
    const allPosts = [...posts, ...scheduledPosts].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());


    const handleRequestChange = (postId: number, comment: string) => {
        console.log(`Change request for post ID ${postId}: "${comment}". Status changed to in_revision.`);
        updatePostStatus(postId, 'in_revision');
    };

    return (
      <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b-white/10">
                <TableHead className="text-muted-foreground font-normal">Nome do Post</TableHead>
                <TableHead className="text-muted-foreground font-normal">Tipo</TableHead>
                <TableHead className="text-muted-foreground font-normal">Data</TableHead>
                <TableHead className="text-muted-foreground font-normal">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPosts.length > 0 ? (
                allPosts.map((post) => (
                    <Dialog key={post.id}>
                        <TableRow className="border-b-white/10">
                            <TableCell>
                                <DialogTrigger asChild>
                                    <button className="font-medium text-left hover:underline">{post.title}</button>
                                </DialogTrigger>
                            </TableCell>
                            <TableCell className="capitalize text-muted-foreground">{postLegends[post.type]}</TableCell>
                            <TableCell className="text-muted-foreground">{post.date}</TableCell>
                            <TableCell>
                                <Badge className={cn('text-[0.6rem] border py-0.5 px-2 font-normal', statusConfig[post.status].className)}>
                                    {statusConfig[post.status].label}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <PostActions post={post} onRequestChange={handleRequestChange} />
                            </TableCell>
                        </TableRow>
                        <PostDialogContent post={post} onRequestChange={handleRequestChange} />
                    </Dialog>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        Nenhum post encontrado.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

const PostListItem = ({ post }: { post: Post }) => {
    const postImage = post.imageUrl || (post.images && post.images[0].url);
    const postHint = post.imageHint || (post.images && post.images[0].hint);
    const { updatePostStatus } = usePosts();

    return (
        <Dialog>
          <div className="flex items-center gap-2 p-1.5 rounded-lg bg-background/50 dark:bg-black/20 ">
              <DialogTrigger asChild>
                  <button className="flex items-center gap-2 text-left flex-grow">
                      {postImage && (
                          <Image 
                              src={postImage}
                              width={32}
                              height={32}
                              alt={`Preview for ${post.title}`}
                              className="rounded-md object-cover h-8 w-8"
                              data-ai-hint={postHint}
                          />
                      )}
                      <div className="flex-grow">
                          <p className="font-semibold text-xs leading-tight">{post.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 capitalize">{postLegends[post.type as keyof typeof postLegends]} - {post.date}</p>
                      </div>
                  </button>
              </DialogTrigger>
              <Badge className={cn('text-[0.6rem] border py-0.5 px-2 font-normal', statusConfig[post.status].className)}>
                  {statusConfig[post.status].label}
              </Badge>
              <PostActions post={post} onRequestChange={(postId, comment) => updatePostStatus(postId, 'in_revision')} />
          </div>
          <PostDialogContent post={post} onRequestChange={(postId, comment) => updatePostStatus(postId, 'in_revision')} />
        </Dialog>
    )
}

type PostActionsProps = {
    post: Post;
    onRequestChange?: (postId: number, comment: string) => void;
};

const PostActions = ({ post, onRequestChange }: PostActionsProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover dark:bg-black/80 backdrop-blur-lg text-popover-foreground dark:text-white border-border dark:border-white/20">
                <DialogTrigger asChild>
                    <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10">Ver Detalhes</DropdownMenuItem>
                </DialogTrigger>
                {onRequestChange && ['awaiting_approval', 'scheduled'].includes(post.status) && (
                    <RequestChangeDialog post={post} onConfirm={onRequestChange}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="focus:bg-accent dark:focus:bg-white/10">Pedir alteração</DropdownMenuItem>
                    </RequestChangeDialog>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


type RequestChangeDialogProps = {
    post: Post;
    children: React.ReactNode;
    onConfirm: (postId: number, comment: string) => void;
};

export const RequestChangeDialog = ({ post, children, onConfirm }: RequestChangeDialogProps) => {
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(post.id, comment);
        setComment('');
        setOpen(false); // Close the dialog
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <UiDialogContent className="sm:max-w-md bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Pedir Alteração</DialogTitle>
                        <DialogDescription>
                            Descreva abaixo qual alteração você gostaria de solicitar para o post "{post.title}".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Textarea
                            name="comment"
                            placeholder="Ex: Gostaria de alterar a cor de fundo para um tom mais claro..."
                            className="min-h-[120px] bg-background/50 dark:bg-black/20"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">
                            <Send className="mr-2 h-4 w-4" />
                            Enviar
                        </Button>
                    </DialogFooter>
                </form>
            </UiDialogContent>
        </Dialog>
    )
}

type ApprovalActionsProps = {
    post: Post;
    onAction: (postId: number, newStatus: Status) => void;
};

const ApprovalActions = ({ post, onAction }: ApprovalActionsProps) => {
    if (post.status === 'in_revision') {
        return <Badge variant="outline" className="border-yellow-500/80 bg-yellow-500/10 text-yellow-400 py-1 px-3"><Clock className="mr-2 h-4 w-4" />Em Alteração</Badge>;
    }
    
    return (
        <div className="mt-4 flex flex-col gap-2">
            <div className="flex gap-2">
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full flex items-center justify-center">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta ação não pode ser desfeita. O post "{post.title}" será permanentemente cancelado.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Não, voltar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onAction(post.id, 'canceled')}>Sim, cancelar post</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Button onClick={() => onAction(post.id, 'approved')} variant="secondary" className="bg-green-500/80 hover:bg-green-500/100 text-white w-full">
                    <Check className="mr-2 h-4 w-4" />
                    Aprovar
                </Button>
            </div>
             <RequestChangeDialog post={post} onConfirm={(postId, comment) => {
                console.log(`Solicitação de alteração para o post ${postId}: ${comment}`);
                onAction(postId, 'in_revision');
            }}>
                <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Pedir Alteração
                </Button>
            </RequestChangeDialog>
        </div>
    );
}

export type PostDialogContentProps = {
    post: Post;
    onRequestChange?: (postId: number, comment: string) => void;
    children?: React.ReactNode;
    showExtraActions?: boolean;
    onAction?: (postId: number, newStatus: Status) => void;
};

export const PostDialogContent = ({ post, onRequestChange, children, showExtraActions, onAction }: PostDialogContentProps) => {
    const canRequestChange = onRequestChange && ['approved', 'scheduled', 'completed'].includes(post.status);
    const isVideoProjectPost = post.type === 'video' && !onRequestChange;

    const PostMedia = () => {
        if (post.type === 'carousel' && post.images && post.images.length > 0) {
            return (
                <Carousel className="w-full">
                    <CarouselContent>
                        {post.images.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="aspect-square w-full rounded-lg overflow-hidden">
                                    <Image
                                        src={image.url}
                                        width={600}
                                        height={600}
                                        alt={`Conteúdo do post ${post.title}, imagem ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        data-ai-hint={image.hint}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-none hover:bg-black/70" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-none hover:bg-black/70" />
                </Carousel>
            )
        }
        if (post.imageUrl) {
             return (
                <div className="rounded-lg overflow-hidden aspect-square">
                    <Image
                        src={post.imageUrl}
                        width={600}
                        height={600}
                        alt={`Conteúdo do post: ${post.title}`}
                        className="w-full h-full object-cover"
                        data-ai-hint={post.imageHint}
                    />
                </div>
            )
        }
        return null;
    }

    return (
        <UiDialogContent className="sm:max-w-[800px] bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <PostMedia />
                <div className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle className="text-xl">{post.title}</DialogTitle>
                        <DialogDescription>{post.date}</DialogDescription>
                    </DialogHeader>
                    
                    <div>
                        <h4 className="font-semibold text-sm mb-2">Legenda</h4>
                        <p className="text-sm text-muted-foreground">{post.description}</p>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-sm mb-2">Redes Sociais</h4>
                        <div className="flex items-center gap-3">
                            {post.socials.map(social => {
                                const Icon = socialIcons[social];
                                return Icon ? <Icon key={social} className="text-muted-foreground h-5 w-5" /> : null;
                            })}
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                         {canRequestChange && onRequestChange && (
                             <RequestChangeDialog post={post} onConfirm={onRequestChange}>
                                 <Button variant='outline'>Pedir alteração</Button>
                             </RequestChangeDialog>
                         )}
                         {isVideoProjectPost && post.url && (
                             <Button asChild>
                                 <a href={post.url} download>
                                     <Download className="mr-2 h-4 w-4" />
                                     Baixar Vídeo
                                 </a>
                             </Button>
                         )}
                          {showExtraActions && onAction && <ApprovalActions post={post} onAction={onAction} />}
                    </div>
                     {children}
                </div>
            </div>
        </UiDialogContent>
    )
}

export function FeedPreview() {
    const { scheduledPosts } = usePosts();
    const feedPosts = scheduledPosts
        .filter(post => ['scheduled', 'completed'].includes(post.status))
        .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

    const getPostImage = (post: Post): PostImage | null => {
        if (post.type === 'carousel' && post.images && post.images.length > 0) {
            return post.images[0];
        }
        if (post.imageUrl) {
            return { url: post.imageUrl, hint: post.imageHint || '' };
        }
        return null;
    }

    return (
        <div className="flex justify-center">
             {feedPosts.length > 0 ? (
                <div className="grid grid-cols-3 gap-1 max-w-2xl w-full">
                    {feedPosts.map(post => {
                        const image = getPostImage(post);
                        return (
                            <div key={post.id} className="aspect-square bg-card/60 dark:bg-black/40 rounded-sm overflow-hidden">
                                {image && (
                                    <Image
                                        src={image.url}
                                        alt={`Feed preview: ${post.title}`}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                        data-ai-hint={image.hint}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center text-muted-foreground py-10">
                    <p>O feed aparecerá aqui quando houver posts publicados.</p>
                </div>
            )}
        </div>
    );
}

    

    






