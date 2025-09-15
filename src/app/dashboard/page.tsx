
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    CalendarWidget,
    PendingApprovalsWidget,
    UpcomingPostsList
} from '@/components/dashboard/dashboard-components';

export default function DashboardPage() {
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
          <CalendarWidget />
          <PendingApprovalsWidget />
        </div>
        <div>
          <UpcomingPostsList />
        </div>
      </div>
    </>
  );
}
