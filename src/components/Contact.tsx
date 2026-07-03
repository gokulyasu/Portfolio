import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, ArrowUpRight, Sparkles } from 'lucide-react'
import type { ContactData } from '../types/portfolio'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

interface ContactProps { contact: ContactData; personal?: unknown }

export default function Contact({ contact }: ContactProps) {
  const links = [
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      hint: 'Send an email',
      color: '#60A5FA',
      bg: 'rgba(96,165,250,0.08)',
      border: 'rgba(96,165,250,0.2)',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone}`,
      hint: 'Call or WhatsApp',
      color: '#34D399',
      bg: 'rgba(52,211,153,0.08)',
      border: 'rgba(52,211,153,0.2)',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'gokul-prakash',
      href: contact.linkedin,
      hint: 'View LinkedIn profile',
      color: '#60A5FA',
      bg: 'rgba(96,165,250,0.08)',
      border: 'rgba(96,165,250,0.2)',
    },
  ]

  return (
    <section id="contact" aria-label="Contact" style={{ background: 'var(--bg)' }}>
      <div className="section-wrap">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold mb-5"
              style={{ background: 'var(--glass-teal)', border: '1px solid var(--glass-teal-border)', color: 'var(--teal)' }}>
              <Sparkles size={12} aria-hidden="true" /> Say hello
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Let's Build Something<br />
              <span className="gradient-text">Together</span>
            </h2>
            <p className="max-w-lg mx-auto text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              I'm always open to discussing new opportunities, interesting projects, or just a good conversation about SAP and enterprise development.
            </p>
          </motion.div>

          {/* Contact cards */}
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-4 mb-10">
            {links.map(({ icon: Icon, label, value, href, hint, color, bg, border }) => (
              <motion.a
                key={label}
                variants={fadeUp}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="bento-cell flex flex-col gap-4 p-6 no-underline group"
                style={{ borderColor: border }}
                whileHover={{ y: -3 }}
                aria-label={`${hint}: ${value}`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Icon size={20} style={{ color }} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-xs mb-1 font-semibold" style={{ color }}>
                    {label}
                  </p>
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{value}</p>
                </div>
                <div className="flex items-center justify-end">
                  <ArrowUpRight size={15} style={{ color: 'var(--border)' }} className="group-hover:text-teal transition-colors" aria-hidden="true" />
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div variants={fadeUp} className="text-center">
            <a
              href={`mailto:${contact.email}`}
              className="btn-primary inline-flex text-base px-8 py-4"
              aria-label={`Send email to ${contact.email}`}
            >
              <Mail size={18} aria-hidden="true" />
              Send a Message
            </a>
            <p className="mt-4 text-xs font-mono" style={{ color: 'var(--border)' }}>
              Usually respond within 24 hours
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
