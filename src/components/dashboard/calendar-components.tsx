

'use client';

import * as React from 'react';
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
    isSameDay,
    addDays,
    setDate
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Video, Users, FileText, Calendar as CalendarIcon, Tag, Info, Check } from 'lucide-react';
import Link from 'next/link';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { postColors, postLegends, PostType, Post, PostDialogContent, usePosts, Status } from './dashboard-components';
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

// Admin specific colors
const adminStatusColors: Record<Status, string> = {
    notified: 'bg-gray-500', // Cinza
    approved: 'bg-orange-500', // Laranja
    in_revision: 'bg-red-500', // Vermelho
    scheduled: 'bg-blue-500',
    // Fallback/default colors for other statuses
    awaiting_approval: 'bg-purple-500',
    canceled: 'bg-red-700',
    completed: 'bg-green-500',
}


type TaskStatus = 'todo' | 'in-progress' | 'approval' | 'done' | 'awaiting_approval' | 'in_revision' | 'scheduled' | 'approved' | 'canceled' | 'completed' | 'notified';

const getWeekTasks = (posts: Post[], scheduledPosts: Post[]) => {
    const allPosts = [...posts, ...scheduledPosts];
    const allTasks: (Task | PostTask)[] = allPosts.map(post => ({
        id: `post-${post.id}`,
        title: post.title,
        date: new Date(post.date),
        type: post.type,
        project: { id: 6, name: 'Gestão de Mídias Sociais' },
        status: post.status,
        postData: post,
    }));
    return allTasks;
};



const statusConfig: Record<TaskStatus, { label: string; color: string; className: string }> = {
    todo: { label: 'A fazer', color: 'bg-gray-400', className: 'bg-gray-800/20 border-gray-600/80 text-gray-300' },
    'in-progress': { label: 'Em progresso', color: 'bg-blue-500', className: 'bg-blue-800/20 border-blue-600/80 text-blue-300' },
    approval: { label: 'Aprovação', color: 'bg-purple-500', className: 'bg-purple-800/20 border-purple-600/80 text-purple-300' },
    done: { label: 'Concluído', color: 'bg-green-500', className: 'bg-green-800/20 border-green-600/80 text-green-300' },
    awaiting_approval: { label: 'Aguardando Envio', color: 'bg-yellow-500', className: 'bg-yellow-800/20 border-yellow-600/80 text-yellow-300' },
    notified: { label: 'Aguardando Aprovação', color: 'bg-yellow-500', className: 'bg-yellow-800/20 border-yellow-600/80 text-yellow-300' },
    in_revision: { label: 'Em Revisão', color: 'bg-orange-500', className: 'bg-orange-800/20 border-orange-600/80 text-orange-300' },
    scheduled: { label: 'Agendado', color: 'bg-blue-500', className: 'bg-blue-800/20 border-blue-600/80 text-blue-300' },
    approved: { label: 'Aprovado', color: 'bg-teal-500', className: 'bg-teal-800/20 border-teal-600/80 text-teal-300' },
    canceled: { label: 'Cancelado', color: 'bg-red-500', className: 'bg-red-800/20 border-red-600/80 text-red-300' },
    completed: { label: 'Concluído', color: 'bg-green-500', className: 'bg-green-800/20 border-green-600/80 text-green-300' }
};


const taskIcons: Record<string, React.ComponentType<any>> = {
    video_horizontal: (props) => <Video {...props} />,
    reels: (props) => <Video {...props} />,
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
    status: Status;
}
type Task = BaseTask & { type: Exclude<PostType, 'post'> };
type PostTask = BaseTask & { type: 'video_horizontal' | 'reels' | 'image' | 'carousel'; postData: Post };

const TaskDialogContent = ({ task, onUpdateStatus, isAdminView }: { task: Task | PostTask, onUpdateStatus?: (postId: number, status: Status) => void, isAdminView?: boolean }) => {
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
                 {isAdminView && task.status === 'approved' && onUpdateStatus && (
                    <div className="mt-4">
                        <Button onClick={() => onUpdateStatus(parseInt(task.id.replace('post-', '')), 'scheduled')}>
                           <Check className="mr-2 h-4 w-4" /> Agendar Post
                        </Button>
                    </div>
                )}
            </div>
        </DialogContent>
    );
};


const TaskCard = ({ task, provided, isDragging, isAdminView }: { task: Task | PostTask, provided: any, isDragging: boolean, isAdminView?: boolean }) => {
    const { updatePostStatus } = usePosts();
    const Icon = taskIcons[task.type];
    
    const statusColor = isAdminView ? adminStatusColors[task.status] : allPostColors[task.type];

    const CardInner = ({...props}) => (
        <div 
             {...props}
             className={cn(
                "w-full p-2 rounded-lg cursor-pointer flex flex-col items-center justify-center gap-1 h-16 border-l-4", 
                isDragging ? 'shadow-lg' : ''
             )} 
             style={{...props.style, borderLeftColor: statusColor}}
        >
            {Icon && <Icon className="h-5 w-5 text-foreground" />}
            <span className="text-xs font-semibold text-muted-foreground">
                {task.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>
    );
    
    if ('postData' in task && task.postData) {
        return (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="w-full text-left"><CardInner /></button>
                    </DialogTrigger>
                    <PostDialogContent post={task.postData as Post} onUpdateStatus={updatePostStatus} isAdminView={isAdminView} />
                </Dialog>
            </div>
        );
    }
    
    return (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
             <Dialog>
                <DialogTrigger asChild>
                    <button className="w-full text-left"><CardInner /></button>
                </DialogTrigger>
                <TaskDialogContent task={task as Task} onUpdateStatus={updatePostStatus} isAdminView={isAdminView} />
            </Dialog>
        </div>
    );
}

const CalendarEvent = ({ event, isAdminView, onUpdateStatus }: { event: Task | PostTask, isAdminView?: boolean, onUpdateStatus?: (postId: number, status: Status) => void }) => {
    const eventColor = isAdminView ? adminStatusColors[event.status] : allPostColors[event.type];

    const EventContent = () => (
        <div 
            className={cn(
                "w-full p-1.5 rounded-md cursor-pointer text-xs flex items-center gap-1.5"
            )} 
            style={{backgroundColor: eventColor}}
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
                <PostDialogContent post={event.postData} onUpdateStatus={onUpdateStatus} isAdminView={isAdminView} />
            </Dialog>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-full text-left"><EventContent /></button>
            </DialogTrigger>
            <TaskDialogContent task={event as Task} onUpdateStatus={onUpdateStatus} isAdminView={isAdminView} />
        </Dialog>
    );
};

export function FullCalendar({ posts, scheduledPosts, isAdminView, updatePostStatus }: { posts: Post[], scheduledPosts: Post[], isAdminView?: boolean, updatePostStatus?: (postId: number, status: Status) => void }) {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [events, setEvents] = React.useState<(Task | PostTask)[]>([]);
    
    React.useEffect(() => {
        setEvents(getWeekTasks(posts, scheduledPosts));
    }, [posts, scheduledPosts]);


    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    
    const daysInMonth = eachDayOfInterval({
        start: startOfWeek(firstDayOfMonth, { weekStartsOn: 0 }),
        end: endOfWeek(lastDayOfMonth, { weekStartsOn: 0 })
    });

    const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const legendColors = isAdminView ? adminStatusColors : allPostColors;
    const legendLabels: Record<string, string> = isAdminView
        ? {
            notified: 'Aguardando Aprovação',
            approved: 'Aprovado pelo Cliente',
            in_revision: 'Em Alteração',
            scheduled: 'Agendado',
        }
        : allPostLegends;
    
    // Filter legends to show only relevant ones for admin view
    const adminRelevantStatuses: Status[] = ['notified', 'approved', 'in_revision', 'scheduled'];


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
                    {Object.entries(legendLabels)
                        .filter(([type]) => !isAdminView || adminRelevantStatuses.includes(type as Status))
                        .map(([type, label]) => (
                        <div key={type} className="flex items-center gap-1.5">
                            <span className={cn('h-2 w-2 rounded-full', legendColors[type as keyof typeof legendColors])} />
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
                                    <CalendarEvent key={event.id} event={event} isAdminView={isAdminView} onUpdateStatus={updatePostStatus} />
                                ))}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

const weekDaysColumns = [
    { id: 0, title: 'Domingo' },
    { id: 1, title: 'Segunda' },
    { id: 2, title: 'Terça' },
    { id: 3, title: 'Quarta' },
    { id: 4, title: 'Quinta' },
    { id: 5, title: 'Sexta' },
    { id: 6, title: 'Sábado' },
];

export const KanbanBoard = ({ posts, scheduledPosts, updatePostDate, isAdminView, updatePostStatus }: { posts: Post[], scheduledPosts: Post[], updatePostDate: (postId: number, newDate: string) => void, isAdminView?: boolean, updatePostStatus?: (postId: number, status: Status) => void }) => {
    const [weekTasks, setWeekTasks] = React.useState<Record<number, (Task | PostTask)[]>>({});
    const [referenceDate, setReferenceDate] = React.useState(new Date());
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    React.useEffect(() => {
        const weekStart = startOfWeek(referenceDate, { weekStartsOn: 0 }); // Sunday
        const weekEnd = endOfWeek(referenceDate, { weekStartsOn: 0 });
        const allTasks = getWeekTasks(posts, scheduledPosts);
        const currentWeekTasks = allTasks.filter(task => isWithinInterval(task.date, { start: weekStart, end: weekEnd }));
        
        const groupedTasks: Record<number, (Task | PostTask)[]> = {};
        for (let i = 0; i < 7; i++) {
            groupedTasks[i] = [];
        }
        currentWeekTasks.forEach(task => {
            const dayIndex = getDay(task.date);
            if (groupedTasks[dayIndex]) {
                groupedTasks[dayIndex].push(task);
            }
        });
        
        for (let i = 0; i < 7; i++) {
             groupedTasks[i].sort((a, b) => a.date.getTime() - b.date.getTime());
        }

        setWeekTasks(groupedTasks);
    }, [posts, scheduledPosts, referenceDate]);

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination || !isAdminView) {
            return;
        }

        const sourceDayIndex = parseInt(source.droppableId, 10);
        const destDayIndex = parseInt(destination.droppableId, 10);
        
        const taskId = draggableId;
        const postId = parseInt(taskId.replace('post-', ''));
        
        const task = weekTasks[sourceDayIndex].find(t => t.id === taskId);

        if (task && sourceDayIndex !== destDayIndex) {
            const dayDifference = destDayIndex - sourceDayIndex;
            const newDate = addDays(task.date, dayDifference);
            updatePostDate(postId, newDate.toISOString());
        }
    };


    return (
        <>
            {isClient ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3">
                        {weekDaysColumns.map(column => (
                            <Droppable key={column.id} droppableId={String(column.id)} isDropDisabled={!isAdminView}>
                                {(provided, snapshot) => (
                                    <div 
                                        ref={provided.innerRef} 
                                        {...provided.droppableProps}
                                        className={cn(
                                            "rounded-lg p-2 bg-card/40 dark:bg-black/20",
                                            snapshot.isDraggingOver && 'bg-accent/50'
                                        )}
                                    >
                                        <h3 className="font-semibold mb-3 text-center text-sm">{column.title}</h3>
                                        <div className="flex flex-col gap-2 min-h-[100px]">
                                            {weekTasks[column.id] && weekTasks[column.id].map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index} isDragDisabled={!isAdminView}>
                                                    {(provided, snapshot) => (
                                                        <TaskCard 
                                                            task={task} 
                                                            provided={provided}
                                                            isDragging={snapshot.isDragging}
                                                            isAdminView={isAdminView}
                                                        />
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            ) : null}
        </>
    )
}

    
