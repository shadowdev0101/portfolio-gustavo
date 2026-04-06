"use client"

import { cn } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto text-center">
        <div className="font-mono text-sm text-muted-foreground space-y-2">
          <p>
            <span className="text-neon-green">{"</"}</span>
            <span className="text-foreground">built_with_passion</span>
            <span className="text-neon-green">{">"}</span>
          </p>
          <p className="text-xs">
            Gustavo Melo Silva © {currentYear} | Feito com{" "}
            <span className="text-neon-green">Next.js</span> &{" "}
            <span className="text-neon-blue">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
