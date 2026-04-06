"use client"

import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  intensity?: 'low' | 'medium' | 'high'
}

export function GlitchText({ 
  children, 
  className, 
  as: Component = 'span',
  intensity = 'medium' 
}: GlitchTextProps) {
  const intensityClass = {
    low: 'hover:animate-[glitch_0.5s_ease-in-out]',
    medium: 'glitch-text',
    high: 'animate-[glitch_0.3s_infinite]',
  }

  return (
    <Component 
      className={cn(
        "relative inline-block",
        intensityClass[intensity],
        className
      )}
      data-text={typeof children === 'string' ? children : undefined}
    >
      {children}
    </Component>
  )
}
