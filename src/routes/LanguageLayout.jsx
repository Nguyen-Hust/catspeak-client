import { useParams, Navigate, Outlet } from "react-router-dom"

const SUPPORTED_LANGUAGES = ["en", "zh", "vi"]

const LanguageLayout = () => {
  const { lang } = useParams()

  // Validate language
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return <Navigate to="/en" replace />
  }

  // Pass language down via Outlet context
  return <Outlet context={{ lang }} />
}

export default LanguageLayout
