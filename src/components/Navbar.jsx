import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = ['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact']

export default function Navbar({ data }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16"
        style={{
          background: scrolled ? 'rgba(12,12,12,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
        }}
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }) }}
            className="font-black text-xl"
            style={{ color: '#d4f53c', letterSpacing: '-0.02em' }}
          >
            GP_
          </a>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={(e) => go(e, l)}
                className="link-underline section-label"
              >
                {l}
              </a>
            ))}
            <a
              href={data.personal.resume || '#'}
              target="_blank"
              rel="noreferrer"
              className="section-label px-4 py-2"
              style={{
                border: '1px solid rgba(212,245,60,0.4)',
                color: '#d4f53c',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212,245,60,0.06)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              RESUME ↗
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px w-5 transition-all duration-300"
                style={{
                  background: '#f0ede8',
                  transform: open
                    ? i === 0 ? 'translateY(6px) rotate(45deg)'
                    : i === 2 ? 'translateY(-6px) rotate(-45deg)'
                    : 'none'
                    : 'none',
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-10"
            style={{ background: 'rgba(12,12,12,0.97)', backdropFilter: 'blur(24px)' }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={(e) => go(e, l)}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="py-5 font-black text-5xl tracking-tight border-b"
                style={{ borderColor: 'rgba(255,255,255,0.05)', color: '#f0ede8' }}
              >
                {l}
              </motion.a>
            ))}
            <a
              href={data.personal.resume || '#'}
              target="_blank"
              rel="noreferrer"
              className="mt-8 section-label"
              style={{ color: '#d4f53c' }}
            >
              RESUME ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
