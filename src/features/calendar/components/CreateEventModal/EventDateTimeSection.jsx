import dayjs from "dayjs"
import DatePicker from "@/shared/components/ui/inputs/DatePicker"
import TimeDropdown from "../ui/TimeDropdown"
import TimezoneDropdown from "../ui/TimezoneDropdown"
import RecurrenceDropdown from "../ui/RecurrenceDropdown"
import RecurrenceDays from "../ui/RecurrenceDays"
import RecurrenceIntervalRow from "./RecurrenceIntervalRow"
import { formatTime } from "@/shared/utils/dateFormatter"
import { colors } from "@/shared/utils/colors"

/** Safely converts a Firestore Timestamp or plain Date to a JS Date */
const toDate = (value) =>
  value && typeof value.toDate === "function" ? value.toDate() : value

/** Human-readable unit label per recurrence option */
const INTERVAL_UNIT = {
  "Hàng ngày": "ngày",
  "Hàng tuần": "tuần",
  "Hàng tháng": "tháng",
  "Hàng năm": "năm",
  "Tùy chỉnh...": "tuần",
}

const WEEKLY_OPTIONS = ["Hàng tuần", "Tùy chỉnh..."]
const CUSTOM_OPTION = "Tùy chỉnh..."

const EventDateTimeSection = ({
  eventColor,
  startTime,
  onStartTimeChange,
  endTime,
  onEndTimeChange,
  selectedTimezone,
  onTimezoneChange,
  recurrenceOption,
  onRecurrenceChange,
  recurrenceInterval,
  onRecurrenceIntervalChange,
  selectedDays,
  onSelectedDaysChange,
  recurrenceEndDate,
  onRecurrenceEndDateChange,
}) => {
  const isRecurring = recurrenceOption !== "Không lặp lại"
  const isWeekly = WEEKLY_OPTIONS.includes(recurrenceOption)
  const intervalUnit = INTERVAL_UNIT[recurrenceOption] ?? "lần"

  return (
    <div className="flex flex-col gap-4 items-start pb-2 w-full">
      {/* Start / End time */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-2 w-full xl:w-auto">
        <div className="flex flex-col gap-[14px] w-full md:w-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
            <span className="text-base font-bold text-gray-900 w-[150px] shrink-0">
              Thời gian bắt đầu
            </span>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <DatePicker
                value={toDate(startTime)}
                onChange={(d) => onStartTimeChange(d)}
                color={eventColor}
              />
              <TimeDropdown
                value={formatTime(toDate(startTime))}
                color={eventColor}
                onChange={(hhmm) => {
                  const [h, m] = hhmm.split(":")
                  onStartTimeChange(
                    dayjs(toDate(startTime))
                      .hour(Number(h))
                      .minute(Number(m))
                      .second(0)
                      .toDate(),
                  )
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
            <span className="text-base font-bold text-gray-900 w-[150px] shrink-0">
              Thời gian kết thúc
            </span>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <DatePicker
                value={toDate(endTime)}
                onChange={(d) => onEndTimeChange(d)}
                color={eventColor}
              />
              <TimeDropdown
                value={formatTime(toDate(endTime))}
                color={eventColor}
                onChange={(hhmm) => {
                  const [h, m] = hhmm.split(":")
                  onEndTimeChange(
                    dayjs(toDate(endTime))
                      .hour(Number(h))
                      .minute(Number(m))
                      .second(0)
                      .toDate(),
                  )
                }}
              />
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="flex w-full md:w-auto mt-0 md:h-auto h-auto min-h-[86px]">
          <TimezoneDropdown
            value={selectedTimezone}
            onChange={onTimezoneChange}
          />
        </div>
      </div>

      {/* Recurrence */}
      <div className="flex flex-col gap-3 w-full">
        <RecurrenceDropdown
          value={recurrenceOption}
          onChange={onRecurrenceChange}
        />

        {isRecurring && (
          <div className="flex flex-col gap-3 w-full">
            {/* Interval row — only shown for custom recurrence */}
            {recurrenceOption === CUSTOM_OPTION && (
              <RecurrenceIntervalRow
                intervalUnit={intervalUnit}
                value={recurrenceInterval}
                onChange={onRecurrenceIntervalChange}
              />
            )}

            {/* Day-of-week picker — shown for weekly-type recurrences */}
            {isWeekly && (
              <RecurrenceDays
                value={selectedDays}
                onChange={onSelectedDaysChange}
                eventColor={eventColor}
              />
            )}

            {/* Recurrence end date */}
            <div
              className="flex items-center gap-2 border rounded-md px-3 h-[48px] shadow-sm bg-white hover:bg-gray-50 transition-colors cursor-pointer w-fit"
              style={{ borderColor: colors.border }}
            >
              <span
                className="text-base font-medium"
                style={{ color: colors.textGray }}
              >
                Kết thúc vào:
              </span>
              <DatePicker
                value={recurrenceEndDate}
                onChange={onRecurrenceEndDateChange}
                color={eventColor}
                className="shrink-0 flex items-center h-full [&>button]:border-none [&>button]:shadow-none [&>button]:px-1 [&>button]:text-gray-800 [&>button]:font-medium [&>button]:bg-transparent hover:[&>button]:bg-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDateTimeSection
