import React from "react"
import { Typography } from "antd"
import { useLanguage } from "@/shared/context/LanguageContext"

const { Title, Paragraph } = Typography

const DiscoverPage = () => {
  const { t } = useLanguage()

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <Title level={2}>{t.catSpeak.discover.title}</Title>
      <Paragraph>{t.catSpeak.discover.description}</Paragraph>
    </div>
  )
}

export default DiscoverPage
