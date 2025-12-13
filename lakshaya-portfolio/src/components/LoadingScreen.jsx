import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false)
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    const expandTimer = setTimeout(() => setExpand(true), 3250)
    const hideTimer = setTimeout(() => setHidden(true), 4050)

    return () => {
      clearTimeout(expandTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="ball-container">
        <div className="ball-shadow" style={{ display: expand ? 'none' : 'block' }}></div>
        <div className={`bouncing-ball ${expand ? 'expand' : ''}`}></div>
      </div>
    </div>
  )
}