import { motion, useScroll } from 'motion/react'

const MotionDiv = motion.div

export function ScrollProgress({ className = '', ...props }) {
  const { scrollYProgress } = useScroll()

  return (
    <MotionDiv
      className={`scroll-progress fixed inset-x-0 top-0 h-[2px] origin-left ${className}`}
      style={{ scaleX: scrollYProgress, zIndex: 99999 }}
      {...props}
    />
  )
}
