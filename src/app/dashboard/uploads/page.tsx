
'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, File as FileIcon, Loader, AlertCircle, CheckCircle2 } from 'lucide-react';
import { uploadFileToDrive, type UploadState } from '@/app/actions/upload-action';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? (
                <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                </>
            ) : (
                <>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Enviar Arquivo
                </>
            )}
        </Button>
    );
}

// Em um app real, os dados do cliente viriam do contexto de autenticação/sessão.
// Para este exemplo, estamos passando-os como props.
type UploadsPageProps = {
    clientData?: {
        name: string;
        driveFolderId: string;
    }
}

export default function UploadsPage({ clientData }: UploadsPageProps) {
    const initialState: UploadState = { message: null, success: false, errors: null };
    const [state, dispatch] = useActionState(uploadFileToDrive, initialState);
    const [fileName, setFileName] = React.useState<string | null>(null);
    const formRef = React.useRef<HTMLFormElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };
    
    React.useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
            setFileName(null);
        }
    }, [state.success]);

    return (
        <>
            <div className="flex items-center mb-6 gap-3">
                <UploadCloud className="h-6 w-6" />
                <h1 className="text-lg font-semibold md:text-2xl">Envio de Arquivos</h1>
            </div>

            <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl w-full max-w-2xl mx-auto">
                <form action={dispatch} ref={formRef}>
                    {/* Campos ocultos para passar dados extras para a Server Action */}
                    <input type="hidden" name="clientName" value={clientData?.name} />
                    <input type="hidden" name="clientFolderId" value={clientData?.driveFolderId} />

                    <CardHeader>
                        <CardTitle>Enviar Arquivo para a Agência</CardTitle>
                        <CardDescription>
                            Use esta área para nos enviar materiais importantes como vídeos, logos, ou outros documentos necessários para o projeto.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="file">Selecione o Arquivo</Label>
                            <div 
                                className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 dark:bg-black/20 hover:bg-background/70 dark:hover:bg-black/30 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
                                    <FileIcon className="w-10 h-10 mb-3" />
                                    {fileName ? (
                                        <p className="font-semibold text-primary">{fileName}</p>
                                    ) : (
                                        <>
                                            <p className="mb-2 text-sm"><span className="font-semibold">Clique para selecionar</span> ou arraste o arquivo</p>
                                            <p className="text-xs">Qualquer tipo de arquivo é aceito</p>
                                        </>
                                    )}
                                </div>
                                <Input 
                                    id="file" 
                                    name="file"
                                    type="file" 
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    required 
                                />
                            </div>
                             {state.errors?.file && (
                                <p className="text-sm text-red-500 mt-2">{state.errors.file}</p>
                            )}
                        </div>

                         {state.message && (
                            <Alert variant={state.success ? "success" : "destructive"}>
                                {state.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                <AlertTitle>{state.success ? 'Sucesso!' : 'Ocorreu um erro'}</AlertTitle>
                                <AlertDescription>
                                    {state.message}
                                </AlertDescription>
                            </Alert>
                         )}

                    </CardContent>
                    <CardFooter className="border-t border-border/10 px-6 py-4">
                        <SubmitButton />
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}
