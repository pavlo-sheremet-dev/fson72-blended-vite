import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_ENDPOINT = "/comments";
const BASE_URL = "https://6393b5f2ab513e12c514f63c.mockapi.io/api";

export const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    // getComments: builder.query({query: () => '/comments'})
    getComments: builder.query({
      query: () => ({ url: API_ENDPOINT }),
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query: (newComment) => ({
        url: API_ENDPOINT,
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation({
      query: ({ id, ...comment }) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
