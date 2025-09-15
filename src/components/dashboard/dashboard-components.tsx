
'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, FileWarning, CheckCircle2, MoreHorizontal, Instagram, Youtube } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" {...props}>
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

const scheduledPosts: Record<string, { type: PostType }[]> = {
  '2024-09-09': [{ type: 'video' }],
  '2024-09-10': [{ type: 'image' }],
  '2024-09-11': [{ type: 'carousel' }],
  '2024-09-12': [{ type: 'image' }],
  '2024-09-13': [{ type: 'video' }, {type: 'image'}],
};

const pendingItems = {
  approvals: 3,
  documents: 1,
};

type PostType = 'image' | 'video' | 'carousel';
type SocialNetwork = 'instagram' | 'tiktok' | 'youtube';

const postColors: Record<PostType, string> = {
  image: 'bg-blue-500',
  video: 'bg-pink-500',
  carousel: 'bg-yellow-500',
};

const postLegends: Record<PostType, string> = {
    image: 'Imagem',
    video: 'Vídeo/Reels',
    carousel: 'Carrossel'
}

type Status = 'awaiting_approval' | 'approved' | 'in_revision' | 'scheduled' | 'canceled' | 'completed';

const statusConfig: Record<Status, { label: string; className: string }> = {
    awaiting_approval: { label: 'Aguardando aprovação', className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    approved: { label: 'Aprovado', className: 'bg-green-400/20 text-green-300 border-green-400/30' },
    in_revision: { label: 'Em alteração', className: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
    scheduled: { label: 'Agendado', className: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    canceled: { label: 'Cancelado', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
    completed: { label: 'Concluído', className: 'bg-green-600/20 text-green-500 border-green-600/30' }
};


const upcomingPosts = [
    { id: 1, title: 'Lançamento da nova coleção de verão', date: '09 de Set, 2024', status: 'scheduled' as Status, imageUrl: 'https://picsum.photos/seed/post1/600/600', imageHint: 'fashion summer', type: 'video' as PostType, description: 'Prepare-se para o verão com nossa nova coleção! ☀️ Peças leves, coloridas e cheias de estilo para você brilhar na estação mais quente do ano. #verao2024 #novacolecao #modapraia', socials: ['instagram', 'tiktok'] as SocialNetwork[] },
    { id: 2, title: 'Dicas de estilo para o trabalho', date: '10 de Set, 2024', status: 'awaiting_approval' as Status, imageUrl: 'https://picsum.photos/seed/post2/600/600', imageHint: 'office style', type: 'image' as PostType, description: 'Trabalhar com estilo nunca foi tão fácil. Confira nossas dicas para montar looks incríveis para o escritório. #modanotrabalho #officelook #dicasdeestilo', socials: ['instagram'] as SocialNetwork[] },
    { id: 3, title: 'Como usar acessórios para transformar o look', date: '11 de Set, 2024', status: 'in_revision' as Status, imageUrl: 'https://picsum.photos/seed/post3/600/600', imageHint: 'fashion accessories', type: 'carousel' as PostType, description: 'Um acessório pode mudar tudo! ✨ Veja como colares, brincos e bolsas podem dar um up no seu visual. #acessorios #transformeseulook #modafeminina', socials: ['instagram', 'youtube'] as SocialNetwork[] },
    { id: 4, title: 'Promoção de Aniversário', date: '12 de Set, 2024', status: 'approved' as Status, imageUrl: 'https://picsum.photos/seed/post4/600/600', imageHint: 'sale promotion', type: 'image' as PostType, description: 'É o nosso aniversário, mas quem ganha o presente é você! 🎁 Descontos imperdíveis em todo o site. Corra para aproveitar! #aniversario #promocao #descontos', socials: ['instagram', 'tiktok', 'youtube'] as SocialNetwork[] },
    { id: 5, title: 'Post de engajamento semanal', date: '12 de Set, 2024', status: 'canceled' as Status, imageUrl: 'https://picsum.photos/seed/post5/600/600', imageHint: 'social media', type: 'image' as PostType, description: 'Qual seu look preferido do nosso feed? Conta pra gente nos comentários! 👇 #enquete #interacao #modafashion', socials: ['instagram'] as SocialNetwork[] },
    { id: 6, title: 'Tutorial em vídeo: Maquiagem para o dia a dia', date: '13 de Set, 2024', status: 'completed' as Status, imageUrl: 'https://picsum.photos/seed/post6/600/600', imageHint: 'makeup tutorial', type: 'video' as PostType, description: 'Aprenda a fazer uma maquiagem linda e prática para o dia a dia em menos de 5 minutos! 💄 #makeuptutorial #maquiagemrapida #beleza', socials: ['youtube'] as SocialNetwork[] },
]

const socialIcons: Record<SocialNetwork, React.ComponentType<any>> = {
    instagram: (props) => <Instagram {...props} />,
    tiktok: (props) => <TiktokIcon {...props} />,
    youtube: (props) => <Youtube {...props} />,
};


function CalendarDots({ day }: { day: Date }) {
  const dateString = day.toISOString().split('T')[0];
  const posts = scheduledPosts[dateString as keyof typeof scheduledPosts];

  if (posts) {
    return (
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1">
        {posts.map((post, index) => (
          <span
            key={index}
            className={cn('h-1 w-1 rounded-full', postColors[post.type as PostType])}
          />
        ))}
      </div>
    );
  }
  return null;
}

export function CalendarWidget() {
    const [date, setDate] = React.useState<Date>(new Date(2024, 8, 1));
    return (
        <Card className="hover:bg-accent/50 dark:hover:bg-white/10 transition-colors bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl h-full">
            <CardHeader className="text-center p-3">
                <Link href="/dashboard/calendar">
                    <CardTitle className="font-headline text-sm font-normal">Calendário de Conteúdo</CardTitle>
                </Link>
            </CardHeader>
            <CardContent className="p-3 pt-0">
                <DayPicker
                locale={ptBR}
                month={date}
                onMonthChange={setDate}
                modifiers={{
                    scheduled: Object.keys(scheduledPosts).map(dateStr => new Date(dateStr + 'T00:00:00'))
                }}
                components={{
                    DayContent: (props) => (
                    <div className="relative h-full w-full flex items-center justify-center">
                        <span className="relative z-10">{props.date.getDate()}</span>
                        <CalendarDots day={props.date} />
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
                    {Object.entries(postLegends).map(([type, label]) => (
                        <div key={type} className="flex items-center gap-1.5">
                            <span className={cn('h-1.5 w-1.5 rounded-full', postColors[type as PostType])} />
                            <span className="text-xs text-muted-foreground">{label}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export function PendingApprovalsWidget() {
    const hasApprovals = pendingItems.approvals > 0;

    return (
        <Link href={hasApprovals ? "/dashboard/approvals" : "#"} className="block h-full">
            <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl h-full hover:bg-accent/50 dark:hover:bg-white/10 transition-colors">
                <CardContent className="flex flex-col items-center justify-center text-center p-4 h-full">
                    {hasApprovals ? (
                        <>
                            <FileWarning className="h-8 w-8 text-yellow-500 mb-3" />
                            <p className="font-bold text-3xl text-foreground">{pendingItems.approvals}</p>
                            <p className="font-semibold text-sm text-foreground mt-1">Posts para Aprovar</p>
                            <p className="text-xs text-muted-foreground">Aguardando sua revisão</p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center gap-2">
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                            <p className="font-semibold text-sm">Nenhuma pendência!</p>
                            <p className="text-xs text-muted-foreground">Você está em dia com suas tarefas.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}


export function UpcomingPostsList() {
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
              {upcomingPosts.map((post) => (
                  <PostListItem key={post.id} post={post} />
              ))}
            </CardContent>
          </Card>
    )
}

export function ProjectUpcomingPostsList() {
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
              {upcomingPosts.map((post) => (
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
                            <PostActions post={post} />
                        </TableCell>
                    </TableRow>
                    <PostDialogContent post={post} />
                </Dialog>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

const PostListItem = ({ post }: { post: (typeof upcomingPosts)[0] }) => {
    return (
        <Dialog>
          <div className="flex items-center gap-2 p-1.5 rounded-lg bg-background/50 dark:bg-black/20 ">
              <DialogTrigger asChild>
                  <button className="flex items-center gap-2 text-left flex-grow">
                      <Image 
                          src={post.imageUrl}
                          width={32}
                          height={32}
                          alt={`Preview for ${post.title}`}
                          className="rounded-md object-cover h-8 w-8"
                          data-ai-hint={post.imageHint}
                      />
                      <div className="flex-grow">
                          <p className="font-semibold text-xs leading-tight">{post.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 capitalize">{postLegends[post.type]} - {post.date}</p>
                      </div>
                  </button>
              </DialogTrigger>
              <Badge className={cn('text-[0.6rem] border py-0.5 px-2 font-normal', statusConfig[post.status].className)}>
                  {statusConfig[post.status].label}
              </Badge>
              <PostActions post={post} />
          </div>
          <PostDialogContent post={post} />
        </Dialog>
    )
}

const PostActions = ({ post }: { post: (typeof upcomingPosts)[0] }) => {
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
                <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10">Pedir alteração</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const PostDialogContent = ({ post }: { post: (typeof upcomingPosts)[0] }) => {
    return (
        <DialogContent className="sm:max-w-[800px] bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="rounded-lg overflow-hidden">
                    <Image
                        src={post.imageUrl}
                        width={600}
                        height={600}
                        alt={`Conteúdo do post: ${post.title}`}
                        className="w-full h-full object-cover"
                    />
                </div>
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

                    <div className="mt-4 flex gap-2">
                         <Button variant="outline">Pedir alteração</Button>
                         <Button>Aprovar</Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}
    
