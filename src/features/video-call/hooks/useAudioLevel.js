import { useState, useEffect, useRef, useCallback } from "react"

// ─── Shared AudioContext singleton ───────────────────────────────────────────
let sharedAudioContext = null

const getAudioContext = () => {
  if (!sharedAudioContext || sharedAudioContext.state === "closed") {
    sharedAudioContext = new (
      window.AudioContext || window.webkitAudioContext
    )()
  }
  return sharedAudioContext
}

// ─── Hook ────────────────────────────────────────────────────────────────────
const useAudioLevel = (audioTrack) => {
  const [level, setLevel] = useState(0)

  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const rafRef = useRef(null)
  const lastLevelRef = useRef(0)

  // Stable reference to the setup routine so the statechange listener can
  // call it without going through a stale closure.
  const audioTrackRef = useRef(audioTrack)
  audioTrackRef.current = audioTrack

  const cleanup = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (sourceRef.current) {
      try { sourceRef.current.disconnect() } catch { /* already disconnected */ }
      sourceRef.current = null
    }
    if (analyserRef.current) {
      try { analyserRef.current.disconnect() } catch { /* already disconnected */ }
      analyserRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!audioTrack) {
      cleanup()
      setLevel(0)
      return
    }

    // ── Wire up the AnalyserNode ──────────────────────────────────────────
    const wireAnalyser = () => {
      const track = audioTrackRef.current
      if (!track) return

      const audioContext = getAudioContext()

      // If still suspended we can't wire yet — the statechange listener
      // below will call us back once the user interacts.
      if (audioContext.state !== "running") return

      // Already wired for this track
      if (analyserRef.current && sourceRef.current) return

      // Clean up any stale nodes before creating new ones
      cleanup()

      try {
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 256
        analyser.smoothingTimeConstant = 0.8

        const stream = new MediaStream([track])
        const source = audioContext.createMediaStreamSource(stream)
        source.connect(analyser)

        analyserRef.current = analyser
        sourceRef.current = source

        const dataArray = new Uint8Array(analyser.fftSize)
        let lastUpdate = 0

        const update = (timestamp) => {
          if (!analyserRef.current) return

          // Throttle state updates to ~15 fps — plenty for a visual indicator
          // but avoids 60 renders/sec per participant.
          if (timestamp - lastUpdate > 66) {
            analyser.getByteTimeDomainData(dataArray)

            let sum = 0
            for (let i = 0; i < dataArray.length; i++) {
              const normalized = (dataArray[i] - 128) / 128
              sum += normalized * normalized
            }

            const rms = Math.sqrt(sum / dataArray.length)
            const newLevel = rms * 100

            // Only trigger a React re-render when the level crosses the
            // speaking threshold (hysteresis: on at 5, off at 3) or changes
            // meaningfully while speaking.
            const wasSpeaking = lastLevelRef.current > 5
            const isSpeaking = newLevel > (wasSpeaking ? 3 : 5)

            if (isSpeaking !== wasSpeaking || (isSpeaking && Math.abs(newLevel - lastLevelRef.current) > 3)) {
              lastLevelRef.current = newLevel
              setLevel(newLevel)
            }

            lastUpdate = timestamp
          }

          rafRef.current = requestAnimationFrame(update)
        }

        rafRef.current = requestAnimationFrame(update)
      } catch (err) {
        console.error("AudioLevel error:", err)
      }
    }

    // ── Kick off + listen for AudioContext resuming after user gesture ─────
    const audioContext = getAudioContext()

    // Try to resume (will only succeed after a user gesture)
    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {})
    }

    wireAnalyser()

    // This is the key fix: if AudioContext was suspended at mount time,
    // the statechange event will fire once the browser allows it to run
    // (after a click / tap / keypress) and we retry wiring automatically.
    const onStateChange = () => {
      if (audioContext.state === "running") {
        wireAnalyser()
      }
    }
    audioContext.addEventListener("statechange", onStateChange)

    return () => {
      audioContext.removeEventListener("statechange", onStateChange)
      cleanup()
    }
  }, [audioTrack, cleanup])

  return level
}

export default useAudioLevel
