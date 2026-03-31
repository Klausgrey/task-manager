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

mongoose
	.connect(MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

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

app.post("/projects", verifyToken, async (req, res) => {
	const { title } = req.body;
	const userId = req.user.id;

	try {
		await Projects.create({ title, ownerId: userId });
		res.json({ message: "Project created successfully" });
	} catch (err) {
		res.json({ err });
	}
});

app.get("/projects", verifyToken, async (req, res) => {
	const userId = req.user.id;

	try {
		const result = await Projects.find({ ownerId: userId });
		res.json({ result });
	} catch (err) {
		res.json({ err });
	}
});

app.delete("/projects/:id", verifyToken, async (req, res) => {
	const projectId = req.params.id;
	const userId = req.user.id;

	try {
		const check = await Projects.findById(projectId);
		if (!check) {
			return res.status(404);
		}
		if (check.ownerId !== userId)
			return res.status(403).json({ message: "Forbidden" });

		await Projects.findByIdAndDelete(projectId);
		res.json({ message: "Deleted successfully" });
	} catch (err) {
		res.json({ err });
	}
});

app.listen(3000);
