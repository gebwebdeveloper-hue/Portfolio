import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Headphones,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from 'lucide-react'
import './WhyChooseUs.css'

const strengths = [
  {
    number: '01',
    title: 'Experienced Team',
    description:
      'Designers and developers with years of experience building premium digital products.',
    icon: Users,
  },
  {
    number: '02',
    title: 'Affordable Pricing',
    description:
      'Transparent pricing with no hidden costs, delivering maximum value for every budget.',
    icon: BadgeCheck,
  },
  {
    number: '03',
    title: 'Premium Quality',
    description:
      'Every project is carefully crafted with modern UI, animations, and attention to detail.',
    icon: Star,
  },
  {
    number: '04',
    title: 'On-Time Delivery',
    description:
      'Clear milestones and reliable delivery so your business launches without delays.',
    icon: Clock3,
  },
  {
    number: '05',
    title: 'Client Satisfaction',
    description:
      'Long-term relationships built on trust, communication, and measurable results.',
    icon: Zap,
  },
  {
    number: '06',
    title: 'Lifetime Support',
    description:
      "We're available even after launch for updates, improvements, and technical support.",
    icon: Headphones,
  },
]

function WhyChooseUs() {
  return (
    <section className="why-section section-shell">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">
          <ShieldCheck size={15} />
          Why Choose GenWeb
        </p>

        <h2>
          We Build Digital Experiences
          <br />
          <span>That Actually Grow Businesses.</span>
        </h2>

        <p className="section-description">
          Beautiful websites are only half the story. We combine strategy,
          branding, performance, and development to help businesses generate
          more trust, more leads, and more sales.
        </p>
      </motion.div>

      <div className="strength-grid">
        {strengths.map((item, index) => {
          const Icon = item.icon

          return (
            <motion.article
              key={item.title}
              className="strength-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
              }}
            >
              <div className="strength-number">
                {item.number}
              </div>

              <div className="strength-top">
                <div className="strength-icon">
                  <Icon size={28} />
                </div>

                <ArrowRight
                  size={18}
                  className="arrow"
                />
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </motion.article>
          )
        })}
      </div>

      <motion.div
        className="why-bottom"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.3,
        }}
      >
        <h3>
          Ready to build something exceptional?
        </h3>

        <button className="why-btn">
          Let's Work Together
          <ArrowRight size={18} />
        </button>
      </motion.div>
    </section>
  )
}

export default WhyChooseUs