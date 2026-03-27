import React from "react"
import { motion } from "framer-motion"
import { fluentEaseOut } from "@/shared/utils/animations"

const AnimatedSection = ({
  children,
  className,
  direction = "right", // default: slide in from right
  distance = 30, // default offset for slide
  ...props
}) => {
  // Determine the initial offset based on direction
  const getInitial = () => {
    switch (direction) {
      case "left":
        return { x: -distance, opacity: 0 }
      case "right":
        return { x: distance, opacity: 0 }
      case "top":
        return { y: -distance, opacity: 0 }
      case "bottom":
        return { y: distance, opacity: 0 }
      default:
        return { x: distance, opacity: 0 }
    }
  }

  const slideVariants = {
    hidden: getInitial(),
    enter: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: fluentEaseOut },
    },
    exit: getInitial(), // slide back in the same direction on exit
  }

  return (
    <motion.div
      variants={slideVariants}
      initial="hidden"
      animate="enter"
      exit="exit"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection
