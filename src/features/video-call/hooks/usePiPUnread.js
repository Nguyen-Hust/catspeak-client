import { useState, useEffect, useRef } from "react"

/**
 * Tracks unread message count while in PiP mode.
 *
 * Resets to 0 when leaving PiP. Counts only non-local messages.
 *
 * @param {Array} messages - Chat messages array from LiveKit
 * @param {boolean} isPiP - Whether PiP mode is currently active
 * @returns {number} unreadCount
 */
export const usePiPUnread = (messages, isPiP) => {
  const [unreadCount, setUnreadCount] = useState(0)
  const prevMsgLenRef = useRef(0)

  useEffect(() => {
    if (!isPiP) {
      prevMsgLenRef.current = messages?.length ?? 0
      setUnreadCount(0)
      return
    }

    const len = messages?.length ?? 0
    if (len > prevMsgLenRef.current) {
      let newUnread = 0
      for (let i = prevMsgLenRef.current; i < len; i++) {
        if (!messages[i].from?.isLocal) newUnread++
      }
      setUnreadCount((prev) => prev + newUnread)
    }
    prevMsgLenRef.current = len
  }, [messages, isPiP])

  return unreadCount
}
