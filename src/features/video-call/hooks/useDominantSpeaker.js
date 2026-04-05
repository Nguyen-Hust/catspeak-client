import { useState, useEffect, useRef } from "react"

/**
 * Tracks the dominant (currently speaking) remote participant.
 *
 * Priority:
 *  1. First remote participant whose `isSpeaking === true`
 *  2. The most-recently-speaking remote participant (sticky)
 *  3. Fallback: `localParticipant`
 *
 * @param {import('livekit-client').Participant[]} participants - All participants
 * @param {import('livekit-client').LocalParticipant | null} localParticipant
 * @returns {import('livekit-client').Participant | null} The dominant participant to display
 */
export const useDominantSpeaker = (participants, localParticipant) => {
  const [dominant, setDominant] = useState(null)
  const lastSpeakerRef = useRef(null)

  useEffect(() => {
    if (!participants || participants.length === 0) {
      setDominant(localParticipant ?? null)
      return
    }

    // Find the first currently-speaking remote participant
    const speaking = participants.find((p) => p.isSpeaking && !p.isLocal)

    if (speaking) {
      lastSpeakerRef.current = speaking
      setDominant(speaking)
    } else if (lastSpeakerRef.current) {
      // Verify the last speaker is still in the participant list
      const stillPresent = participants.find(
        (p) => p.identity === lastSpeakerRef.current.identity,
      )
      if (stillPresent) {
        setDominant(stillPresent)
      } else {
        lastSpeakerRef.current = null
        setDominant(localParticipant ?? null)
      }
    } else {
      // No one has ever spoken — show local participant
      setDominant(localParticipant ?? null)
    }
  }, [participants, localParticipant])

  return dominant
}
