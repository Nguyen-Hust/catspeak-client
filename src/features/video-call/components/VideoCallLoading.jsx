import React from "react"

/**
 * Full-screen loading overlay shown while the video call session is being prepared.
 * Covers all loading phases (session fetch, room fetch, SDK token, connecting) behind one unified UI.
 */
const VideoCallLoading = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-950 text-white">
      <p>{message}</p>
    </div>
  )
}

export default VideoCallLoading
