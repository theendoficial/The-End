
'use client';

import { useParams } from "next/navigation";
import Link from 'next/link';
import { Download, File as FileIcon, Palette, LayoutTemplate } from 'lucide-react';
import {
    CalendarWidget,
    FeedPreview,
    PendingApprovalsWidget,
    ProjectUpcomingPostsList, // Changed from UpcomingPostsList
    projects
} from '@/components/dashboard/dashboard-components';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";


const visualIdentityAssets = [
  { name: 'Logotipo Principal (Colorido)', type: 'PNG', url: '#' },
  { name: 'Logotipo Principal (Preto e Branco)', type: 'PNG', url: '#' },
  { name: 'Variação do Logotipo (Símbolo)', type: 'SVG', url: '#' },
  { name: 'Manual da Marca', type: 'PDF', url: '#' },
  { name: 'Paleta de Cores', type: 'PDF', url: '#' },
  { name: 'Tipografia', type: 'ZIP', url: '#' },
  { name: 'Mockups de Apresentação', type: 'ZIP', url: '#' },
];

const designAssets = [
  { name: 'Banners para Redes Sociais - Campanha X', type: 'ZIP', url: '#' },
  { name: 'Template de Apresentação (PowerPoint)', type: 'PPTX', url: '#' },
  { name: 'Template de Apresentação (Google Slides)', type: 'URL', url: '#' },
  { name: 'Ícones Personalizados', type: 'SVG', url: '#' },
  { name: 'Assinatura de E-mail', type: 'HTML', url: '#' },
  { name: 'Cartão de Visita (Arte Final)', type: 'PDF', url: '#' },
];

export default function ProjectDetailsPage() {
    const params = useParams();
    const projectId = params.projectId;
    const project = projects.find(p => p.id.toString() === projectId);

    const projectName = project ? project.name : 'Projeto';

    // "Identidade Visual" has id 1
    if (projectId === '1') {
        return (
            <>
                <div className="flex items-center mb-4 gap-3">
                    <Palette className="h-6 w-6 text-blue-500" />
                    <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                </div>
                <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle>Materiais da Marca</CardTitle>
                        <CardDescription>
                            Faça o download dos ativos da sua identidade visual.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b-white/10 hover:bg-transparent">
                                    <TableHead>Material</TableHead>
                                    <TableHead className="w-[150px]">Tipo de Arquivo</TableHead>
                                    <TableHead className="w-[120px] text-right">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {visualIdentityAssets.map((asset) => (
                                    <TableRow key={asset.name} className="border-b-white/10">
                                        <TableCell className="font-medium flex items-center gap-3">
                                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                                            {asset.name}
                                        </TableCell>
                                        <TableCell>
                                            <span className="bg-muted/50 text-muted-foreground text-xs font-semibold px-2 py-1 rounded-md">
                                                {asset.type}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild variant="outline" size="sm">
                                                <a href={asset.url} download>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Baixar
                                                </a>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </>
        )
    }

    // "Design" has id 2
    if (projectId === '2') {
        return (
            <>
                <div className="flex items-center mb-4 gap-3">
                    <LayoutTemplate className="h-6 w-6 text-blue-500" />
                    <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                </div>
                <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle>Materiais de Design</CardTitle>
                        <CardDescription>
                            Faça o download dos materiais gráficos do seu projeto.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b-white/10 hover:bg-transparent">
                                    <TableHead>Material</TableHead>
                                    <TableHead className="w-[150px]">Tipo de Arquivo</TableHead>
                                    <TableHead className="w-[120px] text-right">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {designAssets.map((asset) => (
                                    <TableRow key={asset.name} className="border-b-white/10">
                                        <TableCell className="font-medium flex items-center gap-3">
                                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                                            {asset.name}
                                        </TableCell>
                                        <TableCell>
                                            <span className="bg-muted/50 text-muted-foreground text-xs font-semibold px-2 py-1 rounded-md">
                                                {asset.type}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild variant="outline" size="sm">
                                                <a href={asset.url} download>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Baixar
                                                </a>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </>
        )
    }

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
                <div className="mt-6">
                    <h2 className="text-base font-semibold md:text-xl mb-3">Próximos Conteúdos:</h2>
                    <ProjectUpcomingPostsList />
                </div>
                <div className="mt-6">
                    <h2 className="text-base font-semibold md:text-xl mb-4 text-center">Visualização do Feed</h2>
                    <FeedPreview />
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
