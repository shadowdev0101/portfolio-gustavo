"use client"

import { cn } from "@/lib/utils"

interface TerminalWindowProps {
  children: React.ReactNode
  className?: string
  title?: string
  showControls?: boolean
}

export function TerminalWindow({ 
  children, 
  className,
  title = "terminal",
  showControls = true 
}: TerminalWindowProps) {
  return (
    <div 
      className={cn(
        "rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden",
        "shadow-[0_0_15px_rgba(0,255,136,0.1)]",
        className
      )}
    >
      {/* Title Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-cyber-dark border-b border-border/50">
        {showControls && (
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
        )}
        <span className="ml-2 text-xs font-mono text-muted-foreground">
          {title}
        </span>
      </div>
      
      {/* Content */}
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  )
}
