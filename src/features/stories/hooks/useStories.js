import { useState } from "react"
import dayjs from "dayjs"
import { useDispatch } from "react-redux"
import { setActiveConversation } from "@/store/slices/messageWidgetSlice"
import {
  useGetStoriesQuery,
  useGetMyStoriesQuery,
  useCreateStoryMutation,
  useInteractWithStoryMutation,
  useDeleteStoryMutation,
} from "@/store/api/storiesApi"

const useStories = (languageCommunity) => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState("")

  // API Hooks
  const { data: storiesData, isLoading: loadingStories } =
    useGetStoriesQuery(languageCommunity)
  const { data: myStoriesData, isLoading: loadingMyStories } =
    useGetMyStoriesQuery(languageCommunity)
  const [createStory, { isLoading: isCreating }] = useCreateStoryMutation()
  const [interactWithStory] = useInteractWithStoryMutation()
  const [deleteStory] = useDeleteStoryMutation()

  // Safe Data Extraction
  const stories = storiesData?.data ?? []
  const myStoriesRaw = myStoriesData?.data ?? []

  // Filter out expired stories
  const myStories = myStoriesRaw.filter((story) => {
    return dayjs(story.expiresAt).isAfter(dayjs())
  })

  // Derived State
  const canCreate = myStories.length < 2

  // Handlers
  const handleCreate = async (content) => {
    if (!content.trim()) return

    if (!canCreate) {
      return
    }

    try {
      await createStory({
        storyContent: content,
        languageCommunity,
      }).unwrap()

      setInputValue("")
    } catch (error) {}
  }

  const handleInteract = async (storyId, actionType) => {
    // actionType: 1 = Accept/Interest, 0 = Decline/Ignore, 2 = Decline?
    // Based on user request info: 1 = Accept, 2 = Decline
    try {
      const response = await interactWithStory({
        storyId,
        action: actionType,
      }).unwrap()

      // If accepted provided, open conversation (assuming response structure matches requirements)
      if (
        actionType === 1 &&
        response.success &&
        response.data?.conversationId
      ) {
        dispatch(setActiveConversation(response.data.conversationId))
      }
    } catch (error) {
      console.error("Interaction failed:", error)
    }
  }

  const handleDelete = async (storyId) => {
    try {
      await deleteStory(storyId).unwrap()
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

  return {
    stories,
    myStories,
    inputValue,
    setInputValue,
    handleCreate,
    handleInteract,
    handleDelete,
    loadingStories,
    loadingMyStories,
    isCreating,
  }
}

export default useStories
