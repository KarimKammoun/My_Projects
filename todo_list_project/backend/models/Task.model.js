import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
	{
		input: {
			type: String,
			required: true,
		},
		difficulty: {
			type: String,
			required: true,

		},
		userId: {
			type: String,
			required: true,
		},
		
		isdone: {
			type: Boolean,
			default: false,
		}
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const task = mongoose.model("task", taskSchema);

export default task;
