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
      primary: "bg-white text-black hover:bg-white/90",
      secondary: "bg-[#16171d] text-white border border-white/[0.06] hover:bg-[#1c1d25]",
      outline: "bg-transparent border border-white/[0.1] text-white hover:bg-white/[0.05]",
      ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/[0.05]"
    }

    const sizes = {
      sm: "px-2 py-1 text-[10px]",
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
