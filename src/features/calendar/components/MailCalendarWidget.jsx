import React from "react"
import MailToolbar from "./MailToolbar"
import MailCalendar from "./MailCalendar"

const MailCalendarWidget = ({ currentDate }) => {
  return (
    <div className="flex flex-col">
      <MailToolbar />
      <MailCalendar currentDate={currentDate} />
    </div>
  )
}

export default MailCalendarWidget
