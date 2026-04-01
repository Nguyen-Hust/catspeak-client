import React, { useState } from "react"
import { useLanguage } from "@/shared/context/LanguageContext"

import PillButton from "@/shared/components/ui/buttons/PillButton"
import Modal from "@/shared/components/ui/Modal"

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
    <Modal
      open={open}
      onClose={handleClose}
      title={t.catSpeak?.anonymous || "Anonymous"}
    >
      <div className="space-y-6">
        <div className="min-h-[40px] w-full break-words rounded-lg bg-[#F2F2F2] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">
          {story.storyContent}
        </div>

        <div className="flex justify-end gap-3">
          <PillButton
            variant="secondary"
            onClick={handlePass}
            className="h-10"
          >
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
