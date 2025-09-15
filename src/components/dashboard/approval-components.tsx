
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

const RequestChangeDialog = ({ post, onConfirm, children }: { post: Post; onConfirm: (comment: string) => void; children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(comment);
        setComment('');
        setOpen(false); // Close the dialog
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <UiDialogContent className="sm:max-w-md bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Pedir Alteração</DialogTitle>
                        <DialogDescription>
                            Descreva abaixo qual alteração você gostaria de solicitar para o post "{post.title}".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Textarea
                            name="comment"
                            placeholder="Ex: Gostaria de alterar a cor de fundo para um tom mais claro..."
                            className="min-h-[120px] bg-background/50 dark:bg-black/20"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">
                            <Send className="mr-2 h-4 w-4" />
                            Enviar
                        </Button>
                    </DialogFooter>
                </form>
            </UiDialogContent>
        </Dialog>
    );
};

const ApprovalActions = ({ post, onAction }: ApprovalPostCardProps) => {
    if (post.status === 'in_revision') {
        return <Badge variant="outline" className="border-yellow-500/80 bg-yellow-500/10 text-yellow-400 py-1 px-3"><Clock className="mr-2 h-4 w-4" />Em Alteração</Badge>;
    }
    
    return (
        <div className="mt-4 flex flex-col gap-2">
            <div className="flex gap-2">
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancelar
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
                <Button onClick={() => onAction(post.id, 'approved')} variant="secondary" className="bg-green-500/80 hover:bg-green-500/100 text-white w-full">
                    <Check className="mr-2 h-4 w-4" />
                    Aprovar
                </Button>
            </div>
             <RequestChangeDialog post={post} onConfirm={() => onAction(post.id, 'in_revision')}>
                <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Pedir Alteração
                </Button>
            </RequestChangeDialog>
        </div>
    );
}

export function ApprovalPostCard({ post, onAction }: ApprovalPostCardProps) {
    const image = getPostImage(post);

    const isActionable = post.status === 'awaiting_approval';

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
                                    <CardContent className='p-0'>
                                        <h3 className="text-white text-sm font-semibold drop-shadow-md">{post.title}</h3>
                                    </CardContent>
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

type ExtendedPostDialogContentProps = {
    post: Post;
    showExtraActions?: boolean;
    onAction?: (postId: number, newStatus: Status) => void;
};

// We extend the PostDialogContent to include the approval actions inside it
// This avoids prop drilling and complexity in the original component
const ApprovalDialogContent = ({ post, showExtraActions, onAction }: ExtendedPostDialogContentProps) => {
    return (
        <PostDialogContent post={post} >
            {showExtraActions && onAction && (
                <div className="md:col-start-2">
                    <ApprovalActions post={post} onAction={onAction} />
                </div>
            )}
        </PostDialogContent>
    )
}
