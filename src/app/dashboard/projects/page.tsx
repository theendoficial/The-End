
'use client';

import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

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
    { id: 1, title: 'Lançamento da nova coleção de verão', date: '09 de Set, 2024', status: 'scheduled' as Status, imageUrl: 'https://picsum.photos/seed/post1/100/100', imageHint: 'fashion summer' },
    { id: 2, title: 'Dicas de estilo para o trabalho', date: '10 de Set, 2024', status: 'awaiting_approval' as Status, imageUrl: 'https://picsum.photos/seed/post2/100/100', imageHint: 'office style' },
    { id: 3, title: 'Como usar acessórios para transformar o look', date: '11 de Set, 2024', status: 'in_revision' as Status, imageUrl: 'https://picsum.photos/seed/post3/100/100', imageHint: 'fashion accessories' },
    { id: 4, title: 'Promoção de Aniversário', date: '12 de Set, 2024', status: 'approved' as Status, imageUrl: 'https://picsum.photos/seed/post4/100/100', imageHint: 'sale promotion' },
    { id: 5, title: 'Post de engajamento semanal', date: '12 de Set, 2024', status: 'canceled' as Status, imageUrl: 'https://picsum.photos/seed/post5/100/100', imageHint: 'social media' },
    { id: 6, title: 'Tutorial em vídeo: Maquiagem para o dia a dia', date: '13 de Set, 2024', status: 'completed' as Status, imageUrl: 'https://picsum.photos/seed/post6/100/100', imageHint: 'makeup tutorial' },
]

export default function ProjectsPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Meus Projetos</h1>
      </div>
      <Link href="/dashboard/approvals" className="block">
          <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl hover:bg-accent/50 dark:hover:bg-white/10 transition-colors">
            <CardHeader className="p-3">
              <CardTitle className="font-headline text-sm font-medium">Próximos Posts</CardTitle>
              <CardDescription className="text-xs">
                Acompanhe o status das próximas publicações.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1.5 p-3 pt-0">
              {upcomingPosts.map((post) => (
                  <div key={post.id} className="flex items-center gap-2 p-1.5 rounded-lg bg-background/50 dark:bg-black/20 ">
                      <Image 
                          src={post.imageUrl}
                          width={32}
                          height={32}
                          alt={`Preview for ${post.title}`}
                          className="rounded-md object-cover h-8 w-8"
                          data-ai-hint={post.imageHint}
                      />
                      <div className="flex-grow">
                          <p className="font-semibold text-xs">{post.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{post.date}</p>
                      </div>
                      <Badge className={cn('text-[0.6rem] border py-0.5 px-2', statusConfig[post.status].className)}>
                          {statusConfig[post.status].label}
                      </Badge>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md">
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
      </Link>
    </>
  );
}
