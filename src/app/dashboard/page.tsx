
'use client';

import * as React from 'react';
import {
    CalendarWidget,
    PendingApprovalsWidget,
    UpcomingPostsList
} from '@/components/dashboard/dashboard-components';
import { useAppContext } from '@/contexts/AppContext';

export default function DashboardPage() {
  const { user } = useAppContext();

  // The clientId is now the user's email, which is guaranteed to exist if the user is logged in.
  const clientId = user?.email;

  if (!clientId) {
    // This case should ideally not be hit if the layout handles redirection correctly,
    // but it's good practice for robustness.
    return <div>Carregando dados do usuário...</div>;
  }

  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold md:text-xl font-headline">Bem Vindo!</h1>
          <p className="text-sm text-muted-foreground">
            Sua área The End, explore e encontre seu projeto aqui!
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalendarWidget clientId={clientId} />
          <PendingApprovalsWidget clientId={clientId} />
        </div>
        <div>
          <UpcomingPostsList clientId={clientId} />
        </div>
      </div>
    </>
  );
}
