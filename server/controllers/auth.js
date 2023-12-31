import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

/* REGISTER USER */
export const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password, picturePath, friends, location, occupation } =
			req.body;

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			picturePath,
			friends,
			location,
			occupation,
			viewedProfile: Math.floor(Math.random() * 10000),
			impressions: Math.floor(Math.random() * 10000),
		});
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/* LOGGING IN */
export const login = asyncHandler(async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email }).lean();

		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ msg: "Invalid credentials." });
		}

		generateToken(res, user._id);
		delete user.password;

		res.status(201).json({ user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

/* LOGGING OUT */
export const logout = async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: "User logged out" });
};
