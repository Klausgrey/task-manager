const jwt = require("jsonwebtoken");
require("dotenv/config");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
	const auth = req.headers.authorization;

	if (!auth) {
		return res.json({ message: "There was a error" });
	}

	const token = auth.split(" ")[1];
	if (!token) {
		return res.json({ message: "There was a error" });
	}

	try {
		const decode = jwt.verify(token, JWT_SECRET);
		req.user = decode;
		next();
	} catch (err) {
		res.json({ message: "There was a error" });
	}
};

module.exports = verifyToken