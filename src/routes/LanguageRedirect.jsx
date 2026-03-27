import { Navigate } from "react-router-dom"

const LanguageRedirect = () => {
  // Detect browser language or use default
  const browserLang = navigator.language.split("-")[0] // e.g., "en", "zh", "vi"
  const supportedLangs = ["en", "zh", "vi"]
  const defaultLang = supportedLangs.includes(browserLang) ? browserLang : "en"

  return <Navigate to={`/${defaultLang}`} replace />
}

export default LanguageRedirect
