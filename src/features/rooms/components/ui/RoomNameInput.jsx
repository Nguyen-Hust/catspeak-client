import React from "react"
import { colors } from "@/shared/utils/colors"

const RoomNameInput = ({ value, onChange, t }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="name" className="text-sm font-bold text-gray-700">
        {t.rooms.createRoom.nameLabel}
      </label>
      <input
        autoFocus
        id="name"
        style={{
          "--border-color": colors.border,
          "--placeholder-color": colors.subtext,
        }}
        placeholder={t.rooms.createRoom.namePlaceholder}
        type="text"
        className="h-12 w-full rounded-full border border-[var(--border-color)] px-4 text-sm outline-none transition-colors focus:border-cath-red-700 focus:ring-1 focus:ring-cath-red-700 hover:border-cath-red-700 placeholder-[var(--placeholder-color)]"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default RoomNameInput
