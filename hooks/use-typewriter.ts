"use client"

import { useState, useEffect, useCallback } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  delay?: number
  loop?: boolean
  onComplete?: () => void
}

export function useTypewriter({
  text,
  speed = 50,
  delay = 0,
  loop = false,
  onComplete,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const reset = useCallback(() => {
    setDisplayedText('')
    setIsComplete(false)
    setIsTyping(false)
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let charIndex = 0

    const startTyping = () => {
      setIsTyping(true)
      
      const typeNextChar = () => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1))
          charIndex++
          timeout = setTimeout(typeNextChar, speed)
        } else {
          setIsTyping(false)
          setIsComplete(true)
          onComplete?.()
          
          if (loop) {
            timeout = setTimeout(() => {
              charIndex = 0
              setDisplayedText('')
              setIsComplete(false)
              startTyping()
            }, 2000)
          }
        }
      }

      typeNextChar()
    }

    timeout = setTimeout(startTyping, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay, loop, onComplete])

  return { displayedText, isComplete, isTyping, reset }
}
