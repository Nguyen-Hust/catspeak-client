import { useRef, useEffect, useState } from "react"
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk"
import toast from "react-hot-toast"

/**
 * Handles join/leave lifecycle and exposes local mic/cam state + toggle actions.
 * Participant data (list, streams, per-participant mic/cam) should be read directly
 * from useMeeting() / useParticipant() in the components that need them.
 *
 * @param {string} sdkToken - VideoSDK auth token
 * @param {Object} t - Translation object (from useLanguage)
 */
export const useVideoCall = (sdkToken, t) => {
  const [isJoined, setIsJoined] = useState(false)

  const { join, leave, toggleMic, toggleWebcam, localParticipant } = useMeeting(
    {
      onMeetingJoined: () => {
        console.log("[useVideoCall] ✅ Has joined the meeting")
        setIsJoined(true)
      },
      onMeetingLeft: () => {
        console.log("[useVideoCall] ❌ Has left the meeting")
        setIsJoined(false)
      },
      onError: (error) => {
        console.error("[useVideoCall] VideoSDK Error:", error)
      },
    },
  )

  // Join once on mount; leave on unmount.
  const hasJoinedRef = useRef(false)

  useEffect(() => {
    // console.log("[useVideoCall] sdkToken:", sdkToken)
    if (!sdkToken) return
    if (hasJoinedRef.current) return

    const timeout = setTimeout(() => {
      console.log("[useVideoCall] ⏳ Joining meeting...")
      hasJoinedRef.current = true
      join()
    }, 500)

    return () => {
      clearTimeout(timeout)

      // ✅ Only leave if we actually joined
      if (hasJoinedRef.current) {
        console.log("[useVideoCall] 🚪 Leaving meeting...")
        leave()
        hasJoinedRef.current = false
      }
    }
  }, [sdkToken]) // join/leave are stable SDK references

  // Reactive local mic/cam state via useParticipant (more reliable than useMeeting).
  const { micOn, webcamOn } = useParticipant(localParticipant?.id ?? "")

  // Toggle mic — probes getUserMedia first to surface permission errors cleanly.
  // Also detects when another app holds exclusive mic access (track is muted).
  const toggleAudio = async () => {
    console.log(
      `[useVideoCall] 🎤 toggleAudio called — current micOn=${micOn}`,
    )
    if (!micOn) {
      let probe = null
      try {
        probe = await navigator.mediaDevices.getUserMedia({ audio: true })
        const audioTrack = probe.getAudioTracks()[0]

        console.log(
          `[useVideoCall] 🎤 Probe getUserMedia succeeded — ` +
            `track: readyState=${audioTrack?.readyState} ` +
            `enabled=${audioTrack?.enabled} ` +
            `muted=${audioTrack?.muted} ` +
            `label="${audioTrack?.label}"`,
        )

        // Check if the track is actually delivering audio data.
        // When another app (e.g. Google Meet) holds exclusive mic access,
        // getUserMedia succeeds but the track's `muted` property is true
        // — meaning no audio data is flowing from the hardware.
        if (audioTrack?.muted) {
          console.log(
            "[useVideoCall] ⏳ Track is muted — waiting up to 2s for unmute event...",
          )
          const unmuted = await new Promise((resolve) => {
            const onUnmute = () => {
              console.log(
                "[useVideoCall] ✅ Track unmuted within 2s — mic hardware is available",
              )
              resolve(true)
            }
            audioTrack.addEventListener("unmute", onUnmute, { once: true })
            setTimeout(() => {
              audioTrack.removeEventListener("unmute", onUnmute)
              resolve(false)
            }, 2000)
          })
          if (!unmuted) {
            console.warn(
              "[useVideoCall] 🔇 Mic track stayed muted after 2s — " +
                "another app likely holds exclusive mic access. Blocking toggle.",
            )
            toast.error(
              t?.rooms?.waitingScreen?.micInUse ??
                "Microphone is in use by another app.",
            )
            return // Don't toggle — mic won't produce audio
          }
        } else {
          console.log(
            "[useVideoCall] ✅ Track is NOT muted — mic hardware is available, proceeding",
          )
        }
      } finally {
        probe?.getTracks().forEach((t) => t.stop())
      }
    }
    console.log("[useVideoCall] 🎤 Calling SDK toggleMic()")
    toggleMic()
  }

  // Toggle webcam — probes getUserMedia first to surface permission errors cleanly.
  const toggleVideo = async () => {
    if (!webcamOn) {
      let probe = null
      try {
        probe = await navigator.mediaDevices.getUserMedia({ video: true })
      } finally {
        probe?.getTracks().forEach((t) => t.stop())
      }
    }
    toggleWebcam()
  }

  return {
    micOn: micOn ?? false,
    cameraOn: webcamOn ?? false,
    toggleAudio,
    toggleVideo,
    leaveMeeting: leave,
    isJoined,
  }
}
