"use client"

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'blue' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = 'green', size = 'md', glow = true, children, ...props }, ref) => {
    const variantStyles = {
      green: "border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]",
      blue: "border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:shadow-[0_0_20px_rgba(0,136,255,0.5)]",
      purple: "border-neon-purple text-neon-purple hover:bg-neon-purple/10 hover:shadow-[0_0_20px_rgba(136,0,255,0.5)]",
    }

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-3 text-base",
    }

    const glowStyles = glow ? {
      green: "shadow-[0_0_10px_rgba(0,255,136,0.3)]",
      blue: "shadow-[0_0_10px_rgba(0,136,255,0.3)]",
      purple: "shadow-[0_0_10px_rgba(136,0,255,0.3)]",
    } : {}

    return (
      <button
        ref={ref}
        className={cn(
          "relative font-mono font-medium border-2 rounded-sm",
          "transition-all duration-300 ease-out",
          "active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          glow && glowStyles[variant],
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)

NeonButton.displayName = "NeonButton"
