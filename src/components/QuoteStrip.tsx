import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuoteStripProps { quotes: string[] }

export default function QuoteStrip({ quotes }: QuoteStripProps) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const id = setInterval(() => setIdx(i => (i + 1) % quotes.length), 4500)
    return () => clearInterval(id)
  }, [quotes.length])

  return (
    <div
      className="py-10 overflow-hidden"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
      aria-label="Rotating quotes"
    >
      <div className="max-w-5xl mx-auto px-5 flex items-center gap-4">
        <span className="font-mono text-2xl" style={{ color: 'var(--teal)', opacity: 0.5 }} aria-hidden="true">"</span>
        <div className="flex-1 min-h-[1.5rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-sm italic text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              {quotes[idx]}
            </motion.p>
          </AnimatePresence>
        </div>
        <span className="font-mono text-2xl rotate-180" style={{ color: 'var(--teal)', opacity: 0.5 }} aria-hidden="true">"</span>
      </div>
    </div>
  )
}
