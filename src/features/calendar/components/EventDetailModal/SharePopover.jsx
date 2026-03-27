import React from "react"
import { Share2, Copy, Check, Loader2 } from "lucide-react"
import useEventShare from "../../hooks/useEventShare"

/**
 * Self-contained share button with a popover that shows the generated link
 * and a copy-to-clipboard action.
 */
const SharePopover = ({ eventId }) => {
  const {
    shareRef,
    sharePopoverOpen,
    shareUrl,
    copied,
    isSharing,
    handleShare,
    handleCopy,
  } = useEventShare(eventId)

  return (
    <div className="relative" ref={shareRef}>
      <button
        onClick={handleShare}
        disabled={isSharing}
        className="bg-[#F2F2F2] hover:bg-[#D9D9D9] transition-colors shrink-0 flex items-center justify-center rounded-full w-12 h-12 disabled:opacity-50"
        title="Chia sẻ sự kiện"
      >
        {isSharing ? (
          <Loader2 size={22} className="animate-spin" />
        ) : (
          <Share2 size={22} />
        )}
      </button>

      {sharePopoverOpen && shareUrl && (
        <div className="absolute bottom-12 right-0 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Chia sẻ liên kết
          </p>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <span className="flex-1 text-sm text-gray-700 truncate select-all">
              {shareUrl}
            </span>
            <button
              onClick={handleCopy}
              className="shrink-0 text-gray-400 hover:text-blue-600 transition-colors"
              title="Sao chép"
            >
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">
            Liên kết hết hạn sau 7 ngày
          </p>
        </div>
      )}
    </div>
  )
}

export default SharePopover
