import { useState, useCallback, useEffect } from 'react'
import rawData from './data/portfolio.json'
import type { PortfolioData } from './types/portfolio'
import { useKonamiCode } from './hooks/useKonamiCode'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import QuoteStrip from './components/QuoteStrip'
import Contact from './components/Contact'
import Footer from './components/Footer'
import EasterEgg from './components/EasterEgg'

const data = rawData as unknown as PortfolioData

export default function App() {
  const [easterEggOpen, setEasterEggOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])
  const openEasterEgg = useCallback(() => setEasterEggOpen(true), [])

  useKonamiCode(data.easterEgg.konamiCode, openEasterEgg)

  return (
    <div className="min-h-screen overflow-x-hidden antialiased" style={{ background: 'var(--bg)' }}>
      <ScrollProgress />
      <Navbar
        nav={data.navigation}
        personal={data.personal}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="pt-16">
        <Hero personal={data.personal} hero={data.hero} easterEgg={data.easterEgg} onEasterEgg={openEasterEgg} />
        <About about={data.about} education={data.education} />
        <QuoteStrip quotes={data.quotes} />
        <Experience experience={data.experience} />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} />
        <Contact contact={data.contact} personal={data.personal} />
        <Footer footer={data.footer} />
      </main>

      {easterEggOpen && (
        <EasterEgg message={data.easterEgg.konamiMessage} onClose={() => setEasterEggOpen(false)} />
      )}
    </div>
  )
}
