const mongoose = require("mongoose");

const userProjects = new mongoose.Schema({
	title: { type: String, required: true },
	ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Projects = mongoose.model("Projects", userProjects);

module.exports = Projects;
