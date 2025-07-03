import express from "express";

<<<<<<< HEAD
import { createTask, deleteTask, getTask, updateTask ,markTaskAsDone , reactivateTask} from "../controllers/Task.controller.js";
=======
import { createTask, deleteTask, getTask, updateTask ,markTaskAsDone , reactivateTask ,deleteAcount} from "../controllers/Task.controller.js";
>>>>>>> master

const router = express.Router();

router.get("/:userId", getTask);
router.post("/", createTask);
router.put("/update", updateTask); 
router.put("/reactivate", reactivateTask); 
router.put("/mark-done", markTaskAsDone);
<<<<<<< HEAD
router.delete("/", deleteTask);
=======
router.delete("/deleteTask", deleteTask);
router.delete("/deleteAcount", deleteAcount);

>>>>>>> master

export default router;
