import React from "react"
import { motion } from "framer-motion"

/**
 * Fade Animation wrapper
 * - Simple fade in and fade out
 */
const FadeAnimation = ({
  children,
  animationKey,
  duration = 0.2,
  className,
}) => {
  return (
    <motion.div
      key={animationKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration,
        ease: "easeInOut",
      }}
      className={className || "w-full h-full"}
    >
      {children}
    </motion.div>
  )
}

export default FadeAnimation
