import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiPhone, FiLinkedin, FiCopy, FiCheck } from 'react-icons/fi'
import { revealContainer, revealItem } from '../hooks/useReveal'
import FloatingShape from './FloatingShape'

const CARDS = (d) => [
  { icon: FiMail,     label: 'EMAIL',    value: d.contact.email,  href: `mailto:${d.contact.email}`,   copy: d.contact.email },
  { icon: FiPhone,    label: 'PHONE',    value: d.contact.phone,  href: `tel:${d.contact.phone}`,      copy: d.contact.phone },
  { icon: FiLinkedin, label: 'LINKEDIN', value: 'gokul-prakash',  href: d.contact.linkedin,            copy: null },
]

function ContactCard({ icon: Icon, label, value, href, copy, delay, inView }) {
  const [copied, setCopied] = useState(false)

  const doCopy = async () => {
    if (!copy) return
    await navigator.clipboard.writeText(copy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="card p-6 flex items-center gap-5"
    >
      <div
        className="w-11 h-11 border flex items-center justify-center flex-shrink-0"
        style={{ borderColor: 'rgba(212,245,60,0.2)', color: '#d4f53c', background: 'rgba(212,245,60,0.05)' }}
      >
        <Icon size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="section-label mb-1">{label}</div>
        <a
          href={href}
          target={label === 'LINKEDIN' ? '_blank' : undefined}
          rel={label === 'LINKEDIN' ? 'noreferrer' : undefined}
          className="text-sm link-underline truncate block"
          style={{ color: 'rgba(240,237,232,0.65)' }}
        >
          {value}
        </a>
      </div>

      {copy && (
        <button
          onClick={doCopy}
          className="w-8 h-8 border flex items-center justify-center transition-all duration-200"
          style={{ borderColor: 'rgba(255,255,255,0.08)', color: copied ? '#d4f53c' : 'rgba(240,237,232,0.3)' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(212,245,60,0.35)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
        >
          {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
        </button>
      )}
    </motion.div>
  )
}

export default function Contact({ data }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const cards = CARDS(data)

  return (
    <section id="contact" className="py-32 px-8 md:px-16 relative overflow-hidden">
      {/* Floating 3D dodecahedron — bottom left */}
      <div className="absolute bottom-8 left-8 pointer-events-none">
        <FloatingShape shape="dodecahedron" size={180} speed={[0.002, 0.004]} opacity={0.28} />
      </div>

      {/* Watermark */}
      <div className="watermark absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none">
        06
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">06 — Contact</span>
          <div className="rule flex-1" style={{ maxWidth: 80 }} />
        </div>

        {/* Big headline */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          {["LET'S BUILD", 'SOMETHING', 'GREAT_'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.div
                variants={revealItem}
                className="font-black leading-none"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 8rem)',
                  letterSpacing: '-0.03em',
                  color: i === 2 ? '#d4f53c' : '#f0ede8',
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-3 gap-4 mb-10">
          {cards.map((c, i) => (
            <ContactCard key={c.label} {...c} delay={i * 0.1} inView={inView} />
          ))}
        </div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#d4f53c', boxShadow: '0 0 8px #d4f53c' }} />
          <span className="section-label" style={{ color: 'rgba(240,237,232,0.5)' }}>
            Open to consulting &amp; freelance engagements
          </span>
        </motion.div>

        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
        >
          <a
            href={data.personal.resume || '#'}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            DOWNLOAD RESUME ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
