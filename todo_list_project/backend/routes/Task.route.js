import express from "express";

import { createTask, deleteTask, getTask, updateTask ,markTaskAsDone , reactivateTask ,deleteAcount} from "../controllers/Task.controller.js";

const router = express.Router();

router.get("/:userId", getTask);
router.post("/", createTask);
router.put("/update", updateTask); 
router.put("/reactivate", reactivateTask); 
router.put("/mark-done", markTaskAsDone);
router.delete("/deleteTask", deleteTask);
router.delete("/deleteAcount", deleteAcount);


export default router;
