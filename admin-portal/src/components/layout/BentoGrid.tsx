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
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[minmax(140px,auto)]",
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
  span?: string;
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/[0.06] bg-[#101114] p-4 transition-all duration-150",
        span,
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
          {description && <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>}
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
