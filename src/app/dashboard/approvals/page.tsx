
'use client';

import * as React from 'react';
import { upcomingPosts, Post } from '@/components/dashboard/dashboard-components';
import { ApprovalPostCard } from '@/components/dashboard/approval-components';
import { AnimatePresence } from 'framer-motion';

export default function ApprovalsPage() {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    setPosts(upcomingPosts.filter(p => ['awaiting_approval', 'in_revision'].includes(p.status)));
  }, []);

  const handlePostAction = (postId: number, newStatus: Post['status']) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (newStatus === 'approved' || newStatus === 'canceled') {
      // Animate out and remove
      setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
      // Here you would also update the master data source
      console.log(`Post ${postId} status changed to ${newStatus}`);
    } else {
      // Update status and re-render
      setPosts(prevPosts => prevPosts.map(p => p.id === postId ? { ...p, status: newStatus } : p));
      console.log(`Post ${postId} status changed to ${newStatus}`);
    }
  };
  
  const awaitingApprovalPosts = posts.filter(p => p.status === 'awaiting_approval');
  const inRevisionPosts = posts.filter(p => p.status === 'in_revision');

  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Aprovação de Posts</h1>
      </div>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-base font-semibold md:text-xl mb-4">Aguardando Aprovação ({awaitingApprovalPosts.length})</h2>
            {awaitingApprovalPosts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence>
                  {awaitingApprovalPosts.map((post) => (
                    <ApprovalPostCard key={post.id} post={post} onAction={handlePostAction} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
               <p className="text-sm text-muted-foreground">Nenhum post aguardando sua aprovação no momento.</p>
            )}
          </div>

          {inRevisionPosts.length > 0 && (
             <div>
                <h2 className="text-base font-semibold md:text-xl mb-4">Em Alteração ({inRevisionPosts.length})</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {inRevisionPosts.map((post) => (
                        <ApprovalPostCard key={post.id} post={post} onAction={handlePostAction} />
                    ))}
                </div>
            </div>
          )}

        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-card/60 dark:bg-black/40 backdrop-blur-lg min-h-[60vh]">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">Nenhum post para aprovar</h3>
            <p className="text-sm text-muted-foreground">Posts aguardando sua aprovação aparecerão aqui.</p>
          </div>
        </div>
      )}
    </>
  );
}
