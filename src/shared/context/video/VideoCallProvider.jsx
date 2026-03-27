import React, { useEffect, useRef, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { MeetingProvider } from "@videosdk.live/react-sdk"
import { useGetProfileQuery } from "@/features/auth"
import {
  useGetVideoSessionByIdQuery,
  useGetVideoSdkTokenMutation,
} from "@/store/api/videoSessionsApi"
import { useGetRoomByIdQuery } from "@/features/rooms"
import PillButton from "@/shared/components/ui/buttons/PillButton"
import { meetingConfig } from "@/shared/utils/videoSdkConfig"
import { useLanguage } from "@/shared/context/LanguageContext"
import { getCommunityPath } from "@/shared/utils/navigation"
import { VideoCallContent } from "./VideoCallContext"
import VideoCallLoading from "../../../features/video-call/components/VideoCallLoading"
import { SearchX, Users, AlertCircle } from "lucide-react"

export const VideoCallProvider = ({ children }) => {
  const { id, lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { t, language } = useLanguage()

  const [sdkToken, setSdkToken] = useState(null)
  const hasInitRef = useRef(false)

  const { data: userData } = useGetProfileQuery()
  const user = userData?.data ?? null

  const {
    data: session,
    isLoading: isLoadingSession,
    error: sessionError,
  } = useGetVideoSessionByIdQuery(id, { skip: !id })

  const [getVideoSdkToken] = useGetVideoSdkTokenMutation()

  const { data: room, isLoading: isLoadingRoom } = useGetRoomByIdQuery(
    session?.roomId,
    { skip: !session?.roomId },
  )

  const isUserParticipant = session?.participants?.some(
    (p) => p.accountId === user?.accountId,
  )

  const isRoomFull =
    room &&
    room.maxParticipants !== null &&
    (room.currentParticipantCount || 0) >= room.maxParticipants &&
    !isUserParticipant

  // Fetch the VideoSDK token once all prerequisites are ready.
  useEffect(() => {
    if (!id || !session || !user || isLoadingRoom || isRoomFull) return
    if (hasInitRef.current) return

    const initMeeting = async () => {
      try {
        hasInitRef.current = true
        // console.log(
        //   "[VideoCall] Fetching VideoSDK token for meeting:",
        //   session.videoSdkMeetingId,
        // )

        const res = await getVideoSdkToken({
          meetingId: session.videoSdkMeetingId,
          name: user.username,
        }).unwrap()

        const token = res?.token
        // console.log("[VideoCall] Token fetched from backend:", res)

        if (typeof token !== "string" || token.trim().split(".").length !== 3) {
          throw new Error("Invalid VideoSDK token received from backend")
        }

        setSdkToken(token)
        // console.log("[VideoCall] sdkToken set in state ✅")
      } catch (err) {
        console.error("[VideoCall] Meeting init failed:", err)
        hasInitRef.current = false // allow retry on next render
      }
    }

    initMeeting()
  }, [id, session, user, getVideoSdkToken, isLoadingRoom, isRoomFull])

  // --- Loading / error guards ---

  if (isRoomFull) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950 animate-fadeIn">
        <div className="flex flex-col items-center gap-4 max-w-[400px] px-8 py-12 text-center">
          <div className="text-orange-500 mb-2">
            <Users size={64} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-white leading-tight">
            {t.rooms.roomFullModal.title}
          </h1>
          <p className="text-[15px] text-gray-400 leading-relaxed mb-2">
            {t.rooms.roomFullModal.message}
          </p>
          <PillButton
            onClick={() => navigate(getCommunityPath(lang || language))}
            className="h-10 min-w-[140px] mt-2"
          >
            {t.rooms.waitingScreen.backToCommunity}
          </PillButton>
        </div>
      </div>
    )
  }

  if (sessionError) {
    console.error("Failed to load session:", sessionError)
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950 animate-fadeIn">
        <div className="flex flex-col items-center gap-4 max-w-[400px] px-8 py-12 text-center">
          <div className="text-red-500 mb-2">
            <AlertCircle size={64} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-white leading-tight">
            {t.rooms.videoCall.provider.failedToLoad}
          </h1>
          <p className="text-[15px] text-gray-400 leading-relaxed mb-2">
            {sessionError?.data?.message ||
              t.rooms.videoCall.provider.unknownError}
          </p>
          <div className="flex flex-col gap-3 w-full mt-2 min-w-[200px]">
            <PillButton
              onClick={() => window.location.reload()}
              variant="primary"
              className="h-10 w-full"
            >
              {t.rooms.videoCall.provider.retry}
            </PillButton>
            <PillButton
              onClick={() => navigate(getCommunityPath(lang || language))}
              variant="secondary"
              className="h-10 w-full"
            >
              {t.rooms.waitingScreen.backToCommunity}
            </PillButton>
          </div>
        </div>
      </div>
    )
  }

  if (!isLoadingSession && !session) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950 animate-fadeIn">
        <div className="flex flex-col items-center gap-4 max-w-[400px] px-8 py-12 text-center">
          <div className="text-red-500 mb-2">
            <SearchX size={64} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-white leading-tight">
            {t.rooms.waitingScreen.roomNotFound}
          </h1>
          <p className="text-[15px] text-gray-400 leading-relaxed mb-2">
            {t.rooms.waitingScreen.roomNotFoundSubtext}
          </p>
          <PillButton
            onClick={() => navigate(getCommunityPath(lang || language))}
            variant="primary"
            className="h-10 min-w-[140px] mt-2"
          >
            {t.rooms.waitingScreen.backToCommunity}
          </PillButton>
        </div>
      </div>
    )
  }

  // Show a single loading screen until session, room, and SDK token are all ready.
  if (
    isLoadingSession ||
    !userData ||
    (session?.roomId && isLoadingRoom) ||
    !sdkToken
  ) {
    return (
      <VideoCallLoading
        message={t.rooms.videoCall.provider.connecting ?? "Connecting..."}
      />
    )
  }

  const initMic = location.state?.micEnabled ?? false
  const initCam = location.state?.webcamEnabled ?? false

  return (
    <MeetingProvider
      config={{
        ...meetingConfig,
        meetingId: session.videoSdkMeetingId,
        micEnabled: initMic,
        webcamEnabled: initCam,
        name: user?.username || "Guest",
        metaData: {
          accountId: user?.accountId,
          username: user?.username,
        },
      }}
      token={sdkToken}
      joinWithoutUserInteraction={false}
    >
      <VideoCallContent
        user={user}
        session={session}
        sessionError={sessionError}
        sdkToken={sdkToken}
        room={room}
      >
        {children}
      </VideoCallContent>
    </MeetingProvider>
  )
}
