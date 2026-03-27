import React from "react"

const EmptyState = ({ message = "No items found", className = "p-10" }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="text-[#7A7574] text-base">{message}</div>
    </div>
  )
}

export default EmptyState
