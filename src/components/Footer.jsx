import { FiLinkedin, FiMail } from 'react-icons/fi'

const NAV = ['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact']

export default function Footer({ data }) {
  const year = new Date().getFullYear()

  return (
    <footer
      className="px-8 md:px-16 py-10 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Logo */}
        <span className="font-black text-lg" style={{ color: '#d4f53c', letterSpacing: '-0.02em' }}>
          GP_
        </span>

        {/* Nav */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {NAV.map((n) => (
            <button
              key={n}
              onClick={() => document.getElementById(n.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              className="section-label link-underline"
            >
              {n}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {[
            { icon: FiLinkedin, href: data.personal.linkedin, label: 'LinkedIn' },
            { icon: FiMail,     href: `mailto:${data.personal.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label === 'LinkedIn' ? '_blank' : undefined}
              rel={label === 'LinkedIn' ? 'noreferrer' : undefined}
              aria-label={label}
              className="w-8 h-8 border flex items-center justify-center transition-all duration-200"
              style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(240,237,232,0.3)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#d4f53c'; e.currentTarget.style.color = '#d4f53c' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(240,237,232,0.3)' }}
            >
              <Icon size={14} />
            </a>
          ))}

        </div>
      </div>

      <div
        className="max-w-7xl mx-auto mt-8 pt-6 border-t text-center"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}
      >
        <p className="section-label" style={{ letterSpacing: '0.12em' }}>
          © {year} · {data.footer.tagline}
        </p>
      </div>
    </footer>
  )
}
