import { useRef, useEffect } from "react"

/**
 * A reusable 3D animated card container component based on Uiverse 3D UI.
 * Uses direct DOM manipulation + rAF for buttery-smooth tracking.
 */
const Animated3DCard = ({
  children,
  className = "",
  containerClassName = "",
  onClick,
  style,
  ...props
}) => {
  const cardRef = useRef(null)
  const rafId = useRef(null)

  const handleMouseMove = (e) => {
    if (rafId.current) cancelAnimationFrame(rafId.current)

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return
      const relX = (x / rect.width) * 2 - 1
      const relY = (y / rect.height) * 2 - 1
      const rotateX = -relY * 10
      const rotateY = relX * 10
      cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    })
  }

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)"
    }
  }

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      className={`group [perspective:1000px] w-full ${
        onClick ? "cursor-pointer" : ""
      } ${containerClassName}`}
      onClick={onClick}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        ref={cardRef}
        className={`h-full w-full [transform-style:preserve-3d] [transition:transform_100ms_ease-out,box-shadow_500ms_ease-in-out] shadow-[rgba(0,0,0,0)_40px_50px_25px_-40px,rgba(0,0,0,0.2)_0px_25px_25px_-5px] group-hover:shadow-[rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px] ${className}`}
      >
        {children}
      </div>
    </div>
  )
}

export default Animated3DCard
