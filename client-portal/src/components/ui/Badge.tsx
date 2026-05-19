import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info'
}

const Badge = ({ className, variant = 'default', children, ...props }: BadgeProps) => {
  const dotColors = {
    default: "bg-slate-400",
    success: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
    warning: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]",
    destructive: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)] animate-pulse",
    info: "bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.4)]"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/[0.06] bg-transparent px-2 py-0.5 text-[10px] font-medium text-slate-900 dark:text-white transition-colors",
        className
      )}
      {...props}
    >
      <span className={cn("h-1 w-1 rounded-full", dotColors[variant])} />
      {children}
    </div>
  )
}

export { Badge }
