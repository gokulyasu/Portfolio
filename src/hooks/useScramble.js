import { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?<>[]{}|/\\'

export function useScramble(text, trigger = true, speed = 40) {
  const [output, setOutput] = useState(text)
  const raf = useRef(null)
  const iter = useRef(0)

  useEffect(() => {
    if (!trigger) return
    iter.current = 0

    const step = () => {
      iter.current += 1
      const threshold = iter.current / 2.5

      setOutput(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < threshold) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iter.current < text.length * 2.5) {
        raf.current = requestAnimationFrame(() =>
          setTimeout(step, speed)
        )
      } else {
        setOutput(text)
      }
    }

    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [text, trigger, speed])

  return output
}
