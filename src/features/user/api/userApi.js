import { baseApi } from "@/store/api/baseApi"

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/api/user-profile",
        method: "GET",
      }),
      providesTags: ["UserProfile"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/api/user-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
})

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi
