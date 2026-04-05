import { useCallback, useEffect, useRef } from "react"

/**
 * Handles session cleanup on tab close / page hide.
 *
 * Uses `fetch(..., { keepalive: true })` so the request survives the
 * page unload. Tracks whether we've already left to avoid duplicate calls.
 *
 * @param {string|null} sessionId - Active session ID
 * @param {boolean} isInCall - Whether a call is currently active
 * @returns {{ hasLeftRef: React.MutableRefObject<boolean>, isLeavingRef: React.MutableRefObject<boolean> }}
 */
export const useCallCleanup = (sessionId, isInCall) => {
  const hasLeftRef = useRef(false)
  const isLeavingRef = useRef(false)

  // Reset refs when session changes
  useEffect(() => {
    if (sessionId) {
      hasLeftRef.current = false
      isLeavingRef.current = false
    }
  }, [sessionId])

  const leaveSessionOnUnload = useCallback(() => {
    if (!sessionId || hasLeftRef.current) return
    hasLeftRef.current = true

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api"
    const url = `${baseUrl}/video-sessions/${sessionId}/participants`
    const token = localStorage.getItem("token")

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      keepalive: true,
    }).catch(() => {})
  }, [sessionId])

  useEffect(() => {
    if (!isInCall) return
    const handler = () => leaveSessionOnUnload()
    window.addEventListener("beforeunload", handler)
    window.addEventListener("pagehide", handler)
    return () => {
      window.removeEventListener("beforeunload", handler)
      window.removeEventListener("pagehide", handler)
    }
  }, [isInCall, leaveSessionOnUnload])

  return { hasLeftRef, isLeavingRef }
}
