"use client"

import { useEffect, useRef, useState } from 'react'
import { TerminalWindow } from '@/components/effects/terminal-window'
import { cn } from '@/lib/utils'
import { Calendar, MapPin, Code2, Coffee } from 'lucide-react'

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
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

  const stats = [
    { icon: Calendar, label: "Anos de Experiência", value: "5+" },
    { icon: Code2, label: "Projetos Entregues", value: "50+" },
    { icon: Coffee, label: "Cafés Tomados", value: "∞" },
    { icon: MapPin, label: "Localização", value: "Brasil" },
  ]

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div 
          className={cn(
            "mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="font-mono text-sm text-neon-green mb-2">
            {"// 01. Sobre Mim"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-neon-green">{"> "}</span>
            Quem sou eu
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terminal Bio */}
          <div 
            className={cn(
              "transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <TerminalWindow title="about_me.md">
              <div className="space-y-4 text-foreground/90">
                <p>
                  <span className="text-neon-green">const</span>{" "}
                  <span className="text-neon-blue">developer</span> = {"{"}
                </p>
                <div className="pl-4 space-y-2">
                  <p>
                    <span className="text-neon-purple">name</span>:{" "}
                    <span className="text-yellow-400">{'"Gustavo Melo Silva"'}</span>,
                  </p>
                  <p>
                    <span className="text-neon-purple">role</span>:{" "}
                    <span className="text-yellow-400">{'"Full Stack Developer"'}</span>,
                  </p>
                  <p>
                    <span className="text-neon-purple">passion</span>:{" "}
                    <span className="text-yellow-400">{'"Criar soluções inovadoras"'}</span>,
                  </p>
                  <p>
                    <span className="text-neon-purple">skills</span>: [
                    <span className="text-yellow-400">{'"Problem Solving"'}</span>,
                    <span className="text-yellow-400"> {'"Clean Code"'}</span>,
                    <span className="text-yellow-400"> {'"Team Work"'}</span>]
                  </p>
                </div>
                <p>{"}"}</p>
              </div>
            </TerminalWindow>

            <div className="mt-6 p-4 border border-border/50 rounded-lg bg-card/30">
              <p className="text-muted-foreground leading-relaxed">
                Sou um desenvolvedor apaixonado por tecnologia, sempre buscando 
                aprender e evoluir. Minha jornada na programação começou há anos 
                atrás, e desde então venho transformando desafios em oportunidades 
                de crescimento. Acredito que o código bem escrito é uma forma de 
                arte que resolve problemas reais.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div 
            className={cn(
              "space-y-4 transition-all duration-700 delay-400",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className={cn(
                    "p-4 border border-border/50 rounded-lg bg-card/30",
                    "hover:border-neon-green/50 hover:bg-card/50 transition-all duration-300",
                    "group"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="w-6 h-6 text-neon-green mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-foreground font-mono">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Current Focus */}
            <TerminalWindow title="current_focus.sh">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-neon-green">$</span>
                  <span className="text-muted-foreground">cat current_focus.txt</span>
                </div>
                <div className="pl-4 text-foreground/80">
                  <p>- Arquiteturas modernas (Microservices, Serverless)</p>
                  <p>- Performance e otimização</p>
                  <p>- DevOps e CI/CD</p>
                  <p>- Inteligência Artificial aplicada</p>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  )
}
