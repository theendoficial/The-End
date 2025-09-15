
'use client';

import { KanbanBoard, FullCalendar } from '@/components/dashboard/calendar-components';

export default function CalendarPage() {
  return (
    <>
      <div className="flex items-center mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Calendário e Planejamento</h1>
      </div>
      
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-base font-semibold md:text-xl mb-3">Quadro de Tarefas</h2>
          <KanbanBoard />
        </div>
        
        <div>
          <h2 className="text-base font-semibold md:text-xl mb-3">Calendário de Conteúdo</h2>
          <FullCalendar />
        </div>
      </div>
    </>
  );
}
