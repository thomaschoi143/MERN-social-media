import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "slices/userSlice";
import PostWidget from "./PostWidget";
import { useGetFeedPostsMutation, useGetUserPostsMutation } from "slices/postsApiSlice";

const PostsWidget = ({ userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.user.posts);
	const [getFeedPosts] = useGetFeedPostsMutation();
	const [getUserPosts] = useGetUserPostsMutation();

	const getPostsHandler = async () => {
		const data = await getFeedPosts().unwrap();
		dispatch(setPosts({ posts: data }));
	};

	const getUserPostsHandler = async () => {
		const data = await getUserPosts({ id: userId }).unwrap();
		dispatch(setPosts({ posts: data }));
	};

	useEffect(() => {
		if (isProfile) {
			getUserPostsHandler();
		} else {
			getPostsHandler();
		}
	}, []); //eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{posts.map(
				({
					_id,
					userId,
					firstName,
					lastName,
					description,
					location,
					picturePath,
					userPicturePath,
					likes,
					comments,
				}) => (
					<PostWidget
						key={_id}
						postId={_id}
						postUserId={userId}
						name={`${firstName} ${lastName}`}
						description={description}
						location={location}
						picturePath={picturePath}
						userPicturePath={userPicturePath}
						likes={likes}
						comments={comments}
					/>
				)
			)}
		</>
	);
};

export default PostsWidget;
