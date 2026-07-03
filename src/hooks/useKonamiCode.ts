import { useEffect } from 'react'

export function useKonamiCode(sequence: string[], callback: () => void) {
  useEffect(() => {
    let index = 0
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === sequence[index]) {
        index++
        if (index === sequence.length) { callback(); index = 0 }
      } else { index = e.key === sequence[0] ? 1 : 0 }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [sequence, callback])
}
