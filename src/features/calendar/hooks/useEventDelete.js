import { useState } from "react"
import { useDeleteEventMutation } from "@/store/api/eventsApi"

const useEventDelete = (eventId, onClose) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation()

  const handleDelete = async () => {
    try {
      await deleteEvent(eventId).unwrap()
      onClose()
    } catch (err) {
      console.error("Failed to delete event:", err)
    }
  }

  return {
    confirmDelete,
    setConfirmDelete,
    isDeleting,
    handleDelete,
  }
}

export default useEventDelete
