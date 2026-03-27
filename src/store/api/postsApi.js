import { baseApi } from "./baseApi"

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ page = 1, pageSize = 10 } = {}) => ({
        url: "/Post",
        params: { page, pageSize },
      }),
      providesTags: ["Post"],
    }),
    getPostById: builder.query({
      query: (postId) => `/Post/${postId}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    reactToPost: builder.mutation({
      query: ({ postId, type }) => ({
        url: `/Post/${postId}/react`,
        method: "POST",
        params: { type },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
        "Post",
      ],
    }),
  }),
})

export const { useGetPostsQuery, useGetPostByIdQuery, useReactToPostMutation } =
  postsApi
