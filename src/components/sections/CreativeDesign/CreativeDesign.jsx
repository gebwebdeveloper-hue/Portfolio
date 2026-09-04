import { motion } from 'framer-motion'
import {
  ArrowRight,
  Brush,
  Layers3,
  Palette,
  PenTool,
  Sparkles,
  CircleDot,
} from 'lucide-react'
import { creativeItems } from '../../../data/content'
import './CreativeDesign.css'

const floatingCards = [
  {
    title: 'Brand Identity',
    description: 'Logos, strategy & visual language',
    icon: Palette,
    className: 'card-1',
    rotate: -3,
  },
  {
    title: 'UI Systems',
    description: 'Interfaces built to feel effortless',
    icon: Layers3,
    className: 'card-2',
    rotate: 4,
  },
  {
    title: 'Creative Assets',
    description: 'Visuals designed to stand out',
    icon: PenTool,
    className: 'card-3',
    rotate: -2,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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
      ease: 'easeOut',
    },
  },
}

function CreativeDesign() {
  const items = [...creativeItems, ...creativeItems]

  return (
    <section className="creative-section">

      {/* Background Effects */}
      <div className="creative-bg">
        <div className="creative-grid-pattern" />
        <div className="creative-orb orb-1" />
        <div className="creative-orb orb-2" />
        <div className="creative-orb orb-3" />
        <div className="creative-light-beam beam-1" />
        <div className="creative-light-beam beam-2" />
      </div>

      {/* Decorative Elements */}
      <div className="creative-decoration decoration-1">
        <CircleDot size={42} />
      </div>

      <div className="creative-decoration decoration-2">
        ✦
      </div>

      <div className="creative-decoration decoration-3">
        +
      </div>

      <div className="section-shell creative-grid">

        {/* LEFT CONTENT */}
        <motion.div
          className="creative-copy"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >

          <motion.p
            className="eyebrow creative-eyebrow"
            variants={itemVariants}
          >
            <span className="eyebrow-icon">
              <Brush size={15} />
            </span>
            Creative Design Services
          </motion.p>

          <motion.h2 variants={itemVariants}>
            Design That
            <span> People Remember.</span>
          </motion.h2>

          <motion.p
            className="creative-description"
            variants={itemVariants}
          >
            From logos and complete brand identities to social media
            creatives, marketing materials, presentations and UI systems,
            we create visuals that make businesses instantly recognizable.
          </motion.p>

          <motion.div
            className="creative-highlights"
            variants={containerVariants}
          >

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 10 }}
            >
              <span className="highlight-icon">
                <Sparkles size={18} />
              </span>
              <span>Brand Identity</span>
              <ArrowRight size={16} className="highlight-arrow" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 10 }}
            >
              <span className="highlight-icon">
                <Layers3 size={18} />
              </span>
              <span>UI / UX Systems</span>
              <ArrowRight size={16} className="highlight-arrow" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 10 }}
            >
              <span className="highlight-icon">
                <Palette size={18} />
              </span>
              <span>Marketing Graphics</span>
              <ArrowRight size={16} className="highlight-arrow" />
            </motion.div>

          </motion.div>

          <motion.a
            href="#portfolio"
            className="creative-btn"
            variants={itemVariants}
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            whileTap={{ scale: 0.97 }}
          >
            <span>View Design Portfolio</span>
            <ArrowRight size={19} />
          </motion.a>

        </motion.div>


        {/* RIGHT CREATIVE WALL */}
        <motion.div
          className="creative-wall"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <div className="wall-glow" />
          <div className="wall-ring ring-1" />
          <div className="wall-ring ring-2" />

          <div className="wall-center-piece">
            <div className="center-logo">
              <Sparkles size={34} />
            </div>

            <span>CREATIVE</span>
            <strong>STUDIO</strong>
          </div>


          {floatingCards.map((card, i) => {

            const Icon = card.icon

            return (

              <motion.div
                key={card.title}
                className={`wall-card ${card.className}`}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.18,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.04,
                  rotate: 0,
                }}
              >

                <div className="card-shine" />

                <div className="wall-card-top">

                  <div className="wall-icon">
                    <Icon size={26} />
                  </div>

                  <span className="card-number">
                    0{i + 1}
                  </span>

                </div>

                <h3>{card.title}</h3>

                <p>{card.description}</p>

                <div className="card-progress">
                  <span />
                </div>

              </motion.div>

            )
          })}

        </motion.div>

      </div>


      {/* MARQUEE */}

      <div className="creative-marquee">

        <div className="marquee-fade left-fade" />
        <div className="marquee-fade right-fade" />

        <div className="marquee-track">

          {items.map((item, index) => (

            <span key={`${item}-${index}`}>
              <i>✦</i>
              {item}
            </span>

          ))}

        </div>

      </div>

    </section>
  )
}

export default CreativeDesign