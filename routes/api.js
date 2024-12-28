import express from "express";
const router = express.Router();

import * as UserController from "../app/controllers/UsersController.js";
import * as TaskController from "../app/controllers/TaskController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
// User
router.post("/registration", UserController.Registration);
router.post("/login", UserController.Login);
router.get("/profileDetails", AuthMiddleware, UserController.ProfileDetails);
router.put("/profileUpdate", AuthMiddleware, UserController.ProfileUpdate);

router.get("/emailVerify/:email", UserController.EmailVerify);
router.get("/codeVerify/:email/:code", UserController.CodeVerify);
router.post("/resetPassword", UserController.ResetPassword);

// Task
router.post("/createTask", AuthMiddleware, TaskController.CreateTask);
router.put(
  "/updateTaskStatus/:task_id/:status",
  AuthMiddleware,
  TaskController.UpdateTaskStatus
);
router.get(
  "/taskListByStatus/:status",
  AuthMiddleware,
  TaskController.TaskListByStatus
);
router.delete(
  "/deleteTask/:task_id",
  AuthMiddleware,
  TaskController.DeleteTask
);
router.get("/countTask", AuthMiddleware, TaskController.CountTask);

export default router;
