import { useState, useEffect } from 'react'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function Hero() {
  const [typingText, setTypingText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useRevealOnScroll()

  const lines = [
    'Java Full-Stack Developer',
    'Tech Explorer & Problem Solver',
    'Building Tomorrow With Code'
  ]

  useEffect(() => {
    const tick = () => {
      const full = lines[lineIndex]
      
      if (!deleting) {
        setCharIndex(prev => prev + 1)
        setTypingText(full.slice(0, charIndex + 1))
        
        if (charIndex + 1 >= full.length) {
          setTimeout(() => setDeleting(true), 800)
        }
      } else {
        setCharIndex(prev => prev - 1)
        setTypingText(full.slice(0, charIndex - 1))
        
        if (charIndex - 1 <= 0) {
          setDeleting(false)
          setLineIndex((prev) => (prev + 1) % lines.length)
        }
      }
    }

    const timer = setTimeout(tick, deleting ? 40 : 80)
    return () => clearTimeout(timer)
  }, [charIndex, deleting, lineIndex])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero">
      <div className="hero-left">
        <div className="card reveal">
          <h1>Hello, I am</h1>
          <div className="intro-title">Lakshaya Awasthi</div>
          <div className="intro-sub">
            A man with hopes and dreams, a believer in the magic of the universe
          </div>

          <div className="typing-line">
            <span style={{ color: 'var(--pal-2)', fontWeight: 700 }}>{typingText}</span>
            <span className="typing-caret"></span>
          </div>

          <div style={{ marginTop: '18px' }}>
            <button className="btn primary" onClick={() => scrollToSection('projects')}>
              See Projects
            </button>
            <button className="btn" onClick={() => scrollToSection('contact')}>
              Contact Me
            </button>
          </div>
        </div>
      </div>

      <div className="hero-right reveal">
        <div className="glass card">
          <img
            className="profile-img"
            src="/public/Images/lakshaya-profile-pic.jpg"
            alt="profile"
          />
        </div>
      </div>
    </section>
  )
}