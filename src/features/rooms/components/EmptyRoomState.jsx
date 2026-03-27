import React from "react"

const EmptyRoomState = ({ message, height = "h-48" }) => {
  return (
    <div
      className={`flex ${height} w-full flex-col items-center justify-center rounded-xl bg-white border border-[#C6C6C6]`}
    >
      <p className="px-4 m-0 text-sm text-[#7A7574]">{message}</p>
    </div>
  )
}

export default EmptyRoomState
