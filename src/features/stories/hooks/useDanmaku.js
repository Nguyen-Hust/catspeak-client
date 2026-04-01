import { useState, useRef, useEffect, useMemo } from "react"
import { generateDanmakuItems } from "../utils/danmaku"

/**
 * Hook that manages the danmaku stage sizing and item generation.
 *
 * @param {Array} combinedStories - Stories with isOwn flag
 * @returns {{ stageRef: React.RefObject, danmakuItems: Array }}
 */
const useDanmaku = (combinedStories) => {
  const stageRef = useRef(null)
  const [stageHeight, setStageHeight] = useState(400)

  // Track the actual stage height for positioning
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setStageHeight(entry.contentRect.height)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Generate danmaku items whenever stories or height change
  const danmakuItems = useMemo(
    () => generateDanmakuItems(combinedStories, stageHeight),
    [combinedStories, stageHeight],
  )

  return { stageRef, danmakuItems }
}

export default useDanmaku
