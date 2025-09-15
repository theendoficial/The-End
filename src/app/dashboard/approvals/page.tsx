
'use client';

import * as React from 'react';

export default function ApprovalsPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Aprovação de Posts</h1>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-card/60 dark:bg-black/40 backdrop-blur-lg min-h-[60vh]">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Nenhum post para aprovar</h3>
          <p className="text-sm text-muted-foreground">Posts aguardando sua aprovação aparecerão aqui.</p>
        </div>
      </div>
    </>
  );
}
