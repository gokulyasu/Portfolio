import { motion } from 'framer-motion'
import type { FooterData } from '../types/portfolio'

interface FooterProps { footer: FooterData }

export default function Footer({ footer }: FooterProps) {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }} role="contentinfo">
      <div className="max-w-5xl mx-auto px-5 py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold" style={{ color: 'var(--text)' }}>{footer.copyright}</span>
        </motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="font-mono text-xs" style={{ color: 'var(--border)' }}>
          {footer.tagline}
        </motion.p>
      </div>
    </footer>
  )
}
