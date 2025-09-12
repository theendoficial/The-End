'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, FileWarning, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data for scheduled posts
const scheduledPosts = {
  '2024-07-08': [{ type: 'image' }],
  '2024-07-15': [{ type: 'video' }],
  '2024-07-16': [{ type: 'carousel' }, { type: 'image' }],
  '2024-07-22': [{ type: 'video' }],
  '2024-08-01': [{ type: 'image' }],
  '2024-08-05': [{ type: 'carousel' }],
};

// Mock data for pending items
const pendingItems = {
  approvals: 3,
  documents: 1,
};

type PostType = 'image' | 'video' | 'carousel';

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
    { id: 1, title: 'Lançamento da nova coleção de verão', date: '15 de Jul, 2024', status: 'scheduled' as Status, imageUrl: 'https://picsum.photos/seed/post1/100/100', imageHint: 'fashion summer' },
    { id: 2, title: 'Dicas de estilo para o trabalho', date: '18 de Jul, 2024', status: 'awaiting_approval' as Status, imageUrl: 'https://picsum.photos/seed/post2/100/100', imageHint: 'office style' },
    { id: 3, title: 'Como usar acessórios para transformar o look', date: '22 de Jul, 2024', status: 'in_revision' as Status, imageUrl: 'https://picsum.photos/seed/post3/100/100', imageHint: 'fashion accessories' },
    { id: 4, title: 'Promoção de Aniversário', date: '25 de Jul, 2024', status: 'approved' as Status, imageUrl: 'https://picsum.photos/seed/post4/100/100', imageHint: 'sale promotion' },
    { id: 5, title: 'Post de engajamento semanal', date: '28 de Jul, 2024', status: 'canceled' as Status, imageUrl: 'https://picsum.photos/seed/post5/100/100', imageHint: 'social media' },
    { id: 6, title: 'Tutorial em vídeo: Maquiagem para o dia a dia', date: '02 de Ago, 2024', status: 'completed' as Status, imageUrl: 'https://picsum.photos/seed/post6/100/100', imageHint: 'makeup tutorial' },
]

function CalendarDots({ day }: { day: Date }) {
  const dateString = day.toISOString().split('T')[0];
  const posts = scheduledPosts[dateString as keyof typeof scheduledPosts];

  if (posts) {
    return (
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1">
        {posts.map((post, index) => (
          <span
            key={index}
            className={cn('h-1.5 w-1.5 rounded-full', postColors[post.type as PostType])}
          />
        ))}
      </div>
    );
  }
  return null;
}

export default function DashboardPage() {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <>
      <div className="flex items-center">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold md:text-2xl font-headline">Bem Vindo!</h1>
          <p className="text-sm text-muted-foreground">
            Sua área The End, explore e encontre seu projeto aqui!
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link href="/dashboard/calendar">
            <Card className="hover:bg-accent/50 dark:hover:bg-white/10 transition-colors bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl h-full">
              <CardHeader className="text-center">
                <CardTitle className="font-headline">Calendário de Conteúdo</CardTitle>
              </CardHeader>
              <CardContent>
                <DayPicker
                  locale={ptBR}
                  month={date}
                  onMonthChange={setDate}
                  modifiers={{
                    scheduled: Object.keys(scheduledPosts).map(dateStr => new Date(dateStr + 'T00:00:00'))
                  }}
                  components={{
                    DayContent: (props) => (
                      <div className="relative h-full w-full">
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
                    month: 'space-y-4 w-full',
                    caption: 'flex justify-center pt-1 relative items-center text-foreground',
                    caption_label: 'text-sm font-semibold font-headline',
                    nav: 'space-x-1 flex items-center',
                    nav_button: cn(
                      buttonVariants({ variant: 'outline' }),
                      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-muted-foreground/50 text-foreground'
                    ),
                    nav_button_previous: 'absolute left-1',
                    nav_button_next: 'absolute right-1',
                    table: 'w-full border-collapse space-y-1',
                    head_row: 'flex',
                    head_cell: 'text-muted-foreground rounded-md w-full font-normal text-[0.8rem]',
                    row: 'flex w-full mt-2',
                    cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 w-full rounded-md',
                    day: cn(
                      buttonVariants({ variant: 'ghost' }),
                      'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md'
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
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {Object.entries(postLegends).map(([type, label]) => (
                        <div key={type} className="flex items-center gap-2">
                            <span className={cn('h-3 w-3 rounded-full', postColors[type as PostType])} />
                            <span className="text-xs text-muted-foreground">{label}</span>
                        </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/approvals">
              <Card className="hover:bg-accent/50 dark:hover:bg-white/10 transition-colors bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl h-full">
                  <CardHeader>
                      <CardTitle className="font-headline text-center">Minhas Pendências</CardTitle>
                      <CardDescription className="text-center">
                          Ações necessárias para o andamento do projeto.
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                      {pendingItems.approvals > 0 || pendingItems.documents > 0 ? (
                          <>
                          {pendingItems.approvals > 0 && (
                              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 dark:bg-black/20">
                                  <div className="flex items-center gap-4">
                                      <FileWarning className="h-6 w-6 text-yellow-500" />
                                      <div>
                                          <p className="font-semibold">Posts para Aprovar</p>
                                          <p className="text-sm text-muted-foreground">Aguardando sua revisão</p>
                                      </div>
                                  </div>
                                  <span className="font-bold text-lg">{pendingItems.approvals}</span>
                              </div>
                          )}
                        {pendingItems.documents > 0 && (
                              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 dark:bg-black/20">
                                  <div className="flex items-center gap-4">
                                      <FileWarning className="h-6 w-6 text-orange-500" />
                                      <div>
                                          <p className="font-semibold">Documentos Pendentes</p>
                                          <p className="text-sm text-muted-foreground">Contratos ou arquivos</p>
                                      </div>
                                  </div>
                                  <span className="font-bold text-lg">{pendingItems.documents}</span>
                              </div>
                          )}
                          </>
                      ) : (
                          <div className="flex flex-col items-center justify-center text-center p-8 gap-3">
                              <CheckCircle2 className="h-12 w-12 text-green-500" />
                              <p className="font-semibold text-lg">Nenhuma pendência!</p>
                              <p className="text-sm text-muted-foreground">Você está em dia com suas tarefas.</p>
                          </div>
                      )}
                  </CardContent>
              </Card>
          </Link>
        </div>
        <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="font-headline">Próximos Posts</CardTitle>
            <CardDescription>
              Acompanhe o status das próximas publicações.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {upcomingPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-2 rounded-lg bg-background/50 dark:bg-black/20 hover:bg-accent/50 dark:hover:bg-white/10 transition-colors">
                    <Image 
                        src={post.imageUrl}
                        width={48}
                        height={48}
                        alt={`Preview for ${post.title}`}
                        className="rounded-md object-cover h-12 w-12"
                        data-ai-hint={post.imageHint}
                    />
                    <div className="flex-grow">
                        <p className="font-semibold text-sm">{post.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                    </div>
                    <Badge className={cn('text-xs border', statusConfig[post.status].className)}>
                        {statusConfig[post.status].label}
                    </Badge>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover dark:bg-black/80 backdrop-blur-lg text-popover-foreground dark:text-white border-border dark:border-white/20">
                            <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10">Ver Detalhes</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10">Aprovar</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10 text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400">Reprovar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
