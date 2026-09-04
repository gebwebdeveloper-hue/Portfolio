import { motion } from 'framer-motion'
import {
  ArrowRight,
  Code2,
  Compass,
  PenTool,
  Search,
  Rocket,
  ShieldCheck,
  LifeBuoy,
} from 'lucide-react'
import './Process.css'

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We understand your business, audience, goals and competitors.',
    icon: Search,
    duration: '1 Day',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'Planning the structure, content flow and conversion strategy.',
    icon: Compass,
    duration: '1-2 Days',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Creating premium UI/UX that reflects your brand identity.',
    icon: PenTool,
    duration: '2-4 Days',
  },
  {
    number: '04',
    title: 'Development',
    description:
      'Building a fast, responsive and scalable website.',
    icon: Code2,
    duration: '3-7 Days',
  },
  {
    number: '05',
    title: 'Testing',
    description:
      'Performance optimization, SEO checks and bug fixing.',
    icon: ShieldCheck,
    duration: '1 Day',
  },
  {
    number: '06',
    title: 'Launch & Support',
    description:
      'Deployment, analytics setup and ongoing support.',
    icon: Rocket,
    duration: 'Lifetime',
  },
]

function Process() {
  return (
    <section
      id="process"
      className="process-section section-shell"
    >
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="eyebrow">
          <Code2 size={15} />
          Our Process
        </p>

        <h2>
          From Idea To
          <br />
          <span>Successful Launch.</span>
        </h2>

        <p className="section-description">
          Every project follows a proven workflow that keeps you
          involved at every stage while ensuring timely delivery
          and premium quality.
        </p>
      </motion.div>

      <div className="timeline-line"></div>

      <div className="process-grid">
        {processSteps.map((step, index) => {
          const Icon = step.icon

          return (
            <motion.article
              key={step.number}
              className="process-card"
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
              }}
              whileHover={{
                y: -10,
              }}
            >
              <div className="step-number">
                {step.number}
              </div>

              <div className="step-icon">
                <Icon size={26} />
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

              <div className="step-footer">

                <span>{step.duration}</span>

                <ArrowRight
                  size={18}
                  className="step-arrow"
                />

              </div>
            </motion.article>
          )
        })}
      </div>

      <motion.div
        className="support-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: .5 }}
      >

        <LifeBuoy size={28} />

        <div>

          <h3>Dedicated Project Support</h3>

          <p>
            You'll receive updates throughout the project and
            direct communication even after launch.
          </p>

        </div>

      </motion.div>
    </section>
  )
}

export default Process