
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, File as FileIcon, FolderOpen } from "lucide-react";
import * as React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent } from "@/components/ui/card";

export default function DocumentsPage() {
  const { user, getClient } = useAppContext();
  const client = user ? getClient(user.email!) : null;
  const documentFolders = client?.documents || [];

  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Documentos</h1>
      </div>

      {documentFolders.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {documentFolders.map((folder, index) => (
            <AccordionItem value={`item-${index}`} key={folder.id} className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border border-white/10 shadow-lg rounded-2xl px-4">
              <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                      <FolderOpen className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-base">{folder.name}</span>
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
                          {folder.documents.length > 0 ? (
                            folder.documents.map((asset: any) => (
                                <TableRow key={asset.id} className="border-b-white/10">
                                    <TableCell className="font-medium flex items-center gap-3">
                                        <FileIcon className="h-4 w-4 text-muted-foreground" />
                                        {asset.title}
                                    </TableCell>
                                    <TableCell>
                                        <span className="bg-muted/50 text-muted-foreground text-xs font-semibold px-2 py-1 rounded-md">
                                            {asset.fileName ? asset.fileName.split('.').pop() : 'Link'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <a href={asset.url} download={asset.fileName} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                {asset.fileName ? 'Baixar' : 'Acessar'}
                                            </a>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                          ) : (
                             <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                    Nenhum documento nesta pasta.
                                </TableCell>
                            </TableRow>
                          )}
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
