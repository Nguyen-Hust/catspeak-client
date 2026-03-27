import Modal from "@/shared/components/ui/Modal"
import { useEventForm } from "../../hooks/useEventForm"
import EventHeader from "./EventHeader"
import EventDateTimeSection from "./EventDateTimeSection"
import EventDetailsSection from "./EventDetailsSection"
import EventFooter from "./EventFooter"

const CreateEventModal = ({ onClose, editEvent }) => {
  const form = useEventForm(onClose, editEvent)

  return (
    <Modal
      open
      onClose={onClose}
      showCloseButton={false}
      className="p-0 !max-w-[900px] w-full bg-[#F2F2F2] rounded-[20px] overflow-visible"
    >
      <form
        onSubmit={form.handleSubmit}
        className="relative flex flex-col w-full bg-white rounded-[20px] shadow-xl"
      >
        <EventHeader
          title={form.title}
          onTitleChange={form.setTitle}
          eventColor={form.eventColor}
          onColorChange={form.setEventColor}
          visibility={form.visibility}
          onVisibilityChange={form.setVisibility}
          onClose={onClose}
        />

        {/* Body */}
        <div className="px-8 pt-8 pb-6 relative bg-white text-base">
          <div className="flex flex-col gap-6">
            <EventDateTimeSection
              eventColor={form.eventColor}
              startTime={form.startTime}
              onStartTimeChange={form.setStartTime}
              endTime={form.endTime}
              onEndTimeChange={form.setEndTime}
              selectedTimezone={form.selectedTimezone}
              onTimezoneChange={form.setSelectedTimezone}
              recurrenceOption={form.recurrenceOption}
              onRecurrenceChange={form.setRecurrenceOption}
              recurrenceInterval={form.recurrenceInterval}
              onRecurrenceIntervalChange={form.setRecurrenceInterval}
              selectedDays={form.selectedDays}
              onSelectedDaysChange={form.setSelectedDays}
              recurrenceEndDate={form.recurrenceEndDate}
              onRecurrenceEndDateChange={form.setRecurrenceEndDate}
            />

            <EventDetailsSection
              eventColor={form.eventColor}
              eventLocation={form.eventLocation}
              onLocationChange={form.setEventLocation}
              description={form.description}
              onDescriptionChange={form.setDescription}
              maxParticipants={form.maxParticipants}
              onMaxParticipantsChange={form.setMaxParticipants}
              conditionsInput={form.conditionsInput}
              onConditionsChange={form.setConditionsInput}
            />
          </div>
        </div>

        <EventFooter
          eventColor={form.eventColor}
          isLoading={form.isLoading}
          isEditing={!!editEvent}
        />
      </form>
    </Modal>
  )
}

export default CreateEventModal
