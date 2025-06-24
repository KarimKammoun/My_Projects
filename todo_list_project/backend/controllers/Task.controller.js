import mongoose from "mongoose";
import task from "../models/Task.model.js";

export const getTask = async (req, res) => {
	try {
		const tasks = await task.find({});
		res.status(200).json({ success: true, data: tasks });
	} catch (error) {
		console.log("error in fetching Tasks:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createTask = async (req, res) => {
	const taskData = req.body; // user will send this data

	if (!taskData.input || !taskData.difficulty) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}
	

	const newTask = new task({ input: taskData.input, difficulty: taskData.difficulty });

	try {
		await newTask.save();
		res.status(201).json({ success: true, data: newTask });
	} catch (error) {
		console.error("Error in Create task:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};



export const updateTask = async (req, res) => {
	const { id } = req.params;

	const taskData = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Task Id" });
	}

	try {
		const updatedTask = await task.findByIdAndUpdate(id, taskData, { new: true });
		res.status(200).json({ success: true, data: updatedTask });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteTask = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Task Id" });
	}

	try {
		await task.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Task deleted" });
	} catch (error) {
		console.log("error in deleting task:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
