import { apiSlice } from "./apiSlice";

const POSTS_URL = "/posts";

export const postsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createPost: builder.mutation({
			query: (data) => ({
				url: `${POSTS_URL}/`,
				method: "POST",
				body: data,
			}),
		}),
		getFeedPosts: builder.mutation({
			query: (data) => ({
				url: `${POSTS_URL}/`,
				method: "GET",
			}),
		}),
		getUserPosts: builder.mutation({
			query: (data) => ({
				url: `${POSTS_URL}/${data.id}/posts`,
				method: "GET",
			}),
		}),
		likePost: builder.mutation({
			query: (data) => ({
				url: `${POSTS_URL}/${data.id}/like`,
				method: "PATCH",
				body: {
					userId: data.userId,
				},
			}),
		}),
	}),
});

export const {
	useCreatePostMutation,
	useGetFeedPostsMutation,
	useGetUserPostsMutation,
	useLikePostMutation,
} = postsApiSlice;
