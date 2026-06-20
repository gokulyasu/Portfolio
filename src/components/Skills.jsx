import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FloatingShape from './FloatingShape'

export default function Skills({ data }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-32 px-8 md:px-16 relative overflow-hidden">
      {/* Floating 3D octahedron — top right */}
      <div className="absolute top-8 right-8 pointer-events-none">
        <FloatingShape shape="octahedron" size={140} speed={[0.005, 0.003]} opacity={0.3} />
      </div>

      {/* Watermark */}
      <div className="watermark absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none">
        04
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">04 — Skills</span>
          <div className="rule flex-1" style={{ maxWidth: 80 }} />
        </div>

        <div ref={ref} className="space-y-0">
          {data.skills.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rule" />
              <div className="py-7 grid md:grid-cols-[200px_1fr] gap-4 md:gap-10 items-start">
                <span
                  className="section-label self-start pt-1"
                  style={{ color: '#d4f53c' }}
                >
                  {group.category.toUpperCase()}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.35, delay: gi * 0.1 + si * 0.03 }}
                      className="tag"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="rule" />
        </div>

        {/* Marquee strip */}
        <div
          className="mt-16 overflow-hidden py-4 border-y"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #0c0c0c, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, #0c0c0c, transparent)' }}
          />
          <div
            className="animate-marquee flex gap-16 whitespace-nowrap select-none"
            style={{ position: 'relative' }}
          >
            {[...data.quotes, ...data.quotes].map((q, i) => (
              <span key={i} className="section-label italic">
                {q}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
