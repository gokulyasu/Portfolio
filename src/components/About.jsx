import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import FloatingShape from './FloatingShape'

const STATS = [
  { raw: 4, suffix: '+', label: 'Years Experience' },
  { raw: 3, suffix: '',  label: 'Companies' },
]

const FACTS = [
  { label: 'Strength',   value: 'Debugging — a puzzle I genuinely enjoy, not a chore' },
  { label: 'Philosophy', value: 'Clean architecture & readable code above all else' },
]

function StatCount({ raw, suffix, label, inView }) {
  const count = useCountUp(raw, 1400, inView)
  return (
    <div>
      <div className="font-black text-5xl md:text-6xl leading-none" style={{ color: '#d4f53c' }}>
        {count}{suffix}
      </div>
      <div className="section-label mt-2">{label}</div>
    </div>
  )
}

export default function About({ data }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-32 px-8 md:px-16 relative overflow-hidden">
      {/* Watermark */}
      <div className="watermark absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none">
        01
      </div>

      {/* Floating 3D icosahedron — bottom right */}
      <div className="absolute bottom-8 right-8 pointer-events-none">
        <FloatingShape shape="icosahedron" size={160} speed={[0.003, 0.005]} opacity={0.35} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">01 — About</span>
          <div className="rule flex-1" style={{ maxWidth: 80 }} />
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT */}
          <div>
            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
              style={{ width: 'fit-content' }}
            >
              <div style={{
                width: 160, height: 160,
                borderRadius: '50%',
                padding: 3,
                background: 'linear-gradient(135deg, rgba(212,245,60,0.7), rgba(212,245,60,0.15))',
                boxShadow: '0 0 40px rgba(212,245,60,0.2)',
              }}>
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #0c0c0c',
                }}>
                  <img
                    src="/profile.png"
                    alt="Gokul Prakash"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-black mb-8"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: '#f0ede8',
              }}
            >
              The person<br />behind the IDE
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-base leading-[1.9] mb-10"
              style={{ color: 'rgba(240,237,232,0.5)' }}
            >
              {data.about.bio}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-12"
            >
              {STATS.map((s, i) => (
                <StatCount key={i} {...s} inView={inView} />
              ))}
            </motion.div>
          </div>

          {/* RIGHT — facts */}
          <div className="space-y-px">
            {FACTS.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="fact-row py-5"
              >
                <div className="section-label mb-1">{f.label}</div>
                <div className="text-sm" style={{ color: 'rgba(240,237,232,0.65)' }}>{f.value}</div>
              </motion.div>
            ))}

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 py-5 border-l-2 pl-4 italic text-sm"
              style={{
                borderColor: '#d4f53c',
                color: 'rgba(240,237,232,0.38)',
              }}
            >
              "{data.quotes[0]}"
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
