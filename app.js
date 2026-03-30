const express = require("express");
require("dotenv/config");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv/config");
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

const User = require("./models/user");
const Projects = require("./models/projects");
const Tasks = require("./models/task");
const verifyToken = require("./middleware/auth");

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
	const { username, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await User.create({ username, password: hashedPassword });
		res.json({ message: "You registered successfully" });
	} catch (err) {
		res.json({ err });
	}
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.json({ message: "User not found" });
		}
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.json({ message: "wrong password" });
		}
		const token = jwt.sign(
			{ id: user.id, username: user.username },
			JWT_SECRET,
		);
		return res.json({ token });
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
});
mongoose
	.connect(MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

app.listen(3000);
