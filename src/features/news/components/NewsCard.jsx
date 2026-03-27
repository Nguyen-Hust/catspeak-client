import React, { useState, useMemo, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import InDevelopmentModal from "@/shared/components/ui/InDevelopmentModal"
import Avatar from "@/shared/components/ui/Avatar"
import { COLORS } from "@/shared/constants/constants"
import { useLanguage } from "@/shared/context/LanguageContext"
import { getTranslatedTimeAgo } from "@/features/news/utils/newsUtils"

const IMAGE_BASE_URL = "https://api.catspeak.com.vn"

const NewsCard = ({ news }) => {
  const navigate = useNavigate()
  const { lang } = useParams()
  const currentLang = lang || "en"
  const { t } = useLanguage()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [imageError, setImageError] = useState(false)

  const newsCard = t.news?.newsCard

  const handleCardClick = () => {
    navigate(`/${currentLang}/cat-speak/news/${news.postId}`)
  }

  const hasMedia = news.media && news.media.length > 0

  useEffect(() => {
    if (hasMedia && news.media.length > 1) {
      const interval = setInterval(() => {
        setCurrentMediaIndex((prev) => (prev + 1) % news.media.length)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [hasMedia, news.media?.length])

  const fallbackColor = useMemo(() => {
    const seed = news.postId || Math.floor(Math.random() * COLORS.length)
    const index =
      typeof seed === "number"
        ? seed % COLORS.length
        : seed.length % COLORS.length
    return COLORS[index].value
  }, [news.postId])

  const avatarSrc = news.avatarUrl
    ? `${IMAGE_BASE_URL}${news.avatarUrl}`
    : undefined

  return (
    <div
      onClick={handleCardClick}
      className="group relative overflow-hidden border cursor-pointer rounded-xl transition-all duration-300 border-[#C6C6C6] hover:border-[#990011] hover:shadow-md bg-white flex flex-col"
    >
      {/* Thumbnail – 16:9 */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16 / 9" }}
      >
        {hasMedia && !imageError ? (
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentMediaIndex * 100}%)` }}
          >
            {news.media.map((item) => {
              const imageUrl = `${IMAGE_BASE_URL}${item.mediaUrl}`
              return (
                <div
                  key={item.postMediaId}
                  className="w-full h-full flex-shrink-0 relative"
                >
                  <img
                    src={imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: fallbackColor }}
          >
            <span className="text-white/20 font-bold text-4xl select-none">
              Cat Speak
            </span>
          </div>
        )}

        {hasMedia && (
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}
      </div>

      {/* Info section – avatar left, metadata stacked right */}
      <div className="flex items-start gap-3 p-3">
        {/* Avatar 36×36 */}
        <div className="flex-shrink-0 mt-0.5">
          <Avatar
            size={36}
            src={avatarSrc}
            alt={news.authorName || "Author"}
            name={news.authorName}
            fallback={news.authorName?.charAt(0) || "C"}
          />
        </div>

        {/* Right – stacked: title, subtitle, meta (no gap) */}
        <div className="min-w-0 flex flex-col" style={{ gap: 0 }}>
          {/* Title */}
          <h5
            className="m-0 line-clamp-2 font-semibold leading-snug"
            style={{ fontSize: "1rem", color: "#990011" }}
          >
            {news.title}
          </h5>

          {/* Author name */}
          <span
            className="truncate leading-snug"
            style={{ fontSize: "0.875rem", color: "#7A7574" }}
          >
            {news.authorName || "Cat Speak Admin"}
          </span>

          {/* Reactions · Time ago */}
          <span
            className="leading-snug"
            style={{ fontSize: "0.875rem", color: "#7A7574" }}
          >
            {news.totalReactions != null && (
              <>
                {news.totalReactions}{" "}
                {news.totalReactions === 1
                  ? newsCard?.reaction
                  : newsCard?.reactions}
                {" · "}
              </>
            )}
            {getTranslatedTimeAgo(news.createDate, newsCard?.timeAgo)}
          </span>
        </div>
      </div>

      <InDevelopmentModal
        open={isModalOpen}
        onCancel={(e) => {
          if (e) e.stopPropagation()
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}

export default NewsCard
