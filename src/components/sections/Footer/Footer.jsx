import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

import {
  FaInstagram,
  FaLinkedinIn,
  FaBehance,
  FaDribbble,
  FaXTwitter,
  FaWhatsapp,
} from 'react-icons/fa6'

import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-glow"></div>

      {/* ========================= */}
      {/* TOP CTA */}
      {/* ========================= */}

      <motion.div
        className="footer-hero"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >

        <p>Let's build something unforgettable.</p>

        <h2>
          Ready to Grow
          <span> Your Business?</span>
        </h2>

        <a
          href="https://wa.me/918258892262?text=Hello%20GenWeb%20Technologies!%20I%20am%20ready%20to%20grow%20my%20business%20and%20would%20like%20to%20start%20a%20project%20with%20you."
          target="_blank"
          rel="noopener noreferrer"
          className="footer-cta"
          aria-label="Start your project with GenWeb Technologies on WhatsApp"
        >
          Start Your Project
          <ArrowUpRight size={18} />
        </a>

      </motion.div>

      {/* ========================= */}
      {/* MAIN */}
      {/* ========================= */}

      <div className="footer-main">

        {/* Brand */}

        <div className="footer-brand">

          <img
            src="/WhatsApp Image 2026-07-05 at 12.31.20.jpeg"
            alt="GenWeb Technologies"
            className="footer-logo"
          />

          <h3>GenWeb Technologies</h3>

          <p>
            We build premium websites, e-commerce
            platforms, branding systems and digital
            experiences for ambitious businesses.
          </p>

        </div>

        {/* Links */}

        <div className="footer-column">

          <h4>Company</h4>

          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>

        </div>

        {/* Services */}

        <div className="footer-column">

          <h4>Services</h4>

          <a>Website Development</a>
          <a>E-Commerce</a>
          <a>UI / UX Design</a>
          <a>Brand Identity</a>
          <a>Digital Marketing</a>

        </div>

        {/* Contact */}

        <div className="footer-column">

          <h4>Contact</h4>

          <a href="mailto:gebwebdeveloper@gmail.com" title="Send email to GenWeb Technologies">
            <Mail size={16} />
            gebwebdeveloper@gmail.com
          </a>

          <a href="tel:+918258892262" title="Call GenWeb Technologies">
            <Phone size={16} />
            +91 82588 92262
          </a>

          <a>
            <MapPin size={16} />
            Agartala, India
          </a>

          <div className="footer-social">

            <a
              href="https://wa.me/918258892262?text=Hello%20GenWeb%20Technologies%2C%20I%20would%20like%20to%20inquire%20about%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              style={{ color: '#25d366' }}
            >
              <FaWhatsapp size={16} />
            </a>

            <a><FaInstagram /></a>

            <a><FaLinkedinIn /></a>

            <a><FaBehance /></a>

            <a><FaDribbble /></a>

            <a><FaXTwitter /></a>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* NEWSLETTER */}
      {/* ========================= */}

      <div className="newsletter">

        <div>

          <h4>Stay Updated</h4>

          <p>
            Get occasional design insights,
            updates and new case studies.
          </p>

        </div>

        <div className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button>

            Subscribe

          </button>

        </div>

      </div>

      {/* ========================= */}
      {/* BOTTOM */}
      {/* ========================= */}

      <div className="footer-bottom">

        <p>
          © 2026 GenWeb Technologies.
          All Rights Reserved.
        </p>

        <button
          className="back-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >

          Back to Top ↑

        </button>

      </div>

      <div className="footer-watermark">

        GENWEB

      </div>

    </footer>
  )
}

export default Footer