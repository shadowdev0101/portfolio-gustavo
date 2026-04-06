"use client"

import { useState } from 'react'
import { MatrixRain } from '@/components/effects/matrix-rain'
import {
  LoadingScreen,
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
  Footer,
} from '@/components/sections'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Content */}
      <div className={isLoading ? 'hidden' : 'block'}>
        {/* Matrix Rain Background */}
        <MatrixRain opacity={0.03} speed={0.8} />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  )
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Sobre", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projetos", href: "#projects" },
    { label: "Contato", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-cyber-dark/80 backdrop-blur-md border-b border-border/30">
      <nav className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="font-mono text-lg font-bold"
          >
            <span className="text-neon-green">{"<"}</span>
            <span className="text-foreground">GMS</span>
            <span className="text-neon-green">{"/>"}</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="font-mono text-sm text-muted-foreground hover:text-neon-green transition-colors"
                >
                  <span className="text-neon-green">0{index + 1}.</span> {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-neon-green transition-colors"
            aria-label="Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul className="md:hidden pt-4 pb-2 space-y-2">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="w-full text-left font-mono text-sm py-2 text-muted-foreground hover:text-neon-green transition-colors"
                >
                  <span className="text-neon-green">0{index + 1}.</span> {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}
