import { useEffect, useState } from "react"

export const useSessionTimer = (session) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    if (!session?.startTime || !session?.maxDurationMinutes) return

    const start = new Date(session.startTime).getTime()
    const maxSeconds = session.maxDurationMinutes * 60

    const updateElapsed = () => {
      const now = Date.now()
      const diff = Math.max(0, Math.floor((now - start) / 1000))
      setElapsedSeconds(diff > maxSeconds ? maxSeconds : diff)
    }

    updateElapsed()
    const intervalId = setInterval(updateElapsed, 1000)

    return () => clearInterval(intervalId)
  }, [session?.startTime, session?.maxDurationMinutes])

  const formatDuration = (totalSeconds) => {
    const safeSeconds = Math.max(0, Math.floor(totalSeconds || 0))
    const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0")
    const seconds = String(safeSeconds % 60).padStart(2, "0")
    return `${minutes}:${seconds}`
  }

  const formattedElapsed = formatDuration(elapsedSeconds)
  const formattedMax = session?.maxDurationMinutes
    ? formatDuration(session.maxDurationMinutes * 60)
    : null

  return {
    elapsedSeconds,
    formattedElapsed,
    formattedMax,
  }
}
