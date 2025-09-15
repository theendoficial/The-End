
'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Edit, Download, Calendar } from 'lucide-react';
import { Post, PostImage, PostDialogContent, RequestChangeDialog, Status } from './dashboard-components';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

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
                <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl overflow-hidden group w-full flex flex-col">
                    <DialogTrigger asChild>
                        <div className="relative aspect-w-4 aspect-h-3 cursor-pointer">
                            <Image
                                src={image.url}
                                alt={`Capa do post: ${post.title}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={image.hint}
                            />
                            {post.url && (
                                <Button asChild size="sm" className="absolute bottom-2 right-2 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm h-8 px-3">
                                    <a href={post.url} download onClick={(e) => e.stopPropagation()}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Baixar
                                    </a>
                                </Button>
                            )}
                        </div>
                    </DialogTrigger>
                    
                    <CardContent className="p-4 flex flex-col flex-grow">
                        <DialogTrigger asChild>
                            <div className='cursor-pointer'>
                                <h3 className="font-semibold text-sm leading-snug truncate mb-2">{post.title}</h3>
                                <div className="flex items-center text-xs text-muted-foreground mb-4">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>Publicação: {post.date}</span>
                                </div>
                            </div>
                        </DialogTrigger>

                        <div className="mt-auto">
                            {isAwaitingApproval && (
                                <div className="grid grid-cols-2 gap-2">
                                     <RequestChangeDialog post={post} onConfirm={(postId, comment) => { onAction(postId, 'in_revision'); }}>
                                        <Button variant="destructive" className="w-full bg-red-500/90 hover:bg-red-500">
                                            <Edit className="mr-2 h-4 w-4" />
                                            Ajustar
                                        </Button>
                                    </RequestChangeDialog>
                                    <Button onClick={() => onAction(post.id, 'approved')} className="w-full bg-green-500/90 hover:bg-green-500 text-white">
                                        <Check className="mr-2 h-4 w-4" />
                                        Aprovar
                                    </Button>
                                </div>
                            )}
                            {isInRevision && (
                                <Button disabled variant="outline" className="w-full border-yellow-500/80 bg-yellow-900/50 text-yellow-300">
                                    Em Alteração
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <PostDialogContent post={post} showExtraActions={isAwaitingApproval} onAction={onAction} />
            </Dialog>
        </motion.div>
    );
}

