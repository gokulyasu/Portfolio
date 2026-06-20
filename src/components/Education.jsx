import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Education({ data }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="py-32 px-8 md:px-16 relative overflow-hidden">
      {/* Watermark */}
      <div className="watermark absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none">
        05
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">05 — Education</span>
          <div className="rule flex-1" style={{ maxWidth: 80 }} />
        </div>

        <div ref={ref} className="space-y-0">
          {data.education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rule" />
              <div className="py-9 flex gap-8 items-start group">
                {/* Index */}
                <div
                  className="font-mono font-black text-base flex-shrink-0 w-9"
                  style={{ color: 'rgba(212,245,60,0.5)', letterSpacing: '-0.01em' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="flex-1 grid md:grid-cols-[1fr_auto] gap-4">
                  <div>
                    <h3
                      className="font-black text-base mb-1 tracking-tight"
                      style={{ color: '#f0ede8' }}
                    >
                      {edu.degree}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgba(240,237,232,0.45)' }}>
                      {edu.institute}
                      {edu.affiliation && (
                        <> · <span style={{ color: 'rgba(240,237,232,0.28)' }}>{edu.affiliation}</span></>
                      )}
                      {' · '}
                      <span style={{ color: 'rgba(240,237,232,0.28)' }}>{edu.location}</span>
                    </p>
                  </div>
                  <div className="section-label self-start whitespace-nowrap">{edu.duration}</div>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="rule" />
        </div>
      </div>
    </section>
  )
}
