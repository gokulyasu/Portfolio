import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import LenisProvider  from './components/LenisProvider'
import CustomCursor   from './components/CustomCursor'
import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import About          from './components/About'
import Experience     from './components/Experience'
import Projects       from './components/Projects'
import Skills         from './components/Skills'
import Education      from './components/Education'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import { data }       from './data'

export default function App() {
  const [konamiActive, setKonamiActive] = useState(false)
  const [keys, setKeys] = useState([])

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })

  useEffect(() => {
    const KONAMI = data.easterEgg.konamiCode
    const onKey = (e) => {
      setKeys((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length)
        if (next.join(',') === KONAMI.join(',')) {
          setKonamiActive(true)
          setTimeout(() => setKonamiActive(false), 4000)
        }
        return next
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const triggerKonami = () => {
    setKonamiActive(true)
    setTimeout(() => setKonamiActive(false), 4000)
  }

  return (
    <LenisProvider>
      <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#0c0c0c' }}>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX, background: '#d4f53c', transformOrigin: '0% 50%' }}
          className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
        />

        <CustomCursor />
        <Navbar data={data} />

        <main>
          <Hero       data={data} />
          <About      data={data} />
          <Experience data={data} />
          <Projects   data={data} />
          <Skills     data={data} />
          <Education  data={data} />
          <Contact    data={data} />
        </main>

        <Footer data={data} />

        {/* Easter egg */}
        <AnimatePresence>
          {konamiActive && (
            <motion.div
              key="konami"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9990] pointer-events-none px-10 py-6 text-center"
              style={{
                background: 'rgba(12,12,12,0.96)',
                border: '1px solid rgba(212,245,60,0.3)',
                boxShadow: '0 0 60px rgba(212,245,60,0.15)',
                clipPath: 'polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)',
              }}
            >
              <div className="text-4xl mb-3 select-none">🍥</div>
              <p
                className="font-mono font-bold text-sm max-w-xs leading-relaxed"
                style={{ color: '#d4f53c' }}
              >
                {data.easterEgg.konamiMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LenisProvider>
  )
}
