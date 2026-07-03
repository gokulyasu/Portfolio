import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, ChevronDown, ChevronRight } from 'lucide-react'
import type { ExperienceEntry } from '../types/portfolio'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

interface ExperienceProps { experience: ExperienceEntry[] }

function ExperienceCard({ job }: { job: ExperienceEntry }) {
  const [expanded, setExpanded] = useState(false)
  const isCurrent = job.duration.includes('Present')

  return (
    <motion.div variants={fadeUp} className="md:pl-14 relative group">
      {/* Timeline dot */}
      <div
        className="absolute left-0 md:left-[0.875rem] top-6 hidden md:flex items-center justify-center"
        style={{
          width: 24, height: 24, borderRadius: '50%', zIndex: 10,
          background: 'var(--bg)',
          border: `2px solid ${isCurrent ? 'var(--teal)' : 'var(--border)'}`,
          boxShadow: isCurrent ? '0 0 0 4px rgba(20,184,166,0.12), 0 0 12px rgba(20,184,166,0.2)' : 'none',
        }}
        aria-hidden="true"
      >
        <div
          className="rounded-full"
          style={{
            width: isCurrent ? 10 : 8, height: isCurrent ? 10 : 8,
            background: isCurrent ? 'var(--teal)' : 'var(--border)',
          }}
        >
          {isCurrent && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid var(--teal)', opacity: 0.5 }}
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
            />
          )}
        </div>
      </div>

      <div className={`${isCurrent ? 'teal-glass-card' : 'glass-card'} p-6`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-base" style={{ color: 'var(--text)' }}>{job.title}</h3>
              {isCurrent && (
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold"
                  style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--teal)', border: '1px solid rgba(20,184,166,0.25)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  Current
                </span>
              )}
            </div>
            <p className="text-sm font-semibold mt-1" style={{ color: 'var(--teal)' }}>{job.company}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0">
            <span className="flex items-center gap-1.5 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              <Calendar size={11} aria-hidden="true" /> {job.duration}
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--border)' }}>
              <MapPin size={11} aria-hidden="true" /> {job.location}
            </span>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{job.summary}</p>

        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
          style={{ color: expanded ? 'var(--teal)' : 'var(--text-muted)' }}
          aria-expanded={expanded}
        >
          <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={13} aria-hidden="true" />
          </motion.div>
          {expanded ? 'Hide' : 'Show'} highlights
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="mt-4 space-y-2 overflow-hidden"
              aria-label="Job highlights"
            >
              {job.highlights.map((h, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: j * 0.05 }}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <ChevronDown size={13} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--teal)' }} aria-hidden="true" />
                  {h}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" aria-label="Work experience" style={{ background: 'var(--bg)' }}>
      <div className="section-wrap">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <motion.div variants={fadeUp}>
            <p className="section-label">Where I've worked</p>
            <h2 className="section-title">Experience</h2>
            <div className="section-line" />
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-0 md:left-[1.75rem] top-4 bottom-4 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, var(--teal) 0%, rgba(20,184,166,0.3) 40%, var(--border) 70%, transparent 100%)' }}
              aria-hidden="true"
            />
            <motion.div variants={stagger} className="space-y-5">
              {experience.map((job, i) => (
                <ExperienceCard key={i} job={job} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
