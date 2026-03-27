import React, { useState } from "react"
import { Trash2, Pencil } from "lucide-react"
import SharePopover from "./SharePopover"
import useEventDelete from "../../hooks/useEventDelete"

const EventDetailFooter = ({ eventId, event, onClose, onEdit }) => {
  const [isRegistered, setIsRegistered] = useState(event?.isRegistered ?? false)
  const { confirmDelete, setConfirmDelete, isDeleting, handleDelete } =
    useEventDelete(eventId, onClose)

  return (
    <div className="px-8 pb-8 pt-6 flex items-center justify-between gap-4 bg-white">
      {/* Register / Unregister */}
      <button
        onClick={() => setIsRegistered(!isRegistered)}
        className={`flex-1 transition-colors text-base text-white font-bold py-3 rounded-[10px] shadow-sm ${
          isRegistered
            ? "bg-cath-red-700 hover:bg-cath-red-800"
            : "bg-[#06AA3B] hover:bg-green-700"
        }`}
      >
        {isRegistered ? "Hủy đăng kí" : "Đăng kí"}
      </button>

      {/* Delete confirm / action icons */}
      {confirmDelete ? (
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors px-3 py-1.5 rounded-lg disabled:opacity-60"
          >
            {isDeleting ? "Đang xóa..." : "Xác nhận?"}
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
          >
            Hủy
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onEdit}
            className="bg-[#F2F2F2] hover:bg-[#D9D9D9] text-gray-700 transition-colors flex items-center justify-center rounded-full w-12 h-12"
          >
            <Pencil />
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="bg-[#F2F2F2] hover:bg-[#D9D9D9] text-gray-700 transition-colors flex items-center justify-center rounded-full w-12 h-12"
          >
            <Trash2 />
          </button>
          <SharePopover eventId={eventId} />
        </div>
      )}
    </div>
  )
}

export default EventDetailFooter
