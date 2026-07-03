import { useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail, MapPin } from 'lucide-react'
import { useTypewriter } from '../hooks/useTypewriter'
import type { Personal, HeroData, EasterEggData } from '../types/portfolio'

const G = {
  white: {
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid var(--glass-border)',
  } as CSSProperties,
  warm: {
    background: 'var(--glass-warm)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid var(--glass-warm-border)',
  } as CSSProperties,
  teal: {
    background: 'var(--glass-teal)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid var(--glass-teal-border)',
  } as CSSProperties,
}

function AvatarImg({ src, name, size = 60 }: { src: string; name: string; size?: number }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').map(n => n[0]).join('')
  const base: CSSProperties = { width: size, height: size, borderRadius: '50%', flexShrink: 0 }
  if (failed) return (
    <div style={{ ...base, ...G.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size / 3, color: '#0D9488' }}>{initials}</div>
  )
  return (
    <img
      src={src} alt={name} width={size} height={size}
      style={{ ...base, objectFit: 'cover', objectPosition: 'top', border: '2px solid rgba(13,148,136,0.25)' }}
      onError={() => setFailed(true)}
    />
  )
}

function PhoneCard({ personal }: { personal: Personal }) {
  return (
    <div style={{ width: 190 }}>
      <div style={{
        width: 190, borderRadius: 32, padding: 6,
        background: 'linear-gradient(145deg, #C8C4BC, #ABA7A0)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.3)',
      }}>
        <div style={{
          borderRadius: 26, minHeight: 330,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '28px 20px 22px', gap: 10, ...G.white,
        }}>
          <div style={{ width: 56, height: 5, borderRadius: 99, background: '#C8C4BC', marginBottom: 6 }} />
          <AvatarImg src={personal.profileImage} name={personal.name} size={64} />
          <div style={{ fontFamily: 'Caveat,cursive', fontSize: 44, fontWeight: 700, color: '#0D9488', lineHeight: 1, textAlign: 'center' }}>
            {personal.name.split(' ')[0]}
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.13em', color: '#8A8580', textAlign: 'center', lineHeight: 1.6 }}>
            SAP FULL STACK<br />DEVELOPER
          </div>
          <a href={personal.resume} target="_blank" rel="noreferrer" style={{
            marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 4,
            border: '1.5px solid #0D9488', color: '#0D9488', borderRadius: 8,
            padding: '5px 12px', fontFamily: 'monospace', fontSize: 9,
            fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'none',
          }}>
            DOWNLOAD RESUME ↓
          </a>
        </div>
      </div>
      <div style={{ width: 44, height: 4, borderRadius: 99, background: '#ABA7A0', margin: '4px auto 0' }} />
    </div>
  )
}

function StackNotepad() {
  const items = ['ABAP', 'SAP UI5', 'OData v2/v4', 'RAP', 'Fiori Elements']
  return (
    <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', width: 218 }}>
      <div style={{ width: 22, background: '#14B8A6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', padding: '14px 0' }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ width: 13, height: 13, borderRadius: '50%', background: '#0D9488', border: '2px solid rgba(255,255,255,0.55)' }} />
        ))}
      </div>
      <div style={{ flex: 1, padding: '14px 13px', ...G.white }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {items.map((s, i) => (
            <li key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                border: `1.5px solid ${i < 3 ? '#0D9488' : '#E5DDD8'}`,
                background: i < 3 ? 'rgba(13,148,136,0.09)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, color: '#0D9488',
              }}>{i < 3 ? '✓' : ''}</span>
              <span style={{ fontFamily: 'Caveat,cursive', fontSize: 16, color: 'var(--text)' }}>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function FinderCard() {
  const folders = [
    { label: 'Fiori Apps', color: '#60A5FA' },
    { label: 'OData APIs', color: '#34D399' },
    { label: 'ABAP', color: '#A78BFA' },
  ]
  return (
    <div style={{ width: 224, borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '1px solid var(--glass-border)' }}>
      <div style={{
        padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 5,
        background: 'rgba(240,237,233,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(229,221,216,0.6)',
      }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ marginLeft: 4, fontFamily: 'monospace', fontSize: 10, color: '#8A8580' }}>gokul's work</span>
      </div>
      <div style={{ padding: 14, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, ...G.white }}>
        {folders.map(({ label, color }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 42, height: 34, borderRadius: 6, background: color, position: 'relative', boxShadow: `0 2px 8px ${color}66` }}>
              <div style={{ position: 'absolute', top: -5, left: 5, width: 16, height: 6, borderRadius: '3px 3px 0 0', background: color, opacity: 0.7 }} />
            </div>
            <span style={{ fontSize: 9, textAlign: 'center', color: '#6B6867', fontFamily: 'monospace' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StampCard() {
  return (
    <div style={{
      width: 148, padding: '14px 12px', borderRadius: 4,
      border: '3px dashed #0D9488',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      boxShadow: '0 6px 24px rgba(0,0,0,0.14)', ...G.white,
    }}>
      <div style={{ fontSize: 28 }}>🌿</div>
      <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#8A8580', letterSpacing: '0.12em' }}>INDIA</div>
      <div style={{ fontFamily: 'Caveat,cursive', fontSize: 20, fontWeight: 700, color: '#0D9488' }}>Coimbatore</div>
      <div style={{ fontFamily: 'monospace', fontSize: 8, color: '#ABA7A0', letterSpacing: '0.08em' }}>Tamil Nadu</div>
    </div>
  )
}

function StickyNote() {
  return (
    <div style={{ width: 172, padding: '22px 16px 18px', borderRadius: 4, position: 'relative', boxShadow: '0 6px 24px rgba(0,0,0,0.14)', ...G.warm }}>
      <div style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', width: 30, height: 16, border: '2.5px solid #94A3B8', borderRadius: 99 }} />
      <div style={{ fontFamily: 'Caveat,cursive', fontSize: 48, fontWeight: 700, color: '#0D9488', lineHeight: 1 }}>4+</div>
      <div style={{ fontFamily: 'Caveat,cursive', fontSize: 18, color: '#78716C' }}>Years</div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#78716C', lineHeight: 1.65 }}>
        Enterprise SAP<br />Consulting<br />ABAP & Fiori
      </div>
    </div>
  )
}

interface HeroProps {
  personal: Personal
  hero: HeroData
  easterEgg: EasterEggData
  onEasterEgg: () => void
}

export default function Hero({ personal, hero, easterEgg, onEasterEgg }: HeroProps) {
  const typedText = useTypewriter(hero.typedText, 65, 2200)

  const spring = (delay: number, fromX = 0, fromY = 0) => ({
    initial: { opacity: 0, x: fromX, y: fromY, scale: 0.88 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    transition: { delay, type: 'spring' as const, stiffness: 80, damping: 16 },
  })

  return (
    <section id="hero" className="relative flex flex-col lg:flex-row overflow-hidden lg:min-h-screen" style={{ background: 'var(--bg)' }} aria-label="Introduction">
      {/* Background layers */}
      <div className="absolute inset-0 bg-dots opacity-[0.18] pointer-events-none" aria-hidden="true" />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '10%', left: '0%', width: 600, height: 600,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(13,148,136,0.09) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '5%', right: '5%', width: 400, height: 400,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      {/* ─── Left: Text Content ─── */}
      <div className="relative z-10 flex flex-col justify-center flex-1 min-w-0 px-6 md:px-14 lg:px-20 pt-24 pb-10 lg:py-28">

        {/* Mobile-only: Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05, type: 'spring', stiffness: 80 }}
          className="flex lg:hidden justify-center mb-6"
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              width: 100, height: 100, borderRadius: '50%', padding: 3,
              background: 'linear-gradient(135deg, #0D9488, #60A5FA)',
            }}>
              <AvatarImg src={personal.profileImage} name={personal.name} size={94} />
            </div>
            <span
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[var(--bg)]"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex items-center mb-6 lg:mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold"
            style={{ background: 'var(--glass-teal)', border: '1px solid var(--glass-teal-border)', color: 'var(--teal)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            Open to opportunities
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="font-mono text-sm tracking-[0.15em] mb-3"
          style={{ color: 'var(--text-muted)' }}
        >
          Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
          className="font-bold leading-[0.9] mb-5"
          style={{ fontSize: 'clamp(44px, 6.5vw, 84px)' }}
        >
          <span className="gradient-text">{personal.name.split(' ')[0]}</span>
          <br />
          <span style={{ color: 'var(--text)' }}>{personal.name.split(' ')[1]}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="h-8 flex items-center mb-4"
        >
          <span className="text-base md:text-lg font-mono" style={{ color: 'var(--teal)' }}>
            {typedText}
            <span
              className="inline-block w-[2px] ml-0.5 animate-pulse"
              style={{ height: '1.1em', background: 'var(--teal)', verticalAlign: 'text-bottom' }}
              aria-hidden="true"
            />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.46 }}
          className="max-w-sm text-sm leading-relaxed mb-8"
          style={{ color: 'var(--text-muted)' }}
        >
          {hero.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="flex items-center gap-3 flex-wrap mb-6"
        >
          <a href={personal.resume} target="_blank" rel="noreferrer" className="btn-primary">
            <Download size={15} aria-hidden="true" /> Resume
          </a>
          <a href={`mailto:${personal.email}`} className="btn-outline">
            <Mail size={15} aria-hidden="true" /> Say Hello
          </a>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.63 }}
          className="flex items-center gap-1.5 text-xs font-mono mb-8 lg:mb-0"
          style={{ color: 'var(--text-muted)' }}
        >
          <MapPin size={12} style={{ color: 'var(--teal)' }} aria-hidden="true" />
          Coimbatore, Tamil Nadu · India
        </motion.div>

        {/* Mobile-only: horizontal card strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
          className="flex lg:hidden gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-none"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          aria-label="Portfolio highlights"
        >
          {/* Mini profile card */}
          <div className="flex-shrink-0 rounded-2xl p-4 flex flex-col items-center gap-2 text-center" style={{ scrollSnapAlign: 'start', minWidth: 120, background: 'var(--surface)', border: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: 28 }}>🌿</div>
            <div style={{ fontFamily: 'Caveat,cursive', fontSize: 18, fontWeight: 700, color: '#0D9488' }}>Coimbatore</div>
            <div className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>Tamil Nadu, India</div>
          </div>
          {/* Years card */}
          <div className="flex-shrink-0 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 text-center" style={{ scrollSnapAlign: 'start', minWidth: 110, background: 'var(--surface)', border: '1px solid var(--glass-teal-border)' }}>
            <div className="gradient-text font-bold" style={{ fontSize: 36, lineHeight: 1 }}>4+</div>
            <div className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>Years Exp.</div>
            <div className="text-[10px]" style={{ color: 'var(--border)' }}>Enterprise SAP</div>
          </div>
          {/* Stack card */}
          <div className="flex-shrink-0 rounded-2xl p-4 flex flex-col gap-2" style={{ scrollSnapAlign: 'start', minWidth: 148, background: 'var(--surface)', border: '1px solid var(--glass-border)' }}>
            <div className="text-[10px] font-mono font-semibold" style={{ color: 'var(--teal)' }}>CURRENT STACK</div>
            {['ABAP', 'SAP UI5', 'OData v2/v4', 'RAP'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span style={{
                  width: 13, height: 13, borderRadius: 3, flexShrink: 0,
                  border: `1.5px solid ${i < 3 ? '#0D9488' : 'var(--border)'}`,
                  background: i < 3 ? 'rgba(13,148,136,0.12)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 8, color: '#0D9488',
                }}>{i < 3 ? '✓' : ''}</span>
                <span className="text-xs" style={{ color: 'var(--text)' }}>{s}</span>
              </div>
            ))}
          </div>
          {/* Work folders card */}
          <div className="flex-shrink-0 rounded-2xl overflow-hidden" style={{ scrollSnapAlign: 'start', minWidth: 160, background: 'var(--surface)', border: '1px solid var(--glass-border)' }}>
            <div className="px-3 py-2 flex items-center gap-1.5 border-b" style={{ borderColor: 'var(--glass-border)', background: 'rgba(240,237,233,0.06)' }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
              ))}
              <span className="text-[9px] font-mono ml-1" style={{ color: 'var(--text-muted)' }}>gokul's work</span>
            </div>
            <div className="p-3 grid grid-cols-3 gap-3">
              {[{ label: 'Fiori Apps', color: '#60A5FA' }, { label: 'OData APIs', color: '#34D399' }, { label: 'ABAP', color: '#A78BFA' }].map(({ label, color }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div style={{ width: 34, height: 26, borderRadius: 5, background: color, boxShadow: `0 2px 6px ${color}66`, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: -4, left: 4, width: 12, height: 5, borderRadius: '2px 2px 0 0', background: color, opacity: 0.7 }} />
                  </div>
                  <span className="text-[8px] text-center font-mono" style={{ color: 'var(--text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator (desktop only) */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="hidden lg:flex absolute bottom-8 items-center gap-2"
          style={{ color: 'var(--text-muted)' }}
          aria-hidden="true"
        >
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
            <ArrowDown size={14} />
          </motion.div>
          <span className="text-xs font-mono">scroll down</span>
        </motion.div>
      </div>

      {/* ─── Right: Scattered Cards (lg+) ─── */}
      <div className="hidden lg:block relative flex-1 min-h-screen pointer-events-none" aria-hidden="true">
        {/* Handwritten labels */}
        <p className="scattered-label" style={{ top: '11%', left: '4%', transform: 'rotate(-2deg)', fontSize: 16 }}>My current stack:</p>
        <p className="scattered-label" style={{ top: '10%', right: '4%', transform: 'rotate(2deg)', fontSize: 16 }}>Where am I from?</p>
        <p className="scattered-label" style={{ bottom: '29%', left: '2%', transform: 'rotate(1deg)', fontSize: 16 }}>What I work on:</p>
        <p className="scattered-label" style={{ bottom: '28%', right: '3%', transform: 'rotate(-1deg)', fontSize: 16 }}>Experience:</p>

        {/* Phone — center-right */}
        <motion.div {...spring(0.1, 0, 30)} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-55%, -55%)', zIndex: 10, pointerEvents: 'auto' }}>
          <PhoneCard personal={personal} />
        </motion.div>
        {/* Top-left: notepad */}
        <motion.div {...spring(0.35, -28, 0)} style={{ position: 'absolute', top: '13%', left: '3%', transform: 'rotate(-3deg)', zIndex: 5, pointerEvents: 'auto' }}>
          <StackNotepad />
        </motion.div>
        {/* Top-right: stamp */}
        <motion.div {...spring(0.45, 28, 0)} style={{ position: 'absolute', top: '11%', right: '5%', transform: 'rotate(4deg)', zIndex: 5, pointerEvents: 'auto' }}>
          <StampCard />
        </motion.div>
        {/* Bottom-left: finder */}
        <motion.div {...spring(0.55, -20, 18)} style={{ position: 'absolute', bottom: '8%', left: '2%', transform: 'rotate(2deg)', zIndex: 5, pointerEvents: 'auto' }}>
          <FinderCard />
        </motion.div>
        {/* Bottom-right: sticky */}
        <motion.div {...spring(0.65, 18, 18)} style={{ position: 'absolute', bottom: '7%', right: '4%', transform: 'rotate(-2deg)', zIndex: 5, pointerEvents: 'auto' }}>
          <StickyNote />
        </motion.div>
      </div>

      {/* Easter egg — always visible */}
      <button
        onClick={onEasterEgg}
        className="fixed bottom-6 right-6 z-40 text-xs font-mono px-3 py-2 rounded-xl border transition-all hover:opacity-70"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderColor: 'var(--glass-border)',
          color: 'var(--text-muted)',
          boxShadow: 'var(--card-shadow)',
        }}
        aria-label="Easter egg"
      >
        {easterEgg.button}
      </button>
    </section>
  )
}
