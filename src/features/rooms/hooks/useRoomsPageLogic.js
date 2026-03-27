import { useCreateVideoSessionMutation } from "@/store/api/videoSessionsApi"
import { useAuthModal } from "@/shared/context/AuthModalContext"
import { useAuth } from "@/features/auth"
import { useState } from "react"

export const useRoomsPageLogic = () => {
  const { isAuthenticated } = useAuth()
  const { openAuthModal } = useAuthModal()
  const [createVideoSession, { isLoading: isCreating }] =
    useCreateVideoSessionMutation()

  // Business loading states
  const [isCreatingOneOnOne, setIsCreatingOneOnOne] = useState(false)
  const [isCreatingStudyGroup, setIsCreatingStudyGroup] = useState(false)

  const handleCreateOneOnOneSession = (onSuccess) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Show login popup instead of navigating to login page
      openAuthModal("login")
      return
    }
    // If authenticated, trigger success
    onSuccess?.()
  }

  const handleCreateStudyGroupSession = (onSuccess) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      openAuthModal("login")
      return
    }

    // trigger success
    onSuccess?.()
  }

  return {
    state: {
      isCreating: isCreating || isCreatingOneOnOne || isCreatingStudyGroup,
      isCreatingOneOnOne,
      isCreatingStudyGroup,
    },
    actions: {
      handleCreateOneOnOneSession,
      handleCreateStudyGroupSession,
    },
  }
}
