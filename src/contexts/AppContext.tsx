'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Post } from '@/components/dashboard/dashboard-components';
import { db, auth } from '@/lib/firebase';
import { 
    collection, 
    doc, 
    onSnapshot, 
    updateDoc, 
    arrayUnion,
    setDoc,
    getDoc,
    getDocs,
    query
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';


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
    user: User | null;
    loading: boolean;
    getClient: (clientId: string) => Client | undefined;
    addPost: (clientId: string, post: Omit<Post, 'id' | 'status'>) => Promise<void>;
    updatePostStatus: (clientId: string, postId: number, status: Post['status']) => Promise<void>;
    updatePostDate: (clientId: string, postId: number, newDate: string) => Promise<void>;
    addReport: (clientId: string, report: Omit<Report, 'id'>) => Promise<void>;
    addDocumentFolder: (clientId: string, folderName: string) => Promise<void>;
    addDocumentToFolder: (clientId: string, folderId: number, document: Omit<Document, 'id'>) => Promise<void>;
    updateClient: (clientId: string, updatedData: Partial<Client>) => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setLoading(true);
            setUser(currentUser);
            
            if (currentUser) {
                // User is logged in
                const isAdmin = currentUser.email === 'admin@example.com';
                
                if (isAdmin) {
                    // Admin: fetch all clients
                    const q = query(collection(db, "clients"));
                    const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
                        const clientsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
                        setClients(clientsData);
                        setLoading(false);
                    }, (error) => {
                        console.error("Firestore snapshot error for admin:", error);
                        setClients([]);
                        setLoading(false);
                    });
                    return () => unsubscribeFirestore();

                } else {
                    // Regular client: fetch only their own data
                    const clientDocRef = doc(db, 'clients', currentUser.email!);
                    const unsubscribeFirestore = onSnapshot(clientDocRef, (docSnapshot) => {
                        if (docSnapshot.exists()) {
                            const clientData = { id: docSnapshot.id, ...docSnapshot.data() } as Client;
                            setClients([clientData]);
                        } else {
                            setClients([]);
                        }
                        setLoading(false);
                    }, (error) => {
                        console.error("Firestore snapshot error for client:", error);
                        setClients([]);
                        setLoading(false);
                    });
                    return () => unsubscribeFirestore();
                }
            } else {
                // User is logged out
                setClients([]);
                setLoading(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribeAuth();
    }, []);

    const getClient = (clientId: string) => {
        return clients.find(c => c.id === clientId);
    };

    const updateClient = async (clientId: string, updatedData: Partial<Client>) => {
        if (!clientId) return;
        const clientDocRef = doc(db, 'clients', clientId);
        await updateDoc(clientDocRef, updatedData);
    };

    const addPost = async (clientId: string, postData: Omit<Post, 'id' | 'status'>) => {
        if (!clientId) return;
        const clientDocRef = doc(db, 'clients', clientId);
        const newPost: Post = {
            ...postData,
            id: Date.now(),
            status: 'awaiting_approval',
        };
        await updateDoc(clientDocRef, {
            posts: arrayUnion(newPost)
        });
    };

    const updatePostStatus = async (clientId: string, postId: number, status: Post['status']) => {
        const client = getClient(clientId);
        if (client) {
            const updatedPosts = client.posts.map(p => p.id === postId ? { ...p, status } : p);
            await updateClient(clientId, { posts: updatedPosts });
        }
    };
    
    const updatePostDate = async (clientId: string, postId: number, newDate: string) => {
        const client = getClient(clientId);
        if (client) {
            const updatedPosts = client.posts.map(p => p.id === postId ? { ...p, date: newDate } : p);
            await updateClient(clientId, { posts: updatedPosts });
        }
    }

    const addReport = async (clientId: string, reportData: Omit<Report, 'id'>) => {
        if (!clientId) return;
        const clientDocRef = doc(db, 'clients', clientId);
        const newReport: Report = { ...reportData, id: Date.now() };
        await updateDoc(clientDocRef, {
            reports: arrayUnion(newReport)
        });
    };
    
    const addDocumentFolder = async (clientId: string, folderName: string) => {
        if (!clientId) return;
        const clientDocRef = doc(db, 'clients', clientId);
        const newFolder: DocumentFolder = { id: Date.now(), name: folderName, documents: [] };
        await updateDoc(clientDocRef, {
            documents: arrayUnion(newFolder)
        });
    };
    
    const addDocumentToFolder = async (clientId: string, folderId: number, documentData: Omit<Document, 'id'>) => {
        const client = getClient(clientId);
        if (client) {
            const newDocument: Document = { ...documentData, id: Date.now() + 1 };
            const updatedFolders = client.documents.map(f => 
                f.id === folderId 
                ? { ...f, documents: [newDocument, ...f.documents] } 
                : f
            );
            await updateClient(clientId, { documents: updatedFolders });
        }
    };

    const value = {
        clients,
        user,
        loading,
        getClient,
        addPost,
        updatePostStatus,
        updatePostDate,
        addReport,
        addDocumentFolder,
        addDocumentToFolder,
        updateClient,
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
