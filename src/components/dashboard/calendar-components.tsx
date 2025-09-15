
'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { startOfWeek, endOfWeek, isWithinInterval, getDay } from 'date-fns';
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

type TaskStatus = 'todo' | 'in-progress' | 'approval' | 'done';

const getWeekTasks = () => {
    const today = new Date();
    // Setting a fixed date for deterministic testing, e.g., a Wednesday
    const referenceDate = new Date('2024-09-11T12:00:00');
    const weekStart = startOfWeek(referenceDate, { weekStartsOn: 1 }); // Monday
    const weekEnd = endOfWeek(referenceDate, { weekStartsOn: 1 });

    const allTasks = [
        // This Week's Tasks
        { id: 'task-1', status: 'todo', title: 'Gravar reels "Look do dia"', type: 'video', project: { id: 9, name: 'Vídeos curtos' }, date: new Date('2024-09-09T10:00:00') }, // Monday
        { id: 'task-2', status: 'todo', title: 'Reunião de pauta semanal', type: 'meeting', date: new Date('2024-09-09T14:00:00') }, // Monday
        { id: 'task-3', status: 'todo', title: 'Definir estratégia para campanha Dia das Mães', type: 'strategy', project: { id: 8, name: 'Estratégia de Marketing' }, date: new Date('2024-09-10T11:00:00') }, // Tuesday
        { id: 'task-4', status: 'in-progress', title: 'Editando vídeo review de produto', type: 'video', project: { id: 10, name: 'Vídeos Longos' }, date: new Date('2024-09-11T09:00:00') }, // Wednesday
        { id: 'task-5', status: 'in-progress', title: 'Criando carrossel "5 dicas de estilo"', type: 'content', project: { id: 6, name: 'Gestão de Mídias Sociais' }, date: new Date('2024-09-12T15:00:00') }, // Thursday
        { id: 'task-6', status: 'approval', title: 'Post "Promoção de Outono"', type: 'content', project: { id: 6, name: 'Gestão de Mídias Sociais' }, date: new Date('2024-09-13T10:00:00') }, // Friday
        { id: 'task-7', status: 'approval', title: 'Sequência de Stories "Bastidores"', type: 'video', project: { id: 11, name: 'Vídeos sequenciais' }, date: new Date('2024-09-13T16:00:00') }, // Friday
        { id: 'task-8', status: 'done', title: 'Vídeo "Tutorial de Maquiagem"', type: 'video', project: { id: 9, name: 'Vídeos curtos' }, date: new Date('2024-09-10T18:00:00') }, // Tuesday
    ];

    return allTasks.filter(task => isWithinInterval(task.date, { start: weekStart, end: weekEnd }));
};

const weekDaysColumns = [
    { id: 1, title: 'Segunda' },
    { id: 2, title: 'Terça' },
    { id: 3, title: 'Quarta' },
    { id: 4, title: 'Quinta' },
    { id: 5, title: 'Sexta' },
    { id: 6, title: 'Sábado' },
    { id: 0, title: 'Domingo' },
];

const statusColors: Record<TaskStatus, string> = {
    todo: 'bg-gray-400',
    'in-progress': 'bg-blue-500',
    approval: 'bg-purple-500',
    done: 'bg-green-500',
};


const taskIcons: Record<string, React.ComponentType<any>> = {
    video: (props) => <Video {...props} />,
    meeting: (props) => <Users {...props} />,
    content: (props) => <FileText {...props} />,
    strategy: (props) => <FileText {...props} />,
};

const TaskCard = ({ task }: { task: ReturnType<typeof getWeekTasks>[0] }) => {
    const Icon = taskIcons[task.type];
    return (
        <Card className="p-3 bg-card/80 dark:bg-black/50 border-l-4 cursor-grab active:cursor-grabbing" style={{ borderLeftColor: statusColors[task.status] }}>
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
                 <Badge variant="outline" className="text-xs font-normal">{task.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Badge>
            </div>
        </Card>
    );
}

export const KanbanBoard = () => {
    const [tasks, setTasks] = React.useState<ReturnType<typeof getWeekTasks>>([]);

    React.useEffect(() => {
        setTasks(getWeekTasks());
    }, []);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {weekDaysColumns.map(column => (
                <div key={column.id} className={cn("rounded-lg p-3 bg-card/40 dark:bg-black/20")}>
                    <h3 className="font-semibold mb-3 text-center text-sm">{column.title}</h3>
                    <div className="flex flex-col gap-3 min-h-[100px]">
                        {tasks
                            .filter(task => getDay(task.date) === column.id)
                            .sort((a, b) => a.date.getTime() - b.date.getTime())
                            .map(task => <TaskCard key={task.id} task={task} />)
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

    