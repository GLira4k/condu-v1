import React from 'react';
import { cn } from '../../lib/utils';

export const ProfileSkeleton: React.FC = () => {
  const skeletonBase = "bg-slate-200/60 dark:bg-slate-900/60 animate-pulse border border-transparent dark:border-white/[0.04] rounded-lg";

  return (
    <div className="min-h-screen bg-premium-bg-light dark:bg-premium-bg-dark p-4 md:p-8 space-y-8">
      <header className="space-y-2">
        <div className={cn("h-4 w-32", skeletonBase)} />
        <div className={cn("h-3 w-48", skeletonBase)} />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
        {/* Profile Card Skeleton */}
        <div className={cn("col-span-1 md:col-span-1 p-6 space-y-6", skeletonBase)}>
          <div className="flex flex-col items-center space-y-4">
            <div className={cn("h-20 w-20 rounded-full", skeletonBase)} />
            <div className="space-y-2 w-full flex flex-col items-center">
              <div className={cn("h-4 w-3/4", skeletonBase)} />
              <div className={cn("h-3 w-1/2", skeletonBase)} />
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/[0.06]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                <div className={cn("h-2 w-16", skeletonBase)} />
                <div className={cn("h-3 w-full", skeletonBase)} />
              </div>
            ))}
          </div>
        </div>

        {/* Info Grid Skeleton */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={cn("p-4 space-y-3", skeletonBase)}>
              <div className={cn("h-3 w-24", skeletonBase)} />
              <div className={cn("h-8 w-full", skeletonBase)} />
            </div>
          ))}
          <div className={cn("col-span-1 sm:col-span-2 h-32", skeletonBase)} />
        </div>
      </div>
    </div>
  );
};
