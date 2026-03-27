import React, { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import FluentAnimation from "@/shared/components/ui/animations/FluentAnimation"
import { colors } from "@/shared/utils/colors"

const OPTIONS = [
  "Không lặp lại",
  "Hàng ngày",
  "Hàng tuần",
  "Hàng tháng",
  "Hàng năm",
  "Tùy chỉnh...",
]

const RecurrenceDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(value || OPTIONS[0])
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (option) => {
    setSelected(option)
    if (onChange) onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border rounded-md px-4 h-[48px] text-base shadow-sm w-full bg-white hover:bg-gray-50 transition-colors"
        style={{ borderColor: colors.border, color: colors.textGray }}
      >
        <span>{selected}</span>
        <ChevronDown
          size={14}
          style={{ color: colors.textGray }}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <FluentAnimation
            key="recurrence-dropdown"
            direction="down"
            exit={true}
            className="absolute top-full left-0 right-0 mt-1 z-50 origin-top"
          >
            <div className="bg-white border border-gray-100 rounded-md shadow-lg py-1 max-h-[250px] overflow-y-auto">
              {OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    selected === option
                      ? "bg-red-50/50 text-gray-900 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </FluentAnimation>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RecurrenceDropdown
