import { useLocation } from "react-router-dom"

/**
 * Custom hook to check if a navigation item is active
 * @param {string} key - The navigation key (e.g., 'community', 'catSpeak')
 * @returns {boolean} - True if the item is active
 */
export const useActiveLink = (key) => {
  const location = useLocation()

  if (key === "community") {
    return location.pathname.includes("/community")
  }

  if (key === "catSpeak") {
    return location.pathname.includes("/cat-speak")
  }

  if (key === "cart") {
    return location.pathname.startsWith("/cart")
  }

  if (key === "connect") {
    return location.pathname.startsWith("/connect")
  }

  return false
}
