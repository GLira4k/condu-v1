import React from 'react';
import { cn } from '../../lib/utils';

export const BentoSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "rounded-3xl bg-muted animate-pulse border h-full w-full",
        className
      )}
    />
  );
};

export const BentoGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[18rem]">
      <BentoSkeleton className="col-span-1 md:col-span-2" />
      <BentoSkeleton />
      <BentoSkeleton />
      <BentoSkeleton className="md:col-span-2" />
      <BentoSkeleton />
      <BentoSkeleton />
    </div>
  );
};
