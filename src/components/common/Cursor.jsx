import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Cursor.css'

function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const dotNode = dot.current
    const ringNode = ring.current
    if (!dotNode || !ringNode) return undefined

    const moveDot = gsap.quickTo(dotNode, 'x', { duration: 0.12, ease: 'power3.out' })
    const moveDotY = gsap.quickTo(dotNode, 'y', { duration: 0.12, ease: 'power3.out' })
    const moveRing = gsap.quickTo(ringNode, 'x', { duration: 0.45, ease: 'power3.out' })
    const moveRingY = gsap.quickTo(ringNode, 'y', { duration: 0.45, ease: 'power3.out' })

    const handleMove = (event) => {
      moveDot(event.clientX)
      moveDotY(event.clientY)
      moveRing(event.clientX)
      moveRingY(event.clientY)
    }
    const handleOver = (event) => {
      if (event.target.closest('a, button, [data-cursor]')) document.body.classList.add('cursor-active')
    }
    const handleOut = (event) => {
      if (event.target.closest('a, button, [data-cursor]')) document.body.classList.remove('cursor-active')
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [])

  return (
    <>
      <span ref={dot} className="cursor-dot" />
      <span ref={ring} className="cursor-ring" />
    </>
  )
}

export default Cursor
