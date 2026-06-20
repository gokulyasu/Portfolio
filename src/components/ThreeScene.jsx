import { useRef, useEffect } from 'react'
import { useMotionValue, useTransform, motion } from 'framer-motion'

// ── Geometry: torus knot tube mesh ──────────────────────────────────────────
// p=2, q=3 → trefoil knot. 80 curve segments × 8 tube segments = 640 quads.
function buildGeometry() {
  const p = 2, q = 3, CURVE = 80, TUBE = 8, TR = 0.38
  const rings = []

  for (let i = 0; i <= CURVE; i++) {
    const t   = (i / CURVE) * Math.PI * 2
    const phi = p * t, theta = q * t
    const rr  = 2 + Math.cos(theta)

    // Curve position
    const cx = rr * Math.cos(phi)
    const cy = rr * Math.sin(phi)
    const cz = -Math.sin(theta)

    // Analytical tangent (d/dt of curve)
    let tx = -Math.sin(theta) * q * Math.cos(phi) - rr * p * Math.sin(phi)
    let ty = -Math.sin(theta) * q * Math.sin(phi) + rr * p * Math.cos(phi)
    let tz = -Math.cos(theta) * q
    const tl = Math.sqrt(tx*tx + ty*ty + tz*tz) || 1
    tx /= tl; ty /= tl; tz /= tl

    // Surface normal of underlying torus → Gram-Schmidt against T
    let nx = Math.cos(theta) * Math.cos(phi)
    let ny = Math.cos(theta) * Math.sin(phi)
    let nz = Math.sin(theta)
    const nd = nx*tx + ny*ty + nz*tz
    nx -= nd*tx; ny -= nd*ty; nz -= nd*tz
    const nl = Math.sqrt(nx*nx + ny*ny + nz*nz) || 1
    nx /= nl; ny /= nl; nz /= nl

    // Binormal = T × N
    const bx = ty*nz - tz*ny
    const by = tz*nx - tx*nz
    const bz = tx*ny - ty*nx

    const ring = []
    for (let j = 0; j < TUBE; j++) {
      const a = (j / TUBE) * Math.PI * 2
      const ca = Math.cos(a), sa = Math.sin(a)
      ring.push([
        cx + TR * (ca*nx + sa*bx),
        cy + TR * (ca*ny + sa*by),
        cz + TR * (ca*nz + sa*bz),
      ])
    }
    rings.push(ring)
  }

  // Build quad faces [a, b, c, d]
  const faces = []
  for (let i = 0; i < CURVE; i++) {
    for (let j = 0; j < TUBE; j++) {
      const j1 = (j + 1) % TUBE
      faces.push([rings[i][j], rings[i][j1], rings[i+1][j1], rings[i+1][j]])
    }
  }
  return faces
}

const GEOMETRY = buildGeometry()

// ── Component ────────────────────────────────────────────────────────────────
export default function ThreeScene({ scrollProgress }) {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: 0, y: 0 })
  const timeRef   = useRef(0)
  const rafRef    = useRef(null)

  // Scroll-driven opacity — always call hooks unconditionally
  const fallback       = useMotionValue(0)
  const prog           = scrollProgress || fallback
  const containerOpacity = useTransform(prog, [0, 0.7], [1, 0])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Cache dimensions — never call getBoundingClientRect inside the render loop
    let W = 0, H = 0

    const setSize = () => {
      const dpr  = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      W = rect.width;  H = rect.height
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()
    window.addEventListener('resize', setSize)

    const onMove = (e) => {
      mouseRef.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    // Pre-allocate reusable arrays to avoid GC pressure
    const drawn = GEOMETRY.map(() => ({ pts: [[0,0,0],[0,0,0],[0,0,0],[0,0,0]], z: 0 }))

    let prev = null
    const frame = (ts) => {
      if (prev === null) prev = ts
      timeRef.current += (ts - prev) / 1000
      prev = ts

      const t  = timeRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.clearRect(0, 0, W, H)

      const cx = W / 2, cy = H / 2
      const S  = Math.min(W, H) * 0.22

      const ax = t * 0.15 + my * 0.3
      const ay = t * 0.22 + mx * 0.3
      const cX = Math.cos(ax), sX = Math.sin(ax)
      const cY = Math.cos(ay), sY = Math.sin(ay)
      const fD = 4  // focal distance

      // Transform all faces in-place (no new objects)
      for (let f = 0; f < GEOMETRY.length; f++) {
        const face = GEOMETRY[f]
        const out  = drawn[f]
        let sumZ = 0
        for (let v = 0; v < 4; v++) {
          const [x, y, z] = face[v]
          const x1 = x*cY + z*sY,  z1 = -x*sY + z*cY
          const y2 = y*cX - z1*sX, z2 =  y*sX + z1*cX
          const sc = fD / (fD + z2)
          out.pts[v][0] = cx + x1*S*sc
          out.pts[v][1] = cy - y2*S*sc
          out.pts[v][2] = z2
          sumZ += z2
        }
        out.z = sumZ * 0.25
      }

      drawn.sort((a, b) => a.z - b.z)

      // No shadowBlur in the loop — CSS drop-shadow handles the glow
      ctx.shadowBlur = 0
      for (const { pts, z } of drawn) {
        ctx.beginPath()
        ctx.moveTo(pts[0][0], pts[0][1])
        ctx.lineTo(pts[1][0], pts[1][1])
        ctx.lineTo(pts[2][0], pts[2][1])
        ctx.lineTo(pts[3][0], pts[3][1])
        ctx.closePath()

        ctx.fillStyle = '#0c0c0c'
        ctx.fill()

        const depthT = (z + 2.5) / 5
        const alpha  = depthT < 0 ? 0.1 : depthT > 1 ? 0.9 : 0.1 + depthT * 0.8
        ctx.strokeStyle = `rgba(212,245,60,${alpha.toFixed(2)})`
        ctx.lineWidth   = 0.4 + depthT * 0.6
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        width:  'clamp(240px, 44vmin, 560px)',
        height: 'clamp(240px, 44vmin, 560px)',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 22px rgba(212,245,60,0.38))',
        opacity: containerOpacity,
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </motion.div>
  )
}
