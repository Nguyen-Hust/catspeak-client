import React from "react"
import { FiArrowLeft } from "react-icons/fi"
import Avatar from "@/shared/components/ui/Avatar"
import { useLanguage } from "@/shared/context/LanguageContext"

const ConversationDetailHeader = ({ conversation, onBack, onClose }) => {
  const { t } = useLanguage()

  if (!conversation) return null

  const username =
    conversation?.friend?.username || t.messages.unknownUser
  const avatarSrc = conversation?.friend?.avatar || null

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <FiArrowLeft className="h-5 w-5" />
        <div className="flex items-center gap-2">
          <Avatar
            size={32}
            src={avatarSrc}
            name={username}
            alt={username}
          />
          <span className="font-semibold">{username}</span>
        </div>
      </button>
      <button
        onClick={onClose}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#990011] text-white shadow hover:scale-105"
        aria-label={t.messages.close}
      >
        ✕
      </button>
    </div>
  )
}

export default ConversationDetailHeader
