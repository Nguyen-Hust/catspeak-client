import React from "react"
import { Typography } from "antd"
import { useLanguage } from "@/shared/context/LanguageContext"

const { Title, Paragraph } = Typography

const VideoPage = () => {
  const { t } = useLanguage()

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <Title level={2}>{t.catSpeak.video.title}</Title>
      <Paragraph>{t.catSpeak.video.description}</Paragraph>
    </div>
  )
}

export default VideoPage
