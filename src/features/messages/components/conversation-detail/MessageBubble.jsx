import React from "react"
import { formatTime } from "@/shared/utils/dateFormatter"

const MessageBubble = ({ message, isMyMessage }) => {
  return (
    <div className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
          isMyMessage
            ? "bg-[#990011] text-white shadow"
            : "bg-gray-100 text-gray-800 shadow-inner"
        }`}
      >
        <div>{message.messageContent}</div>
        <div
          className={`text-[10px] mt-1 ${
            isMyMessage ? "text-white/70" : "text-gray-500"
          }`}
        >
          {formatTime(message.createDate)}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
