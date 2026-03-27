import React, { useState } from "react"
import { Globe, Link, Users } from "lucide-react"
import HeaderDropdown from "./HeaderDropdown"

const OPTIONS = [
  {
    shortLabel: "Công khai",
    label: "Công khai",
    icon: <Globe size={16} />,
  },
  {
    shortLabel: "Link",
    label: "Chỉ những người có link",
    icon: <Link size={16} />,
  },
  {
    shortLabel: "Follower",
    label: "Chỉ người theo dõi",
    icon: <Users size={16} />,
  },
]

const VisibilityDropdown = ({ value, onChange, color = "#B91264" }) => {
  const [selected, setSelected] = useState(value || OPTIONS[0].label)

  const handleSelect = (opt, close) => {
    setSelected(opt.label)
    if (onChange) onChange(opt.label)
    close()
  }

  const selectedOpt = OPTIONS.find((o) => o.label === selected) || OPTIONS[0]

  // Extract the icon component but set size to 14 for the trigger
  const triggerIcon = React.cloneElement(selectedOpt.icon, { size: 14 })

  return (
    <HeaderDropdown triggerIcon={triggerIcon} label={selectedOpt.shortLabel}>
      {(close) => (
        <div className="flex flex-col py-1">
          {OPTIONS.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => handleSelect(opt, close)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors w-full text-left whitespace-nowrap ${
                selected === opt.label
                  ? "bg-red-50/50 font-semibold"
                  : "text-gray-700 font-medium"
              }`}
              style={selected === opt.label ? { color } : {}}
            >
              <div
                className="shrink-0"
                style={
                  selected === opt.label ? { color } : { color: "#6B7280" }
                }
              >
                {opt.icon}
              </div>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </HeaderDropdown>
  )
}

export default VisibilityDropdown
