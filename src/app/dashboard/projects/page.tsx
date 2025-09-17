
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { allProjects } from '@/components/dashboard/dashboard-components';
import { useAppContext } from '@/contexts/AppContext';
import { FolderKanban } from 'lucide-react';


const categories = {
  creative: {
    name: 'Creative',
    color: 'border-blue-500',
  },
  audiovisual: {
    name: 'Audiovisual',
    color: 'border-pink-500',
  },
  marketing: {
    name: 'Marketing',
    color: 'border-cyan-500',
  },
};

export default function ProjectsPage() {
  const { user, getClient } = useAppContext();
  const client = user ? getClient(user.email!) : null;
  const clientProjectIds = client?.projects || [];

  const clientProjects = allProjects.filter(project => clientProjectIds.includes(project.id));

  return (
    <>
      <div className="flex items-center mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Meus Projetos</h1>
      </div>
      {clientProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {clientProjects.map((project) => {
            const categoryInfo = categories[project.category as keyof typeof categories];
            return (
              <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="block group">
                <Card
                  className={cn(
                    'bg-card/60 dark:bg-black/40 backdrop-blur-lg border-t-4 shadow-lg rounded-2xl h-48 flex flex-col justify-between transition-all duration-300 group-hover:transform group-hover:-translate-y-1 group-hover:shadow-xl',
                    categoryInfo.color
                  )}
                >
                  <CardHeader className="flex flex-col items-center justify-center text-center p-4 flex-grow">
                    {project.icon}
                    <CardTitle className="text-sm font-medium mt-4">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow-0 justify-end items-center pb-4">
                     <img src={client?.logo} alt={`${client?.name} logo`} className="h-8 w-8 rounded-full object-contain" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-card/60 dark:bg-black/40 backdrop-blur-lg min-h-[60vh]">
          <div className="flex flex-col items-center gap-2 text-center">
            <FolderKanban className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight">
              Nenhum projeto encontrado
            </h3>
            <p className="text-sm text-muted-foreground">
              Os projetos contratados aparecerão aqui.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
