import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidge";
import { useGetUserMutation } from "slices/usersApiSlice";

const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const { userId } = useParams();
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

	const [getUserProfile] = useGetUserMutation();

	const getUser = async () => {
		const data = await getUserProfile({ id: userId }).unwrap();
		setUser(data);
	};

	useEffect(() => {
		getUser();
	}, []); //eslint-disable-line react-hooks/exhaustive-deps

	if (!user) return null;

	return (
		<Box>
			<Navbar />
			<Box
				width="100%"
				padding="2rem 6%"
				display={isNonMobileScreens ? "flex" : "block"}
				gap="2rem"
				justifyContent="center"
			>
				<Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
					<UserWidget user={user} />
					<Box m="2rem 0" />
					<FriendListWidget userId={userId} />
				</Box>

				<Box
					flexBasis={isNonMobileScreens ? "42%" : undefined}
					mt={isNonMobileScreens ? undefined : "2rem"}
				>
					<MyPostWidget userId={userId} picturePath={user.picturePath} />
					<Box m="2rem 0" />
					<PostsWidget userId={userId} isProfile />
				</Box>
			</Box>
		</Box>
	);
};

export default ProfilePage;
