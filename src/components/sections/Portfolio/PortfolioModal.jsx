import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react'
import './PortfolioModal.css'

function PortfolioModal({ project, onClose }) {
  // Prevent background scroll and pause Lenis while modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      window.lenis?.stop()
    } else {
      document.body.style.overflow = ''
      window.lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      window.lenis?.start()
    }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="portfolio-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
        >
          <motion.div
            className="portfolio-modal-container"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            style={{ '--accent': project.color }}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
          >
            {/* Close Button */}
            <button
              className="modal-close-btn"
              type="button"
              onClick={onClose}
              aria-label="Close project modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header Bar */}
            <div className="modal-header">
              <div className="modal-meta-row">
                <span className="modal-category-badge">{project.type}</span>
                {project.client && (
                  <span className="modal-client-tag">
                    Client: <strong>{project.client}</strong>
                  </span>
                )}
                <span className="modal-status-pill">
                  <span className="live-dot" /> Live Production
                </span>
              </div>
              <h2 className="modal-title">{project.title}</h2>
              <p className="modal-subtitle">{project.subtitle}</p>
            </div>

            <div
              className="modal-body-scroll"
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Browser Preview Showcase */}
              <div className="modal-preview-frame">
                <div className="modal-browser-bar">
                  <div className="browser-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <div className="browser-url-display">
                    {project.liveUrl}
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-open-tab-btn"
                  >
                    Open Live <ExternalLink size={13} />
                  </a>
                </div>
                <div className="modal-image-wrapper">
                  <img
                    src={project.image}
                    alt={`${project.title} Full Screenshot`}
                    className="modal-screenshot"
                  />
                </div>
              </div>

              {/* Two Column Details */}
              <div className="modal-details-grid">
                {/* Left Column: Narrative & Key Features */}
                <div className="modal-main-info">
                  <div className="modal-section-block">
                    <h3>Project Overview</h3>
                    <p className="modal-description">{project.description}</p>
                  </div>

                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <div className="modal-section-block">
                      <h4>Key Architectural Highlights</h4>
                      <ul className="modal-features-list">
                        {project.keyFeatures.map((feat, i) => (
                          <li key={i}>
                            <CheckCircle2 size={17} className="feature-check-icon" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Column: Tech Stack & Metrics */}
                <div className="modal-sidebar-info">
                  {project.metric && (
                    <div className="modal-stat-card">
                      <span className="stat-label">Measured Impact</span>
                      <strong className="stat-value">{project.metric}</strong>
                    </div>
                  )}

                  <div className="modal-tech-box">
                    <h4>Tech Stack & Architecture</h4>
                    <div className="modal-tech-chips">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="modal-tech-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions-box">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-cta-primary"
                    >
                      Visit Live Platform <ExternalLink size={16} />
                    </a>
                    <a
                      href="#contact"
                      className="modal-cta-secondary"
                      onClick={onClose}
                    >
                      Build Similar Solution <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PortfolioModal
