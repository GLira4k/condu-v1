import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils'; // Assumindo utilitário padrão do shadcn

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[18rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  span?: 'col-span-1' | 'col-span-2' | 'col-span-3' | 'col-span-4' | 'row-span-1' | 'row-span-2';
}

export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  description,
  children,
  className,
  span = 'col-span-1',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-card p-6 shadow-sm transition-all hover:shadow-md",
        span,
        className
      )}
    >
      <div className="flex flex-col h-full space-y-2">
        <div>
          <h3 className="text-xl font-bold tracking-tight font-serif">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex-1 mt-4">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
