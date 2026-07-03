import { motion } from 'framer-motion'
import { TrendingUp, Layers, ArrowUpRight } from 'lucide-react'
import type { Project } from '../types/portfolio'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

interface ProjectsProps { projects: Project[] }

function FeaturedProject({ project }: { project: Project }) {
  return (
    <motion.article
      variants={fadeUp}
      className="teal-glass-card p-8 flex flex-col md:flex-row gap-8 group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl" style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.25)' }}>
            <Layers size={20} style={{ color: 'var(--teal)' }} aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-xs font-medium" style={{ color: 'var(--teal)' }}>Featured Project</span>
            <p className="font-mono text-[11px]" style={{ color: 'var(--border)' }}>01</p>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
          {project.name}
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5" aria-label="Tech stack">
          {project.techStack.map(tech => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>
      </div>

      <div className="md:w-72 flex-shrink-0">
        <div
          className="h-full rounded-xl p-5 flex flex-col justify-between"
          style={{ background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)' }}
        >
          <div className="flex items-start gap-2 mb-4">
            <TrendingUp size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--teal)' }} aria-hidden="true" />
            <div>
              <p className="text-xs font-mono font-semibold mb-1" style={{ color: 'var(--teal)' }}>Impact</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.impact}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--teal)' }}>
            <ArrowUpRight size={13} aria-hidden="true" />
            Enterprise SAP Solution
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      className="glass-card p-6 flex flex-col gap-4 group"
    >
      <div className="flex items-center justify-between">
        <div className="p-2.5 rounded-xl transition-colors duration-200 group-hover:border-teal" style={{ background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)' }}>
          <Layers size={16} style={{ color: 'var(--teal)' }} aria-hidden="true" />
        </div>
        <span className="font-mono text-sm font-bold" style={{ color: 'var(--border)' }}>
          0{index + 2}
        </span>
      </div>

      <div>
        <h3 className="font-semibold text-sm leading-snug mb-2" style={{ color: 'var(--text)' }}>
          {project.name}
        </h3>
        <p className="text-xs leading-relaxed line-clamp-3" style={{ color: 'var(--text-muted)' }}>
          {project.description}
        </p>
      </div>

      <div
        className="flex items-start gap-2 p-3 rounded-xl mt-auto"
        style={{ background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.1)' }}
      >
        <TrendingUp size={12} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--teal)' }} aria-hidden="true" />
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.impact}</p>
      </div>

      <div className="flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.techStack.slice(0, 4).map(tech => (
          <span key={tech} className="tech-badge">{tech}</span>
        ))}
        {project.techStack.length > 4 && (
          <span className="tech-badge">+{project.techStack.length - 4}</span>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects({ projects }: ProjectsProps) {
  const [featured, ...rest] = projects

  return (
    <section id="projects" style={{ background: 'var(--surface)' }} aria-label="Projects">
      <div className="section-wrap">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <motion.div variants={fadeUp}>
            <p className="section-label">What I've built</p>
            <h2 className="section-title">Projects</h2>
            <div className="section-line" />
          </motion.div>

          {/* Featured project */}
          {featured && <FeaturedProject project={featured} />}

          {/* Grid of remaining projects */}
          {rest.length > 0 && (
            <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 mt-5">
              {rest.map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
