"use client"

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [
  // Frontend
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 92, category: "frontend" },
  { name: "Vue.js", level: 75, category: "frontend" },
  // Backend
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Python", level: 80, category: "backend" },
  { name: "PostgreSQL", level: 85, category: "backend" },
  { name: "MongoDB", level: 80, category: "backend" },
  // DevOps
  { name: "Docker", level: 85, category: "devops" },
  { name: "AWS / Vercel", level: 82, category: "devops" },
  { name: "Git / GitHub", level: 95, category: "devops" },
  { name: "CI/CD", level: 78, category: "devops" },
]

const categories = [
  { id: "all", label: "Todas" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
]

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
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

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(s => s.category === activeCategory)

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative py-24 px-6 bg-cyber-dark/50"
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,136,0.5) 1px, transparent 0)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <div 
          className={cn(
            "mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="font-mono text-sm text-neon-green mb-2">
            {"// 02. Habilidades"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-neon-green">{"> "}</span>
            Tech Stack
          </h2>
        </div>

        {/* Category Filter */}
        <div 
          className={cn(
            "flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 font-mono text-sm rounded-sm border transition-all duration-300",
                activeCategory === cat.id
                  ? "border-neon-green bg-neon-green/10 text-neon-green"
                  : "border-border/50 text-muted-foreground hover:border-neon-green/50 hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={cn(
                "p-4 border border-border/50 rounded-lg bg-card/30",
                "hover:border-neon-green/50 transition-all duration-300",
                "transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-foreground">{skill.name}</span>
                <span className="font-mono text-sm text-neon-green">{skill.level}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 bg-cyber-gray rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    skill.category === "frontend" && "bg-gradient-to-r from-neon-green to-neon-blue",
                    skill.category === "backend" && "bg-gradient-to-r from-neon-blue to-neon-purple",
                    skill.category === "devops" && "bg-gradient-to-r from-neon-purple to-neon-pink"
                  )}
                  style={{ 
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${(index + 5) * 100}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div 
          className={cn(
            "mt-12 p-6 border border-border/50 rounded-lg bg-card/20",
            "transition-all duration-700 delay-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="font-mono text-sm text-muted-foreground mb-4">
            <span className="text-neon-green">$</span> cat technologies.log
          </div>
          <div className="flex flex-wrap gap-2">
            {["REST APIs", "GraphQL", "WebSockets", "Redux", "Prisma", "Jest", 
              "React Query", "Framer Motion", "Figma", "Linux", "Nginx", "Redis"
            ].map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 text-xs font-mono text-muted-foreground border border-border/50 rounded-full hover:border-neon-green/50 hover:text-neon-green transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
