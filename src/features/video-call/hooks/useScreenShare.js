import { useMemo } from "react"
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk"

/**
 * Encapsulates screen-share state & actions using VideoSDK's built-in APIs.
 *
 * - `toggleScreenShare` / `presenterId` come from useMeeting()
 * - `screenShareStream` / `screenShareOn` come from useParticipant(presenterId)
 *
 * @returns {{
 *   screenShareOn: boolean,
 *   screenShareStream: MediaStream | null,
 *   presenterId: string | null,
 *   isLocalScreenShare: boolean,
 *   toggleScreenShare: () => void,
 *   presenterDisplayName: string | null,
 * }}
 */
export const useScreenShare = () => {
  const {
    toggleScreenShare,
    presenterId,
    localParticipant,
  } = useMeeting()

  // When someone is presenting, pull their screen-share data via useParticipant.
  // If nobody is presenting we pass "" — the hook returns safe defaults.
  const {
    screenShareStream,
    screenShareOn,
    displayName: presenterDisplayName,
  } = useParticipant(presenterId ?? "")

  const isLocalScreenShare = Boolean(
    presenterId && localParticipant && presenterId === localParticipant.id,
  )

  // Build a stable MediaStream from the screen-share track.
  const screenShareMediaStream = useMemo(() => {
    const track = screenShareStream?.track
    if (!track || !screenShareOn) return null
    return new MediaStream([track])
  }, [screenShareStream?.track, screenShareOn])

  return {
    screenShareOn: screenShareOn ?? false,
    screenShareStream: screenShareMediaStream,
    presenterId: presenterId ?? null,
    isLocalScreenShare,
    toggleScreenShare,
    presenterDisplayName: presenterDisplayName ?? null,
  }
}
