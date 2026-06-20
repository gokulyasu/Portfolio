import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'
import ThreeScene from './ThreeScene'
import { revealContainer, revealItem } from '../hooks/useReveal'

export default function Hero({ data }) {
  const heroRef = useRef(null)
  const nameWords = data.personal.name.toUpperCase().split(' ')

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  return (
    <section
      ref={heroRef}
      id="about-anchor"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-8 md:px-16"
      style={{ paddingTop: '6rem' }}
    >
      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 80% at 70% 50%, transparent 40%, #0c0c0c 100%)' }}
      />

      {/* 3D scene — top right, reacts to scroll */}
      <ThreeScene scrollProgress={scrollYProgress} />

      <div className="relative z-10 max-w-7xl w-full">
        {/* Status label with avatar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 mb-10"
        >
          {/* Circular avatar */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            padding: 2.5,
            background: 'linear-gradient(135deg, rgba(212,245,60,0.65), rgba(212,245,60,0.1))',
            boxShadow: '0 0 20px rgba(212,245,60,0.15)',
            flexShrink: 0,
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              overflow: 'hidden', border: '2px solid #0c0c0c',
            }}>
              <img src="/profile.png" alt="Gokul Prakash" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#d4f53c', boxShadow: '0 0 8px #d4f53c' }}
          />
          <span className="section-label">AVAILABLE FOR PROJECTS</span>
        </motion.div>

        {/* Editorial name — mask reveal per word */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="mb-6"
        >
          {nameWords.map((word, i) => (
            <div key={i} style={{ overflow: 'hidden', display: 'block' }}>
              <motion.h1
                variants={revealItem}
                className="block font-black leading-none"
                style={{
                  fontSize: 'clamp(4.5rem, 12vw, 13rem)',
                  letterSpacing: '-0.03em',
                  color: i === 1 ? '#d4f53c' : '#f0ede8',
                }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rule mb-6"
          style={{ transformOrigin: 'left' }}
        />

        {/* Role + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 mb-10"
        >
          <p className="font-black text-lg md:text-xl tracking-widest uppercase" style={{ color: '#f0ede8' }}>
            {data.hero.typedText[0]}
          </p>
          <p className="text-base leading-relaxed max-w-md" style={{ color: 'rgba(240,237,232,0.5)' }}>
            {data.hero.tagline}
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-wrap items-center gap-5 mb-14"
        >
          <a
            href={data.personal.resume || '#'}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            VIEW RESUME ↗
          </a>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            GET IN TOUCH →
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center gap-6"
        >
          {[
            { icon: FiLinkedin, href: data.personal.linkedin, label: 'LinkedIn' },
            { icon: FiMail, href: `mailto:${data.personal.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label === 'LinkedIn' ? '_blank' : undefined}
              rel={label === 'LinkedIn' ? 'noreferrer' : undefined}
              aria-label={label}
              className="w-10 h-10 border flex items-center justify-center transition-all duration-200"
              style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(240,237,232,0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d4f53c'
                e.currentTarget.style.color = '#d4f53c'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'rgba(240,237,232,0.4)'
              }}
            >
              <Icon size={17} />
            </a>
          ))}

          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.08)' }} />

          <a
            href={`tel:${data.personal.phone}`}
            className="section-label link-underline"
          >
            {data.personal.phone}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-8 md:left-16 flex items-center gap-3 section-label"
        style={{ color: 'rgba(240,237,232,0.3)' }}
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <FiArrowDown size={14} />
        </motion.span>
        SCROLL
      </motion.button>
    </section>
  )
}
