
'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Send, Trash2, Edit, CheckCircle, Clock } from 'lucide-react';
import { Post, PostImage, PostDialogContent, Status } from './dashboard-components';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger, DialogClose, DialogFooter, DialogHeader, DialogDescription, DialogContent as UiDialogContent } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Textarea } from '../ui/textarea';

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

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
        >
            <Dialog>
                 <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl overflow-hidden group relative">
                    <DialogTrigger asChild>
                        <div className="relative aspect-square w-full cursor-pointer">
                            <Image
                                src={image.url}
                                alt={`Capa do post: ${post.title}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={image.hint}
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-3">
                                    <h3 className="text-white text-sm font-semibold drop-shadow-md">{post.title}</h3>
                                </div>
                                {post.status === 'in_revision' && (
                                     <div className="absolute top-2 right-2">
                                        <Badge variant="outline" className="border-yellow-500/80 bg-yellow-900/50 backdrop-blur-sm text-yellow-300 py-1 px-2"><Clock className="mr-1.5 h-3 w-3" />Em Alteração</Badge>
                                     </div>
                                )}
                        </div>
                    </DialogTrigger>
                </Card>
                <PostDialogContent
                    post={post}
                    showExtraActions={true}
                    onAction={onAction}
                />
            </Dialog>
        </motion.div>
    );
}
