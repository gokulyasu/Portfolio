import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScramble } from '../hooks/useScramble'

export default function SectionHeader({ tag, title, subtitle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const scrambled = useScramble(title.toUpperCase(), inView)

  return (
    <div ref={ref} className="mb-16">
      {tag && (
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: .5 }}
          className="font-mono text-xs text-primary tracking-[.35em] uppercase mb-3 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-primary inline-block" />
          {tag}
          <span className="w-6 h-px bg-primary inline-block" />
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .6, delay: .1 }}
        className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight"
      >
        {scrambled}
        <span className="text-primary animate-blink">_</span>
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .5, delay: .25 }}
          className="mt-3 text-[#555] text-base font-mono"
        >
          // {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: .8, delay: .35 }}
        className="mt-4 h-px w-48 origin-left"
        style={{ background: 'linear-gradient(90deg, #00ff9d, #7000ff, transparent)' }}
      />
    </div>
  )
}
