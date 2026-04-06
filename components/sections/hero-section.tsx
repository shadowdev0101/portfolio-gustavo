"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { TypewriterText } from '@/components/effects/typewriter-text'
import { GlitchText } from '@/components/effects/glitch-text'
import { NeonButton } from '@/components/effects/neon-button'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const [showContent, setShowContent] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)

  useEffect(() => {
    setShowContent(true)
    const timer = setTimeout(() => setShowSubtitle(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <div 
            className={cn(
              "relative transition-all duration-1000",
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple rounded-full blur-md opacity-75" />
              
              {/* Image Container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-neon-green/50">
                <Image
                  src="/images/profile.jpg"
                  alt="Gustavo Melo Silva"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Scanline Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                  }}
                />
              </div>
              
              {/* Status Indicator */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-cyber-dark/90 px-3 py-1 rounded-full border border-neon-green/50">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs font-mono text-neon-green">online</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Terminal Prompt */}
            <div 
              className={cn(
                "font-mono text-sm text-muted-foreground mb-4 transition-all duration-700",
                showContent ? "opacity-100" : "opacity-0"
              )}
            >
              <span className="text-neon-green">guest@portfolio</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-neon-blue">~</span>
              <span className="text-muted-foreground">$ </span>
              <span className="text-foreground">whoami</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <GlitchText className="text-foreground" intensity="low">
                Gustavo
              </GlitchText>
              <br />
              <span className="text-neon-green neon-glow">Melo Silva</span>
            </h1>

            {/* Title with Typewriter */}
            <div className="h-8 mb-6">
              {showSubtitle && (
                <TypewriterText
                  text="Full Stack Developer | Problem Solver | Tech Enthusiast"
                  className="text-lg sm:text-xl text-muted-foreground"
                  speed={30}
                />
              )}
            </div>

            {/* Description */}
            <p 
              className={cn(
                "text-muted-foreground max-w-xl mb-8 transition-all duration-1000 delay-500",
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
            >
              Transformando ideias em código. Especializado em criar experiências 
              digitais inovadoras com foco em performance e usabilidade.
            </p>

            {/* CTA Buttons */}
            <div 
              className={cn(
                "flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 transition-all duration-1000 delay-700",
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
            >
              <NeonButton 
                variant="green" 
                size="lg"
                onClick={() => scrollToSection('projects')}
              >
                Ver Projetos
              </NeonButton>
              <NeonButton 
                variant="blue" 
                size="lg"
                onClick={() => scrollToSection('contact')}
              >
                Entrar em Contato
              </NeonButton>
            </div>

            {/* Social Links */}
            <div 
              className={cn(
                "flex items-center justify-center lg:justify-start gap-4 transition-all duration-1000 delay-1000",
                showContent ? "opacity-100" : "opacity-0"
              )}
            >
              <a 
                href="https://github.com/shadowdev0101"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-neon-green transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/gustavo-software-br/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-neon-blue transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="mailto:gustavosm10000@gmail.com"
                className="p-2 text-muted-foreground hover:text-neon-purple transition-colors"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000",
            showContent ? "opacity-100" : "opacity-0"
          )}
        >
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-neon-green transition-colors"
            aria-label="Scroll para baixo"
          >
            <span className="text-xs font-mono">scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  )
}
