"use client"

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { ExternalLink, Github, Folder } from 'lucide-react'

interface Project {
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: "Validador Inteligente de Dados",
    description: "Sistema de validação de dados com correções automáticas para nome, email, senha e CPF. Interface moderna com feedback visual em tempo real e sugestões inteligentes.",
    technologies: ["HTML5", "CSS3", "JavaScript Puro", "DOM Manipulation", "Validação CPF"],
    githubUrl: "https://github.com/shadowdev0101/validador-inteligente",
    liveUrl: "https://validador-inteligente.vercel.app",
    featured: true,
  },
  {
    title: "Planner Inteligente",
    description: "Aplicativo de planejamento inteligente com agendamento automático de tarefas, priorização dinâmica, tema claro/escuro e persistência de dados. Funciona offline com localStorage.",
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "localStorage", "Drag & Drop"],
    githubUrl: "https://github.com/shadowdev0101/planner-inteligente",
    liveUrl: "https://planner-inteligente.vercel.app",
    featured: true,
  },
  {
    title: "E-Commerce Platform",
    description: "Plataforma completa de e-commerce com sistema de pagamentos, gestão de estoque e painel administrativo. Arquitetura escalável com microserviços.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
  },
  {
    title: "AI Chat Assistant",
    description: "Assistente virtual com IA utilizando modelos de linguagem avançados. Interface conversacional com memória de contexto e personalização.",
    technologies: ["React", "Python", "OpenAI", "FastAPI", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
  },
  {
    title: "Dashboard Analytics",
    description: "Dashboard de analytics em tempo real com visualizações interativas e relatórios personalizados. Integração com múltiplas fontes de dados.",
    technologies: ["TypeScript", "D3.js", "GraphQL", "AWS", "Docker"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
  },
  {
    title: "Task Management App",
    description: "Aplicativo de gerenciamento de tarefas com colaboração em tempo real, notificações e integrações com ferramentas populares.",
    technologies: ["Vue.js", "Firebase", "Tailwind"],
    githubUrl: "#",
  },
  {
    title: "API Gateway Service",
    description: "Gateway de API com autenticação, rate limiting, logging e monitoramento de performance.",
    technologies: ["Node.js", "Express", "Redis", "Docker"],
    githubUrl: "#",
  },
  {
    title: "Mobile Fitness App",
    description: "Aplicativo de fitness com tracking de exercícios, planos personalizados e gamificação.",
    technologies: ["React Native", "Node.js", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
  },
]

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative py-24 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div 
          className={cn(
            "mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="font-mono text-sm text-neon-green mb-2">
            {"// 03. Projetos"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-neon-green">{"> "}</span>
            Trabalhos Recentes
          </h2>
        </div>

        <div className="space-y-8 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={cn(
                "group relative p-6 border border-border/50 rounded-lg bg-card/30",
                "hover:border-neon-green/50 hover:bg-card/50 transition-all duration-300",
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${(index + 2) * 150}ms` }}
            >
              <div className="absolute top-4 right-4 px-2 py-1 text-[10px] font-mono text-neon-green border border-neon-green/50 rounded">
                FEATURED
              </div>

              <div className="font-mono text-xs text-muted-foreground mb-2">
                <span className="text-neon-green">project</span>
                <span className="text-muted-foreground">[{index}]</span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-neon-green transition-colors">
                {project.title}
              </h3>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 text-xs font-mono text-neon-blue bg-neon-blue/10 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-green transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="font-mono">code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-green transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-mono">live</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div 
          className={cn(
            "transition-all duration-700 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h3 className="font-mono text-lg text-muted-foreground mb-6">
            <span className="text-neon-green">$</span> ls ./outros-projetos
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <div
                key={project.title}
                className={cn(
                  "group p-4 border border-border/50 rounded-lg bg-card/20",
                  "hover:border-neon-green/50 hover:bg-card/40 transition-all duration-300"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <Folder className="w-8 h-8 text-neon-green" />
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-neon-green transition-colors"
                        aria-label="Ver código no GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-neon-green transition-colors"
                        aria-label="Ver projeto ao vivo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h4 className="font-bold text-foreground mb-2 group-hover:text-neon-green transition-colors">
                  {project.title}
                </h4>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="text-[10px] font-mono text-muted-foreground"
                    >
                      {tech}
                      {project.technologies.indexOf(tech) < Math.min(project.technologies.length - 1, 2) && " · "}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}