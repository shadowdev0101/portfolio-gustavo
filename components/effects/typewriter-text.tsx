"use client"

import { useTypewriter } from "@/hooks/use-typewriter"
import { cn } from "@/lib/utils"

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  showCursor?: boolean
  onComplete?: () => void
}

export function TypewriterText({
  text,
  className,
  speed = 50,
  delay = 0,
  showCursor = true,
  onComplete,
}: TypewriterTextProps) {
  const { displayedText, isTyping } = useTypewriter({
    text,
    speed,
    delay,
    onComplete,
  })

  return (
    <span className={cn("font-mono", className)}>
      {displayedText}
      {showCursor && (
        <span 
          className={cn(
            "inline-block w-[2px] h-[1em] bg-neon-green ml-0.5 align-middle",
            isTyping ? "animate-pulse" : "animate-[blink_1s_step-end_infinite]"
          )}
        />
      )}
    </span>
  )
}
