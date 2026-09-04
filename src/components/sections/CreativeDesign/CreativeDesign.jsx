import { motion } from 'framer-motion'
import {
  ArrowRight,
  Brush,
  Layers3,
  Palette,
  PenTool,
  Sparkles,
} from 'lucide-react'
import { creativeItems } from '../../../data/content'
import './CreativeDesign.css'

const floatingCards = [
  {
    title: 'Brand Identity',
    icon: Palette,
    className: 'card-1',
  },
  {
    title: 'UI Systems',
    icon: Layers3,
    className: 'card-2',
  },
  {
    title: 'Creative Assets',
    icon: PenTool,
    className: 'card-3',
  },
]

function CreativeDesign() {
  const items = [...creativeItems, ...creativeItems]

  return (
    <section className="creative-section">
      <div className="creative-ray" />

      <div className="section-shell creative-grid">

        <motion.div
          className="creative-copy"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
        >

          <p className="eyebrow">
            <Brush size={15} />
            Creative Design Services
          </p>

          <h2>
            Design That
            <span> People Remember.</span>
          </h2>

          <p>
            From logos and complete brand identities to social media
            creatives, marketing materials, presentations and UI systems,
            we create visuals that make businesses instantly recognizable.
          </p>

          <div className="creative-highlights">

            <div>
              <Sparkles size={18} />
              Brand Identity
            </div>

            <div>
              <Layers3 size={18} />
              UI / UX Systems
            </div>

            <div>
              <Palette size={18} />
              Marketing Graphics
            </div>

          </div>

          <button className="creative-btn">
            View Design Portfolio
            <ArrowRight size={18} />
          </button>

        </motion.div>

        <motion.div
          className="creative-wall"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >

          <div className="wall-glow"></div>

          {floatingCards.map((card, i) => {

            const Icon = card.icon

            return (

              <motion.div
                key={card.title}
                className={`wall-card ${card.className}`}
                whileHover={{
                  y: -10,
                  rotate: 0,
                  scale: 1.04,
                }}
                transition={{
                  delay: i * .15,
                }}
              >

                <div className="wall-icon">
                  <Icon size={28} />
                </div>

                <h3>{card.title}</h3>

                <span>Premium Creative Solution</span>

              </motion.div>

            )

          })}

        </motion.div>

      </div>

      <div className="marquee">

        <div className="marquee-track">

          {items.map((item, index) => (

            <span key={`${item}-${index}`}>
              ✦ {item}
            </span>

          ))}

        </div>

      </div>

    </section>
  )
}

export default CreativeDesign