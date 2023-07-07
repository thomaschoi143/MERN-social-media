import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "slices/userSlice";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useAddRemoveFriendMutation } from "slices/usersApiSlice";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { _id } = useSelector((state) => state.user.userInfo);
	const friends = useSelector((state) => state.user.userInfo.friends);

	const { palette } = useTheme();
	const primaryLight = palette.primary.light;
	const primaryDark = palette.primary.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	const isFriend = friends.find((friend) => friend._id === friendId);

	const [addRemoveFriend] = useAddRemoveFriendMutation();

	const patchFriend = async () => {
		const data = await addRemoveFriend({ id: _id, friendId: friendId }).unwrap();
		dispatch(setFriends({ friends: data }));
	};

	return (
		<FlexBetween>
			<FlexBetween gap="1rem">
				<UserImage image={userPicturePath} size="55px" />
				<Box
					onClick={() => {
						navigate(`/profile/${friendId}`);
						navigate(0);
					}}
				>
					<Typography
						color={main}
						variant="h5"
						fontWeight="500"
						sx={{
							"&:hover": {
								color: palette.primary.light,
								cursor: "pointer",
							},
						}}
					>
						{name}
					</Typography>
					<Typography color={medium} fontSize="0.75rem">
						{subtitle}
					</Typography>
				</Box>
			</FlexBetween>
			<IconButton
				onClick={() => patchFriend()}
				sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
			>
				{isFriend ? (
					<PersonRemoveOutlined sx={{ color: primaryDark }} />
				) : (
					<PersonAddOutlined sx={{ color: primaryDark }} />
				)}
			</IconButton>
		</FlexBetween>
	);
};

export default Friend;
