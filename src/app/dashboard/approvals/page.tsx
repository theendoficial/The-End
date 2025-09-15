'use client';

import * as React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ApprovalCard } from '@/components/dashboard/approval-components';
import { upcomingPosts, Post } from '@/components/dashboard/dashboard-components';

export default function ApprovalsPage() {
  const [posts, setPosts] = React.useState<Post[]>(upcomingPosts);

  const postsAwaitingApproval = posts.filter(p => p.status === 'awaiting_approval');
  const postsInRevision = posts.filter(p => p.status === 'in_revision');

  const handleStatusChange = (postId: number, newStatus: Post['status']) => {
    setPosts(prevPosts =>
      prevPosts.map(p => (p.id === postId ? { ...p, status: newStatus } : p))
    );
  };

  const handleCancel = (postId: number) => {
    setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
  };
  

  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Aprovação de Posts</h1>
      </div>

      {postsAwaitingApproval.length === 0 && postsInRevision.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-card/60 dark:bg-black/40 backdrop-blur-lg min-h-[60vh]">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">Nenhum post para aprovar</h3>
            <p className="text-sm text-muted-foreground">Posts aguardando sua aprovação aparecerão aqui.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {postsAwaitingApproval.length > 0 && (
            <div>
              <h2 className="text-base font-semibold md:text-xl mb-4">Aguardando Aprovação</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {postsAwaitingApproval.map(post => (
                    <ApprovalCard
                      key={post.id}
                      post={post}
                      onApprove={() => handleStatusChange(post.id, 'approved')}
                      onRequestChange={() => handleStatusChange(post.id, 'in_revision')}
                      onCancel={() => handleCancel(post.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {postsInRevision.length > 0 && (
            <div>
              <h2 className="text-base font-semibold md:text-xl mb-4">Em Alteração</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {postsInRevision.map(post => (
                    <ApprovalCard
                      key={post.id}
                      post={post}
                      onApprove={() => handleStatusChange(post.id, 'approved')}
                      onRequestChange={() => handleStatusChange(post.id, 'in_revision')}
                      onCancel={() => handleCancel(post.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
