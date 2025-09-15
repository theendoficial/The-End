
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Paintbrush, Clapperboard, Megaphone } from 'lucide-react';
import Link from 'next/link';

const categories = {
  creative: {
    name: 'Creative',
    color: 'border-blue-500',
    icon: <Paintbrush className="h-6 w-6 text-blue-500" />,
  },
  audiovisual: {
    name: 'Audiovisual',
    color: 'border-pink-500',
    icon: <Clapperboard className="h-6 w-6 text-pink-500" />,
  },
  marketing: {
    name: 'Marketing',
    color: 'border-cyan-500',
    icon: <Megaphone className="h-6 w-6 text-cyan-500" />,
  },
};

const projects = [
  // Creative
  { id: 1, name: 'Identidade Visual', category: 'creative', href: '#' },
  { id: 2, name: 'Design', category: 'creative', href: '#' },
  { id: 3, name: 'Elaboração de sites', category: 'creative', href: '#' },
  { id: 4, name: 'Roteiros - Estratégia de conteúdo', category: 'creative', href: '#' },
  // Marketing
  { id: 5, name: 'Trafego Pago', category: 'marketing', href: '#' },
  { id: 6, name: 'Gestão de Mídias Sociais', category: 'marketing', href: '#' },
  { id: 7, name: 'Análise de perfil', category: 'marketing', href: '#' },
  { id: 8, name: 'Estratégia de Marketing', category: 'marketing', href: '#' },
  // Audiovisual
  { id: 9, name: 'Vídeos curtos', category: 'audiovisual', href: '#' },
  { id: 10, name: 'Vídeos Longos', category: 'audiovisual', href: '#' },
  { id: 11, name: 'Vídeos sequenciais', category: 'audiovisual', href: '#' },
];

// For this example, we'll assume the client has all projects.
// In a real app, this would be fetched from a database.
const clientProjects = projects;

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
            <Link key={project.id} href={project.href} className="block group">
              <Card
                className={cn(
                  'bg-card/60 dark:bg-black/40 backdrop-blur-lg border-t-4 shadow-lg rounded-2xl h-48 flex flex-col justify-between transition-all duration-300 group-hover:transform group-hover:-translate-y-1 group-hover:shadow-xl',
                  categoryInfo.color
                )}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{project.name}</CardTitle>
                  {categoryInfo.icon}
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-end items-center">
                  {/* Placeholder for category logo */}
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
