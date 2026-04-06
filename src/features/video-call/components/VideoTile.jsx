import { MicOff, VideoOff, MonitorUp } from "lucide-react"
import Avatar from "@/shared/components/ui/Avatar"
import { useEffect, useRef, useReducer } from "react"
import { useIsSpeaking } from "@livekit/components-react"
import { Track, ParticipantEvent } from "livekit-client"

/**
 * Renders a single participant's video tile using LiveKit.
 *
 * Subscribes to participant track events so that when tracks are
 * renegotiated (e.g. during screen-share) the audio/video elements
 * are re-attached to the current, live track objects.
 *
 * @param {{ participant: import('livekit-client').Participant }} props
 */
const VideoTile = ({ participant, onClick }) => {
  const isSpeaking = useIsSpeaking(participant)

  // Force re-render whenever tracks change on this participant so that
  // getTrackPublication() returns the latest track references.
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    const events = [
      ParticipantEvent.TrackSubscribed,
      ParticipantEvent.TrackUnsubscribed,
      ParticipantEvent.TrackMuted,
      ParticipantEvent.TrackUnmuted,
      ParticipantEvent.TrackPublished,
      ParticipantEvent.TrackUnpublished,
    ]

    events.forEach((evt) => participant.on(evt, forceUpdate))

    return () => {
      events.forEach((evt) => participant.off(evt, forceUpdate))
    }
  }, [participant])

  const displayName = participant.name || participant.identity || "?"
  const isLocal = participant.isLocal
  const micOn = participant.isMicrophoneEnabled
  const webcamOn = participant.isCameraEnabled
  const screenShareOn = participant.isScreenShareEnabled

  // Get the camera track publication
  const cameraPub = participant.getTrackPublication(Track.Source.Camera)
  const cameraTrack = cameraPub?.track
  const isVideoVisible = webcamOn && !!cameraTrack

  const videoRef = useRef(null)

  // Attach / detach the camera track to the <video> element
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    if (cameraTrack) {
      cameraTrack.attach(el)
    }

    return () => {
      if (cameraTrack) {
        cameraTrack.detach(el)
      }
    }
  }, [cameraTrack])

  return (
    <div
      onClick={onClick}
      className={`relative h-full w-full min-h-[100px] overflow-hidden rounded-lg bg-white border border-solid transition-[border-color,box-shadow] duration-200 ease-in-out [container-type:inline-size] ${
        isSpeaking
          ? "border-green-600 shadow-[0_0_15px_rgba(46,125,50,0.4)]"
          : "border-[#C6C6C6] shadow-sm"
      } ${onClick ? "cursor-pointer" : ""}`}
    >
      {/* Video element for camera track */}
      <video
        autoPlay
        playsInline
        muted={isLocal}
        ref={videoRef}
        className={`h-full w-full object-cover ${
          isVideoVisible ? "block" : "hidden"
        }`}
      />

      {/* Avatar fallback when no video */}
      {!isVideoVisible && (
        <div className="flex h-full w-full items-center justify-center">
          <Avatar
            size={64}
            name={displayName || "?"}
            speaking={isSpeaking}
            className="!w-[20cqi] !h-[20cqi] !max-w-[128px] !max-h-[128px] !min-w-[48px] !min-h-[48px] !text-[clamp(0.875rem,8cqi,2rem)]"
          />
        </div>
      )}

      {/* Status icons and Name */}
      <div className="absolute bottom-1 left-1 flex max-w-[90%] items-center gap-1.5 rounded-md bg-black/40 px-2 py-1 text-white backdrop-blur-sm">
        <div className="flex flex-shrink-0 items-center gap-1">
          {screenShareOn && <MonitorUp size={16} />}
          {!micOn && <MicOff size={16} />}
          {!webcamOn && <VideoOff size={16} />}
        </div>
        <div className="min-w-0 truncate font-medium text-sm">
          {displayName} {isLocal && "(You)"}
        </div>
      </div>
    </div>
  )
}

export default VideoTile
