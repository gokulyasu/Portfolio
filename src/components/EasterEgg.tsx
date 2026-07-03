import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap } from 'lucide-react'

interface EasterEggProps { message: string; onClose: () => void }

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function EasterEgg({ message, onClose }: EasterEggProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const reduced = prefersReduced()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style={{ background: 'rgba(10,15,28,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="easter-egg-title"
        aria-describedby="easter-egg-desc"
      >
        <motion.div
          initial={reduced ? { opacity: 0 } : { scale: 0.85, opacity: 0, y: 20 }}
          animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          onClick={e => e.stopPropagation()}
          className="glass-card p-8 max-w-sm w-full text-center relative overflow-hidden"
          style={{ border: '1px solid rgba(20,184,166,0.3)', boxShadow: '0 0 60px rgba(20,184,166,0.15)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(20,184,166,0.1) 0%,transparent 70%)' }} aria-hidden="true" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg transition-colors duration-200 cursor-pointer"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
            aria-label="Close"
          >
            <X size={16} aria-hidden="true" />
          </button>

          <motion.div
            animate={reduced ? {} : { rotate: [0, 12, -12, 8, -8, 0] }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-5 w-14 h-14 rounded-2xl flex items-center justify-center relative z-10"
            style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.25)' }}
            aria-hidden="true"
          >
            <Zap size={26} style={{ color: 'var(--teal)' }} />
          </motion.div>

          <h2
            id="easter-egg-title"
            className="font-bold text-xl mb-3 relative z-10"
            style={{ background: 'linear-gradient(135deg,#0D9488,#2DD4BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Shadow Clone Jutsu!
          </h2>
          <p id="easter-egg-desc" className="text-sm leading-relaxed mb-6 relative z-10" style={{ color: 'var(--text-muted)' }}>
            {message}
          </p>
          <button
            onClick={onClose}
            className="btn-primary mx-auto cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#0D9488,#14B8A6)' }}
          >
            Believe it! 🍥
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
