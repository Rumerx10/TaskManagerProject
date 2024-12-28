import TaskModel from "../model/TaskModel.js";
import mongoose from "mongoose";
export const CreateTask = async (req, res) => {
  try {
    req.body.user_id = req.headers.user_id;
    const task = await TaskModel.create(req.body);
    res.json({ status: "success", message: "Task Created", data: task });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const UpdateTaskStatus = async (req, res) => {
  try {
    const task_id = req.params.task_id;
    const status = req.params.status;
    const result = await TaskModel.findByIdAndUpdate(
      task_id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!result) {
      return res.json({ status: "fail", message: "Task not found" });
    }
    res.json({
      status: "success",
      message: "Task Status Updated",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const TaskListByStatus = async (req, res) => {
  try {
    const user_id = req.headers.user_id;
    const status = req.params.status;
    const result = await TaskModel.find({ user_id, status });
    res.json({ status: "success", message: "Task By Status", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const DeleteTask = async (req, res) => {
  try {
    const task_id = req.params.task_id;
    const user_id = req.headers.user_id;
    const result = await TaskModel.findOneAndDelete({ _id: task_id, user_id });
    if (!result) {
      return res.json({ status: "fail", message: "Task not found" });
    } else {
      res.json({ status: "success", message: "Task Deleted", data: result });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const CountTask = async (req, res) => {
  let user_id = req.headers.user_id;
  user_id = new mongoose.Types.ObjectId(user_id);
  console.log("=============", user_id);
  const result = await TaskModel.aggregate([
    { $match: { user_id } },
    { $group: { _id: "$status", sum: { $sum: 1 } } },
  ]);
  res.json({ status: "success", message: "Task Count", data: result });
};
