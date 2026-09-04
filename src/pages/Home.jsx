import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import SplitType from 'split-type'
import Cursor from '../components/common/Cursor'
import Header from '../components/layout/Header'
import Hero from '../components/sections/Hero/Hero'
import About from '../components/sections/About/About'
import Services from '../components/sections/Services/Services'
import Marketing from '../components/sections/Marketing/Marketing'
import CreativeDesign from '../components/sections/CreativeDesign/CreativeDesign'
import Portfolio from '../components/sections/Portfolio/Portfolio'
import WhyChooseUs from '../components/sections/WhyChooseUs/WhyChooseUs'
import Testimonials from '../components/sections/Testimonials/Testimonials'
import Process from '../components/sections/Process/Process'
import Contact from '../components/sections/Contact/Contact'
import Footer from '../components/sections/Footer/Footer'
import WhatsAppButton from '../components/common/WhatsAppButton'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

function Home() {
  const [activeProject, setActiveProject] = useState(null)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 })
    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const frame = requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitTargets = document.querySelectorAll('[data-split]')
      let splits = []
      if (splitTargets.length > 0) {
        splits = Array.from(splitTargets).map((target) => new SplitType(target, { types: 'words, chars' }))
        gsap.from('[data-split] .char', {
          opacity: 0,
          yPercent: 110,
          rotateX: -70,
          transformOrigin: '50% 50% -40px',
          stagger: 0.012,
          duration: 0.8,
          ease: 'power4.out',
        })
      }

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 70,
          filter: 'blur(16px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 82%' },
        })
      })

      gsap.to('.hero-copy', {
        y: -90,
        scale: 0.94,
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: '75% top', scrub: true },
      })
      gsap.to('.marquee-track', { xPercent: -50, repeat: -1, duration: 26, ease: 'none' })

      return () => splits.forEach((split) => split.revert())
    })

    return () => ctx.revert()
  }, [])

  return (
    <main>
      <Cursor />
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <Hero />
      <About />
      <Services />
      <Marketing />
      <CreativeDesign />
      <Portfolio activeProject={activeProject} setActiveProject={setActiveProject} />
      <WhyChooseUs />
      <Testimonials />
      <Process />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

export default Home
