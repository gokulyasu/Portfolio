import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const rx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.5 })
  const ry = useSpring(my, { stiffness: 80, damping: 20, mass: 0.5 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    const check = (e) => {
      setHovered(!!e.target.closest('a, button, [data-hover], input, textarea, label'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', check)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', check)
    }
  }, [mx, my])

  return (
    <>
      {/* Lagging ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] rounded-full pointer-events-none border"
        style={{
          x: rx,
          y: ry,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'rgba(212,245,60,0.45)',
        }}
        animate={{
          width: hovered ? 52 : 36,
          height: hovered ? 52 : 36,
          opacity: hovered ? 0.8 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      />

      {/* Instant dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none"
        style={{
          x: mx,
          y: my,
          translateX: '-50%',
          translateY: '-50%',
          background: '#d4f53c',
        }}
        animate={{ width: hovered ? 6 : 8, height: hovered ? 6 : 8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />
    </>
  )
}
