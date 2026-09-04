import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { heroStats } from '../../../data/content'
import MagneticButton from '../../common/MagneticButton'
import './Hero.css'
import { ArrowUpRight } from "lucide-react";
import CountUp from "../../common/CountUp";
function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-bg-container">
        <img
          src="/ChatGPT Image Sep 4, 2026, 12_57_05 PM.png"
          alt="GenWeb Hero Background"
          className="hero-bg-image"
        />
        <div className="hero-bg-overlay" />
      </div>
      
      <div className="hero-content section-shell">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15} /> Premium digital agency</p>
          <h1 data-reveal>
            Building Modern <span className="hero-gradient-text">Websites</span> for Growing <span className="hero-gradient-text">Businesses</span>
          </h1>
          <p className="hero-lede">GenWeb Technologies creates business-focused websites, e-commerce platforms, landing pages, brand systems, and digital campaigns that help companies look sharper and grow faster.</p>
          <div className="hero-actions">
            <MagneticButton href="#services">Our Services <ArrowRight size={18} /></MagneticButton>
            <MagneticButton href="#contact" className="secondary">Contact Us <ChevronRight size={18} /></MagneticButton>
          </div>
          <div className="hero-stats">
  {heroStats.map(([value, label]) => (
    <div className="hero-stat-card" key={label}>
      <div className="stat-top">
        <span className="stat-dot"></span>
        <ArrowUpRight size={18} className="stat-arrow" />
      </div>

      <CountUp value={value} />

      <span>{label}</span>
    </div>
  ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
