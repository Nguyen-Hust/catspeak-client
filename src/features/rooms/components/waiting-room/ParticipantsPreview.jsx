import React from "react"
import { useLanguage } from "@/shared/context/LanguageContext"

const ParticipantsPreview = ({ participants = [], participantCount }) => {
  const { t } = useLanguage()
  const count = participantCount ?? participants.length

  if (count === 0) {
    return <p className="text-[#7A7574]">{t.rooms.waitingScreen.noOneHere}</p>
  }

  // Cap at 5 for AvatarGroup display equivalent
  const displayParticipants = participants.slice(0, 5)
  const remainingCount = Math.max(0, count - displayParticipants.length)

  return (
    <div className="mt-2 flex flex-col items-center gap-1">
      <div className="flex -space-x-3">
        {displayParticipants.map((p) => (
          <img
            key={p.participantId}
            alt={p.username}
            src={
              p.avatarImageUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                p.username,
              )}&background=random`
            }
            className="inline-block h-8 w-8 rounded-full border-2 border-white object-cover md:h-10 md:w-10 text-[12px] md:text-[14px]"
          />
        ))}
        {remainingCount > 0 && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-600 md:h-10 md:w-10">
            +{remainingCount}
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500">
        <span className="font-semibold">{count}</span>{" "}
        {t.rooms.waitingScreen.isHere}
      </p>
    </div>
  )
}

export default ParticipantsPreview
