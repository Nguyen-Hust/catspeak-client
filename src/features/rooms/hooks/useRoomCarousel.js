import { useState, useMemo, useCallback } from "react"

/**
 * Manages pagination state for a carousel of items.
 * @param {Array} items - Full list of items to paginate
 * @param {number} itemsPerPage - Number of items visible per page
 * @returns {{ visibleItems, currentPage, totalPages, goNext, goPrev, canGoNext, canGoPrev }}
 */
const useRoomCarousel = (items, itemsPerPage) => {
  const [[currentPage, direction], setPage] = useState([0, 0])

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage],
  )

  const visibleItems = useMemo(
    () => items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
    [items, currentPage, itemsPerPage],
  )

  const canGoPrev = currentPage > 0
  const canGoNext = currentPage < totalPages - 1

  const goPrev = useCallback(() => {
    setPage(([p, d]) => (p > 0 ? [p - 1, -1] : [p, d]))
  }, [])

  const goNext = useCallback(() => {
    setPage(([p, d]) => (p < totalPages - 1 ? [p + 1, 1] : [p, d]))
  }, [totalPages])

  return { visibleItems, currentPage, direction, totalPages, goNext, goPrev, canGoNext, canGoPrev }
}

export default useRoomCarousel
