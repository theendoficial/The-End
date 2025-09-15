
'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { 
    startOfWeek, 
    endOfWeek, 
    isWithinInterval, 
    getDay, 
    format, 
    startOfMonth, 
    endOfMonth, 
    eachDayOfInterval, 
    isSameMonth, 
    isToday,
    addMonths,
    subMonths,
    isSameDay
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Video, Users, FileText, GripVertical, Calendar as CalendarIcon, Tag, Info } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants, Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { scheduledPosts, postColors, postLegends, PostType, Post, PostDialogContent, initialPostsData } from './dashboard-components';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const allPostLegends: Record<string, string> = {
    ...postLegends,
    meeting: 'Reunião',
    delivery: 'Entrega',
    strategy: 'Estratégia'
};

const allPostColors: Record<string, string> = {
    ...postColors,
    meeting: 'bg-purple-500',
    delivery: 'bg-green-500',
    strategy: 'bg-cyan-500'
};


type TaskStatus = 'todo' | 'in-progress' | 'approval' | 'done';

const getWeekTasks = () => {
    const allTasks: (Task | PostTask)[] = [];
    return allTasks;
};

const allScheduledEvents = getWeekTasks();

const weekDaysColumns = [
    { id: 0, title: 'Domingo' },
    { id: 1, title: 'Segunda' },
    { id: 2, title: 'Terça' },
    { id: 3, title: 'Quarta' },
    { id: 4, title: 'Quinta' },
    { id: 5, title: 'Sexta' },
    { id: 6, title: 'Sábado' },
];

const statusConfig: Record<TaskStatus, { label: string; color: string; className: string }> = {
    todo: { label: 'A fazer', color: 'bg-gray-400', className: 'bg-gray-800/20 border-gray-600/80 text-gray-300' },
    'in-progress': { label: 'Em progresso', color: 'bg-blue-500', className: 'bg-blue-800/20 border-blue-600/80 text-blue-300' },
    approval: { label: 'Aprovação', color: 'bg-purple-500', className: 'bg-purple-800/20 border-purple-600/80 text-purple-300' },
    done: { label: 'Concluído', color: 'bg-green-500', className: 'bg-green-800/20 border-green-600/80 text-green-300' },
};


const taskIcons: Record<string, React.ComponentType<any>> = {
    video: (props) => <Video {...props} />,
    meeting: (props) => <Users {...props} />,
    image: (props) => <FileText {...props} />,
    carousel: (props) => <FileText {...props} />,
    strategy: (props) => <FileText {...props} />,
};

type ProjectInfo = { id: number; name: string };
type BaseTask = {
    id: string;
    title: string;
    date: Date;
    type: PostType;
    project: ProjectInfo;
    status: TaskStatus;
}
type Task = BaseTask & { type: Exclude<PostType, 'post'> };
type PostTask = BaseTask & { type: 'video' | 'image' | 'carousel'; postData: Post };

const TaskDialogContent = ({ task }: { task: Task }) => {
    const Icon = taskIcons[task.type];
    const statusInfo = statusConfig[task.status as TaskStatus];
    return (
        <DialogContent className="sm:max-w-md bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
            <DialogHeader>
                <DialogTitle>{task.title}</DialogTitle>
                <DialogDescription>
                    {task.project ? (
                        <Link href={`/dashboard/projects/${task.project.id}`} className="hover:underline">
                            {task.project.name}
                        </Link>
                    ) : (
                        <span className="capitalize">{allPostLegends[task.type]}</span>
                    )}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{format(task.date, "eeee, dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}</span>
                </div>
                <div className="flex items-center gap-4">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="outline" className={cn('text-xs font-normal border', statusInfo.className)}>
                        {statusInfo.label}
                    </Badge>
                </div>
                <div className="flex items-center gap-4">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm capitalize">{allPostLegends[task.type]}</span>
                </div>
            </div>
        </DialogContent>
    );
};


const TaskCard = ({ task }: { task: Task | PostTask }) => {
    const Icon = taskIcons[task.type];
    const statusInfo = statusConfig[task.status as TaskStatus];
    
    // This is a special task that should render the post dialog
    if ('postData' in task && task.postData) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <div className={cn("w-full p-2 rounded-lg cursor-pointer flex flex-col items-center justify-center gap-1 h-16 border-l-4", statusInfo.color)} style={{borderLeftColor: statusInfo.color}}>
                        {Icon && <Icon className="h-5 w-5 text-foreground" />}
                        <span className="text-xs font-semibold text-muted-foreground">
                            {task.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </DialogTrigger>
                <PostDialogContent post={task.postData as Post} />
            </Dialog>
        );
    }
    
    // This is a regular task
    return (
         <Dialog>
            <DialogTrigger asChild>
                <div className={cn("w-full p-2 rounded-lg cursor-pointer flex flex-col items-center justify-center gap-1 h-16 border-l-4", statusInfo.color)} style={{borderLeftColor: statusInfo.color}}>
                    {Icon && <Icon className="h-5 w-5 text-foreground" />}
                    <span className="text-xs font-semibold text-muted-foreground">
                        {task.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </DialogTrigger>
            <TaskDialogContent task={task as Task} />
        </Dialog>
    );
}

const CalendarEvent = ({ event }: { event: Task | PostTask }) => {
    const EventContent = () => (
        <div 
            className={cn(
                "w-full p-1.5 rounded-md cursor-pointer text-xs flex items-center gap-1.5", 
                allPostColors[event.type]
            )} 
            style={{backgroundColor: allPostColors[event.type]}}
        >
            <span className="font-semibold truncate text-white">
                {format(event.date, 'HH:mm')} - {event.title}
            </span>
        </div>
    );
    
    if ('postData' in event && event.postData) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <button className="w-full text-left"><EventContent /></button>
                </DialogTrigger>
                <PostDialogContent post={event.postData} />
            </Dialog>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-full text-left"><EventContent /></button>
            </DialogTrigger>
            <TaskDialogContent task={event as Task} />
        </Dialog>
    );
};

export function FullCalendar() {
    const [currentDate, setCurrentDate] = React.useState(new Date());

    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    
    const daysInMonth = eachDayOfInterval({
        start: startOfWeek(firstDayOfMonth, { weekStartsOn: 0 }),
        end: endOfWeek(lastDayOfMonth, { weekStartsOn: 0 })
    });

    const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const events = getWeekTasks();

    return (
        <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
                <div className='flex items-center gap-4'>
                    <CardTitle className="text-xl font-headline capitalize">
                        {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={goToNextMonth}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                 <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {Object.entries(allPostLegends).map(([type, label]) => (
                        <div key={type} className="flex items-center gap-1.5">
                            <span className={cn('h-2 w-2 rounded-full', allPostColors[type])} />
                            <span className="text-xs text-muted-foreground">{label}</span>
                        </div>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 border-t border-b border-border">
                    {weekDaysColumns.map(day => (
                        <div key={day.id} className="p-2 text-center text-sm font-semibold text-muted-foreground border-l first:border-l-0 border-border">
                           {day.title}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 grid-rows-5 h-[70vh]">
                    {daysInMonth.map(day => {
                        const eventsForDay = events
                            .filter(event => isSameDay(event.date, day))
                            .sort((a, b) => a.date.getTime() - b.date.getTime());

                        return (
                            <div 
                                key={day.toString()} 
                                className={cn(
                                    "p-2 border-l border-b border-border flex flex-col gap-1 overflow-y-auto",
                                    !isSameMonth(day, currentDate) && "bg-muted/30 text-muted-foreground",
                                    isToday(day) && "bg-blue-500/10 relative"
                                )}
                            >
                                <span className={cn(
                                    "font-semibold",
                                    isToday(day) && "text-blue-500"
                                )}>
                                    {format(day, 'd')}
                                </span>
                                {eventsForDay.map(event => (
                                    <CalendarEvent key={event.id} event={event} />
                                ))}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

export const KanbanBoard = () => {
    const [tasks, setTasks] = React.useState<(Task | PostTask)[]>([]);

    React.useEffect(() => {
        const referenceDate = new Date();
        const weekStart = startOfWeek(referenceDate, { weekStartsOn: 0 }); // Sunday
        const weekEnd = endOfWeek(referenceDate, { weekStartsOn: 0 });
        const weekTasks = getWeekTasks().filter(task => isWithinInterval(task.date, { start: weekStart, end: weekEnd }));
        setTasks(weekTasks);
    }, []);


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3">
            {weekDaysColumns.map(column => (
                <div key={column.id} className={cn("rounded-lg p-2 bg-card/40 dark:bg-black/20")}>
                    <h3 className="font-semibold mb-3 text-center text-sm">{column.title}</h3>
                    <div className="flex flex-col gap-2 min-h-[100px]">
                        {tasks.length > 0 ? (
                            tasks
                                .filter(task => getDay(task.date) === column.id)
                                .sort((a, b) => a.date.getTime() - b.date.getTime())
                                .map(task => <TaskCard key={task.id} task={task} />)
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

    

    
