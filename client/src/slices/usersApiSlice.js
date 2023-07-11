import { apiSlice } from "./apiSlice";

const USERS_URL = "/users";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.id}`,
				method: "GET",
				credentials: "include",
			}),
		}),
		getUserFriends: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.id}/friends`,
				method: "GET",
				credentials: "include",
			}),
		}),
		addRemoveFriend: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.id}/${data.friendId}`,
				method: "PATCH",
				credentials: "include",
			}),
		}),
	}),
});

export const { useGetUserMutation, useGetUserFriendsMutation, useAddRemoveFriendMutation } =
	usersApiSlice;
