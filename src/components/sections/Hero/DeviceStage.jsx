import { motion } from 'framer-motion'
import './DeviceStage.css'

function DeviceStage() {
  return (
    <div className="device-stage" aria-label="Floating website mockups" data-cursor="media">
      <div className="digital-globe">
        <span />
        <span />
        <span />
      </div>
      <div className="particle-field">
        {Array.from({ length: 18 }).map((_, index) => (
          <i key={index} style={{ '--i': index }} />
        ))}
      </div>
      <motion.div className="laptop mockup" animate={{ y: [0, -18, 0], rotateY: [-8, 8, -8] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="browser-bar"><span /><span /><span /></div>
        <div className="laptop-screen-video">
          <video
            src="/Tech_particles_forming_tech_mate…_202607091030.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </motion.div>
      <motion.div className="phone mockup" animate={{ y: [0, 14, 0], rotateZ: [4, -3, 4] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="phone-notch" />
        <div className="phone-card" />
        <div className="phone-lines"><span /><span /><span /></div>
      </motion.div>
      <div className="orbit-label top">SEO</div>
      <div className="orbit-label right">UI</div>
      <div className="orbit-label bottom">SMM</div>
    </div>
  )
}

export default DeviceStage
