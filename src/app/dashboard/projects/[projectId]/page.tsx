
'use client';

import { useParams } from "next/navigation";

const projects = [
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

export default function ProjectDetailsPage() {
    const params = useParams();
    const projectId = params.projectId;
    const project = projects.find(p => p.id.toString() === projectId);

    const projectName = project ? project.name : 'Projeto';

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-card/60 dark:bg-black/40 backdrop-blur-lg">
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
