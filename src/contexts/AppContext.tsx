
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from '@/components/dashboard/dashboard-components';

export type Report = {
    id: number;
    title: string;
    url: string;
    date: string;
    fileName?: string;
};

export type Document = {
    id: number;
    title: string;
    url: string;
    date: string;
    fileName?: string;
};

export type DocumentFolder = {
    id: number;
    name: string;
    documents: Document[];
};

export type Client = {
    id: string; // email as id
    name: string;
    email: string;
    password?: string;
    logo: string;
    driveFolderId?: string;
    projects: number[]; 
    posts: Post[];
    documents: DocumentFolder[];
    reports: Report[];
    notifications: any[];
    pendingApprovals: number;
    phone?: string;
    whatsappLink?: string;
};

type AppContextType = {
    clients: Client[];
    addClient: (client: Client) => void;
    updateClient: (clientId: string, updatedData: Partial<Client>) => void;
    getClient: (clientId: string) => Client | undefined;
    addPost: (clientId: string, post: Omit<Post, 'id' | 'status'>) => void;
    updatePostStatus: (clientId: string, postId: number, status: Post['status']) => void;
    updatePostDate: (clientId: string, postId: number, newDate: string) => void;
    addReport: (clientId: string, report: Omit<Report, 'id'>) => void;
    addDocumentFolder: (clientId: string, folderName: string) => void;
    addDocumentToFolder: (clientId: string, folderId: number, document: Omit<Document, 'id'>) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [clients, setClients] = useState<Client[]>([]);

    const addClient = (client: Client) => {
        setClients(prev => [...prev, client]);
    };

    const getClient = (clientId: string) => {
        return clients.find(c => c.id === clientId);
    };

    const updateClient = (clientId: string, updatedData: Partial<Client>) => {
        setClients(prev => prev.map(c => c.id === clientId ? { ...c, ...updatedData } : c));
    };

    const addPost = (clientId: string, postData: Omit<Post, 'id' | 'status'>) => {
        const newPost: Post = {
            ...postData,
            id: Date.now(),
            status: 'awaiting_approval',
        };
        setClients(prev => prev.map(c => 
            c.id === clientId ? { ...c, posts: [newPost, ...c.posts] } : c
        ));
    };

    const updatePostStatus = (clientId: string, postId: number, status: Post['status']) => {
        setClients(prev => prev.map(c => {
            if (c.id === clientId) {
                const updatedPosts = c.posts.map(p => 
                    p.id === postId ? { ...p, status } : p
                );
                return { ...c, posts: updatedPosts };
            }
            return c;
        }));
    };
    
    const updatePostDate = (clientId: string, postId: number, newDate: string) => {
         setClients(prev => prev.map(c => {
            if (c.id === clientId) {
                const updatedPosts = c.posts.map(p => 
                    p.id === postId ? { ...p, date: newDate } : p
                );
                return { ...c, posts: updatedPosts };
            }
            return c;
        }));
    }

    const addReport = (clientId: string, reportData: Omit<Report, 'id'>) => {
        const newReport: Report = {
            ...reportData,
            id: Date.now(),
        };
        setClients(prev => prev.map(c => 
            c.id === clientId ? { ...c, reports: [newReport, ...c.reports] } : c
        ));
    };
    
    const addDocumentFolder = (clientId: string, folderName: string) => {
        const newFolder: DocumentFolder = {
            id: Date.now(),
            name: folderName,
            documents: []
        };
        setClients(prev => prev.map(c =>
            c.id === clientId ? { ...c, documents: [...c.documents, newFolder] } : c
        ));
    };
    
    const addDocumentToFolder = (clientId: string, folderId: number, documentData: Omit<Document, 'id'>) => {
        const newDocument: Document = {
            ...documentData,
            id: Date.now() + 1,
        };
        setClients(prev => prev.map(c => {
            if (c.id === clientId) {
                const updatedFolders = c.documents.map(f =>
                    f.id === folderId ? { ...f, documents: [newDocument, ...f.documents] } : f
                );
                return { ...c, documents: updatedFolders };
            }
            return c;
        }));
    };


    const value = {
        clients,
        addClient,
        updateClient,
        getClient,
        addPost,
        updatePostStatus,
        updatePostDate,
        addReport,
        addDocumentFolder,
        addDocumentToFolder,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
