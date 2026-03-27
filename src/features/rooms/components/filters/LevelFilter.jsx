import React from "react"
import { useParams } from "react-router-dom"
import { useLanguage } from "@/shared/context/LanguageContext"
import { useUrlFilter } from "../../hooks/useUrlFilter"
import { LEVELS } from "../../config/constants"

import Collapsible from "@/shared/components/ui/Collapsible"

const LevelFilter = () => {
  const { lang } = useParams()
  const { t } = useLanguage()
  const { toggleValue, isSelected } = useUrlFilter("requiredLevels")

  const langMap = {
    en: "English",
    zh: "Chinese",
    vi: "Vietnamese",
  }
  const currentLanguage = lang ? langMap[lang] : "English"
  const currentLevels = LEVELS[currentLanguage] || LEVELS.English

  return (
    <>
      <Collapsible 
        title={t.rooms.filters.levelsHeading}
        maxHeight="200px"
        scrollable
      >
        <div className="flex flex-col">
          {currentLevels.map((levelObj) => {
            const isChecked = isSelected(levelObj.value)

            return (
              <label
                key={levelObj.value}
                className={`h-10 flex items-center gap-3 cursor-pointer rounded-md px-4 transition-colors ${isChecked ? "bg-[#F2F2F2] hover:bg-[#E5E5E5]" : "hover:bg-[#F2F2F2]"}`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) =>
                    toggleValue(levelObj.value, e.target.checked)
                  }
                  className="w-4 h-4 text-[#990011] bg-white accent-[#990011] cursor-pointer"
                />
                <span className="text-sm">{levelObj.label}</span>
              </label>
            )
          })}
        </div>
      </Collapsible>
    </>
  )
}

export default LevelFilter
