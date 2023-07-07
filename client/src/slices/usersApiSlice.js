import { apiSlice } from "./apiSlice";

const USERS_URL = "/users";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.id}`,
				method: "GET",
			}),
		}),
		getUserFriends: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.id}/friends`,
				method: "GET",
			}),
		}),
		addRemoveFriend: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.id}/${data.friendId}`,
				method: "PATCH",
			}),
		}),
	}),
});

export const { useGetUserMutation, useGetUserFriendsMutation, useAddRemoveFriendMutation } =
	usersApiSlice;
