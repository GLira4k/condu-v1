import React from 'react';
import { cn } from '../../lib/utils';

export const BentoGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[minmax(140px,auto)]">
      <BentoSkeleton className="col-span-1 md:col-span-2 lg:col-span-1" />
      <BentoSkeleton className="col-span-1 md:col-span-2 lg:col-span-1" />
      <BentoSkeleton className="col-span-1 md:col-span-2 lg:col-span-1" />
      <BentoSkeleton className="col-span-1" />
      <BentoSkeleton className="col-span-1 md:col-span-3 lg:col-span-3 h-40" />
      <BentoSkeleton className="col-span-1" />
    </div>
  );
};

export const BentoSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-white/[0.03] animate-pulse border border-white/[0.06] h-full w-full",
        className
      )}
    />
  );
};
