import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sun, Moon, Mail, Linkedin, FileText } from 'lucide-react'
import type { NavItem, Personal } from '../types/portfolio'

interface SidebarProps {
  nav: NavItem[]
  personal: Personal
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

function Avatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').map(n => n[0]).join('')
  if (failed) {
    return (
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
        style={{ background: 'rgba(13,148,136,0.1)', color: 'var(--teal)', border: '3px solid rgba(13,148,136,0.2)' }}
      >
        {initials}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={name}
      width={80}
      height={80}
      className="w-20 h-20 rounded-full object-cover object-top flex-shrink-0"
      style={{ border: '3px solid var(--border)', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}
      onError={() => setFailed(true)}
    />
  )
}

function SidebarContent({ nav, personal, theme, onToggleTheme, onClose }: {
  nav: NavItem[]; personal: Personal; theme: 'dark' | 'light';
  onToggleTheme: () => void; onClose: () => void
}) {
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const match = nav.find(n => n.href === '#' + e.target.id)
            if (match) setActive(match.name)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    nav.forEach(n => { const el = document.getElementById(n.href.slice(1)); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [nav])

  const scrollTo = (href: string) => {
    onClose()
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      {/* Profile section */}
      <div className="flex flex-col items-center text-center">
        <Avatar src={personal.profileImage} name={personal.name} />

        <div className="mt-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22C55E' }} aria-hidden="true" />
          <span className="text-[11px] font-semibold" style={{ color: '#22C55E' }}>Available for Work</span>
        </div>

        <h1 className="mt-2 font-bold text-lg leading-tight" style={{ color: 'var(--text)' }}>
          {personal.name}
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          @gokulprakash · Coimbatore, India
        </p>
        <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text)' }}>
          {personal.title}
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          4+ Years Experience
        </p>

        <div className="mt-3 flex gap-2 flex-wrap justify-center">
          {['Infosys', 'Maventic'].map(co => (
            <span key={co} className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
              style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
              {co}
            </span>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex gap-2 mt-6">
        <a
          href={`mailto:${personal.email}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
          style={{ background: 'var(--text)' }}
          aria-label="Send email"
        >
          <Mail size={14} aria-hidden="true" /> Email
        </a>
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-10 rounded-xl border transition-all hover:border-teal"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          aria-label="LinkedIn profile"
        >
          <Linkedin size={14} aria-hidden="true" />
        </a>
      </div>

      {/* Divider */}
      <div className="border-t my-6" style={{ borderColor: 'var(--border)' }} />

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5" aria-label="Site navigation">
        {nav.map(item => (
          <button
            key={item.name}
            onClick={() => scrollTo(item.href)}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
            style={{
              color: active === item.name ? 'var(--teal)' : 'var(--text-muted)',
              background: active === item.name ? 'rgba(13,148,136,0.08)' : 'transparent',
              fontWeight: active === item.name ? '600' : '400',
            }}
            aria-current={active === item.name ? 'page' : undefined}
          >
            {active === item.name && (
              <span className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: 'var(--teal)' }} aria-hidden="true" />
            )}
            {item.name}
          </button>
        ))}
      </nav>

      {/* Bottom controls */}
      <div className="mt-auto pt-5 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <a
          href={personal.resume}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium hover:opacity-70 transition-opacity"
          style={{ color: 'var(--text-muted)' }}
        >
          <FileText size={12} aria-hidden="true" /> Resume
        </a>
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg transition-colors hover:opacity-70"
          style={{ color: 'var(--text-muted)' }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}

export default function Sidebar({ nav, personal, theme, onToggleTheme, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex fixed top-0 left-0 h-screen w-[260px] flex-col border-r z-50"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        aria-label="Profile sidebar"
      >
        <SidebarContent
          nav={nav} personal={personal} theme={theme}
          onToggleTheme={onToggleTheme} onClose={() => {}}
        />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 md:hidden"
              onClick={onMobileClose}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 left-0 h-screen w-[260px] z-50 md:hidden border-r"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              aria-label="Mobile navigation"
            >
              <button
                onClick={onMobileClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Close menu"
              >
                <X size={18} aria-hidden="true" />
              </button>
              <SidebarContent
                nav={nav} personal={personal} theme={theme}
                onToggleTheme={onToggleTheme} onClose={onMobileClose}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
