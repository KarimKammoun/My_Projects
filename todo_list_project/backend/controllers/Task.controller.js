import mongoose from "mongoose";
import task from "../models/Task.model.js";
import info from "../models/UserInfo.model.js";

export const getTask = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    const tasks = await task.find({ userId });

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.log("error in fetching Tasks:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const createTask = async (req, res) => {
  const { input, difficulty, userId , isdone } = req.body;

  if (!input || !difficulty || !userId) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newTask = new task({ input, difficulty, userId, isdone });
  console.log("New Task:", newTask);
  try {
    await newTask.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error("Error in Create task:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



export const updateTask = async (req, res) => {
  const taskData = req.body.data;

  try {
    const updatedTask = await task.findByIdAndUpdate(
      taskData.taskId,
      {
        input: taskData.text,
        difficulty: taskData.color
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.error("Erreur updateTask:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};




export const deleteTask = async (req, res) => {
	const { taskId } = req.body;

	if (!taskId) {
		return res.status(400).json({ success: false, message: "Missing task ID" });
	}

	try {
		await task.findByIdAndDelete(taskId);
		res.status(200).json({ success: true, message: "Task deleted" });
	} catch (error) {
		console.error("Error in deleting task:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};




export const markTaskAsDone = async (req, res) => {
  const { taskId } = req.body.data;

  if (!taskId) {
    return res.status(400).json({ success: false, message: "Missing task ID" });
  }

  try {
    const updatedTask = await task.findByIdAndUpdate(
      taskId,
      { isdone: true },
      { new: true }
    );
    
    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.error("Error in marking task as done:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}





export const reactivateTask = async (req, res) => {
  const { taskId } = req.body.data;

  if (!taskId) {
    return res.status(400).json({ success: false, message: "Missing task ID" });
  }

  try {
    const updatedTask = await task.findByIdAndUpdate(
      taskId,
      { isdone: false },
      { new: true }
    );
    
    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.error("Error in marking task as done:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}