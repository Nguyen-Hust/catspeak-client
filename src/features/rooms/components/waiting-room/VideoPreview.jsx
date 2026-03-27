import React from "react"
import { Mic, MicOff, Video, VideoOff } from "lucide-react"
import { useLanguage } from "@/shared/context/LanguageContext"
import Avatar from "@/shared/components/ui/Avatar"

const VideoPreview = ({
  localStream,
  micOn,
  cameraOn,
  user,
  onToggleMic,
  onToggleCam,
}) => {
  const { t } = useLanguage()
  return (
    <div className="relative mb-6 h-[300px] w-full max-w-full overflow-hidden rounded-xl border border-[#C6C6C6] bg-white sm:h-[350px] sm:w-[90%] md:h-[400px] md:w-[700px]">
      {/* Video Preview */}
      {localStream && (
        <video
          ref={(video) => {
            if (video) {
              video.srcObject = localStream
              if (micOn) video.muted = true // Mute local preview to prevent echo
            }
          }}
          autoPlay
          playsInline
          muted // Always mute local video preview purely for UI
          className={`h-full w-full object-cover -scale-x-100 ${!cameraOn ? "hidden" : ""}`}
        />
      )}

      {!cameraOn && (
        <div className="flex h-full w-full items-center justify-center">
          <Avatar
            size={64}
            name={user?.username}
            className="md:!w-24 md:!h-24"
          />
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-row gap-4">
        <button
          onClick={onToggleMic}
          className={`border border-[#C6C6C6] flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 ${
            micOn
              ? "bg-[#990011] text-white hover:bg-[#7a000e]"
              : "bg-white text-[#990011/80] hover:bg-[#E5E5E5]"
          }`}
        >
          {micOn ? <Mic /> : <MicOff />}
        </button>

        <button
          onClick={onToggleCam}
          className={`border border-[#C6C6C6] flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 ${
            cameraOn
              ? "bg-[#990011] text-white hover:bg-[#7a000e]"
              : "bg-white text-[#990011/80] hover:bg-[#E5E5E5]"
          }`}
        >
          {cameraOn ? <Video /> : <VideoOff />}
        </button>
      </div>
    </div>
  )
}

export default VideoPreview
