"use client"

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface MatrixRainProps {
  className?: string
  opacity?: number
  speed?: number
}

export function MatrixRain({ className, opacity = 0.05, speed = 1 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let columns: number[] = []

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]()/*-+='
    const fontSize = 14

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Array(Math.floor(canvas.width / fontSize)).fill(1)
    }

    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${0.05 * speed})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`
      ctx.font = `${fontSize}px monospace`

      columns.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize

        ctx.fillText(char, x, y * fontSize)

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          columns[i] = 0
        }
        columns[i]++
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [opacity, speed])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 pointer-events-none z-0",
        className
      )}
    />
  )
}
