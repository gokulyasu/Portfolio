import { useState, useEffect } from 'react'

export function useTypewriter(texts: string[], speed = 65, pause = 2200) {
  const [display, setDisplay] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIdx]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && charIdx < current.length)
      t = setTimeout(() => setCharIdx(i => i + 1), speed)
    else if (!deleting && charIdx === current.length)
      t = setTimeout(() => setDeleting(true), pause)
    else if (deleting && charIdx > 0)
      t = setTimeout(() => setCharIdx(i => i - 1), Math.max(speed / 2.5, 25))
    else { setDeleting(false); setTextIdx(i => (i + 1) % texts.length) }
    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(t)
  }, [charIdx, deleting, textIdx, texts, speed, pause])

  return display
}
