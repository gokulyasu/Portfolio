import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Code, Sparkles } from 'lucide-react'
import type { AboutData, Education } from '../types/portfolio'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

const FACT_ICONS = ['💪', '🔍', '✨', '📈', '⏰']
const FACT_COLORS = [
  { bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)', color: '#60A5FA' },
  { bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)', color: '#34D399' },
  { bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)', color: '#FBBF24' },
  { bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)', color: '#A78BFA' },
]

interface AboutProps { about: AboutData; education: Education[] }

export default function About({ about, education }: AboutProps) {
  return (
    <section id="about" style={{ background: 'var(--surface)' }} aria-label="About me">
      <div className="section-wrap">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          {/* Header */}
          <motion.div variants={fadeUp}>
            <p className="section-label">Who I am</p>
            <h2 className="section-title">About Me</h2>
            <div className="section-line" />
          </motion.div>

          {/* ─── Bento Grid ─── */}
          <div className="grid lg:grid-cols-5 gap-4">

            {/* Bio card — large (3 cols) */}
            <motion.div variants={fadeUp} className="bento-cell lg:col-span-3 p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-1.5 rounded-lg" style={{ background: 'var(--glass-teal)', border: '1px solid var(--glass-teal-border)' }}>
                  <Code size={14} style={{ color: 'var(--teal)' }} aria-hidden="true" />
                </div>
                <span className="text-xs font-mono font-semibold tracking-wider uppercase" style={{ color: 'var(--teal)' }}>Bio</span>
              </div>
              <p className="text-base leading-[1.8]" style={{ color: 'var(--text-muted)' }}>
                {about.bio}
              </p>
            </motion.div>

            {/* Right column (2 cols): stats + education */}
            <div className="lg:col-span-2 flex flex-col gap-4">

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={fadeUp} className="bento-cell p-6 flex flex-col items-center justify-center text-center gap-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Briefcase size={14} style={{ color: 'var(--teal)' }} aria-hidden="true" />
                  </div>
                  <span className="text-4xl font-bold gradient-text">4+</span>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Years Exp.</span>
                </motion.div>
                <motion.div variants={fadeUp} className="bento-cell p-6 flex flex-col items-center justify-center text-center gap-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles size={14} style={{ color: 'var(--teal)' }} aria-hidden="true" />
                  </div>
                  <span className="text-4xl font-bold gradient-text">5+</span>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Projects</span>
                </motion.div>
              </div>

              {/* Education card */}
              <motion.div variants={fadeUp} className="bento-cell p-6 flex-1">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded-lg" style={{ background: 'var(--glass-teal)', border: '1px solid var(--glass-teal-border)' }}>
                    <GraduationCap size={14} style={{ color: 'var(--teal)' }} aria-hidden="true" />
                  </div>
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase" style={{ color: 'var(--teal)' }}>Education</span>
                </div>
                <ul className="space-y-4" aria-label="Education history">
                  {education.map((ed, i) => (
                    <li
                      key={i}
                      className="pl-4 border-l-2 transition-colors duration-200"
                      style={{ borderColor: i === 0 ? 'var(--teal)' : 'var(--border)' }}
                    >
                      <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--text)' }}>{ed.degree}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{ed.institute}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="font-mono text-[11px]" style={{ color: 'var(--border)' }}>{ed.duration}</span>
                        {ed.affiliation && (
                          <>
                            <span style={{ color: 'var(--border)' }}>·</span>
                            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{ed.affiliation}</span>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Fun facts — full-width row */}
            <motion.div variants={stagger} className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-4" role="list" aria-label="Fun facts">
              {about.funFacts.map((fact, i) => {
                const { bg, border } = FACT_COLORS[i % FACT_COLORS.length]
                return (
                  <motion.div
                    key={i} variants={fadeUp} role="listitem"
                    className="bento-cell p-5 flex flex-col gap-3"
                    style={{ borderColor: border }}
                  >
                    <span
                      className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}
                      aria-hidden="true"
                    >
                      {FACT_ICONS[i % FACT_ICONS.length]}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{fact}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
