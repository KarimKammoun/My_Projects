import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors';

import { connectDB } from "./config/db.js";

import TaskRoutes from "./routes/Task.route.js";
import SignIn from "./routes/SignIn.route.js";
import SignUp from "./routes/SignUp.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const __dirname = path.resolve();

app.use(express.json()); 
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use("/api/tasks", TaskRoutes);
app.use("/api/SignIn", SignIn);
app.use("/api/SignUp", SignUp);




app.listen(PORT, (req,res) => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});


