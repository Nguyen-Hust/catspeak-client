import React, { useState } from "react"
import { X } from "lucide-react"
import Modal from "@/shared/components/ui/Modal"
import { useGetEventByIdQuery } from "@/store/api/eventsApi"
import EventDetailHeader from "./EventDetailHeader"
import EventDetailBody from "./EventDetailBody"
import EventDetailFooter from "./EventDetailFooter"
import CreateEventModal from "../CreateEventModal"

const EventDetailModal = ({ event, onClose }) => {
  const [isEditing, setIsEditing] = useState(false)
  const eventId = event?.eventId ?? event?.id

  const { data: detail, isLoading } = useGetEventByIdQuery(eventId, {
    skip: !eventId,
  })

  if (!event) return null

  // Merge: prefer fully-loaded detail, fall back to the summary object
  const ev = detail ?? event
  const headerColor = ev.color || "#B91264"

  if (isEditing) {
    return (
      <CreateEventModal editEvent={ev} onClose={() => setIsEditing(false)} />
    )
  }

  return (
    <Modal
      key={eventId}
      open={!!event}
      onClose={onClose}
      showCloseButton={false}
      className="p-0 !max-w-[700px] w-full bg-[#F2F2F2] rounded-[20px] overflow-visible"
    >
      <div className="relative flex flex-col w-full h-full bg-white rounded-[20px]">
        {/* Floating close button */}
        <button
          onClick={onClose}
          className="absolute -top-5 -right-5 bg-[#B81919] text-white p-2 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] z-50 hover:bg-red-800 transition-colors border-[4px] border-white"
        >
          <X size={26} strokeWidth={4} />
        </button>

        <EventDetailHeader ev={ev} headerColor={headerColor} />

        <EventDetailBody
          ev={ev}
          event={event}
          headerColor={headerColor}
          isLoading={isLoading}
        />

        <EventDetailFooter
          eventId={eventId}
          event={event}
          onClose={onClose}
          onEdit={() => setIsEditing(true)}
        />
      </div>
    </Modal>
  )
}

export default EventDetailModal
