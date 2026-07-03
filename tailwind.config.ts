import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        ink: '#0A0F1C',
        canvas: '#0F1629',
        raised: '#151D35',
        border: { DEFAULT: '#1E293B', light: '#E2E8F0' },
        snow: '#F1F5F9',
        mist: '#94A3B8',
        teal: {
          DEFAULT: '#14B8A6',
          dim: '#0D9488',
          bright: '#2DD4BF',
          faint: 'rgba(20,184,166,0.08)',
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
