import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router.get("/task/all", getTasks);
router.post("/task/create", createTask);
router.get("/task/:id", getTask);
router.patch("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
