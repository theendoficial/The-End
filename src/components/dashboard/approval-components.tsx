
'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Send, Trash2, Edit, CheckCircle, Clock } from 'lucide-react';
import { Post, PostImage, PostDialogContent, Status } from './dashboard-components';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger, DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogContent as UiDialogContent } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Textarea } from '../ui/textarea';

type ApprovalPostCardProps = {
    post: Post;
    onAction: (postId: number, newStatus: Status) => void;
};

const getPostImage = (post: Post): PostImage | null => {
    if (post.type === 'carousel' && post.images && post.images.length > 0) {
        return post.images[0];
    }
    if (post.imageUrl) {
        return { url: post.imageUrl, hint: post.imageHint || '' };
    }
    return { url: 'https://placehold.co/600x600/222/fff?text=Post', hint: 'placeholder' };
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
                            {image && (
                                <Image
                                    src={image.url}
                                    alt={`Capa do post: ${post.title}`}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={image.hint}
                                />
                            )}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-3">
                                    <h3 className="text-white text-sm font-semibold drop-shadow-md">{post.title}</h3>
                                </div>
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
