/**
 * Returns the absolute path to the community page in the correct language.
 * Reads from localStorage first, falls back to the provided language, then "en".
 *
 * @param {string} [language] - Optional fallback language code (e.g. "vi", "en")
 * @returns {string} e.g. "/en/community"
 */
export const getCommunityPath = (language) => {
  const lang = localStorage.getItem("communityLanguage") || language || "en"
  return `/${lang}/community`
}
