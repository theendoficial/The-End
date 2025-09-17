
'use client';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Download, File as FileIcon, LineChart } from "lucide-react";
import * as React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function ReportsPage() {
  const { user, getClient } = useAppContext();
  const client = user ? getClient(user.email!) : null;
  const reports = client?.reports || [];


  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Relatórios</h1>
      </div>

      {reports.length > 0 ? (
        <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl">
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b-white/10">
                            <TableHead>Título do Relatório</TableHead>
                            <TableHead>Data de Envio</TableHead>
                            <TableHead className="text-right">Ação</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id} className="border-b-white/10">
                                <TableCell className="font-medium flex items-center gap-3">
                                    <FileIcon className="h-4 w-4 text-muted-foreground" />
                                    {report.title}
                                </TableCell>
                                <TableCell>{format(new Date(report.date), "dd 'de' MMM, yyyy", { locale: ptBR })}</TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="outline" size="sm">
                                        <a href={report.url} download={report.fileName} target="_blank" rel="noopener noreferrer">
                                            <Download className="mr-2 h-4 w-4" />
                                            {report.fileName ? 'Baixar' : 'Visualizar'}
                                        </a>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-card/60 dark:bg-black/40 backdrop-blur-lg min-h-[60vh]">
          <div className="flex flex-col items-center gap-2 text-center">
            <LineChart className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight">
              Nenhum relatório disponível
            </h3>
            <p className="text-sm text-muted-foreground">
              Relatórios de performance e métricas aparecerão aqui.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
