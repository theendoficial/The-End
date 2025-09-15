
'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Video, Users, FileText, GripVertical } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type PostType = 'image' | 'video' | 'carousel' | 'meeting' | 'delivery';

const postColors: Record<PostType, string> = {
  image: 'bg-blue-500',
  video: 'bg-pink-500',
  carousel: 'bg-yellow-500',
  meeting: 'bg-purple-500',
  delivery: 'bg-green-500',
};

const postLegends: Record<PostType, string> = {
    image: 'Imagem',
    video: 'Vídeo/Reels',
    carousel: 'Carrossel',
    meeting: 'Reunião',
    delivery: 'Entrega'
}

// Same data from dashboard-components, but could be fetched from an API
const scheduledPosts: Record<string, { type: PostType }[]> = {
  '2024-09-09': [{ type: 'video' }],
  '2024-09-10': [{ type: 'image' }],
  '2024-09-11': [{ type: 'carousel' }],
  '2024-09-12': [{ type: 'image' }],
  '2024-09-13': [{ type: 'video' }, {type: 'image'}],
  '2024-09-20': [{ type: 'delivery' }],
  '2024-09-25': [{ type: 'meeting' }],
};


function CalendarDots({ day }: { day: Date }) {
  const dateString = day.toISOString().split('T')[0];
  const posts = scheduledPosts[dateString as keyof typeof scheduledPosts];

  if (posts) {
    return (
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex space-x-1">
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


export function FullCalendar() {
    const [date, setDate] = React.useState<Date>(new Date(2024, 8, 1));
    return (
        <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
            <CardContent className="p-4">
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
                    head_cell: 'text-muted-foreground rounded-md w-full font-normal text-sm',
                    row: 'flex w-full mt-2',
                    cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 w-full rounded-md h-12',
                    day: cn(
                        buttonVariants({ variant: 'ghost' }),
                        'h-12 w-full p-0 font-normal aria-selected:opacity-100 rounded-md'
                    ),
                    day_selected:
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                    day_today: 'bg-accent text-accent-foreground',
                    day_outside: 'text-muted-foreground opacity-50',
                    day_disabled: 'text-muted-foreground opacity-50',
                    day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
                    day_hidden: 'invisible',
                }}
                />
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {Object.entries(postLegends).map(([type, label]) => (
                        <div key={type} className="flex items-center gap-2">
                            <span className={cn('h-2 w-2 rounded-full', postColors[type as PostType])} />
                            <span className="text-sm text-muted-foreground">{label}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

const kanbanTasks = [
    { id: 'task-1', column: 'todo', title: 'Gravar reels "Look do dia"', type: 'video', project: { id: 9, name: 'Vídeos curtos' } },
    { id: 'task-2', column: 'todo', title: 'Reunião de pauta semanal', type: 'meeting' },
    { id: 'task-3', column: 'todo', title: 'Definir estratégia para campanha de Dia das Mães', type: 'strategy', project: { id: 8, name: 'Estratégia de Marketing' } },
    { id: 'task-4', column: 'in-progress', title: 'Editando vídeo review de produto', type: 'video', project: { id: 10, name: 'Vídeos Longos' } },
    { id: 'task-5', column: 'in-progress', title: 'Criando carrossel "5 dicas de estilo"', type: 'content', project: { id: 6, name: 'Gestão de Mídias Sociais' } },
    { id: 'task-6', column: 'approval', title: 'Post "Promoção de Outono"', type: 'content', project: { id: 6, name: 'Gestão de Mídias Sociais' } },
    { id: 'task-7', column: 'approval', title: 'Sequência de Stories "Bastidores"', type: 'video', project: { id: 11, name: 'Vídeos sequenciais' } },
    { id: 'task-8', column: 'done', title: 'Vídeo "Tutorial de Maquiagem"', type: 'video', project: { id: 9, name: 'Vídeos curtos' } },
];

const kanbanColumns = [
    { id: 'todo', title: 'A Fazer', color: 'bg-gray-500/20' },
    { id: 'in-progress', title: 'Em Andamento', color: 'bg-blue-500/20' },
    { id: 'approval', title: 'Aprovação', color: 'bg-purple-500/20' },
    { id: 'done', title: 'Concluído', color: 'bg-green-500/20' },
];

const taskIcons: Record<string, React.ComponentType<any>> = {
    video: (props) => <Video {...props} />,
    meeting: (props) => <Users {...props} />,
    content: (props) => <FileText {...props} />,
    strategy: (props) => <FileText {...props} />,
};

const TaskCard = ({ task }: { task: typeof kanbanTasks[0] }) => {
    const Icon = taskIcons[task.type];
    return (
        <Card className="p-3 bg-card/80 dark:bg-black/50 border-white/5 cursor-grab active:cursor-grabbing">
            <div className="flex items-start justify-between">
                <p className="font-semibold text-sm mb-2">{task.title}</p>
                <GripVertical className="h-5 w-5 text-muted-foreground/50" />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                    {Icon && <Icon className="h-4 w-4" />}
                    {task.project ? (
                        <Link href={`/dashboard/projects/${task.project.id}`} className="text-xs hover:underline">{task.project.name}</Link>
                    ) : (
                        <span className="text-xs capitalize">{task.type === 'meeting' ? 'Reunião' : 'Estratégia'}</span>
                    )}
                </div>
            </div>
        </Card>
    );
}

export const KanbanBoard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kanbanColumns.map(column => (
                <div key={column.id} className={cn("rounded-lg p-3", column.color)}>
                    <h3 className="font-semibold mb-3 text-center">{column.title}</h3>
                    <div className="flex flex-col gap-3">
                        {kanbanTasks
                            .filter(task => task.column === column.id)
                            .map(task => <TaskCard key={task.id} task={task} />)
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}
