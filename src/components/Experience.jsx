import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Experience({ data }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-32 px-8 md:px-16 relative overflow-hidden">
      {/* Watermark */}
      <div className="watermark absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none">
        02
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">02 — Experience</span>
          <div className="rule flex-1" style={{ maxWidth: 80 }} />
        </div>

        <div ref={ref} className="space-y-0">
          {data.experience.map((exp, i) => {
            const isActive = exp.duration.includes('Present')
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="rule" />

                <div className="py-10 grid md:grid-cols-[1fr_auto] gap-6 group">
                  {/* Left: title + company */}
                  <div>
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <h3
                        className="font-black text-lg md:text-xl tracking-tight"
                        style={{ color: '#f0ede8', letterSpacing: '-0.01em' }}
                      >
                        {exp.title.toUpperCase()}
                      </h3>
                      {isActive && (
                        <span
                          className="section-label px-2 py-0.5 font-mono text-[10px]"
                          style={{
                            color: '#d4f53c',
                            border: '1px solid rgba(212,245,60,0.35)',
                            background: 'rgba(212,245,60,0.06)',
                          }}
                        >
                          ● ACTIVE
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span
                        className="font-black text-sm tracking-wide"
                        style={{ color: '#d4f53c' }}
                      >
                        {exp.company}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
                      <span className="section-label">{exp.location}</span>
                    </div>

                    <p className="text-sm leading-[1.85] mb-5 max-w-2xl" style={{ color: 'rgba(240,237,232,0.45)' }}>
                      {exp.summary}
                    </p>

                    <ul className="space-y-2">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(240,237,232,0.45)' }}>
                          <span style={{ color: '#d4f53c', marginTop: '0.05em', flexShrink: 0 }}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: duration */}
                  <div className="section-label self-start md:text-right whitespace-nowrap" style={{ paddingTop: '0.2rem' }}>
                    {exp.duration}
                  </div>
                </div>
              </motion.div>
            )
          })}
          <div className="rule" />
        </div>
      </div>
    </section>
  )
}
