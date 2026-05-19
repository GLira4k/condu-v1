import React from 'react';
import { cn } from '../../lib/utils';

export const FinancialSkeleton: React.FC = () => {
  const skeletonBase = "bg-slate-200/60 dark:bg-slate-900/60 animate-pulse border border-transparent dark:border-white/[0.04] rounded-lg";

  return (
    <div className="min-h-screen bg-premium-bg-light dark:bg-premium-bg-dark p-4 md:p-8 space-y-8">
      <header className="space-y-2">
        <div className={cn("h-4 w-32", skeletonBase)} />
        <div className={cn("h-3 w-48", skeletonBase)} />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Summary Stats Skeletons */}
        {[1, 2, 3].map((i) => (
          <div key={i} className={cn("h-24 p-4 space-y-3", skeletonBase)}>
            <div className={cn("h-2 w-20", skeletonBase)} />
            <div className={cn("h-6 w-32", skeletonBase)} />
          </div>
        ))}

        {/* Main Content Skeleton */}
        <div className="md:col-span-2 space-y-4">
          <div className={cn("h-12 w-full", skeletonBase)} />
          <div className={cn("h-96 w-full", skeletonBase)} />
        </div>

        {/* Sidebar Actions Skeleton */}
        <div className="md:col-span-1 space-y-4">
          <div className={cn("h-48 w-full", skeletonBase)} />
          <div className={cn("h-32 w-full", skeletonBase)} />
        </div>
      </div>
    </div>
  );
};
