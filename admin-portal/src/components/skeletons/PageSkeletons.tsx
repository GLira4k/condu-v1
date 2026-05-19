import React from 'react';
import { BentoGrid } from '../layout/BentoGrid';

export const UnitsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-slate-200/60 dark:bg-slate-900/60 animate-pulse rounded" />
          <div className="h-3 w-48 bg-slate-200/60 dark:bg-slate-900/60 animate-pulse rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-40 bg-slate-200/60 dark:bg-slate-900/60 animate-pulse rounded-md" />
          <div className="h-8 w-24 bg-slate-200/60 dark:bg-slate-900/60 animate-pulse rounded-md" />
          <div className="h-8 w-24 bg-slate-200/60 dark:bg-slate-900/60 animate-pulse rounded-md" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1 space-y-4">
          <div className="h-32 bg-slate-200/60 dark:bg-slate-900/60 animate-pulse rounded-lg border border-transparent dark:border-white/[0.04]" />
          <div className="h-48 bg-slate-200/60 dark:bg-slate-900/60 animate-pulse rounded-lg border border-transparent dark:border-white/[0.04]" />
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-24 bg-slate-200/60 dark:bg-slate-900/60 animate-pulse rounded-lg border border-transparent dark:border-white/[0.04]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
