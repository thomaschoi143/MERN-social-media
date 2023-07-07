import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "slices/userSlice";
import { useGetUserFriendsMutation } from "slices/usersApiSlice";

const FriendListWidget = ({ userId }) => {
	const dispatch = useDispatch();
	const { palette } = useTheme();
	const friends = useSelector((state) => state.user.userInfo.friends);

	const [getUserFriend] = useGetUserFriendsMutation();

	const getFriends = async () => {
		const data = await getUserFriend({ id: userId }).unwrap();
		dispatch(setFriends({ friends: data }));
	};

	useEffect(() => {
		getFriends();
	}, []); //eslint-disable-line react-hooks/exhaustive-deps

	return (
		<WidgetWrapper>
			<Typography
				color={palette.neutral.dark}
				varient="h5"
				fontWeight="500"
				sx={{ mb: "1.5rem" }}
			>
				Friend List
			</Typography>
			<Box display="flex" flexDirection="column" gap="1.5rem">
				{friends.map((friend) => (
					<Friend
						key={friend._id}
						friendId={friend._id}
						name={`${friend.firstName} ${friend.lastName}`}
						subtitle={friend.occupation}
						userPicturePath={friend.picturePath}
					/>
				))}
			</Box>
		</WidgetWrapper>
	);
};

export default FriendListWidget;
