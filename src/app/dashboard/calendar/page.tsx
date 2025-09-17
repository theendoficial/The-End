
'use client';

import { KanbanBoard, FullCalendar } from '@/components/dashboard/calendar-components';
import { useAppContext } from '@/contexts/AppContext';

function CalendarPageContent() {
  const { user, getClient, updatePostStatus, updatePostDate } = useAppContext();
  const clientId = user?.email;
  const client = clientId ? getClient(clientId) : null;
  
  if (!client || !clientId) return <div>Carregando...</div>;

  const posts = client.posts || [];
  const scheduledPosts = posts.filter(p => p.status === 'scheduled' || p.status === 'completed');

  const handleUpdateStatus = (postId: number, status: any) => {
    updatePostStatus(clientId, postId, status);
  }

  const handleUpdateDate = (postId: number, date: string) => {
    updatePostDate(clientId, postId, date);
  }

  return (
    <>
      <div className="flex items-center mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Calendário e Planejamento</h1>
      </div>
      
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-base font-semibold md:text-xl mb-3">Quadro Semanal</h2>
          <KanbanBoard posts={posts} scheduledPosts={scheduledPosts} updatePostDate={handleUpdateDate} />
        </div>
        
        <div>
          <h2 className="text-base font-semibold md:text-xl mb-3">Calendário de Conteúdo</h2>
          <FullCalendar posts={posts} scheduledPosts={scheduledPosts} updatePostStatus={handleUpdateStatus} />
        </div>
      </div>
    </>
  );
}

export default function CalendarPage() {
  return (
      <CalendarPageContent />
  )
}
