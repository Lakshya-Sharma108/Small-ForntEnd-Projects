import { useState, useEffect } from 'react'

export default function usePalette() {
  const [palette, setPalette] = useState(1)

  useEffect(() => {
    document.body.setAttribute('data-palette', palette)
  }, [palette])

  const cyclePalette = () => {
    setPalette(prev => prev === 3 ? 1 : prev + 1)
  }

  return { palette, cyclePalette }
}