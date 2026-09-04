import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gem, ExternalLink, ArrowUpRight } from 'lucide-react'
import { projects } from '../../../data/content'
import PortfolioModal from './PortfolioModal'
import './Portfolio.css'
import './PortfolioModal.css'

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'fullstack', label: 'Full-Stack Platforms' },
  { key: 'portfolio', label: 'Portfolios & CMS' },
  { key: 'b2b', label: 'B2B & Agency' },
]

function Portfolio({ activeProject, setActiveProject }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <>
      <section id="portfolio" className="portfolio-section section-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">
            <Gem size={15} /> Featured Case Studies
          </p>
          <h2>
            Proven Deployments. <br />
            <span className="portfolio-gradient-text">Real Business Impact.</span>
          </h2>
          <p className="portfolio-lede">
            Explore our recent client platforms, digital publishing ecosystems, high-converting creator hubs, and enterprise web applications.
          </p>
        </div>

        <div className="portfolio-filter-row" data-reveal>
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.key)}
            >
              {cat.label}
              <span className="filter-count">
                {cat.key === 'all'
                  ? projects.length
                  : projects.filter((p) => p.category === cat.key).length}
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="portfolio-grid">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || project.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
                className="portfolio-card"
                onClick={() => setActiveProject(project)}
                style={{ '--accent': project.color }}
              >
                {/* Browser Frame Preview */}
                <div className="card-browser-mockup">
                  <div className="browser-bar">
                    <div className="browser-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <div className="browser-url">
                      {project.liveUrl.replace('https://', '').replace(/\/$/, '')}
                    </div>
                    <span className="live-status">
                      <span className="live-dot" /> Live
                    </span>
                  </div>

                  <div className="mockup-screen">
                    <img
                      src={project.image}
                      alt={`${project.title} Preview`}
                      loading="lazy"
                      className="project-screenshot"
                    />
                    <div className="screen-overlay">
                      <span className="view-case-btn">
                        View Case Study <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="card-body">
                  <div className="card-top-meta">
                    <span className="card-type">{project.type}</span>
                    <span className="card-metric">{project.metric}</span>
                  </div>

                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-subtitle">{project.subtitle}</p>
                  <p className="card-summary">{project.summary}</p>

                  {/* Tech stack chips */}
                  <div className="card-tags">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="tech-tag more">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Footer */}
                  <div className="card-footer">
                    <button
                      type="button"
                      className="card-action-btn primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveProject(project)
                      }}
                    >
                      Case Study
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-action-btn secondary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live Site <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <PortfolioModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  )
}

export default Portfolio
