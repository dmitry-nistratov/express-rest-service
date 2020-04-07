const tasksRepo = require('./task.memory.repository');

const getAllTasks = () => tasksRepo.getAllTasks();
const getTaskById = id => tasksRepo.getTaskById(id);
const createTask = task => tasksRepo.createTask(task);
const updateTask = task => tasksRepo.updateTask(task);
const deleteTask = id => tasksRepo.deleteTask(id);

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
