
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileCheck, CheckCircle, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const kpiData = [
    { title: 'Novos Clientes (Mês)', value: '2', icon: Users, change: '+10%', changeType: 'increase' },
    { title: 'Aprovações Pendentes', value: '8', icon: FileCheck, change: '+3', changeType: 'increase' },
    { title: 'Posts Aprovados (Mês)', value: '42', icon: CheckCircle, change: '+25%', changeType: 'increase' },
    { title: 'Em Revisão', value: '3', icon: Clock, change: '-1', changeType: 'decrease' },
];

const recentActivities = [
    { id: 1, client: 'Major Style - Barbearia', activity: 'Aprovou o post "Corte Navalha"', time: '2 min atrás', clientLogo: 'https://picsum.photos/seed/client1/40/40' },
    { id: 2, client: 'Fitness Club', activity: 'Pediu alteração em "Promo de Verão"', time: '15 min atrás', clientLogo: 'https://picsum.photos/seed/client2/40/40' },
    { id: 3, client: 'Doceria Doce Sonho', activity: 'Novo post "Bolo de Chocolate" aguardando aprovação.', time: '30 min atrás', clientLogo: 'https://picsum.photos/seed/client3/40/40' },
    { id: 4, client: 'Major Style - Barbearia', activity: 'Aprovou o post "Dia dos Pais"', time: '1 hora atrás', clientLogo: 'https://picsum.photos/seed/client1/40/40' },
];

export default function AdminDashboardPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Painel de Controle</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
                  {kpi.change}
                </span>{' '}
                em relação ao mês passado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Acompanhe as últimas ações dos seus clientes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className="border-b-white/10 hover:bg-transparent">
                        <TableHead>Cliente</TableHead>
                        <TableHead>Atividade</TableHead>
                        <TableHead className="text-right">Horário</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentActivities.map((activity) => (
                        <TableRow key={activity.id} className="border-b-white/10">
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <img src={activity.clientLogo} alt={activity.client} className="h-8 w-8 rounded-full" data-ai-hint="logo" />
                                    <span className="font-medium">{activity.client}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{activity.activity}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{activity.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
