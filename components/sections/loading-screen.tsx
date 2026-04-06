"use client"

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const bootLines = [
    "[ OK ] Inicializando sistema...",
    "[ OK ] Carregando módulos de interface...",
    "[ OK ] Conectando ao servidor neural...",
    "[ OK ] Verificando credenciais...",
    "[ OK ] Carregando perfil: gustavo.melo.silva",
    "[ OK ] Sistema pronto.",
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= bootLines.length - 1) {
          clearInterval(lineInterval)
          return prev
        }
        return prev + 1
      })
    }, 400)

    return () => {
      clearInterval(progressInterval)
      clearInterval(lineInterval)
    }
  }, [bootLines.length])

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsExiting(true)
        setTimeout(onComplete, 500)
      }, 800)
      return () => clearTimeout(timeout)
    }
  }, [progress, onComplete])

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 bg-cyber-dark flex items-center justify-center",
        "transition-opacity duration-500",
        isExiting && "opacity-0"
      )}
    >
      <div className="w-full max-w-2xl px-6">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs font-mono text-muted-foreground">
            system_boot.sh
          </span>
        </div>

        {/* Boot Lines */}
        <div className="font-mono text-sm space-y-1 mb-6 h-40">
          {bootLines.slice(0, currentLine + 1).map((line, i) => (
            <div 
              key={i}
              className={cn(
                "transition-all duration-300",
                i === currentLine ? "text-neon-green" : "text-muted-foreground"
              )}
            >
              <span className="text-neon-blue">$</span> {line}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-muted-foreground">
            <span>Carregando...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-cyber-gray rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neon-green to-neon-blue transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ASCII Art */}
        <pre className="mt-8 text-[8px] sm:text-[10px] text-neon-green/30 font-mono text-center leading-tight">
{`
   ██████╗ ███╗   ███╗███████╗
  ██╔════╝ ████╗ ████║██╔════╝
  ██║  ███╗██╔████╔██║███████╗
  ██║   ██║██║╚██╔╝██║╚════██║
  ╚██████╔╝██║ ╚═╝ ██║███████║
   ╚═════╝ ╚═╝     ╚═╝╚══════╝
`}
        </pre>
      </div>
    </div>
  )
}
