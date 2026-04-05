import React, { useState, useMemo, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import InDevelopmentModal from "@/shared/components/ui/InDevelopmentModal"
import Avatar from "@/shared/components/ui/Avatar"
import { COLORS } from "@/shared/constants/constants"
import { useLanguage } from "@/shared/context/LanguageContext"
import { getTranslatedTimeAgo } from "@/features/news/utils/newsUtils"
import { ThumbsUp, Heart, Smile } from "lucide-react"
import { useReactToPostMutation } from "@/store/api/postsApi"

const IMAGE_BASE_URL = "https://api.catspeak.com.vn"

const NewsCard = ({ news }) => {
  console.log(news)
  const navigate = useNavigate()
  const { lang } = useParams()
  const currentLang = lang || "en"
  const { t } = useLanguage()

  const [reactToPost] = useReactToPostMutation()

  const handleReact = (e, type) => {
    e.stopPropagation()
    if (!news?.postId) return
    reactToPost({ postId: news.postId, type })
  }

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
      className="group relative overflow-hidden border cursor-pointer rounded-xl border-[#e5e5e5] hover:border-[#990011] bg-white flex flex-col"
    >
      {/* Header: Author Info */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex-shrink-0">
          <Avatar
            size={40}
            src={avatarSrc}
            alt={news.authorName || "Author"}
            name={news.authorName}
            fallback={news.authorName?.charAt(0) || "C"}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-base">
            {news.authorName || "Cat Speak Admin"}
          </span>
          <span className="text-sm text-[#606060]">
            {getTranslatedTimeAgo(news.createDate, newsCard?.timeAgo)}
          </span>
        </div>
      </div>

      {/* Body: Title */}
      <div className="px-3 mb-3">
        <h5 className="text-base">{news.title}</h5>
      </div>

      {/* Thumbnail – 16:9 */}
      <div className="relative w-full overflow-hidden aspect-video">
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
      </div>

      {/* Footer: Reactions */}
      <div className="flex flex-col mt-auto pt-3">
        {news.totalReactions != null && (
          <div className="px-3 pb-3 text-sm text-[#606060] flex items-center">
            <span>
              {news.totalReactions}{" "}
              {news.totalReactions === 1
                ? newsCard?.reaction
                : newsCard?.reactions}
            </span>
          </div>
        )}

        {/* Interaction Buttons */}
        <div className="flex items-center w-full border-t border-[#e5e5e5]">
          <button
            onClick={(e) => handleReact(e, "Like")}
            className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 text-sm transition-colors ${
              news.currentUserReaction === "Like"
                ? "bg-blue-600 text-white font-medium hover:bg-blue-700"
                : "text-[#606060] hover:bg-[#F2F2F2]"
            }`}
          >
            <ThumbsUp
              size={18}
              className={`${news.currentUserReaction === "Like" ? "fill-white" : ""}`}
            />
            {t.news?.newsDetail?.like || "Like"}
          </button>

          <button
            onClick={(e) => handleReact(e, "Love")}
            className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 text-sm transition-colors ${
              news.currentUserReaction === "Love"
                ? "bg-red-500 text-white font-medium hover:bg-red-600"
                : "text-[#606060] hover:bg-[#F2F2F2]"
            }`}
          >
            <Heart
              size={18}
              className={`${news.currentUserReaction === "Love" ? "fill-white" : ""}`}
            />
            {t.news?.newsDetail?.love || "Love"}
          </button>

          <button
            onClick={(e) => handleReact(e, "Haha")}
            className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 text-sm transition-colors ${
              news.currentUserReaction === "Haha"
                ? "bg-yellow-500 text-white font-medium hover:bg-yellow-600"
                : "text-[#606060] hover:bg-[#F2F2F2]"
            }`}
          >
            <Smile
              size={18}
              className={`${
                news.currentUserReaction === "Haha"
                  ? "fill-white text-yellow-500"
                  : ""
              }`}
            />
            {t.news?.newsDetail?.haha || "Haha"}
          </button>
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
