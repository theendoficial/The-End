
'use client';

import * as React from 'react';
import { Post } from '@/components/dashboard/dashboard-components';
import { ApprovalPostCard } from '@/components/dashboard/approval-components';
import { AnimatePresence } from 'framer-motion';
import { usePosts } from '@/components/dashboard/dashboard-components';

export default function ApprovalsPage() {
  const { posts, updatePostStatus } = usePosts();

  const handlePostAction = (postId: number, newStatus: Post['status']) => {
    updatePostStatus(postId, newStatus);
  };
  
  const postsToShow = posts.filter(p => ['awaiting_approval', 'in_revision'].includes(p.status));
  const awaitingApprovalPosts = postsToShow.filter(p => p.status === 'awaiting_approval');
  const inRevisionPosts = postsToShow.filter(p => p.status === 'in_revision');

  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Aprovação de Posts</h1>
      </div>

      {postsToShow.length > 0 ? (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-base font-semibold md:text-xl mb-4">Aguardando Aprovação ({awaitingApprovalPosts.length})</h2>
            {awaitingApprovalPosts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <AnimatePresence>
                        {inRevisionPosts.map((post) => (
                            <ApprovalPostCard key={post.id} post={post} onAction={handlePostAction} />
                        ))}
                    </AnimatePresence>
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
