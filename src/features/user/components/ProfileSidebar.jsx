import React from "react"
import { NavLink } from "react-router-dom"
import { useLanguage } from "@/shared/context/LanguageContext"
import { User, GraduationCap, Building2, Settings } from "lucide-react"

const ProfileSidebar = () => {
  const { t } = useLanguage()

  const menuItems = [
    {
      label: t.profile?.sidebar?.personalInfo,
      path: "/profile",
      end: true,
      icon: User,
    },
    {
      label: t.profile?.sidebar?.lecturer,
      path: "/lecturer",
      end: false,
      icon: GraduationCap,
    },
    {
      label: t.profile?.sidebar?.organization,
      path: "/organization",
      end: false,
      icon: Building2,
    },
    {
      label: t.profile?.sidebar?.setting,
      path: "/setting",
      end: false,
      icon: Settings,
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
            `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-100 text-red-900 hover:text-red-900"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          <item.icon size={20} />
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}

export default ProfileSidebar
