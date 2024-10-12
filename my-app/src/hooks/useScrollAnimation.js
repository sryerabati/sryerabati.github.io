import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'

export function useScrollAnimation() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return [ref, controls]
}