// controllers/taskController.js
const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { taskName, taskStatus } = req.body;

  try {
    console.log(taskStatus.to +" 1");
    //const newTask = new Task({ taskName, taskStatus });
    //await newTask.save();
     // Create a new task
     const normalizedTaskStatus = taskStatus.toUpperCase();

     const task = await Task.create({ taskName, taskStatus: normalizedTaskStatus });
        //res.status(200).json(task);
    console.log(task +" 1");
    res.status(200).json(task);
  } catch (error) {
    console.log(error.message +" 1e");
    res.status(400).json({ message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { taskName, taskStatus } = req.body;
  console.log(id+" u");
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { taskName, taskStatus },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
console.log(id+" d");
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
