import React from "react"
import { useLanguage } from "@/shared/context/LanguageContext"
import { useUrlFilter } from "../../hooks/useUrlFilter"
import { TOPICS } from "../../config/constants"

import Collapsible from "@/shared/components/ui/Collapsible"

const TopicFilter = () => {
  const { t } = useLanguage()
  const { toggleValue, isSelected } = useUrlFilter("topics")

  return (
    <div className="w-full">
      <Collapsible 
        title={t.rooms.filters.topicsHeading}
        maxHeight="200px"
        scrollable
      >
        <div className="flex flex-col">
          {TOPICS.map((topic) => {
            const isChecked = isSelected(topic)

            return (
              <label
                key={topic}
                className={`h-10 flex items-center gap-3 cursor-pointer rounded-md px-4 transition-colors ${
                  isChecked
                    ? "bg-[#F2F2F2] hover:bg-[#E5E5E5]"
                    : "hover:bg-[#F2F2F2]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => toggleValue(topic, e.target.checked)}
                  className="w-4 h-4 text-[#990011] bg-white accent-[#990011] cursor-pointer"
                />
                <span className="text-sm">
                  {t.rooms.createRoom?.topics?.[topic.toLowerCase()] || topic}
                </span>
              </label>
            )
          })}
        </div>
      </Collapsible>
    </div>
  )
}

export default TopicFilter
