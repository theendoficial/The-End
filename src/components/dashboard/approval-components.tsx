'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Send, Trash2, Instagram, Youtube, Edit } from 'lucide-react';
import { Post, PostImage, PostDialogContent, statusConfig } from './dashboard-components';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
);

const socialIcons: Record<string, React.ComponentType<any>> = {
    instagram: (props) => <Instagram {...props} />,
    tiktok: (props) => <TiktokIcon className="h-4 w-4" {...props} />,
    youtube: (props) => <Youtube {...props} />,
};

type ApprovalCardProps = {
  post: Post;
  onApprove: () => void;
  onRequestChange: (comment: string) => void;
  onCancel: () => void;
};

export function ApprovalCard({ post, onApprove, onRequestChange, onCancel }: ApprovalCardProps) {
  const postImage: PostImage | null = post.imageUrl
    ? { url: post.imageUrl, hint: post.imageHint || '' }
    : post.images && post.images.length > 0
    ? post.images[0]
    : null;

    const isAwaitingApproval = post.status === 'awaiting_approval';
    const isInRevision = post.status === 'in_revision';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Dialog>
        <Card className="bg-card/60 dark:bg-black/40 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl overflow-hidden h-full flex flex-col">
            <DialogTrigger asChild>
                <div className="cursor-pointer group">
                    {postImage && (
                        <div className="aspect-square w-full relative">
                            <Image
                            src={postImage.url}
                            alt={`Preview for ${post.title}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={postImage.hint}
                            />
                        </div>
                    )}
                    <CardContent className="p-4 flex-grow">
                         <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
                            {post.description}
                        </p>
                    </CardContent>
                </div>
            </DialogTrigger>

            <div className="p-4 pt-0 mt-auto">
                <div className="flex items-center gap-2 mb-4">
                    {post.socials.map(social => {
                    const Icon = socialIcons[social];
                    return Icon ? <Icon key={social} className="text-muted-foreground h-5 w-5" /> : null;
                    })}
                </div>

                {isAwaitingApproval && (
                     <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-2">
                            <CancelPostDialog onConfirm={onCancel}>
                                <Button size="sm" variant="destructive" className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Cancelar
                                </Button>
                            </CancelPostDialog>
                            <Button onClick={onApprove} size="sm" variant="secondary" className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30">
                                <Check className="mr-2 h-4 w-4" />
                                Aprovar
                            </Button>
                        </div>
                        <RequestChangeDialog post={post} onConfirm={onRequestChange}>
                            <Button size="sm" variant="outline" className="w-full">
                                <Send className="mr-2 h-4 w-4" />
                                Pedir Alteração
                            </Button>
                        </RequestChangeDialog>
                    </div>
                )}
                
                {isInRevision && (
                    <Badge className={cn('w-full flex justify-center', statusConfig.in_revision.className)}>
                        <Edit className="mr-2 h-3 w-3" />
                        {statusConfig.in_revision.label}
                    </Badge>
                )}
            </div>
        </Card>
        <PostDialogContent post={post} />
      </Dialog>
    </motion.div>
  );
}


type RequestChangeDialogProps = {
    post: Post;
    children: React.ReactNode;
    onConfirm: (comment: string) => void;
};

const RequestChangeDialog = ({ post, children, onConfirm }: RequestChangeDialogProps) => {
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(comment);
        setComment('');
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
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
            </DialogContent>
        </Dialog>
    )
}

type CancelPostDialogProps = {
    children: React.ReactNode;
    onConfirm: () => void;
};

const CancelPostDialog = ({ children, onConfirm }: CancelPostDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className="bg-card/80 dark:bg-black/80 backdrop-blur-xl border-white/10">
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. O post será cancelado e o administrador será notificado.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Voltar</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className="bg-destructive hover:bg-destructive/80">
                        Tenho certeza
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};
