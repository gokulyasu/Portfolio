import { motion } from 'framer-motion'
import { Code2, Cpu, GitBranch, Wrench } from 'lucide-react'
import type { SkillCategory } from '../types/portfolio'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const tagV = { hidden: { opacity: 0, scale: 0.88 }, show: { opacity: 1, scale: 1, transition: { duration: 0.22 } } }

const CATEGORY_CONFIG: Record<string, {
  icon: typeof Code2
  color: string
  glow: string
  bg: string
  border: string
}> = {
  'Languages': {
    icon: Code2,
    color: '#60A5FA',
    glow: 'rgba(96,165,250,0.15)',
    bg: 'rgba(96,165,250,0.07)',
    border: 'rgba(96,165,250,0.2)',
  },
  'SAP Technologies': {
    icon: Cpu,
    color: '#14B8A6',
    glow: 'rgba(20,184,166,0.15)',
    bg: 'rgba(20,184,166,0.07)',
    border: 'rgba(20,184,166,0.2)',
  },
  'Architecture & Concepts': {
    icon: GitBranch,
    color: '#A78BFA',
    glow: 'rgba(167,139,250,0.15)',
    bg: 'rgba(167,139,250,0.07)',
    border: 'rgba(167,139,250,0.2)',
  },
  'Tools & Platforms': {
    icon: Wrench,
    color: '#FBBF24',
    glow: 'rgba(251,191,36,0.15)',
    bg: 'rgba(251,191,36,0.07)',
    border: 'rgba(251,191,36,0.2)',
  },
}

interface SkillsProps { skills: SkillCategory[] }

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" style={{ background: 'var(--surface)' }} aria-label="Skills">
      <div className="section-wrap">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <motion.div variants={fadeUp}>
            <p className="section-label">What I work with</p>
            <h2 className="section-title">Skills</h2>
            <div className="section-line" />
          </motion.div>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-5">
            {skills.map((cat) => {
              const cfg = CATEGORY_CONFIG[cat.category] ?? {
                icon: Code2, color: 'var(--teal)', glow: 'var(--glass-teal)',
                bg: 'var(--glass-teal)', border: 'var(--glass-teal-border)',
              }
              const Icon = cfg.icon

              return (
                <motion.div
                  key={cat.category}
                  variants={fadeUp}
                  className="bento-cell p-6"
                  style={{ borderColor: cfg.border }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="p-2.5 rounded-xl"
                      style={{
                        background: cfg.bg,
                        border: `1px solid ${cfg.border}`,
                        boxShadow: `0 0 12px ${cfg.glow}`,
                      }}
                    >
                      <Icon size={16} style={{ color: cfg.color }} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{cat.category}</h3>
                      <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {cat.items.length} skills
                      </p>
                    </div>
                    {/* Accent line */}
                    <div className="ml-auto w-6 h-0.5 rounded-full" style={{ background: cfg.color, opacity: 0.5 }} />
                  </div>

                  {/* Skill pills */}
                  <motion.div
                    variants={stagger}
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label={`${cat.category} skills`}
                  >
                    {cat.items.map(skill => (
                      <motion.span
                        key={skill}
                        variants={tagV}
                        whileHover={{ scale: 1.05, borderColor: cfg.color, color: cfg.color }}
                        className="skill-pill"
                        role="listitem"
                        style={{ cursor: 'default' }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
