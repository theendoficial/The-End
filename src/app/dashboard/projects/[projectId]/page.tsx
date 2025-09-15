
'use client';

import { useParams } from "next/navigation";
import Link from 'next/link';
import { Download, File as FileIcon, Palette, LayoutTemplate, MonitorPlay, FileText as RoteiroIcon, DollarSign, BarChart, Megaphone, Video, Film, ListVideo } from 'lucide-react';
import {
    CalendarWidget,
    FeedPreview,
    PendingApprovalsWidget,
    ProjectUpcomingPostsList, 
    projects
} from '@/components/dashboard/dashboard-components';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PostDialogContent } from "@/components/dashboard/dashboard-components";


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

const siteAssets = [
    { name: 'Credenciais de Acesso (WordPress)', type: 'PDF', url: '#' },
    { name: 'Informações da Hospedagem', type: 'PDF', url: '#' },
    { name: 'Dados de Registro do Domínio', type: 'PDF', url: '#' },
    { name: 'Manual Básico de Gerenciamento', type: 'PDF', url: '#' },
    { name: 'Chaves de API (Google Maps, etc)', type: 'PDF', url: '#' },
];

const roteirosAssets = [
    { name: 'Calendário Editorial - Mês Corrente', type: 'PDF', url: '#' },
    { name: 'Estratégia de Conteúdo - Q3 2024', type: 'PDF', url: '#' },
    { name: 'Roteiro para Vídeo Longo - "Tendências de Mercado"', type: 'DOCX', url: '#' },
    { name: 'Roteiro para Vídeo Curto - "Dica Rápida da Semana"', type: 'DOCX', url: '#' },
    { name: 'Banco de Ideias para Posts', type: 'XLSX', url: '#' },
    { name: 'Diretrizes de Tom e Voz', type: 'PDF', url: '#' },
];

const trafegoPagoAssets = [
    { name: 'Relatório de Campanha - Google Ads - Mês Atual', type: 'PDF', url: '#' },
    { name: 'Relatório de Campanha - Meta Ads - Mês Atual', type: 'PDF', url: '#' },
    { name: 'Acesso à Conta de Anúncios - Meta Business', type: 'PDF', url: '#' },
    { name: 'Acesso à Conta de Anúncios - Google Ads', type: 'PDF', url: '#' },
    { name: 'Planejamento de Orçamento - Q4 2024', type: 'XLSX', url: '#' },
    { name: 'Públicos Personalizados - Lookalike Audiences', type: 'PDF', url: '#' },
];

const analisePerfilAssets = [
    { name: 'Relatório de Análise de Público', type: 'PDF', url: '#' },
    { name: 'Análise de Concorrentes', type: 'PDF', url: '#' },
    { name: 'Diagnóstico de Perfil - Pontos Fortes e Fracos', type: 'PDF', url: '#' },
    { name: 'Relatório de Engajamento Mensal', type: 'PDF', url: '#' },
    { name: 'Sugestões de Otimização de Bio e Destaques', type: 'DOCX', url: '#' },
];

const estrategiaMarketingAssets = [
    { name: 'Planejamento Estratégico de Marketing Digital', type: 'PDF', url: '#' },
    { name: 'Definição de Persona e Jornada do Cliente', type: 'PDF', url: '#' },
    { name: 'Plano de Ação - Próximos Passos', type: 'PDF', url: '#' },
    { name: 'Análise SWOT', type: 'PDF', url: '#' },
    { name: 'Estratégia de Funil de Vendas', type: 'PDF', url: '#' },
];

const videosCurtosAssets = [
    { id: 1, title: 'Tutorial Rápido: Maquiagem de Verão', date: '15 de Set, 2024', status: 'completed', imageUrl: 'https://picsum.photos/seed/videocapa1/600/800', imageHint: 'makeup tutorial', type: 'video', description: 'Um tutorial rápido para uma maquiagem de verão leve e iluminada. #make #verao', socials: ['instagram', 'tiktok'], url: '#' },
    { id: 2, title: 'Receita Fácil: Smoothie de Frutas Vermelhas', date: '14 de Set, 2024', status: 'completed', imageUrl: 'https://picsum.photos/seed/videocapa2/600/800', imageHint: 'smoothie recipe', type: 'video', description: 'Smoothie delicioso e saudável para começar o dia com energia. #receita #saudavel', socials: ['instagram', 'tiktok', 'youtube'], url: '#' },
    { id: 3, title: 'Dica de App: Organize sua Rotina', date: '13 de Set, 2024', status: 'completed', imageUrl: 'https://picsum.photos/seed/videocapa3/600/800', imageHint: 'app organization', type: 'video', description: 'Conheça o app que mudou a forma como eu organizo minhas tarefas. #dica #produtividade', socials: ['instagram'], url: '#' },
    { id: 4, title: 'Unboxing: Novos Fones de Ouvido', date: '12 de Set, 2024', status: 'completed', imageUrl: 'https://picsum.photos/seed/videocapa4/600/800', imageHint: 'unboxing headphones', type: 'video', description: 'Chegou o tão esperado fone com cancelamento de ruído. Veja minhas primeiras impressões. #unboxing #tecnologia', socials: ['youtube'], url: '#' },
];

const videosLongosAssets = [
    { id: 1, title: 'Review Completo: Novo Smartphone XYZ', date: '18 de Set, 2024', status: 'completed', imageUrl: 'https://picsum.photos/seed/longvideo1/800/450', imageHint: 'smartphone review', type: 'video', description: 'Análise detalhada do novo smartphone XYZ, com testes de câmera, bateria e desempenho. #tecnologia #review #smartphone', socials: ['youtube'], url: '#' },
    { id: 2, title: 'Documentário: A História da Internet', date: '10 de Set, 2024', status: 'completed', imageUrl: 'https://picsum.photos/seed/longvideo2/800/450', imageHint: 'internet documentary', type: 'video', description: 'Uma viagem pela história da internet, desde sua criação até os dias de hoje. #documentario #historia #internet', socials: ['youtube'], url: '#' },
];

const videosSequenciaisAssets = [
    { id: 1, title: 'Sequência de Stories: Tour pelo Escritório', date: '20 de Set, 2024', status: 'completed', imageUrl: 'https://picsum.photos/seed/seqvideo1/600/800', imageHint: 'office tour', type: 'video', description: 'Venha conhecer nosso espaço de trabalho! #bastidores #escritorio #tour', socials: ['instagram'], url: '#' },
    { id: 2, title: 'Stories: Q&A com a Equipe', date: '19 de Set, 2024', status: 'completed', imageUrl: 'https://picsum.photos/seed/seqvideo2/600/800', imageHint: 'team q&a', type: 'video', description: 'Respondendo às perguntas que vocês mais fizeram sobre nossa equipe e trabalho. #q&a #perguntaserespostas #equipe', socials: ['instagram'], url: '#' },
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

    // "Elaboração de sites" has id 3
    if (projectId === '3') {
        return (
            <>
                <div className="flex items-center mb-4 gap-3">
                    <MonitorPlay className="h-6 w-6 text-blue-500" />
                    <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                </div>
                <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle>Documentos e Acessos</CardTitle>
                        <CardDescription>
                            Acesse e baixe as informações e credenciais importantes do seu site.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b-white/10 hover:bg-transparent">
                                    <TableHead>Documento</TableHead>
                                    <TableHead className="w-[150px]">Tipo de Arquivo</TableHead>
                                    <TableHead className="w-[120px] text-right">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {siteAssets.map((asset) => (
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

    // "Roteiros - Estratégia de conteúdo" has id 4
    if (projectId === '4') {
        return (
            <>
                <div className="flex items-center mb-4 gap-3">
                    <RoteiroIcon className="h-6 w-6 text-blue-500" />
                    <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                </div>
                <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle>Roteiros e Planejamento</CardTitle>
                        <CardDescription>
                            Acesse e baixe os roteiros e planejamentos de conteúdo.
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
                                {roteirosAssets.map((asset) => (
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
    
    // "Trafego Pago" has id 5
    if (projectId === '5') {
        return (
            <>
                <div className="flex items-center mb-4 gap-3">
                    <DollarSign className="h-6 w-6 text-cyan-500" />
                    <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                </div>
                <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle>Relatórios e Acessos</CardTitle>
                        <CardDescription>
                            Acesse os relatórios de campanha e informações importantes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b-white/10 hover:bg-transparent">
                                    <TableHead>Documento</TableHead>
                                    <TableHead className="w-[150px]">Tipo de Arquivo</TableHead>
                                    <TableHead className="w-[120px] text-right">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {trafegoPagoAssets.map((asset) => (
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

    // "Análise de perfil" has id 7
    if (projectId === '7') {
        return (
            <>
                <div className="flex items-center mb-4 gap-3">
                    <BarChart className="h-6 w-6 text-cyan-500" />
                    <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                </div>
                <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle>Relatórios e Análises</CardTitle>
                        <CardDescription>
                            Faça o download das análises e diagnósticos do seu perfil.
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
                                {analisePerfilAssets.map((asset) => (
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

    // "Estratégia de Marketing" has id 8
    if (projectId === '8') {
        return (
            <>
                <div className="flex items-center mb-4 gap-3">
                    <Megaphone className="h-6 w-6 text-cyan-500" />
                    <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                </div>
                <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle>Documentos Estratégicos</CardTitle>
                        <CardDescription>
                            Acesse e baixe os planejamentos e estratégias para o seu negócio.
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
                                {estrategiaMarketingAssets.map((asset) => (
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

    // "Vídeos curtos" has id 9
    if (projectId === '9') {
        return (
            <>
                <div className="flex items-center mb-4 gap-3">
                    <Video className="h-6 w-6 text-pink-500" />
                    <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {videosCurtosAssets.map((video) => (
                        <Dialog key={video.id}>
                            <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl overflow-hidden group relative">
                                <DialogTrigger asChild>
                                    <div className="relative aspect-w-9 aspect-h-16 cursor-pointer">
                                        <Image 
                                            src={video.imageUrl || ''} 
                                            alt={`Capa do vídeo: ${video.title}`} 
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint={video.imageHint}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-3">
                                            <CardTitle className="text-white text-sm font-semibold drop-shadow-md">{video.title}</CardTitle>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <Button 
                                    asChild 
                                    variant="secondary" 
                                    size="icon" 
                                    className="absolute bottom-2 right-2 z-10 h-8 w-8 bg-black/50 text-white hover:bg-black/70"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <a href={video.url} download>
                                        <Download className="h-4 w-4" />
                                    </a>
                                </Button>
                            </Card>
                            <PostDialogContent post={video} />
                        </Dialog>
                    ))}
                </div>
            </>
        )
    }

    // "Vídeos Longos" has id 10
    if (projectId === '10') {
        return (
            <>
                <div className="flex items-center mb-4 gap-3">
                    <Film className="h-6 w-6 text-pink-500" />
                    <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videosLongosAssets.map((video) => (
                        <Dialog key={video.id}>
                            <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl overflow-hidden group relative">
                                <DialogTrigger asChild>
                                    <div className="relative aspect-w-16 aspect-h-9 cursor-pointer">
                                        <Image 
                                            src={video.imageUrl || ''} 
                                            alt={`Capa do vídeo: ${video.title}`} 
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint={video.imageHint}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-3">
                                            <CardTitle className="text-white text-sm font-semibold drop-shadow-md">{video.title}</CardTitle>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <Button 
                                    asChild 
                                    variant="secondary" 
                                    size="icon" 
                                    className="absolute bottom-2 right-2 z-10 h-8 w-8 bg-black/50 text-white hover:bg-black/70"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <a href={video.url} download>
                                        <Download className="h-4 w-4" />
                                    </a>
                                </Button>
                            </Card>
                            <PostDialogContent post={video} />
                        </Dialog>
                    ))}
                </div>
            </>
        )
    }

    // "Vídeos sequenciais" has id 11
    if (projectId === '11') {
        return (
            <>
                <div className="flex items-center mb-4 gap-3">
                    <ListVideo className="h-6 w-6 text-pink-500" />
                    <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {videosSequenciaisAssets.map((video) => (
                        <Dialog key={video.id}>
                            <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl overflow-hidden group relative">
                                <DialogTrigger asChild>
                                    <div className="relative aspect-w-9 aspect-h-16 cursor-pointer">
                                        <Image 
                                            src={video.imageUrl || ''} 
                                            alt={`Capa do vídeo: ${video.title}`} 
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint={video.imageHint}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-3">
                                            <CardTitle className="text-white text-sm font-semibold drop-shadow-md">{video.title}</CardTitle>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <Button 
                                    asChild 
                                    variant="secondary" 
                                    size="icon" 
                                    className="absolute bottom-2 right-2 z-10 h-8 w-8 bg-black/50 text-white hover:bg-black/70"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <a href={video.url} download>
                                        <Download className="h-4 w-4" />
                                    </a>
                                </Button>
                            </Card>
                            <PostDialogContent post={video} />
                        </Dialog>
                    ))}
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
