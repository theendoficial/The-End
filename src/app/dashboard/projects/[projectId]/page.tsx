
'use client';

import { useParams } from "next/navigation";
import Link from 'next/link';
import {
    CalendarWidget,
    PendingApprovalsWidget,
    ProjectUpcomingPostsList, // Changed from UpcomingPostsList
    projects
} from '@/components/dashboard/dashboard-components';


export default function ProjectDetailsPage() {
    const params = useParams();
    const projectId = params.projectId;
    const project = projects.find(p => p.id.toString() === projectId);

    const projectName = project ? project.name : 'Projeto';

    // "Gestão de Mídias Sociais" has id 6
    if (projectId === '6') {
        return (
            <>
                <div className="flex items-center mb-4">
                    <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="md:col-span-1 lg:col-span-1">
                        <PendingApprovalsWidget />
                    </div>
                    <div className="md:col-span-1 lg:col-span-1">
                        <CalendarWidget />
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="text-base font-semibold md:text-xl mb-3">Próximos Conteúdos:</h2>
                    <ProjectUpcomingPostsList />
                </div>

            </>
        )
    }


    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-card/60 dark:bg-black/40 backdrop-blur-lg min-h-[60vh]">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        Página em construção
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        O conteúdo específico deste projeto aparecerá aqui em breve.
                    </p>
                </div>
            </div>
        </>
    );
}

    