import { createContext, useContext } from "react"

const AuthModalContext = createContext(null)

export const useAuthModal = () => {
  const context = useContext(AuthModalContext)
  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider")
  }
  return context
}

export default AuthModalContext
