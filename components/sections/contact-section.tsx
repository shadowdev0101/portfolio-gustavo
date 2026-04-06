"use client"

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { TerminalWindow } from '@/components/effects/terminal-window'
import { NeonButton } from '@/components/effects/neon-button'
import { Mail, Github, Linkedin, Send } from 'lucide-react'

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' })
        alert('Mensagem enviada com sucesso! Vou responder em breve.')
      } else {
        alert(data.error || 'Erro ao enviar mensagem. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/shadowdev0101", label: "GitHub", color: "hover:text-neon-green" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/gustavo-software-br/", label: "LinkedIn", color: "hover:text-neon-blue" },
    { icon: Mail, href: "mailto:gustavosm10000@gmail.com", label: "Email", color: "hover:text-neon-purple" },
  ]

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative py-24 px-6 bg-cyber-dark/50"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div 
          className={cn(
            "text-center mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="font-mono text-sm text-neon-green mb-2">
            {"// 04. Contato"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-neon-green">{"> "}</span>
            {"Vamos Conversar?"}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Estou sempre aberto a novas oportunidades, projetos interessantes 
            ou apenas uma boa conversa sobre tecnologia.
          </p>
        </div>

        {/* Contact Form */}
        <div 
          className={cn(
            "transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <TerminalWindow title="contact_form.sh">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  <span className="text-neon-green">$</span> nome:
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="Seu nome"
                  className={cn(
                    "w-full px-4 py-2 bg-cyber-dark border border-border/50 rounded",
                    "text-foreground placeholder:text-muted-foreground/50",
                    "focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30",
                    "transition-all duration-300"
                  )}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  <span className="text-neon-green">$</span> email:
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="seu@email.com"
                  className={cn(
                    "w-full px-4 py-2 bg-cyber-dark border border-border/50 rounded",
                    "text-foreground placeholder:text-muted-foreground/50",
                    "focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30",
                    "transition-all duration-300"
                  )}
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  <span className="text-neon-green">$</span> mensagem:
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  rows={5}
                  placeholder="Sua mensagem..."
                  className={cn(
                    "w-full px-4 py-2 bg-cyber-dark border border-border/50 rounded resize-none",
                    "text-foreground placeholder:text-muted-foreground/50",
                    "focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30",
                    "transition-all duration-300"
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <NeonButton 
                  type="submit" 
                  variant="green" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⟳</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Mensagem
                    </>
                  )}
                </NeonButton>
              </div>
            </form>
          </TerminalWindow>
        </div>

        {/* Social Links */}
        <div 
          className={cn(
            "mt-12 text-center transition-all duration-700 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <p className="font-mono text-sm text-muted-foreground mb-4">
            <span className="text-neon-green">$</span> ou me encontre em:
          </p>
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-3 text-muted-foreground transition-all duration-300",
                  "hover:scale-110",
                  link.color
                )}
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
