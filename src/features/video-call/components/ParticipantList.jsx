import { Mic, MicOff, Video, VideoOff } from "lucide-react"
import { useParticipant, useMeeting } from "@videosdk.live/react-sdk"
import { useLanguage } from "@/shared/context/LanguageContext"
import Avatar from "@/shared/components/ui/Avatar"

/**
 * A single row in the participant list.
 * All reactive state (mic/cam) comes from useParticipant() for remote participants,
 * or from the localMicOn/localCameraOn props for the local user.
 */
const ParticipantItem = ({
  participantId,
  isLocal,
  localMicOn,
  localCameraOn,
}) => {
  const { t } = useLanguage()
  const pl = t.rooms.videoCall.participantList
  const { displayName, micOn, webcamOn } = useParticipant(participantId)

  const isMicOn = isLocal ? localMicOn : (micOn ?? false)
  const isCameraOn = isLocal ? localCameraOn : (webcamOn ?? false)
  const name = displayName || (isLocal ? pl.you : pl.guest)
  const initial = name.charAt(0).toUpperCase()

  return (
    <div className="flex items-center justify-between pl-1.5 pr-2 py-1 rounded">
      <div className="flex items-center gap-3">
        <Avatar size={40} name={name} />
        <div className="flex-1 min-w-0">
          <p className="text-black text-sm font-medium truncate m-0">
            {name} {isLocal && pl.youSuffix}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {isCameraOn ? <Video className="text-[#990011]" /> : <VideoOff />}
        {isMicOn ? <Mic className="text-[#990011]" /> : <MicOff />}
      </div>
    </div>
  )
}

/**
 * Participant list panel.
 *
 * Props:
 *  participantIds  – ordered array of VideoSDK participant IDs (local first)
 *  currentUserId   – the logged-in user's accountId (to identify the local tile)
 *  localMicOn      – reactive local mic state from useVideoCall()
 *  localCameraOn   – reactive local cam state from useVideoCall()
 */
const ParticipantList = ({
  participantIds,
  localMicOn,
  localCameraOn,
  hideTitle,
}) => {
  const { t } = useLanguage()
  const pl = t.rooms.videoCall.participantList
  const { localParticipant } = useMeeting()
  const localSdkId = localParticipant?.id

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {!hideTitle && (
        <div className="px-4 py-3 border-b border-[#C6C6C6]">
          <h3 className="text-black text-sm font-semibold m-0">
            {pl.title} ({participantIds.length})
          </h3>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-2">
        <ul className="flex flex-col">
          {participantIds.map((pid) => (
            <li key={pid}>
              <ParticipantItem
                participantId={pid}
                isLocal={pid === localSdkId}
                localMicOn={localMicOn}
                localCameraOn={localCameraOn}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ParticipantList
