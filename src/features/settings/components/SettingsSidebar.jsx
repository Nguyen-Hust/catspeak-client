import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  FiUser,
  FiFileText,
  FiSettings,
  FiBookOpen,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi"

const menuItems = [
  { key: "profile", label: "Profile", icon: FiUser, path: "/app/profile" },
  {
    key: "apply-tutor",
    label: "Apply for tutor",
    icon: FiFileText,
    path: "/app/apply-tutor",
  },
  { key: "setting", label: "Setting", icon: FiSettings, path: "/app/setting" },
  {
    key: "your-class",
    label: "Your class",
    icon: FiBookOpen,
    path: "/app/your-class",
    subItems: [
      { key: "hsk2-2", label: "HSK2 (2,4,6)", path: "/app/your-class/hsk2-2" },
      { key: "hsk2-4", label: "HSK2 (2,4,6)", path: "/app/your-class/hsk2-4" },
      { key: "hsk2-6", label: "HSK2 (2,4,6)", path: "/app/your-class/hsk2-6" },
      { key: "seminar", label: "Seminar", path: "/app/your-class/seminar" },
    ],
  },
]

const SettingsSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState(["your-class"])

  const toggleExpand = (key) => {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    )
  }

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/")

  return (
    <aside className="w-64 rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const hasSubItems = item.subItems && item.subItems.length > 0
            const isExpanded = expandedItems.includes(item.key)
            const itemActive = isActive(item.path)

            return (
              <div key={item.key}>
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      toggleExpand(item.key)
                    } else {
                      navigate(item.path)
                    }
                  }}
                  className={[
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition",
                    itemActive && !hasSubItems
                      ? "bg-[#990011] text-white"
                      : "text-gray-700 hover:bg-gray-100",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {hasSubItems && (
                    <span>
                      {isExpanded ? (
                        <FiChevronDown className="h-4 w-4" />
                      ) : (
                        <FiChevronRight className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </button>

                {hasSubItems && isExpanded && (
                  <div className="mt-1 ml-4 space-y-1">
                    {item.subItems.map((subItem) => {
                      const subActive = isActive(subItem.path)
                      return (
                        <button
                          key={subItem.key}
                          onClick={() => navigate(subItem.path)}
                          className={[
                            "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition",
                            subActive
                              ? "bg-[#990011]/10 text-[#990011] font-semibold"
                              : "text-gray-600 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          <span className="ml-2">{subItem.label}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default SettingsSidebar
