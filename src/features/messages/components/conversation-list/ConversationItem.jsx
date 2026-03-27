import React from "react"
import { FiMoreVertical } from "react-icons/fi"
import Avatar from "@/shared/components/ui/Avatar"
import { useLanguage } from "@/shared/context/LanguageContext"

const ConversationItem = ({ conversation, onClick }) => {
  const { t } = useLanguage()
  const username =
    conversation?.friend?.username || t.components.messages.unknownUser
  const avatarSrc = conversation?.friend?.avatar || null

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl px-3 py-2 transition hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <Avatar size={36} src={avatarSrc} name={username} alt={username} />
        <div className="flex flex-col text-left">
          <span className="text-base font-semibold">{username}</span>
          <span className="text-sm text-[#7A7574] truncate max-w-[200px]">
            {conversation?.lastMessage || t.components.messages.noMessages}
          </span>
        </div>
      </div>
      {/* <FiMoreVertical className="text-gray-400" /> */}
    </button>
  )
}

export default ConversationItem
