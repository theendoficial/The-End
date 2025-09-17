
'use server';

import { google } from 'googleapis';
import { Readable } from 'stream';
import { googleDriveCredentials } from '@/lib/google-drive-credentials';

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

  if (!file || file.size === 0) {
    return {
      message: 'Nenhum arquivo selecionado.',
      errors: { file: 'Por favor, selecione um arquivo para enviar.' },
      success: false,
    };
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: googleDriveCredentials.client_email,
        private_key: googleDriveCredentials.private_key,
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
      parents: [googleDriveCredentials.folderId],
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
    }

    return {
      message: errorMessage,
      errors: { server: errorMessage },
      success: false,
    };
  }
}
