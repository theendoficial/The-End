
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Palette,
  LayoutTemplate,
  MonitorPlay,
  FileText,
  DollarSign,
  Users,
  BarChart,
  Megaphone,
  Video,
  Film,
  ListVideo,
} from 'lucide-react';
import Link from 'next/link';

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

const allProjects = [
  // Creative
  { id: 1, name: 'Identidade Visual', category: 'creative', icon: <Palette className="h-8 w-8 text-blue-500" /> },
  { id: 2, name: 'Design', category: 'creative', icon: <LayoutTemplate className="h-8 w-8 text-blue-500" /> },
  { id: 3, name: 'Elaboração de sites', category: 'creative', icon: <MonitorPlay className="h-8 w-8 text-blue-500" /> },
  { id: 4, name: 'Roteiros - Estratégia de conteúdo', category: 'creative', icon: <FileText className="h-8 w-8 text-blue-500" /> },
  // Marketing
  { id: 5, name: 'Trafego Pago', category: 'marketing', icon: <DollarSign className="h-8 w-8 text-cyan-500" /> },
  { id: 6, name: 'Gestão de Mídias Sociais', category: 'marketing', icon: <Users className="h-8 w-8 text-cyan-500" /> },
  { id: 7, name: 'Análise de perfil', category: 'marketing', icon: <BarChart className="h-8 w-8 text-cyan-500" /> },
  { id: 8, name: 'Estratégia de Marketing', category: 'marketing', icon: <Megaphone className="h-8 w-8 text-cyan-500" /> },
  // Audiovisual
  { id: 9, name: 'Vídeos curtos', category: 'audiovisual', icon: <Video className="h-8 w-8 text-pink-500" /> },
  { id: 10, name: 'Vídeos Longos', category: 'audiovisual', icon: <Film className="h-8 w-8 text-pink-500" /> },
  { id: 11, name: 'Vídeos sequenciais', category: 'audiovisual', icon: <ListVideo className="h-8 w-8 text-pink-500" /> },
];

// No futuro, esta lista virá do seu painel de administração.
// Por enquanto, mostra apenas os projetos selecionados.
const clientProjectIds = [1, 6, 9, 10]; 

const clientProjects = allProjects.filter(project => clientProjectIds.includes(project.id));

export default function ProjectsPage() {
  return (
    <>
      <div className="flex items-center mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Meus Projetos</h1>
      </div>
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
                  <div className="h-6 w-16 bg-muted/50 rounded-md flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Logo</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
