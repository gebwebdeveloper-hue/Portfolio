import { Star } from 'lucide-react'
import './Testimonials.css'

function Testimonials() {
  return (
    <section className="testimonial-section section-shell">
      <div className="testimonial-card" data-reveal>
        <div className="stars"><Star /><Star /><Star /><Star /><Star /></div>
        <p>GenWeb translated our rough idea into a website that felt bigger than our company on launch day. The design was premium, but the process stayed practical.</p>
        <div><strong>Riya Mehta</strong><span>Founder, CartNest</span></div>
      </div>
      <div className="testimonial-card offset" data-reveal>
        <div className="stars"><Star /><Star /><Star /><Star /><Star /></div>
        <p>Their landing page gave our campaign a sharper story, cleaner funnel, and a much stronger first impression.</p>
        <div><strong>Arjun Rao</strong><span>Marketing Lead, Nexora Labs</span></div>
      </div>
    </section>
  )
}

export default Testimonials
