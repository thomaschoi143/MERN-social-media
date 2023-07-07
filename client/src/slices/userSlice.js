import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	mode: "light",
	userInfo: null,
	posts: [],
};

export const authSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		setLogin: (state, action) => {
			state.userInfo = action.payload.user;
		},
		setLogout: (state) => {
			state.userInfo = null;
		},
		setFriends: (state, action) => {
			if (state.userInfo) {
				state.userInfo.friends = action.payload.friends;
			} else {
				console.error("user friends non-existent");
			}
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		setPost: (state, action) => {
			const updatedPosts = state.posts.map((post) => {
				if (post._id === action.payload.post._id) return action.payload.post;
				return post;
			});
			state.posts = updatedPosts;
		},
	},
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
