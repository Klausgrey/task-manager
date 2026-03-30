const mongoose = require("mongoose");

const projectTasks = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Projects" },
	status: {
		type: String,
		enum: ["undone", "in-progress", "done"],
		default: "undone",
	},
});

const Tasks = mongoose.model("Tasks", projectTasks);

module.exports = Tasks;
