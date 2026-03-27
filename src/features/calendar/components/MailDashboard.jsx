import React, { useState } from "react"
import dayjs from "dayjs"
import MailHeadline from "./MailHeadline"
import MailCalendarWidget from "./MailCalendarWidget"

const MailDashboard = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())

  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, "month"))
  const handlePrevMonth = () =>
    setCurrentDate((prev) => prev.subtract(1, "month"))

  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full mt-10 min-h-[480px]">
      <div className="flex items-center shrink-0 w-full lg:w-auto">
        <MailHeadline
          currentDate={currentDate}
          onNextMonth={handleNextMonth}
          onPrevMonth={handlePrevMonth}
        />
      </div>
      <div className="flex flex-col justify-center w-full flex-1 min-w-0">
        <MailCalendarWidget currentDate={currentDate} />
      </div>
    </div>
  )
}

export default MailDashboard
