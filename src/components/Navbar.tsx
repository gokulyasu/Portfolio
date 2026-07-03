import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, FileText } from 'lucide-react'
import type { NavItem, Personal } from '../types/portfolio'

interface NavbarProps {
  nav: NavItem[]
  personal: Personal
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function Navbar({ nav, personal, theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const match = nav.find(n => n.href === '#' + e.target.id)
            if (match) setActive(match.name)
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    nav.forEach(n => {
      const el = document.getElementById(n.href.slice(1))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [nav])

  const scrollTo = (href: string) => {
    setOpen(false)
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 64,
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-5xl mx-auto h-full px-5 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="font-mono font-bold text-xl tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #0D9488, #14B8A6, #2DD4BF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            aria-label="Scroll to top"
          >
            GP.
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {nav.map(item => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.href)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer"
                style={{ color: active === item.name ? 'var(--teal)' : 'var(--text-muted)' }}
                aria-current={active === item.name ? 'page' : undefined}
              >
                {active === item.name && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'var(--glass-teal)', border: '1px solid var(--glass-teal-border)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg transition-colors hover:bg-[var(--surface-2)]"
              style={{ color: 'var(--text-muted)' }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href={personal.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all"
              style={{
                background: 'var(--glass-teal)',
                border: '1px solid var(--glass-teal-border)',
                color: 'var(--teal)',
              }}
            >
              <FileText size={13} aria-hidden="true" /> Resume
            </a>
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle mobile menu"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 z-40 px-4 pt-3 pb-4 space-y-1"
            style={{
              top: 64,
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--glass-border)',
            }}
          >
            {nav.map(item => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.href)}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  color: active === item.name ? 'var(--teal)' : 'var(--text)',
                  background: active === item.name ? 'var(--glass-teal)' : 'transparent',
                }}
              >
                {item.name}
              </button>
            ))}
            <a
              href={personal.resume}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold mt-1"
              style={{
                color: 'var(--teal)',
                background: 'var(--glass-teal)',
                border: '1px solid var(--glass-teal-border)',
              }}
            >
              <FileText size={14} aria-hidden="true" /> Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
