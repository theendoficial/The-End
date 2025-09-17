
'use server';

import { google } from 'googleapis';
import { Readable } from 'stream';
import { getGoogleDriveCredentials } from '@/lib/google-drive-credentials';

export type UploadState = {
  message: string | null;
  errors: {
    file?: string;
    server?: string;
  } | null;
  success: boolean;
};

export async function uploadFileToDrive(
  prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  const file = formData.get('file') as File;
  // Em um app real, o ID do cliente viria da sessão do usuário logado.
  // Aqui, vamos passar como um campo oculto no formulário.
  const clientName = formData.get('clientName') as string || 'Cliente Desconhecido'; 
  const clientFolderId = formData.get('clientFolderId') as string;

  if (!file || file.size === 0) {
    return {
      message: 'Nenhum arquivo selecionado.',
      errors: { file: 'Por favor, selecione um arquivo para enviar.' },
      success: false,
    };
  }

  // Se não houver um ID de pasta específico do cliente, não podemos prosseguir.
  if (!clientFolderId) {
      return {
        message: 'ID da pasta do cliente não encontrado. O upload não pode ser concluído.',
        errors: { server: 'ID da pasta do cliente não encontrado.' },
        success: false,
      };
  }


  try {
    const { client_email, private_key } = getGoogleDriveCredentials();
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email,
        private_key,
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });
    
    // Convert Buffer to a Readable Stream
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const fileMetadata = {
      name: file.name,
      parents: [clientFolderId],
    };

    const media = {
      mimeType: file.type,
      body: stream,
    };

    await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    // Log para notificação do admin no servidor
    console.log(`[ADMIN NOTIFICATION] Arquivo "${file.name}" enviado pelo cliente: "${clientName}".`);

    return {
      message: `Arquivo "${file.name}" enviado com sucesso! A agência foi notificada.`,
      errors: null,
      success: true,
    };
  } catch (error: any) {
    console.error('Google Drive Upload Error:', error);
    let errorMessage = 'Ocorreu um erro inesperado ao tentar enviar o arquivo. Por favor, tente novamente mais tarde.';

    if (error.message.includes('File not found') || error.message.includes('folderId')) {
        errorMessage = 'A pasta de destino no Google Drive não foi encontrada. Verifique se o folderId está correto.';
    } else if (error.message.includes('Missing credentials')) {
        errorMessage = 'As credenciais do Google Drive não estão configuradas no servidor. Contate o administrador.';
    }

    return {
      message: errorMessage,
      errors: { server: errorMessage },
      success: false,
    };
  }
}
