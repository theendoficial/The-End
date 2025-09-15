
'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Edit, Download, Calendar, Info, Trash2 } from 'lucide-react';
import { Post, PostImage, PostDialogContent, RequestChangeDialog, Status } from './dashboard-components';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


type ApprovalPostCardProps = {
    post: Post;
    onAction: (postId: number, newStatus: Status) => void;
};

const getPostImage = (post: Post): PostImage => {
    if (post.type === 'carousel' && post.images && post.images.length > 0) {
        return post.images[0];
    }
    if (post.imageUrl) {
        return { url: post.imageUrl, hint: post.imageHint || '' };
    }
    // Consistent placeholder
    return { url: `https://picsum.photos/seed/post${post.id}/600/400`, hint: 'placeholder' };
};

export function ApprovalPostCard({ post, onAction }: ApprovalPostCardProps) {
    const image = getPostImage(post);

    const isAwaitingApproval = post.status === 'awaiting_approval';
    const isInRevision = post.status === 'in_revision';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
            className="relative"
        >
             <Dialog>
                <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl overflow-hidden group w-full flex flex-col h-full">
                    <DialogTrigger asChild>
                        <div className="relative aspect-square cursor-pointer">
                            <Image
                                src={image.url}
                                alt={`Capa do post: ${post.title}`}
                                fill
                                className="object-cover"
                                data-ai-hint={image.hint}
                            />
                        </div>
                    </DialogTrigger>
                    
                    <CardContent className="p-4 flex flex-col flex-grow">
                         <h3 className="font-semibold text-sm mb-2 leading-tight h-10">{post.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mb-4">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Publicação: {post.date}</span>
                        </div>

                        <div className="mt-auto space-y-2">
                            {isAwaitingApproval && (
                                <>
                                    <div className="grid grid-cols-2 gap-2">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="sm" className="w-full flex-1">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Esta ação não pode ser desfeita. O post "{post.title}" será permanentemente cancelado.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Não, voltar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => onAction(post.id, 'canceled')}>Sim, cancelar post</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        <Button onClick={() => onAction(post.id, 'approved')} size="sm" className="w-full bg-green-500/90 hover:bg-green-500 text-white flex-1">
                                            <Check className="mr-2 h-4 w-4" />
                                            Aprovar
                                        </Button>
                                    </div>
                                    <RequestChangeDialog post={post} onConfirm={(postId, comment) => { onAction(postId, 'in_revision'); }}>
                                        <Button variant="outline" size="sm" className="w-full">
                                            <Edit className="mr-2 h-4 w-4" />
                                            Pedir Alteração
                                        </Button>
                                    </RequestChangeDialog>
                                </>
                            )}
                            {isInRevision && (
                                <Button disabled variant="outline" className="w-full border-yellow-500/80 bg-yellow-900/50 text-yellow-300">
                                    Em Alteração
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <PostDialogContent post={post} showExtraActions onAction={onAction} />
            </Dialog>
        </motion.div>
    );
}
