import React from "react"
import { formatTime, FREQUENCY_LABEL } from "../../utils/eventFormatters"

const EventDetailBody = ({ ev, event, headerColor, isLoading }) => (
  <div className="px-8 pt-6 pb-2 relative bg-white text-base overflow-y-auto max-h-[60vh]">
    {isLoading ? (
      <div className="flex items-center justify-center py-10 text-gray-400 text-sm">
        Đang tải chi tiết…
      </div>
    ) : (
      <div className="flex flex-col gap-5 text-black pr-2">
        {/* Time */}
        <div className="flex items-baseline gap-2">
          <span className="font-bold min-w-max">Thời gian:</span>
          <span className="text-gray-800">
            {formatTime(ev.startTime)} – {formatTime(ev.endTime)} (GMT +07:00)
          </span>
        </div>

        {/* Description */}
        {ev.description && (
          <div className="flex flex-col gap-1">
            <span className="font-bold">Mô tả:</span>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {ev.description}
            </p>
          </div>
        )}

        {/* Participants */}
        <div className="flex items-baseline gap-2">
          <span className="font-bold min-w-max">Số lượng đã đăng kí:</span>
          <span className="italic text-gray-800">
            {event.currentParticipants ?? 0}/{ev.maxParticipants ?? "∞"}
          </span>
        </div>

        {/* Conditions */}
        {ev.conditions && ev.conditions.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="font-bold min-w-max">Điều kiện:</span>
            <div className="flex flex-wrap gap-2">
              {ev.conditions.map((c) => (
                <span
                  key={c.id}
                  title={c.description || undefined}
                  className="italic px-3 py-0.5 rounded text-white text-sm shadow-sm leading-tight"
                  style={{ backgroundColor: headerColor }}
                >
                  {c.title || c.conditionType || c.category || `#${c.id}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recurrence */}
        {ev.isRecurring && ev.recurrenceRule && (
          <div className="flex flex-col gap-1">
            <span className="font-bold">Lặp lại:</span>
            <div className="text-sm text-gray-700 flex flex-col gap-0.5 pl-1">
              <span>
                {FREQUENCY_LABEL[ev.recurrenceRule.frequency] ??
                  ev.recurrenceRule.frequency}
                {ev.recurrenceRule.interval > 1
                  ? ` (mỗi ${ev.recurrenceRule.interval} lần)`
                  : ""}
              </span>
              {ev.recurrenceRule.recurrenceStartDate &&
                ev.recurrenceRule.recurrenceEndDate && (
                  <span className="text-gray-500">
                    {new Date(
                      ev.recurrenceRule.recurrenceStartDate,
                    ).toLocaleDateString("vi-VN")}
                    {" – "}
                    {new Date(
                      ev.recurrenceRule.recurrenceEndDate,
                    ).toLocaleDateString("vi-VN")}
                  </span>
                )}
            </div>
          </div>
        )}
      </div>
    )}
  </div>
)

export default EventDetailBody
