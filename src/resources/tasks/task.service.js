const tasksRepo = require('./task.memory.repository');

const getAllTasks = () => tasksRepo.getAllTasks();
const getTaskById = (id, boardId) => tasksRepo.getTaskById(id, boardId);
const createTask = task => tasksRepo.createTask(task);
const updateTask = task => tasksRepo.updateTask(task);
const deleteTask = (id, boardId) => tasksRepo.deleteTask(id, boardId);

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
