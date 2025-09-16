
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardList, Download, File as FileIcon, Briefcase, FolderOpen } from "lucide-react";
import * as React from 'react';

// Dados de exemplo para visualização. 
// No futuro, estes dados virão do seu painel de administração.
const documentFolders = [
  {
    title: "Identidade Visual",
    icon: Briefcase,
    assets: [
      { name: "Logotipo Principal (Colorido)", type: "PNG", url: "#" },
      { name: "Manual da Marca v1.2", type: "PDF", url: "#" },
      { name: "Paleta de Cores", type: "PDF", url: "#" },
    ],
  },
  {
    title: "Templates",
    icon: ClipboardList,
    assets: [
      { name: "Template de Post (Feed)", type: "FIGMA", url: "#" },
      { name: "Template de Story", type: "FIGMA", url: "#" },
      { name: "Template de Apresentação", type: "PPTX", url: "#" },
    ],
  },
];


export default function DocumentsPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Documentos</h1>
      </div>

      {documentFolders.length > 0 ? (
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
                          {folder.assets.map((asset: any) => (
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
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-card/60 dark:bg-black/40 backdrop-blur-lg min-h-[60vh]">
          <div className="flex flex-col items-center gap-2 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight">
              Nenhum documento encontrado
            </h3>
            <p className="text-sm text-muted-foreground">
              Os documentos adicionados pelo administrador aparecerão aqui.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
