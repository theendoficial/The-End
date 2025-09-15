
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardList, Download, File as FileIcon, FileText, Briefcase } from "lucide-react";

const documentFolders = [
    {
        title: 'Contratos e Propostas',
        icon: Briefcase,
        assets: [
            { name: 'Contrato de Prestação de Serviços - The End.', type: 'PDF', url: '#' },
            { name: 'Proposta Comercial - Gestão de Mídias', type: 'PDF', url: '#' },
            { name: 'Termo de Confidencialidade (NDA)', type: 'DOCX', url: '#' },
        ],
    },
    {
        title: 'Formulários de Cadastro',
        icon: ClipboardList,
        assets: [
            { name: 'Formulário de Briefing - Identidade Visual', type: 'PDF', url: '#' },
            { name: 'Formulário de Onboarding de Cliente', type: 'DOCX', url: '#' },
            { name: 'Questionário de Persona', type: 'PDF', url: '#' },
        ],
    },
    {
        title: 'Documentos Gerais',
        icon: FileText,
        assets: [
            { name: 'Apresentação Institucional - The End.', type: 'PDF', url: '#' },
            { name: 'Política de Privacidade', type: 'PDF', url: '#' },
        ],
    },
];

export default function DocumentsPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Documentos</h1>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {documentFolders.map((folder, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border border-white/10 shadow-lg rounded-2xl px-4">
            <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                    <folder.icon className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-base">{folder.title}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <Table>
                    <TableHeader>
                        <TableRow className="border-b-white/10 hover:bg-transparent">
                            <TableHead>Material</TableHead>
                            <TableHead className="w-[150px]">Tipo de Arquivo</TableHead>
                            <TableHead className="w-[120px] text-right">Ação</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {folder.assets.map((asset) => (
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
