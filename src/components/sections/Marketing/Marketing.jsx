import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  MousePointer2,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import './Marketing.css'

const cards = [
  {
    icon: BarChart3,
    value: '+126%',
    label: 'Reach Growth',
    className: 'large reach-card',
  },
  {
    icon: FaInstagram,
    value: '42K',
    label: 'Instagram Engagement',
    className: 'top-right',
  },
  {
    icon: FaLinkedinIn,
    value: '18',
    label: 'Qualified B2B Leads',
    className: 'bottom-right',
  },
  {
    icon: MousePointer2,
    value: '7.8%',
    label: 'Average CTR',
    className: 'bottom-left',
  },
]

function Marketing() {
  const videoRef = useRef(null)

  const playVideo = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {})
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    video.addEventListener('canplay', playVideo)
    playVideo()

    return () => video.removeEventListener('canplay', playVideo)
  }, [])

  return (
    <motion.section
      className="marketing-section"
      onMouseEnter={playVideo}
      onViewportEnter={playVideo}
    >
      <div className="marketing-bg-video-container">
        <video
          ref={videoRef}
          src="/Animated_marketing_video_Genweb_…_202607091431.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="marketing-bg-video"
        />
        <div className="marketing-bg-overlay" />
      </div>

      <div className="section-shell marketing-content">

      <motion.div
        className="section-copy"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .7 }}
      >

        <p className="eyebrow">
          <Target size={15} />
          Social Media Marketing
        </p>

        <h2>
          Turn Scrolls Into
          <span> Customers.</span>
        </h2>

        <p>
          We don't just post content—we build campaigns that increase
          visibility, generate qualified leads, and grow your brand across
          Instagram, Facebook, LinkedIn and Google.
        </p>

        <div className="marketing-features">

          <div>
            <TrendingUp size={18} />
            Organic Growth Strategy
          </div>

          <div>
            <Users size={18} />
            Audience Targeting
          </div>

          <div>
            <BarChart3 size={18} />
            Monthly Analytics
          </div>

        </div>

        <a
          href="https://wa.me/918258892262?text=Hello%20GenWeb%20Technologies!%20I%20would%20like%20to%20inquire%20about%20growing%20my%20brand%20with%20your%20Digital%20Marketing%20%26%20Campaign%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="marketing-btn"
          aria-label="Inquire about brand growth and digital marketing on WhatsApp"
        >
          Grow My Brand
          <ArrowRight size={18} />
        </a>

      </motion.div>

      <motion.div
        className="analytics-cloud"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
      >

        <div className="dashboard-glow"></div>

        {cards.map((card, index) => {

          const Icon = card.icon

          return (

            <motion.div
              key={card.label}
              className={`analytics-card ${card.className || ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * .15,
                duration: .5,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
            >

              <div className="metric-icon">
                <Icon size={22} />
              </div>

              <strong>{card.value}</strong>

              <span>{card.label}</span>

            </motion.div>

          )

        })}

        <motion.div
          className="summary-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: .6 }}
        >

          <small>Campaign Performance</small>

          <h3>94%</h3>

          <p>Average client satisfaction after 90 days.</p>

        </motion.div>

      </motion.div>

      </div>
    </motion.section>
  )
}

export default Marketing
