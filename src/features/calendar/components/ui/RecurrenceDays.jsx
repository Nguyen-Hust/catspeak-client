import React from "react"
import { colors } from "@/shared/utils/colors"

const DAYS = ["M", "T", "W", "T", "F", "S", "S"]

const RecurrenceDays = ({ eventColor = "#B91264", value = [], onChange }) => {
  const toggleDay = (index) => {
    if (!onChange) return

    if (value.includes(index)) {
      onChange(value.filter((i) => i !== index))
    } else {
      onChange([...value, index].sort((a, b) => a - b))
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-[6px]">
      {DAYS.map((day, i) => {
        const isSelected = value.includes(i)
        const style = isSelected
          ? {
              backgroundColor: eventColor,
              borderColor: eventColor,
              color: "white",
            }
          : {
              backgroundColor: "white",
              borderColor: colors.border,
              color: colors.textGray,
            }

        return (
          <button
            key={i}
            type="button"
            onClick={() => toggleDay(i)}
            className="w-[48px] h-[48px] rounded-full text-base font-bold flex items-center justify-center border transition-colors duration-300"
            style={style}
          >
            {day}
          </button>
        )
      })}
    </div>
  )
}

export default RecurrenceDays
