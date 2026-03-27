import React, { useState } from "react"
import { Send, Check, X } from "lucide-react"
import PassConfirmationModal from "./PassConfirmationModal"
import MyStoryModal from "./MyStoryModal"
import { useLanguage } from "@/shared/context/LanguageContext"
import TextInput from "@/shared/components/ui/inputs/TextInput"
import { BubbleButton } from "@/shared/components/ui/buttons"
import useStories from "../hooks/useStories"

const LiveMessages = ({ languageCommunity }) => {
  const {
    stories,
    myStories,
    inputValue,
    setInputValue,
    handleCreate,
    handleInteract,
    handleDelete,
  } = useStories(languageCommunity)
  const { t } = useLanguage()
  const [storyToPass, setStoryToPass] = useState(null)
  const [selectedMyStory, setSelectedMyStory] = useState(null)
  const rows = [0, 1, 2]

  // Combine stories and myStories with isOwn flag
  const combinedStories = [
    ...stories.map((story) => ({ ...story, isOwn: false })),
    ...myStories.map((story) => ({ ...story, isOwn: true })),
  ]

  // Prepare marquee items
  let marqueeItems = []
  if (combinedStories && combinedStories.length > 0) {
    marqueeItems = [...combinedStories]
    while (marqueeItems.length < 15) {
      marqueeItems = [...marqueeItems, ...combinedStories]
    }
    // Double for seamless loop
    marqueeItems = [...marqueeItems, ...marqueeItems]
  }

  // If no stories, show a placeholder or nothing
  if (!combinedStories || combinedStories.length === 0) {
    return (
      <div className="relative my-6 w-full max-w-full overflow-hidden rounded-3xl bg-white/60 px-2 py-8 text-center">
        {/* Input area same as before */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-2 pb-3 md:gap-0">
          <div className="flex w-full items-start gap-2 md:w-auto">
            <TextInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              maxLength={200}
              placeholder={t.catSpeak.mail.placeholderEmpty}
              containerClassName="flex-1 md:w-72 md:flex-none"
              className="!border-[#c38300]/70 focus:!border-[#990011] focus:!ring-[#990011] hover:!border-[#990011]"
              showCount
            />
            <button
              type="button"
              onClick={() => handleCreate(inputValue)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#990011] transition hover:scale-105 hover:bg-[#990011]/10"
              aria-label="Send message"
            >
              <Send />
            </button>
          </div>
          <div className="shrink-0 text-xs text-[#7A7574]">
            <span className="font-semibold">{myStories.length}</span>{" "}
            {t.catSpeak.mail.yours} |{" "}
            <span className="font-semibold">
              {stories.length + myStories.length}
            </span>{" "}
            {t.catSpeak.mail.total}
          </div>
        </div>
        <div className="mt-4 text-[#7A7574] italic">
          {t.catSpeak.mail.noStories}
        </div>
      </div>
    )
  }

  const handlePassResult = (confirmed) => {
    if (confirmed && storyToPass) {
      handleInteract(storyToPass.storyId, 2) // 2 = Decline/Pass
    }
    setStoryToPass(null)
  }

  const handleConnect = (story) => {
    handleInteract(story.storyId, 1) // 1 = Connect/Accept
  }

  return (
    <div className="relative w-full max-w-full">
      <div className="mb-2 flex flex-col md:flex-row items-center justify-between gap-3 px-1 pt-1 -mx-1 -mt-1">
        <div className="flex w-full items-start gap-2">
          <TextInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            maxLength={200}
            placeholder={t.catSpeak.mail.placeholder}
            containerClassName="flex-1 md:w-72 md:flex-none"
            className="!border-[#c38300]/70"
            showCount
          />

          <button
            type="button"
            onClick={() => handleCreate(inputValue)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#990011] hover:bg-[#E5E5E5]"
            aria-label="Send message"
          >
            <Send />
          </button>
        </div>

        <div className="text-sm whitespace-nowrap">
          <span className="font-semibold">{myStories.length}</span>{" "}
          {t.catSpeak.mail.yours} |{" "}
          <span className="font-semibold">
            {stories.length + myStories.length}
          </span>{" "}
          {t.catSpeak.mail.total}
        </div>
      </div>

      <style>
        {`
        @keyframes live-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
           display: flex;
           width: max-content; /* Ensure container fits content */
        }
        .marquee-content:hover {
           animation-play-state: paused !important;
        }
        `}
      </style>

      {rows.map((rowIdx) => (
        <div
          key={rowIdx}
          className="flex items-center gap-3 py-1 overflow-hidden"
        >
          <div
            className="flex items-center gap-3 marquee-content"
            style={{
              animation: "live-marquee 120s linear infinite", // Slower animation
              animationDelay: `${rowIdx * -5}s`, // Stagger start times with negative delay for immediate fill
            }}
          >
            {/* Repeat messages enough times to fill width and loop smoothly */}
            {marqueeItems.map((story, idx) => (
              <BubbleButton
                as="div"
                key={`${rowIdx}-${idx}`}
                onClick={() => {
                  if (story.isOwn) {
                    setSelectedMyStory(story)
                  }
                }}
                className={`group relative inline-block whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold text-white shadow transition-colors ${
                  story.isOwn
                    ? "bg-blue-600 cursor-pointer hover:bg-blue-700"
                    : "bg-[#990011]"
                }`}
                bubbleColor={story.isOwn ? "#2563eb" : "#990011"}
              >
                <span className="block">{story.storyContent}</span>

                {/* Hover Overlay - Only for other people's stories */}
                {!story.isOwn && (
                  <div className="absolute inset-0 hidden items-center justify-center gap-2 rounded-full bg-black/40 backdrop-blur-sm group-hover:flex">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleConnect(story)
                      }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#990011] shadow hover:scale-110"
                      title={t.catSpeak.connect}
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setStoryToPass(story)
                      }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-600 shadow hover:scale-110 hover:text-red-500"
                      title={t.catSpeak.pass}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </BubbleButton>
            ))}
          </div>
        </div>
      ))}

      <PassConfirmationModal open={!!storyToPass} onResult={handlePassResult} />
      <MyStoryModal
        open={!!selectedMyStory}
        story={selectedMyStory}
        onClose={() => setSelectedMyStory(null)}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default LiveMessages
