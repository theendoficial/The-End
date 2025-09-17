// IMPORTANT: Add this file to your .gitignore to keep your credentials secure!
// Do not commit this file to a public repository.
// In production, these values should be stored as environment variables on your server.

export const getGoogleDriveCredentials = () => {
    // In a real production environment, you would validate that these exist
    const private_key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const client_email = process.env.GOOGLE_CLIENT_EMAIL;
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!private_key || !client_email || !folderId) {
        throw new Error('Missing Google Drive credentials in environment variables.');
    }

    return {
        private_key,
        client_email,
        folderId
    };
};
