
'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Mock data, this would come from a DB
const clients = [
    { id: 'major-style-barbearia', name: 'Major Style - Barbearia' },
    { id: 'fitness-club', name: 'Fitness Club' },
    { id: 'doce-sonho', name: 'Doceria Doce Sonho' },
];

function ClientDashboard() {
    return <div>Painel de Controle do Cliente</div>
}
function ClientApprovals() {
    return <div>Aprovações</div>
}
function ClientCalendar() {
    return <div>Calendário</div>
}
function ClientProjects() {
    return <div>Projetos</div>
}
function ClientReports() {
    return <div>Relatórios</div>
}
function ClientDocuments() {
    return <div>Documentos</div>
}
function ClientSettings() {
    return <div>Configurações</div>
}

export default function ClientManagementPage() {
    const params = useParams();
    const { clientId } = params;
    const client = clients.find(c => c.id === clientId);

    if (!client) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-2xl font-bold">Cliente não encontrado</h2>
                <Link href="/admin/clients">
                    <Button variant="link">Voltar para a lista de clientes</Button>
                </Link>
            </div>
        );
    }
    
    return (
        <div>
            <div className="mb-6 flex items-center gap-4">
                 <Link href="/admin/clients" className="p-2 rounded-md hover:bg-muted">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-lg font-semibold md:text-2xl">{client.name}</h1>
            </div>

            <Tabs defaultValue="dashboard">
                <TabsList className="grid w-full grid-cols-7 mb-4">
                    <TabsTrigger value="dashboard">Painel</TabsTrigger>
                    <TabsTrigger value="approvals">Aprovações</TabsTrigger>
                    <TabsTrigger value="calendar">Calendário</TabsTrigger>
                    <TabsTrigger value="projects">Projetos</TabsTrigger>
                    <TabsTrigger value="reports">Relatórios</TabsTrigger>
                    <TabsTrigger value="documents">Documentos</TabsTrigger>
                    <TabsTrigger value="settings">Configurações</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard"><ClientDashboard /></TabsContent>
                <TabsContent value="approvals"><ClientApprovals /></TabsContent>
                <TabsContent value="calendar"><ClientCalendar /></TabsContent>
                <TabsContent value="projects"><ClientProjects /></TabsContent>
                <TabsContent value="reports"><ClientReports /></TabsContent>
                <TabsContent value="documents"><ClientDocuments /></TabsContent>
                <TabsContent value="settings"><ClientSettings /></TabsContent>
            </Tabs>
        </div>
    );
}
