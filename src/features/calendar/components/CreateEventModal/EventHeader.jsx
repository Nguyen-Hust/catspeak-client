import { X } from "lucide-react"
import { IconLogo } from "@/shared/assets/icons/logo"
import ColorDropdown from "../ui/ColorDropdown"
import VisibilityDropdown from "../ui/VisibilityDropdown"

const EventHeader = ({
  title,
  onTitleChange,
  eventColor,
  onColorChange,
  visibility,
  onVisibilityChange,
  onClose,
}) => (
  <div className="relative">
    {/* Overlapping Close Button */}
    <button
      type="button"
      onClick={onClose}
      className="absolute -top-4 -right-4 bg-[#B81919] text-white p-1.5 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] z-50 hover:bg-red-800 transition-colors border-[4px] border-white"
    >
      <X size={24} strokeWidth={4} />
    </button>

    {/* Colored Header */}
    <div
      className="text-white pt-6 pb-5 px-8 rounded-t-[20px] relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300"
      style={{ backgroundColor: eventColor }}
    >
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="TÊN SỰ KIỆN"
          className="bg-transparent text-[22px] font-bold uppercase placeholder-white font-sans outline-none w-[170px]"
        />
        <span className="text-[22px] font-light">|</span>
        <img
          src={IconLogo}
          alt="Location Logo"
          className="w-6 h-6 object-cover"
        />
        <span className="text-[17px] opacity-90 font-medium whitespace-nowrap">
          Đại học FPT
        </span>
      </div>

      <div className="flex items-center gap-3 pr-2">
        <ColorDropdown value={eventColor} onChange={onColorChange} />
        <VisibilityDropdown
          value={visibility}
          onChange={onVisibilityChange}
          color={eventColor}
        />
      </div>
    </div>
  </div>
)

export default EventHeader
