import { motion } from 'framer-motion'
import { Star, MessageSquareQuote, Quote, CheckCircle2 } from 'lucide-react'
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    name: 'Riya Mehta',
    role: 'Founder, CartNest',
    service: 'E-Commerce Platform',
    quote:
      'GenWeb translated our rough idea into a website that felt bigger than our company on launch day. The design was premium, but the process stayed practical, transparent, and remarkably fast.',
    rating: 5,
    highlight: '+140% Launch Conversions',
    initials: 'RM',
    avatarColor: 'linear-gradient(135deg, #ff8c00, #ff5f6d)',
  },
  {
    id: 2,
    name: 'Pritam Chakraborty',
    role: 'Founder, Lekhok Tripura',
    service: 'Full-Stack Publishing Platform',
    quote:
      'From role-based author dashboards to the in-browser reader and QR library cards, GenWeb delivered a rock-solid ecosystem. Their engineering standards and UI attention to detail are world-class.',
    rating: 5,
    highlight: '10K+ Readers & Authors',
    initials: 'PC',
    avatarColor: 'linear-gradient(135deg, #ff8c00, #ffb347)',
  },
  {
    id: 3,
    name: 'Arjun Rao',
    role: 'Marketing Lead, Nexora Labs',
    service: 'SaaS Landing Page & Branding',
    quote:
      'Their landing page gave our campaign a sharper story, cleaner funnel, and an unforgettable first impression. Our user acquisition jumped by 42% in the very first month.',
    rating: 5,
    highlight: '+42% Funnel Conversion',
    initials: 'AR',
    avatarColor: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
]

function Testimonials() {
  return (
    <section id="reviews" className="testimonial-section section-shell">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow">
          <MessageSquareQuote size={15} />
          Client Endorsements
        </p>

        <h2>
          Trusted by Founders & <br />
          <span className="testimonial-gradient-text">High-Growth Brands.</span>
        </h2>

        <p className="testimonial-lede">
          Don't just take our word for it. Here is how our design and engineering systems help ambitious
          businesses create authority, trust, and measurable growth.
        </p>
      </motion.div>

      <div className="testimonial-grid">
        {testimonials.map((t, index) => (
          <motion.div
            key={t.id}
            className="testimonial-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            whileHover={{ y: -8 }}
          >
            {/* Top Bar: Stars + Rating Badge + Quote Icon */}
            <div className="card-header-row">
              <div className="rating-cluster">
                <div className="stars-row">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={17}
                      fill="#ff8c00"
                      color="#ff8c00"
                      className="filled-star"
                    />
                  ))}
                </div>
                <span className="rating-badge">5.0</span>
              </div>
              <div className="quote-icon-bubble">
                <Quote size={20} />
              </div>
            </div>

            {/* Service & Highlight Chips */}
            <div className="testimonial-chips">
              <span className="service-chip">{t.service}</span>
              <span className="highlight-chip">{t.highlight}</span>
            </div>

            {/* Quote Body */}
            <p className="testimonial-quote">"{t.quote}"</p>

            {/* Bottom Author Section */}
            <div className="author-row">
              <div className="author-avatar" style={{ background: t.avatarColor }}>
                {t.initials}
              </div>
              <div className="author-meta">
                <strong className="author-name">{t.name}</strong>
                <span className="author-role">{t.role}</span>
              </div>
              <div className="verified-badge" title="Verified Client Project">
                <CheckCircle2 size={14} />
                <span>Verified</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials

