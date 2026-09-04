import { Menu, X } from 'lucide-react'
import './Header.css'

const navItems = ['About', 'Services', 'Portfolio', 'Process', 'Contact']

function Header({ navOpen, setNavOpen }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="GenWeb Technologies home">
        <img src="/ChatGPT Image Sep 4, 2026, 01_05_31 PM.png" alt="GenWeb Technologies logo" />
      </a>
      <nav className={navOpen ? 'open' : ''} aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setNavOpen(false)}>
            {item}
          </a>
        ))}
      </nav>
      <button className="icon-button menu" type="button" onClick={() => setNavOpen((open) => !open)} aria-label="Toggle navigation">
        {navOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  )
}

export default Header

