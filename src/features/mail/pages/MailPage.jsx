import React from "react"
import { useParams } from "react-router-dom"
import { LiveMessages } from "@/features/stories"
import { MailDashboard } from "@/features/calendar"

// Normalize URL lang codes to canonical backend values
const LANG_TO_COMMUNITY = {
  vi: "Vietnamese",
  vn: "Vietnamese",
  vietnam: "Vietnamese",
  vietnamese: "Vietnamese",
  en: "English",
  eng: "English",
  english: "English",
  zh: "Chinese",
  cn: "Chinese",
  china: "Chinese",
  chinese: "Chinese",
}

const MailPage = () => {
  const { lang } = useParams()

  // Resolve the language community from URL param
  const languageCommunity = LANG_TO_COMMUNITY[lang?.toLowerCase()] || undefined

  return (
    <div className="w-full">
      <LiveMessages languageCommunity={languageCommunity} />

      {/* <div className="mt-8 mb-12 px-2 md:px-0">
        <MailDashboard />
      </div> */}
    </div>
  )
}

export default MailPage

