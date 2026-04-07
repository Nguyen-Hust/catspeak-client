import { useEffect, useRef, useCallback } from "react"
import { useRoomContext } from "@livekit/components-react"
import { RoomEvent, Track } from "livekit-client"

const P = "[ManualAudio]"

/**
 * Custom audio renderer that replaces LiveKit's `<RoomAudioRenderer>`.
 *
 * Creates and manages `<audio>` elements **imperatively via the DOM**
 * instead of through React rendering. This fixes audio playback in
 * in-app WebView browsers (Zalo, Messenger, LINE, etc.) where React-
 * managed `<audio>` elements silently fail after track renegotiation.
 *
 * Key techniques for WebView compatibility:
 *  1. Manually creates MediaStream from a CLONED MediaStreamTrack
 *     (bypasses track.attach() and forces a fresh pipeline in the WebView)
 *  2. Container uses position offscreen (not display:none)
 *  3. AudioContext unlock on user gesture
 *  4. Gesture-powered retry for paused elements
 */
export const useManualAudioRenderer = () => {
  const room = useRoomContext()

  // Map of participantIdentity → { el, trackSid, clonedMST, stream }
  const audioMapRef = useRef(new Map())
  const containerRef = useRef(null)

  // ── Create / destroy the container ──
  useEffect(() => {
    const container = document.createElement("div")
    container.id = "manual-audio-renderer"
    container.style.cssText =
      "position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden;"
    document.body.appendChild(container)
    containerRef.current = container

    return () => {
      audioMapRef.current.forEach((entry, identity) => {
        cleanupEntry(entry, identity)
      })
      audioMapRef.current.clear()
      container.remove()
      containerRef.current = null
    }
  }, [])

  // ── AudioContext unlock + gesture-powered audio resume ──
  useEffect(() => {
    let unlocked = false

    const unlockAudio = () => {
      if (unlocked) return
      unlocked = true

      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (AudioCtx) {
          const ctx = new AudioCtx()
          ctx.resume().then(() => {
            ctx.close()
            console.log(`${P} 🔓 AudioContext unlocked via user gesture`)
          })
        }
      } catch {}

      // Retry all paused <audio> elements
      audioMapRef.current.forEach((entry, identity) => {
        if (entry.el && entry.el.paused && entry.el.srcObject) {
          entry.el
            .play()
            .then(() =>
              console.log(`${P} ✅ Resumed ${identity} via user gesture`),
            )
            .catch(() => {})
        }
      })

      cleanup()
    }

    const events = ["click", "touchstart", "touchend", "keydown"]
    events.forEach((e) =>
      document.addEventListener(e, unlockAudio, { capture: true, once: false }),
    )

    const cleanup = () => {
      events.forEach((e) =>
        document.removeEventListener(e, unlockAudio, { capture: true }),
      )
    }

    return cleanup
  }, [])

  // ── Core: attach an audio track to an <audio> element ──
  const attachTrack = useCallback((track, pub, participant) => {
    const identity = participant.identity
    const sid = pub.trackSid
    if (!identity || !sid || !containerRef.current) return

    const mst = track.mediaStreamTrack
    if (!mst) {
      console.warn(`${P} ⚠️ No mediaStreamTrack for ${identity} (${sid})`)
      return
    }

    // Log the raw track state for debugging
    console.log(`${P} 📋 Track state for ${identity} (${sid}):`, {
      readyState: mst.readyState,
      enabled: mst.enabled,
      muted: mst.muted,
      id: mst.id,
      kind: mst.kind,
    })

    // Clean up any previous entry for this participant
    const existing = audioMapRef.current.get(identity)
    if (existing) {
      console.log(
        `${P} 🔄 Replacing audio for ${identity}: ${existing.trackSid} → ${sid}`,
      )
      cleanupEntry(existing, identity)
      audioMapRef.current.delete(identity)
    }

    // ── ALWAYS create a fresh <audio> + clone the MediaStreamTrack ──
    // In WebViews (Zalo, Messenger), reusing <audio> or using
    // track.attach() after a participant reconnect results in a "playing"
    // element that produces no sound. Cloning the MediaStreamTrack forces
    // the WebView to build a completely fresh media pipeline.
    const clonedMST = mst.clone()
    const stream = new MediaStream([clonedMST])

    const el = document.createElement("audio")
    el.autoplay = true
    el.playsInline = true
    el.setAttribute("playsinline", "")
    el.setAttribute("webkit-playsinline", "")
    el.setAttribute("data-participant", identity)
    el.setAttribute("data-track-sid", sid)

    // Set srcObject directly (bypass LiveKit's track.attach)
    el.srcObject = stream

    containerRef.current.appendChild(el)
    audioMapRef.current.set(identity, { el, trackSid: sid, clonedMST, stream })

    console.log(`${P} ▶️ Created audio for ${identity} (${sid})`)

    // Log the element state immediately
    console.log(`${P} 📋 <audio> state:`, {
      srcObject: el.srcObject ? "present" : "null",
      streamTracks: stream.getTracks().map((t) => ({
        readyState: t.readyState,
        enabled: t.enabled,
        muted: t.muted,
      })),
    })

    // If the original MST ends (participant unpublishes), stop the clone too
    mst.addEventListener(
      "ended",
      () => {
        console.log(
          `${P} 🔚 Original MST ended for ${identity} — stopping clone`,
        )
        clonedMST.stop()
      },
      { once: true },
    )

    playWithRetry(el, sid, identity)
  }, [])

  // ── Remove entry when track unsubscribed ──
  const detachTrack = useCallback((pub, participant) => {
    const identity = participant.identity
    const sid = pub.trackSid
    if (!identity) return

    const entry = audioMapRef.current.get(identity)
    if (entry && entry.trackSid === sid) {
      cleanupEntry(entry, identity)
      audioMapRef.current.delete(identity)
      console.log(`${P} 🔇 Removed audio for ${identity} (${sid})`)
    }
  }, [])

  // ── Remove element when participant disconnects ──
  const removeParticipant = useCallback((participant) => {
    const identity = participant.identity
    if (!identity) return

    const entry = audioMapRef.current.get(identity)
    if (entry) {
      cleanupEntry(entry, identity)
      audioMapRef.current.delete(identity)
      console.log(`${P} 👋 Participant left, removed audio for ${identity}`)
    }
  }, [])

  // ── Attach existing remote audio tracks on mount / reconnect ──
  useEffect(() => {
    if (!room) return

    const attachExisting = () => {
      room.remoteParticipants.forEach((participant) => {
        participant.audioTrackPublications.forEach((pub) => {
          if (pub.track && pub.isSubscribed && pub.kind === Track.Kind.Audio) {
            attachTrack(pub.track, pub, participant)
          }
        })
      })
    }

    attachExisting()

    room.on(RoomEvent.Reconnected, attachExisting)
    return () => room.off(RoomEvent.Reconnected, attachExisting)
  }, [room, attachTrack])

  // ── Subscribe / unsubscribe / disconnect listeners ──
  useEffect(() => {
    if (!room) return

    const onSubscribed = (track, pub, participant) => {
      if (pub.kind !== Track.Kind.Audio) return
      if (participant.isLocal) return
      attachTrack(track, pub, participant)
    }

    const onUnsubscribed = (_track, pub, participant) => {
      if (pub.kind !== Track.Kind.Audio) return
      if (participant.isLocal) return
      detachTrack(pub, participant)
    }

    const onParticipantDisconnected = (participant) => {
      removeParticipant(participant)
    }

    room.on(RoomEvent.TrackSubscribed, onSubscribed)
    room.on(RoomEvent.TrackUnsubscribed, onUnsubscribed)
    room.on(RoomEvent.ParticipantDisconnected, onParticipantDisconnected)

    return () => {
      room.off(RoomEvent.TrackSubscribed, onSubscribed)
      room.off(RoomEvent.TrackUnsubscribed, onUnsubscribed)
      room.off(RoomEvent.ParticipantDisconnected, onParticipantDisconnected)
    }
  }, [room, attachTrack, detachTrack, removeParticipant])

  // ── Periodic health check: detect dead tracks and log ──
  useEffect(() => {
    const interval = setInterval(() => {
      audioMapRef.current.forEach((entry, identity) => {
        const { el, clonedMST, trackSid } = entry
        if (!el || !trackSid) return

        const tracks = el.srcObject?.getTracks?.() ?? []
        const hasDead = tracks.some(
          (t) => t.readyState === "ended" || !t.enabled,
        )

        if (hasDead || el.paused) {
          console.warn(`${P} 🩺 Health check problem for ${identity}:`, {
            elPaused: el.paused,
            elMuted: el.muted,
            tracks: tracks.map((t) => ({
              readyState: t.readyState,
              enabled: t.enabled,
              muted: t.muted,
            })),
            clonedMST: clonedMST
              ? {
                  readyState: clonedMST.readyState,
                  enabled: clonedMST.enabled,
                }
              : null,
          })
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])
}

// ─── Helpers (module-level) ──────────────────────────────────────────────────

function cleanupEntry(entry, identity) {
  try {
    if (entry.clonedMST) {
      entry.clonedMST.stop()
    }
    if (entry.el) {
      entry.el.pause()
      entry.el.srcObject = null
      entry.el.remove()
    }
    console.log(`${P} 🗑️ Cleaned up audio for ${identity}`)
  } catch {}
}

/**
 * Attempt to play an <audio> element with retries.
 */
function playWithRetry(el, sid, identity, attempt = 0) {
  const delays = [0, 100, 300, 800, 1500, 3000]
  if (attempt >= delays.length) {
    console.warn(
      `${P} ❌ All play attempts exhausted for ${identity} (${sid}). ` +
        `Waiting for user gesture to resume.`,
    )
    return
  }

  setTimeout(() => {
    if (!el.parentNode) return

    el.muted = false
    el.volume = 1.0

    el.play()
      .then(() => {
        console.log(
          `${P} ✅ Playing audio for ${identity} (${sid}) [attempt ${attempt + 1}]`,
        )

        // Log post-play state for debugging
        const tracks = el.srcObject?.getTracks?.() ?? []
        console.log(`${P} 📋 Post-play state for ${identity}:`, {
          paused: el.paused,
          readyState: el.readyState,
          volume: el.volume,
          muted: el.muted,
          tracks: tracks.map((t) => ({
            readyState: t.readyState,
            enabled: t.enabled,
            muted: t.muted,
          })),
        })
      })
      .catch((err) => {
        console.warn(
          `${P} ⚠️ play() failed for ${identity} (${sid}) [attempt ${attempt + 1}]:`,
          err.message,
        )
        playWithRetry(el, sid, identity, attempt + 1)
      })
  }, delays[attempt])
}
