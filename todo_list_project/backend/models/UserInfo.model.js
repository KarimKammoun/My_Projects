import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        UserId: {
            type: String,
            required: true,
        },
        FirstName: {
            type: String,
            required: true,
        },
        LastName: {
            type: String,
            required: true,
        },        
        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,

        }
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

const Info = mongoose.model("Info", taskSchema);

export default Info;