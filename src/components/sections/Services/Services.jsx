import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  ArrowRight,
  Globe,
  Rocket,
  Building2,
  UserSquare2,
  Newspaper,
  ShoppingBag,
} from 'lucide-react'

import { services } from '../../../data/content'
import './Services.css'

const icons = {
  Globe,
  Rocket,
  Building2,
  UserSquare2,
  Newspaper,
  ShoppingBag,
}

function Services() {
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
      id="services"
      className="services-section"
      onMouseEnter={playVideo}
      onViewportEnter={playVideo}
    >
      <div className="services-bg-video-container">
        <video
          ref={videoRef}
          src="/3D_house_surrounded_by_greenery_202607091415.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="services-bg-video"
        />
        <div className="services-bg-overlay" />
      </div>

      <div className="section-shell services-content">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">
            Website Packages
          </p>

          <h2>
            Six focused builds, each shaped for a different stage of growth.
          </h2>
        </div>

        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = icons[service.icon]
            const whatsappUrl = `https://wa.me/918258892262?text=${encodeURIComponent(
              `Hello GenWeb Technologies! I would like to inquire about the "${service.title}" package (${service.price}). Please let me know how to get started.`
            )}`

            return (
              <motion.article
                key={service.title}
                className={`service-card ${
                  service.featured ? 'featured-card' : ''
                }`}
                custom={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.45,
                  delay: (index % 3) * 0.07,
                  ease: 'easeOut',
                }}
                whileHover={{
                  y: -14,
                  scale: 1.02,
                  rotateX: 2,
                  rotateY: 2,
                }}
              >
                {service.featured && (
                  <div className="popular-badge">
                    ★ MOST POPULAR
                  </div>
                )}

                <div className="service-number">
                  {service.number}
                </div>

                <div className="service-icon">
                  <Icon size={34} />
                </div>

                <h3>{service.title}</h3>

                <p className="service-ideal">
                  {service.ideal}
                </p>

                <ul className="service-features">
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-footer">

                  <div className="delivery">
                    <span>Delivery</span>
                    <strong>{service.delivery}</strong>
                  </div>

                  <div className="price-box">
                    <small>Starting From</small>
                    <div className="price">
                      {service.price}
                    </div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-btn"
                    aria-label={`Inquire about ${service.title} on WhatsApp`}
                  >
                    Get Started
                    <ArrowRight size={18} />
                  </a>

                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

export default Services