export default function Header({ theme, toggleTheme, palette, cyclePalette, mobileMenuOpen, setMobileMenuOpen, closeMobileMenu }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    closeMobileMenu()
  }

  return (
    <>
      <header>
        <div className="brand">
          <div className="logo">LA</div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Lakshaya Awasthi</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Java • Full-Stack Developer</div>
          </div>
        </div>

        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
          <button className="btn" onClick={toggleTheme}>
            {theme === 'light' ? 'Light' : 'Dark'}
          </button>
          <button className="btn" onClick={cyclePalette}>
            Palette {palette}
          </button>
        </nav>

        <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <a href="#about" onClick={closeMobileMenu}>About</a>
        <a href="#skills" onClick={closeMobileMenu}>Skills</a>
        <a href="#projects" onClick={closeMobileMenu}>Projects</a>
        <a href="#resume" onClick={closeMobileMenu}>Resume</a>
        <a href="#contact" onClick={closeMobileMenu}>Contact</a>
        <button className="btn" onClick={toggleTheme}>
          {theme === 'light' ? 'Light' : 'Dark'}
        </button>
        <button className="btn" onClick={cyclePalette}>
          Palette {palette}
        </button>
      </div>
    </>
  )
}