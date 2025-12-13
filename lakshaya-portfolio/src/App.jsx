import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import LoadingScreen from './components/LoadingScreen'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useTheme from './hooks/useTheme'
import usePalette from './hooks/usePalette'

function App() {
  const [showLoading, setShowLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { palette, cyclePalette } = usePalette()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 4050)
    return () => clearTimeout(timer)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      {showLoading && <LoadingScreen />}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        palette={palette}
        cyclePalette={cyclePalette}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
      />
      <main className="container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Resume />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App