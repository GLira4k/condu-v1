import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-[#16171d] dark:text-white dark:border dark:border-white/[0.06] dark:hover:bg-[#1c1d25]",
      outline: "bg-transparent border border-slate-200 text-slate-900 hover:bg-slate-100 dark:border-white/[0.1] dark:text-white dark:hover:bg-white/[0.05]",
      ghost: "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.05]"
    }

    const sizes = {
      sm: "px-2.5 py-1 text-[10px]",
      md: "px-3 py-1.5 text-xs",
      lg: "px-4 py-2 text-sm"
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
