import { useState } from 'react'
import { Globe2, Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import './Contact.css'

const RAW_API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const API_BASE_URL = RAW_API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '')

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Premium Business Website',
    brief: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    if (!formData.name.trim() || !formData.email.trim() || !formData.brief.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Project Brief).')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit inquiry. Please try again.')
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        service: 'Premium Business Website',
        brief: '',
      })
    } catch (err) {
      console.error('Contact form submission error:', err)
      setErrorMessage(
        err.message || 'Something went wrong connecting to our server. Please try again later.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg-container">
        <img
          src="/ChatGPT Image Sep 4, 2026, 09_06_44 PM.png"
          alt="GenWeb Contact Background"
          className="contact-bg-image"
          loading="lazy"
        />
        <div className="contact-bg-overlay" />
      </div>

      <div className="contact-wrapper section-shell">
        <div className="world-map" data-reveal>
          <Globe2 />
          <span />
          <span />
          <span />
        </div>

        <form className="contact-form" data-reveal onSubmit={handleSubmit}>
        <p className="eyebrow">
          <Mail size={15} /> Start a project
        </p>
        <h2>Tell us what you are building.</h2>

        {submitted ? (
          <div className="contact-success-box">
            <CheckCircle size={36} className="success-icon" />
            <h3>Inquiry Received!</h3>
            <p>
              Thank you for reaching out to GenWeb Technologies. Our solutions team has received
              your brief and will get back to you within 24 hours.
            </p>
            <button
              type="button"
              className="submit-another-btn"
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </button>
          </div>
        ) : (
          <>
            {errorMessage && (
              <div className="contact-error-box">
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            <label>
              Name *
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name or company"
                required
              />
            </label>

            <label>
              Email *
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
              />
            </label>

            <label>
              Service
              <select name="service" value={formData.service} onChange={handleChange}>
                <option value="Premium Business Website">Premium Business Website</option>
                <option value="E-Commerce Website">E-Commerce Website</option>
                <option value="Branding and UI/UX">Branding and UI/UX</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Custom Web Application">Custom Web Application</option>
              </select>
            </label>

            <label>
              Project brief *
              <textarea
                name="brief"
                value={formData.brief}
                onChange={handleChange}
                placeholder="A few lines about your goals, timeline, and requirements"
                required
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? (
                <>
                  Sending... <Loader2 size={17} className="btn-spinner" />
                </>
              ) : (
                <>
                  Send inquiry <Send size={17} />
                </>
              )}
            </button>
          </>
        )}
      </form>
      </div>
    </section>
  )
}

export default Contact

