import { useEffect, useRef } from 'react'

const PRIMARY  = [0,   255, 157]
const SECONDARY= [112, 0,   255]
const NUM_PARTICLES = 90
const CONNECT_DIST  = 130
const MOUSE_REPEL   = 110

function lerp(a, b, t) { return a + (b - a) * t }

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: -999, y: -999 }

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY }, { passive: true })

    const particles = Array.from({ length: NUM_PARTICLES }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r:  Math.random() * 1.5 + .5,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < MOUSE_REPEL) {
          const f = ((MOUSE_REPEL - d) / MOUSE_REPEL) * .9
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }

        p.vx *= .97
        p.vy *= .97
        p.x  += p.vx
        p.y  += p.vy

        if (p.x < 0)              p.x = canvas.width
        if (p.x > canvas.width)   p.x = 0
        if (p.y < 0)              p.y = canvas.height
        if (p.y > canvas.height)  p.y = 0

        const t = p.x / canvas.width
        const r = Math.round(lerp(PRIMARY[0], SECONDARY[0], t))
        const g = Math.round(lerp(PRIMARY[1], SECONDARY[1], t))
        const b = Math.round(lerp(PRIMARY[2], SECONDARY[2], t))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},.8)`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * .35
            const mx    = (particles[i].x + particles[j].x) / 2
            const t     = mx / canvas.width
            const r = Math.round(lerp(PRIMARY[0], SECONDARY[0], t))
            const g = Math.round(lerp(PRIMARY[1], SECONDARY[1], t))
            const b = Math.round(lerp(PRIMARY[2], SECONDARY[2], t))
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
            ctx.lineWidth   = .6
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: .55 }}
    />
  )
}
