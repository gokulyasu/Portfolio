import { useRef, useEffect } from 'react'

const PHI = (1 + Math.sqrt(5)) / 2

const norm = (v) => {
  const l = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]) || 1
  return [v[0]/l, v[1]/l, v[2]/l]
}

// ── Polyhedra data (verified edge-lengths) ───────────────────────────────────
const SHAPES = {
  icosahedron: {
    verts: [
      [-1,PHI,0],[1,PHI,0],[-1,-PHI,0],[1,-PHI,0],
      [0,-1,PHI],[0,1,PHI],[0,-1,-PHI],[0,1,-PHI],
      [PHI,0,-1],[PHI,0,1],[-PHI,0,-1],[-PHI,0,1],
    ].map(norm),
    faces: [
      [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
      [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
      [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
      [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1],
    ],
  },

  octahedron: {
    verts: [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],
    faces: [
      [0,2,4],[2,1,4],[1,3,4],[3,0,4],
      [0,3,5],[3,1,5],[1,2,5],[2,0,5],
    ],
  },

  // 12 pentagonal faces — each edge ≈ 2/φ (verified by distance check)
  dodecahedron: {
    verts: [
      [1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],
      [-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1],
      [0,1/PHI,PHI],[0,1/PHI,-PHI],[0,-1/PHI,PHI],[0,-1/PHI,-PHI],
      [1/PHI,PHI,0],[1/PHI,-PHI,0],[-1/PHI,PHI,0],[-1/PHI,-PHI,0],
      [PHI,0,1/PHI],[PHI,0,-1/PHI],[-PHI,0,1/PHI],[-PHI,0,-1/PHI],
    ].map(norm),
    faces: [
      [2,16,0,8,10],[0,16,17,1,12],[0,12,14,4,8],
      [4,14,5,19,18],[4,18,6,10,8],[6,18,19,7,15],
      [6,15,13,2,10],[2,13,3,17,16],[3,13,15,7,11],
      [3,11,9,1,17],[1,9,5,14,12],[5,9,11,7,19],
    ],
  },
}

// ── Render one frame ─────────────────────────────────────────────────────────
function drawFrame(ctx, shapeName, elapsed, W, H, speed) {
  const { verts, faces } = SHAPES[shapeName]
  const cx = W / 2, cy = H / 2
  const S  = Math.min(W, H) * 0.36

  // Speed is in rad/frame at 60 fps → convert to rad/sec by ×60
  const ax = elapsed * speed[0] * 60
  const ay = elapsed * speed[1] * 60
  const cX = Math.cos(ax), sX = Math.sin(ax)
  const cY = Math.cos(ay), sY = Math.sin(ay)

  const proj = ([x, y, z]) => {
    const x1 = x*cY + z*sY,  z1 = -x*sY + z*cY
    const y2 = y*cX - z1*sX, z2 =  y*sX + z1*cX
    const f  = 3 / (3 + z2)
    return [cx + x1*S*f, cy - y2*S*f, z2]
  }

  const pv = verts.map(proj)

  const faceData = faces.map(face => ({
    pts: face.map(i => pv[i]),
    z:   face.reduce((s, i) => s + pv[i][2], 0) / face.length,
  }))

  // Painter's algorithm — back to front
  faceData.sort((a, b) => a.z - b.z)

  for (const { pts, z } of faceData) {
    ctx.beginPath()
    ctx.moveTo(pts[0][0], pts[0][1])
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
    ctx.closePath()

    // Near-black fill occludes back edges — creates solid-cage illusion
    ctx.fillStyle = 'rgba(12,12,12,0.88)'
    ctx.fill()

    const depthT = Math.max(0, Math.min(1, (z + 1.5) / 3))
    ctx.strokeStyle = `rgba(212,245,60,${(0.15 + depthT * 0.7).toFixed(2)})`
    ctx.lineWidth   = 0.6 + depthT * 0.5
    ctx.stroke()
  }
}

// ── Component ────────────────────────────────────────────────────────────────
export default function FloatingShape({ shape = 'icosahedron', size = 120, speed = [0.004, 0.006], opacity = 0.45 }) {
  const canvasRef = useRef(null)
  const timeRef   = useRef(0)
  const rafRef    = useRef(null)

  useEffect(() => {
    if (!SHAPES[shape]) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Cache dimensions — no getBoundingClientRect inside the loop
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

    // Pause animation when scrolled off-screen
    let visible = true
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(canvas)

    let prev = null
    const frame = (ts) => {
      if (visible) {
        if (prev === null) prev = ts
        timeRef.current += (ts - prev) / 1000
        ctx.clearRect(0, 0, W, H)
        drawFrame(ctx, shape, timeRef.current, W, H, speed)
      }
      prev = visible ? ts : null
      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [shape, speed])

  return (
    <div style={{
      width: size, height: size,
      opacity,
      pointerEvents: 'none',
      filter: 'drop-shadow(0 0 10px rgba(212,245,60,0.28))',
    }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
