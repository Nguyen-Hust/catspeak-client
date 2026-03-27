/**
 * Date and Time Formatting Utilities
 * Provides consistent date/time formatting across the application
 * Uses the user's browser locale for automatic localization
 */

/**
 * Get the user's locale from the browser
 * Falls back to 'en-US' if not available
 */
export const getUserLocale = () => {
  return navigator.language || navigator.userLanguage || "en-US"
}

/**
 * Format a date to localized date string
 * @param {Date|string} date - Date object or ISO string
 * @param {string} locale - Optional locale override (defaults to user's browser locale)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = getUserLocale()) => {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString(locale)
}

/**
 * Format a date to localized time string
 * @param {Date|string} date - Date object or ISO string
 * @param {string} locale - Optional locale override (defaults to user's browser locale)
 * @returns {string} Formatted time string (HH:MM)
 */
export const formatTime = (date, locale = getUserLocale()) => {
  if (!date) return ""
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

/**
 * Format a date to localized date and time string
 * @param {Date|string} date - Date object or ISO string
 * @param {string} locale - Optional locale override (defaults to user's browser locale)
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date, locale = getUserLocale()) => {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * Format a time range (start - end)
 * @param {Date|string} startDate - Start date object or ISO string
 * @param {Date|string} endDate - End date object or ISO string
 * @param {string} locale - Optional locale override (defaults to user's browser locale)
 * @returns {string} Formatted time range string (HH:MM - HH:MM)
 */
export const formatTimeRange = (
  startDate,
  endDate,
  locale = getUserLocale(),
) => {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate
  const end = typeof endDate === "string" ? new Date(endDate) : endDate

  return `${formatTime(start, locale)} - ${formatTime(end, locale)}`
}

/**
 * Calculate end date based on start date and duration in minutes
 * @param {Date|string} startDate - Start date object or ISO string
 * @param {number} durationMinutes - Duration in minutes
 * @returns {Date} End date
 */
export const calculateEndDate = (startDate, durationMinutes) => {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate
  return new Date(start.getTime() + durationMinutes * 60000)
}
