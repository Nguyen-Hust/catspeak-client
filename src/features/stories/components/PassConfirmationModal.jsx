import React, { useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useLanguage } from "@/shared/context/LanguageContext"

import Avatar from "@/shared/components/ui/Avatar"
import PillButton from "@/shared/components/ui/buttons/PillButton"
import Modal from "@/shared/components/ui/Modal"

dayjs.extend(relativeTime)

const PassConfirmationModal = ({ open, story, onConnect, onPass, onClose }) => {
  const { t } = useLanguage()
  const [confirmPass, setConfirmPass] = useState(false)

  const handleClose = () => {
    setConfirmPass(false)
    onClose()
  }

  const handlePass = () => {
    if (confirmPass) {
      onPass(story)
      handleClose()
    } else {
      setConfirmPass(true)
    }
  }

  const handleConnect = () => {
    onConnect(story)
    handleClose()
  }

  if (!story) return null

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar
              src={story.avatarImageUrl}
              name={story.username || t.catSpeak?.anonymous || "Anonymous"}
              size={40}
            />
            <div className="flex flex-col">
              <span className="font-semibold">
                {story.username || t.catSpeak?.anonymous || "Anonymous"}
              </span>
              <span className="text-sm text-[#606060]">
                {story.languageCommunity} • {dayjs(story.createDate).fromNow()}
              </span>
            </div>
          </div>

          <div className="w-full break-words rounded-lg bg-[#F2F2F2] px-3 py-2 whitespace-pre-wrap">
            {story.storyContent}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <PillButton variant="secondary" onClick={handlePass} className="h-10">
            {confirmPass
              ? t.catSpeak?.confirm || "Confirm Pass"
              : t.catSpeak?.pass || "Pass"}
          </PillButton>
          <PillButton onClick={handleConnect} className="h-10">
            {t.catSpeak?.connect || "Connect"}
          </PillButton>
        </div>
      </div>
    </Modal>
  )
}

export default PassConfirmationModal
