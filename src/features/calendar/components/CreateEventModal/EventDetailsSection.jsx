import { MapPin } from "lucide-react"

const EventDetailsSection = ({
  eventColor,
  eventLocation,
  onLocationChange,
  description,
  onDescriptionChange,
  maxParticipants,
  onMaxParticipantsChange,
  conditionsInput,
  onConditionsChange,
}) => {
  const handleOpenMaps = () => {
    const loc = eventLocation.trim()
    if (!loc) return
    const isUrl =
      /^https?:\/\//i.test(loc) ||
      loc.includes("google.com/maps") ||
      loc.includes("maps.app.goo.gl")
    const url = isUrl
      ? loc.startsWith("http")
        ? loc
        : `https://${loc}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex flex-col gap-[22px] mt-2">
      {/* Location */}
      <div className="flex items-center">
        <div className="w-[150px] font-bold text-base text-gray-900 shrink-0">
          Địa điểm
        </div>
        <div className="flex-1 flex items-center border-b-[1.5px] border-gray-200 pb-[6px]">
          <input
            type="text"
            value={eventLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Nhập địa điểm hoặc link từ ggmap"
            className="w-full text-gray-500 placeholder-gray-500 text-base outline-none pr-2"
          />
          <button
            type="button"
            onClick={handleOpenMaps}
            className="text-gray-400 hover:text-[#B91264] transition-colors flex-shrink-0"
            title="Mở Google Maps"
          >
            <MapPin size={20} />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="flex items-center">
        <div className="w-[150px] font-bold text-base text-gray-900 shrink-0">
          Mô tả
        </div>
        <div className="flex-1 flex items-center border-b-[1.5px] border-gray-200 pb-[6px]">
          <input
            type="text"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Nhập mô tả (tối đa 500 từ)"
            className="w-full text-gray-500 placeholder-gray-500 text-base outline-none"
          />
        </div>
      </div>

      {/* Max participants */}
      <div className="flex items-center">
        <div className="w-[150px] font-bold text-base text-gray-900 shrink-0 mt-1">
          Số lượng tối đa
        </div>
        <div className="border border-gray-200 rounded-[5px] w-14 shadow-sm flex items-center justify-center bg-white px-2 py-1">
          <input
            type="number"
            value={maxParticipants}
            onChange={(e) => onMaxParticipantsChange(e.target.value)}
            className="w-full text-center text-black text-base outline-none"
          />
        </div>
        <span className="text-gray-500 text-base ml-2">Khách</span>
      </div>

      {/* Conditions */}
      <div className="flex items-start">
        <div className="w-[150px] font-bold text-base text-gray-900 shrink-0 pt-[3px]">
          Điều kiện
        </div>
        <div className="flex-1 flex flex-col border-b-[1.5px] border-gray-200 pb-[6px] gap-1">
          <input
            type="text"
            value={conditionsInput}
            onChange={(e) => onConditionsChange(e.target.value)}
            placeholder="Nhập điều kiện, phân cách bằng dấu phẩy"
            className="w-full text-gray-500 placeholder-gray-500 text-base outline-none"
          />
          {conditionsInput.trim() && (
            <div className="flex flex-wrap gap-1 mt-1">
              {conditionsInput
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                    style={{ backgroundColor: eventColor }}
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Ticket price (static / coming soon) */}
      <div className="flex items-center">
        <div className="w-[150px] font-bold text-base text-gray-900 shrink-0">
          Giá vé
        </div>
        <div className="flex-1 flex items-center justify-between border-b-[1.5px] border-gray-200 pb-[6px]">
          <span className="text-gray-500 text-base">Free</span>
          <button
            type="button"
            disabled
            className="font-bold text-base pr-1 transition-opacity duration-300 opacity-50 cursor-not-allowed"
            style={{ color: eventColor }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsSection
