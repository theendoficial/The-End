
'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Edit, Trash2, Clock, Info } from 'lucide-react';
import { Post, PostImage, PostDialogContent, RequestChangeDialog, Status } from './dashboard-components';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    return { url: 'https://picsum.photos/seed/placeholder/600/600', hint: 'placeholder' };
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
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="relative"
        >
            <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl overflow-hidden group">
                <div className="relative aspect-square w-full">
                    <Image
                        src={image.url}
                        alt={`Capa do post: ${post.title}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity group-hover:opacity-100"></div>

                    {/* Title and Info */}
                    <div className="absolute bottom-0 left-0 p-3 w-full">
                         <h3 className="text-white text-sm font-semibold drop-shadow-md truncate">{post.title}</h3>
                    </div>

                    {/* Top Right Badges/Actions */}
                    <div className="absolute top-2 right-2 flex items-center gap-2">
                        <Dialog>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm">
                                                <Info className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="bg-black/80 text-white border-white/20 backdrop-blur-md">Ver Detalhes</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <PostDialogContent post={post} />
                        </Dialog>
                         {isInRevision && (
                            <Badge variant="outline" className="border-yellow-500/80 bg-yellow-900/50 backdrop-blur-sm text-yellow-300 py-1 px-2 pointer-events-none"><Clock className="mr-1.5 h-3 w-3" />Em Alteração</Badge>
                         )}
                    </div>
                </div>
                
                {isAwaitingApproval && (
                    <div className="absolute inset-x-0 bottom-0 flex justify-center items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-center gap-2 bg-black/50 backdrop-blur-md rounded-full p-1.5">
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="icon" className="h-10 w-10 rounded-full bg-red-500/80 hover:bg-red-500 text-white">
                                        <Trash2 />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Cancelar Post?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta ação não pode ser desfeita. O post "{post.title}" será permanentemente cancelado e uma notificação será enviada.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Voltar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onAction(post.id, 'canceled')}>Sim, cancelar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <RequestChangeDialog post={post} onConfirm={(postId, comment) => {
                                onAction(postId, 'in_revision');
                            }}>
                                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white border-none">
                                    <Edit />
                                </Button>
                            </RequestChangeDialog>

                            <Button onClick={() => onAction(post.id, 'approved')} size="icon" className="h-10 w-10 rounded-full bg-green-500/90 hover:bg-green-500 text-white">
                                <Check />
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </motion.div>
    );
}
