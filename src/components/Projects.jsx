import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

function ProjectCard({ project, index, inView }) {
  const cardRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-100, 100], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-100, 100], [-8, 8]), { stiffness: 200, damping: 20 })

  const onMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mx.set(e.clientX - rect.left - rect.width / 2)
    my.set(e.clientY - rect.top - rect.height / 2)
    cardRef.current.style.setProperty('--shine-x', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    cardRef.current.style.setProperty('--shine-y', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="project-card p-7 flex flex-col h-full"
    >
      {/* Mouse-follow shine */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(212,245,60,0.07), transparent 60%)',
        }}
      />

      {/* Index watermark */}
      <div
        className="font-black text-5xl mb-6 leading-none select-none"
        style={{ color: 'rgba(240,237,232,0.04)', letterSpacing: '-0.03em' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Title */}
      <h3
        className="font-black text-base mb-3 leading-tight"
        style={{ color: '#f0ede8', letterSpacing: '-0.01em' }}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p className="text-sm leading-[1.8] mb-5 flex-1" style={{ color: 'rgba(240,237,232,0.4)' }}>
        {project.description}
      </p>

      {/* Impact */}
      <div
        className="text-xs mb-5 py-3 px-4 border-l-2"
        style={{
          borderColor: '#d4f53c',
          background: 'rgba(212,245,60,0.04)',
          color: 'rgba(212,245,60,0.75)',
          fontFamily: '"JetBrains Mono", monospace',
          lineHeight: 1.7,
        }}
      >
        {project.impact}
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects({ data }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-32 px-8 md:px-16 relative overflow-hidden">
      {/* Watermark */}
      <div className="watermark absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none">
        03
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">03 — Projects</span>
          <div className="rule flex-1" style={{ maxWidth: 80 }} />
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 gap-5">
          {data.projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
