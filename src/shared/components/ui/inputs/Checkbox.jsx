import React from "react"

const Checkbox = ({ checked, onChange, id, className = "" }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className={`h-4 w-4 cursor-pointer rounded border-gray-300 text-[#B91264] accent-[#B91264] focus:ring-[#B91264] ${className}`}
    />
  )
}

export default Checkbox
