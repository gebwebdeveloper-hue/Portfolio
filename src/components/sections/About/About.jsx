import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  Layers3,
  PenTool,
  Rocket
} from 'lucide-react'
import './About.css'

const features = [
  {
    title: 'Creative Design',
    desc: 'Premium UI/UX crafted to impress.',
    icon: PenTool,
  },
  {
    title: 'Responsive Experience',
    desc: 'Pixel-perfect on every device.',
    icon: Layers3,
  },
  {
    title: 'Growth Focused',
    desc: 'Built for conversions and scalability.',
    icon: Rocket,
  },
  {
    title: 'Trusted Quality',
    desc: 'Reliable solutions with lasting value.',
    icon: BadgeCheck,
  },
]

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-bg-container">
        <img
          src="/ChatGPT Image Sep 4, 2026, 01_09_11 PM.png"
          alt="About GenWeb Background"
          className="about-bg-image"
        />
        <div className="about-bg-overlay" />
      </div>

      <div className="about-content section-shell">
        <motion.div
          className="section-copy"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">
            <Globe2 size={15} />
            About GenWeb Technologies
          </p>

          <h2>
            We craft digital experiences that make businesses impossible to
            ignore.
          </h2>

          <p className="about-description">
            At <strong>GenWeb Technologies</strong>, we combine strategy,
            creativity, and cutting-edge development to build websites that
            don't just look beautiful—they generate trust, engagement, and
            measurable business growth. Every interaction is designed with
            precision to deliver a premium experience for your audience.
          </p>

          <div className="feature-grid">
            {features.map(({ title, desc, icon: Icon }) => (
              <motion.div
                key={title}
                className="feature-card"
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{ duration: 0.25 }}
                data-cursor="card"
              >
                <div className="feature-icon">
                  <Icon size={22} />
                </div>

                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="#contact"
            className="about-btn"
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.96 }}
          >
            Let's Build Something Great
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default About
