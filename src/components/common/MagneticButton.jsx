import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './MagneticButton.css'

function MagneticButton({ children, className = '', href = '#services' }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      gsap.to(node, { x: x * 0.18, y: y * 0.18, duration: 0.35, ease: 'power3.out' })
    }
    const handleLeave = () => gsap.to(node, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.45)' })

    node.addEventListener('mousemove', handleMove)
    node.addEventListener('mouseleave', handleLeave)
    return () => {
      node.removeEventListener('mousemove', handleMove)
      node.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <a ref={ref} className={`magnetic ${className}`} href={href} data-cursor="button">
      {children}
    </a>
  )
}

export default MagneticButton
