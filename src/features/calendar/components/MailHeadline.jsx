import React from "react"
import { useLanguage } from "@/shared/context/LanguageContext"
import { Play, Cat } from "lucide-react"

const MailHeadline = ({ currentDate, onNextMonth, onPrevMonth }) => {
  const { t } = useLanguage()

  const monthString = currentDate ? currentDate.format("M") : "1"
  const yearString = currentDate ? currentDate.format("YYYY") : "2026"

  return (
    <div className="flex flex-col h-full w-full max-w-[200px] font-sans">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-[38px] leading-[1.1] font-black text-black tracking-tight">
          LỊCH
        </h2>
        <h2 className="text-[38px] leading-[1.1] font-black text-black tracking-tight">
          OFFLINE
        </h2>
        <h2 className="text-[38px] leading-[1.1] font-black text-black tracking-tight">
          MEETING
        </h2>
        <h2 className="text-[38px] leading-[1.1] font-black text-[#990011] tracking-tight">
          THÁNG {monthString}
        </h2>
        <div className="flex items-center gap-3">
          <h2 className="text-[38px] leading-[1.1] font-black text-[#990011] tracking-tight">
            {yearString}
          </h2>
          <div className="flex items-center gap-1 mt-1">
            <Play
              onClick={onPrevMonth}
              className="w-5 h-5 fill-black rotate-180 cursor-pointer hover:scale-110 transition-transform"
            />
            <Play
              onClick={onNextMonth}
              className="w-5 h-5 fill-black cursor-pointer hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-500 my-5" />

      <div className="flex flex-col">
        <h3 className="text-[32px] leading-[1.1] font-black text-[#990011] tracking-tight">
          HCM, VN
        </h3>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-[36px] leading-[1.1] font-black text-black">
            400
          </span>
          <span className="text-[15px] font-semibold text-black uppercase tracking-wide">
            Sự kiện
          </span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="w-6 h-6 min-w-[24px] rounded-full bg-[#990011] flex items-center justify-center text-white">
            <Cat size={14} className="stroke-[2.5px]" />
          </div>
          <span className="text-[11px] font-[500] italic text-[#9ca0ab] uppercase tracking-wider">
            Sự kiện của Cat Speak
          </span>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-500 my-5" />

      <div className="flex flex-col">
        <h3 className="text-[28px] leading-[1.1] font-black text-black tracking-tight uppercase">
          Đã đăng kí
        </h3>
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center max-w-max gap-2 px-3 py-1.5 rounded bg-[#990011] text-white cursor-pointer hover:bg-[#85000f] transition-colors">
            <Cat size={16} className="stroke-[2.5px]" />
            <span className="text-sm font-[600] uppercase tracking-wide">
              Sự kiện CAT...
            </span>
          </div>
          <div className="flex items-center max-w-max gap-2 px-3 py-1.5 rounded bg-[#be185d] text-white cursor-pointer hover:bg-[#9d174d] transition-colors">
            <div className="w-3.5 h-3.5 rounded-full bg-gray-300" />
            <span className="text-sm font-[600] uppercase tracking-wide">
              Sự kiện ABC
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MailHeadline
