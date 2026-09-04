import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import './Header.css'

const navItems = ['About', 'Services', 'Portfolio', 'Process', 'Contact']

function Header({ navOpen, setNavOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-glow-track" aria-hidden="true" />
      
      <a className="brand" href="#top" aria-label="GenWeb Technologies home">
        <img
          src="/ChatGPT Image Sep 4, 2026, 01_05_31 PM.png"
          alt="GenWeb Technologies logo"
        />
      </a>

      <nav className={navOpen ? 'open' : ''} aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setNavOpen(false)}
          >
            <span>{item}</span>
          </a>
        ))}
      </nav>

      <button
        className="icon-button menu"
        type="button"
        onClick={() => setNavOpen((open) => !open)}
        aria-label="Toggle navigation"
      >
        <span className="menu-icon">
          {navOpen ? <X size={20} /> : <Menu size={20} />}
        </span>
      </button>

    </header>
  )
}

export default Header