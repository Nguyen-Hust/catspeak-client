import React, { useState } from "react"
import { useLanguage } from "@/shared/context/LanguageContext"
import { useGetPostsQuery } from "@/store/api/postsApi"
import NewsCard from "../components/NewsCard"
import LoadingSpinner from "@/shared/components/ui/indicators/LoadingSpinner"
import ErrorMessage from "@/shared/components/ui/indicators/ErrorMessage"
import EmptyState from "@/shared/components/ui/indicators/EmptyState"

const NewsPage = () => {
  const { t } = useLanguage()
  const [page, setPage] = useState(1)
  const pageSize = 10

  const { data, isLoading, error } = useGetPostsQuery({ page, pageSize })
  console.log(data)
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    if (error?.status === 404) {
      return <EmptyState message="No posts found" />
    }

    if (error?.status === 401) {
      return <EmptyState message={t.catSpeak.newsLoginPrompt} />
    }

    return <ErrorMessage message="Error loading posts" />
  }

  const posts = data?.data?.filter((post) => post.privacy === "Public") || []

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {posts.map((post) => (
        <NewsCard key={post.postId} news={post} />
      ))}
    </div>
  )
}

export default NewsPage
