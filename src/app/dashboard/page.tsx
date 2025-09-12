
import {
  Calendar,
  CheckSquare,
  FileText,
  FolderKanban,
  LineChart,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardPage() {
  const shortcutCards = [
    {
      title: 'Meus Projetos',
      description: 'Visualize e gerencie seus projetos.',
      icon: FolderKanban,
      href: '/dashboard/projects',
    },
    {
      title: 'Calendário',
      description: 'Acompanhe os conteúdos programados.',
      icon: Calendar,
      href: '/dashboard/calendar',
    },
    {
      title: 'Aprovação',
      description: 'Revise e aprove posts pendentes.',
      icon: CheckSquare,
      href: '/dashboard/approvals',
    },
    {
      title: 'Documentos',
      description: 'Acesse contratos e guias.',
      icon: FileText,
      href: '/dashboard/documents',
    },
    {
      title: 'Relatórios',
      description: 'Veja as métricas e resultados.',
      icon: LineChart,
      href: '/dashboard/reports',
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Painel de Controle</h1>
      </div>
      <div className="flex flex-1 rounded-lg border border-dashed border-border/20 dark:border-white/20 shadow-sm bg-card/20 dark:bg-black/20 backdrop-blur-sm">
        <div className="flex flex-col w-full p-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Atalhos Rápidos</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 {shortcutCards.map((card) => (
                    <Link href={card.href} key={card.title}>
                        <Card className="hover:bg-accent/50 dark:hover:bg-white/10 transition-colors bg-card/50 dark:bg-white/5 border-border/20 dark:border-white/10 text-card-foreground dark:text-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {card.title}
                                </CardTitle>
                                <card.icon className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground dark:text-gray-400">{card.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </>
  );
}
