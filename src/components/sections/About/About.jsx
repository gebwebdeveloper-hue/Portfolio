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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

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

      {/* Ambient glow */}
      <div className="about-ambient about-ambient-one" />
      <div className="about-ambient about-ambient-two" />

      <div className="about-content section-shell">

        <motion.div
          className="about-copy"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >

          <motion.p
            variants={itemVariants}
            className="about-eyebrow"
          >
            <Globe2 size={15} />
            About GenWeb Technologies
          </motion.p>

          <motion.h2 variants={itemVariants}>
            We craft digital experiences that make businesses{' '}
            <span>impossible to ignore.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="about-description"
          >
            At <strong>GenWeb Technologies</strong>, we combine strategy,
            creativity, and cutting-edge development to build websites that
            don't just look beautiful—they generate trust, engagement, and
            measurable business growth. Every interaction is designed with
            precision to deliver a premium experience for your audience.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="feature-grid"
          >
            {features.map(({ title, desc, icon: Icon }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="feature-card"
                whileHover={{
                  y: -8,
                  scale: 1.015,
                }}
              >

                <div className="feature-icon">
                  <Icon size={21} />
                </div>

                <div className="feature-content">
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>

                <div className="feature-arrow">
                  <ArrowRight size={16} />
                </div>

              </motion.div>
            ))}
          </motion.div>

          <motion.a
            variants={itemVariants}
            href="#contact"
            className="about-btn"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Let's Build Something Great</span>
            <ArrowRight size={18} />
          </motion.a>

        </motion.div>

      </div>
    </section>
  )
}

export default About