import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
	let token;
	token = req.cookies.jwt;

	if (!token) {
		return res.status(403).send("Not authorized, no token");
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// req.user = decoded;
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
