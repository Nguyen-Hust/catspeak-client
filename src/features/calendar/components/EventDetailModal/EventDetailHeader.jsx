import React from "react"
import { Globe, Lock, RefreshCw } from "lucide-react"
import { IconLogo } from "@/shared/assets/icons/logo"

const EventDetailHeader = ({ ev, headerColor }) => (
  <div
    className="text-white pt-8 pb-5 px-8 rounded-t-[20px] border-b-[2px] border-white z-10 relative overflow-hidden"
    style={{ backgroundColor: headerColor }}
  >
    {/* Visibility & Recurring badges */}
    <div className="flex items-center gap-2 mb-1">
      {ev.visibilityScope === "PUBLIC" ? (
        <span className="flex items-center gap-1 text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">
          <Globe size={11} /> Công khai
        </span>
      ) : ev.visibilityScope ? (
        <span className="flex items-center gap-1 text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">
          <Lock size={11} /> Riêng tư
        </span>
      ) : null}

      {ev.isRecurring && (
        <span className="flex items-center gap-1 text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">
          <RefreshCw size={11} /> Lặp lại
        </span>
      )}
    </div>

    {/* Title */}
    <h2 className="text-3xl leading-none font-bold uppercase mb-4 tracking-wide relative z-10 mt-2">
      {ev.title || (
        <span className="opacity-60 italic text-xl">Không có tiêu đề</span>
      )}
    </h2>

    {/* Location */}
    <div className="flex items-center gap-3 opacity-95 text-base font-medium relative z-10">
      <img
        src={IconLogo}
        alt="Location Logo"
        className="w-6 h-6 object-cover"
      />
      <span>{ev.location || "Đại học FPT"}</span>
    </div>
  </div>
)

export default EventDetailHeader
