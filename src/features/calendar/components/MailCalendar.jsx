import React, { useState } from "react"
import dayjs from "dayjs"
import { colors } from "@/shared/utils/colors"
import { Cat } from "lucide-react"
import MailCalendarDetail from "./MailCalendarDetail"
import { motion } from "framer-motion"
import { useGetEventCountsQuery } from "@/store/api/eventsApi"

const MailCalendar = ({ currentDate = dayjs() }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Create a calendar view layout for the current month (Monday-first)
  // dayjs .day() returns 0=Sun,1=Mon,...,6=Sat
  // For a Mon-first grid, offset = (dayOfWeek + 6) % 7
  const startDay = (currentDate.startOf("month").day() + 6) % 7
  const daysInMonth = currentDate.daysInMonth()

  const dates = Array.from({ length: 42 }, (_, i) => {
    const day = i - startDay + 1
    if (day < 1 || day > daysInMonth) return null
    return day
  })

  // Fetch event counts from the API for the current month
  const { data: eventCountsData } = useGetEventCountsQuery({
    startDate: currentDate.startOf("month").toISOString(),
    endDate: currentDate.endOf("month").toISOString(),
  })

  // Build a day-of-month → totalEvents map from the API response
  const eventCountsByDay = React.useMemo(() => {
    if (!eventCountsData?.counts) return {}
    return eventCountsData.counts.reduce((acc, item) => {
      const day = dayjs(item.date).date()
      acc[day] = (acc[day] ?? 0) + item.totalEvents
      return acc
    }, {})
  }, [eventCountsData])

  const selectedIndex = dates.indexOf(selectedDate)
  const endOfRowIdx =
    selectedIndex !== -1 ? (Math.floor(selectedIndex / 7) + 1) * 7 - 1 : -1

  // Look up event count for a given day from API data
  const getEventCountForDate = (date) => {
    if (!date) return 0
    return eventCountsByDay[date] ?? 0
  }

  return (
    <div className="bg-white/70 backdrop-blur-md flex-1 flex flex-col w-full min-h-[350px]">
      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        {days.map((d) => (
          <div
            key={d}
            className="text-xs font-bold text-gray-400 uppercase tracking-wider"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-x-2 gap-y-3 flex-1">
        {dates.map((date, idx) => {
          const isToday =
            date === dayjs().date() && currentDate.isSame(dayjs(), "month")
          const eventCount = getEventCountForDate(date)

          // Logic for gradient bars based on event count
          let numBars = 0
          if (eventCount >= 50) numBars = 4
          else if (eventCount >= 20) numBars = 3
          else if (eventCount >= 5) numBars = 2
          else if (eventCount > 0) numBars = 1

          const barColors = [
            colors.red[500], // bottom, lightest
            colors.red[700],
            colors.red[800],
            colors.red[900], // top, darkest
          ]

          const renderExpandedDetail = () => {
            if (selectedDate !== null && idx === endOfRowIdx) {
              return (
                <MailCalendarDetail
                  key={`detail-${selectedDate}`}
                  selectedDate={selectedDate}
                  currentDate={currentDate}
                  onClose={() => setSelectedDate(null)}
                />
              )
            }
            return null
          }

          // Only render visible dates
          if (!date) {
            return (
              <React.Fragment key={`empty-${idx}`}>
                <div className="invisible aspect-[5/4]"></div>
                {renderExpandedDetail()}
              </React.Fragment>
            )
          }

          return (
            <React.Fragment key={`date-${idx}`}>
              <motion.div
                whileTap={{
                  scale: 0.92,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                onClick={() =>
                  setSelectedDate(selectedDate === date ? null : date)
                }
                className={`relative flex flex-col rounded-[16px] bg-white border shadow-sm overflow-hidden cursor-pointer aspect-[5/4]
                  ${isToday && selectedDate !== date ? "ring-2 ring-[#990011] border-transparent" : "border-[#E5E5E5]"}
                  ${selectedDate === date ? "ring-4 ring-[#990011]/80 border-transparent shadow-md transform scale-[1.02] z-10" : ""}
                `}
              >
                {/* Top Row: Date and Event Count */}
                <div className="flex items-start justify-between px-2 pt-1.5 pb-1 z-10 bg-transparent leading-none">
                  <span className="text-[1.3rem] font-light text-gray-800 font-sans tracking-tight italic">
                    {date}
                  </span>
                  {eventCount > 0 && (
                    <span className="text-[1.3rem] font-bold text-[#990011] italic leading-none">
                      {eventCount}
                    </span>
                  )}
                </div>

                {/* Gradient Event Bars Container */}
                <div className="flex-1 flex flex-col justify-end w-full absolute inset-0 z-0">
                  {[
                    { height: "25%", color: colors.red[900] },
                    { height: "40%", color: colors.red[800] },
                    { height: "55%", color: colors.red[700] },
                    { height: "70%", color: colors.red[600] },
                  ]
                    .slice(0, numBars)
                    .reverse()
                    .map((layer, barIdx) => (
                      <div
                        key={barIdx}
                        className="absolute bottom-0 w-full rounded-t-[16px] transition-all"
                        style={{
                          height: layer.height,
                          backgroundColor: layer.color,
                          zIndex: barIdx,
                        }}
                      />
                    ))}

                  {/* Optional Cat Icon in bottom-left */}
                  {eventCount > 0 && (
                    <div
                      className="absolute left-1.5 bottom-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: colors.red[900], zIndex: 10 }}
                    >
                      <Cat size={14} className="stroke-[2.5px]" />
                    </div>
                  )}
                </div>
              </motion.div>
              {renderExpandedDetail()}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default MailCalendar
