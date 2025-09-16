
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, File, PlusCircle, Upload } from 'lucide-react';

export default function AdminFilesPage() {
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-semibold md:text-2xl">Gerenciador de Arquivos</h1>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nova Pasta
                    </Button>
                    <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Fazer Upload
                    </Button>
                </div>
            </div>
             <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-card/60 dark:bg-black/40 backdrop-blur-lg min-h-[60vh]">
                <div className="flex flex-col items-center gap-2 text-center">
                    <Folder className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-2xl font-bold tracking-tight">
                    Nenhum arquivo encontrado
                    </h3>
                    <p className="text-sm text-muted-foreground">
                    Faça upload de arquivos e crie pastas para organizar seus templates e documentos globais.
                    </p>
                </div>
            </div>
        </>
    );
}
