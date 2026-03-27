import React, { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import {
  useGetRoomByIdQuery,
  WaitingScreen,
  useMediaPreview,
  useJoinVideoSession,
} from "@/features/rooms"
import { useAuth } from "@/features/auth"
import { useLanguage } from "@/shared/context/LanguageContext"
import LoadingSpinner from "@/shared/components/ui/indicators/LoadingSpinner"

const RoomDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t } = useLanguage()

  // Auth & Room Data
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user, navigate])

  const {
    data: room,
    isLoading: isLoadingRoom,
    error,
  } = useGetRoomByIdQuery(id, { skip: !id || !user, pollingInterval: 15000 })

  const {
    handleJoin: hookJoin,
    isLoadingSessions,
    activeSession,
  } = useJoinVideoSession({
    roomId: id,
    isAuthenticated: !!user,
  })

  const currentParticipantCount = room?.currentParticipantCount ?? 0
  const maxParticipants = room?.maxParticipants ?? null
  const isRoomFull =
    maxParticipants !== null && currentParticipantCount >= maxParticipants

  // -- Media Preview Hook --
  const {
    micOn,
    cameraOn,
    localStream,
    toggleMic: hookToggleMic,
    toggleCamera: hookToggleCamera,
  } = useMediaPreview()

  const toggleMic = async () => {
    await hookToggleMic()
  }

  const toggleCamera = async () => {
    await hookToggleCamera()
  }

  // -- Handlers --
  const handleJoin = async () => {
    await hookJoin({ isRoomFull, micOn, cameraOn })
  }

  // -- Render --
  if (isLoadingRoom || isLoadingSessions) {
    return (
      <div className="flex h-screen items-center justify-center bg-white text-gray-500">
        <LoadingSpinner text={t.rooms.waitingScreen.loading} />
      </div>
    )
  }

  if (error || !room) {
    return (
      <div className="flex h-screen items-center justify-center bg-white text-red-500">
        {t.rooms.waitingScreen.roomNotFound}
      </div>
    )
  }

  // We pass the "Room" object as "session" to WaitingScreen for title/name?
  // WaitingScreen expects session.name or session.roomName.
  // We can construct a mock session object if activeSession is missing so UI looks good.
  const displaySession = activeSession || {
    name: room.name,
    roomName: room.name,
    topic: room.topic,
    requiredLevel: room.requiredLevel,
    participants: [],
  }

  return (
    <>
      <WaitingScreen
        session={displaySession}
        room={room}
        participantCount={currentParticipantCount}
        user={user}
        micOn={micOn}
        cameraOn={cameraOn}
        localStream={localStream}
        onToggleMic={toggleMic}
        onToggleCam={toggleCamera}
        onJoin={handleJoin}
        isFull={isRoomFull}
        maxParticipants={maxParticipants}
      />
    </>
  )
}

export default RoomDetailPage
