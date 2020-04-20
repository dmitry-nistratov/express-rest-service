const Task = require('./task.model');

const getAllTasks = () => Task.find({});

const getTaskById = (id, boardId) => Task.findOne({ _id: id, boardId });

const createTask = task => Task.create(task);

const updateTask = async task =>
  (await Task.updateOne({ _id: task.id, boardId: task.boardId }, task))
    ? task
    : false;

const deleteTask = async (id, boardId) =>
  (await Task.deleteOne({ _id: id, boardId })).deletedCount;

const deleteBoardTasks = id => Task.deleteMany({ boardId: id });

const getAllUserTasks = id => Task.find({ userId: id });

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteBoardTasks,
  getAllUserTasks
};
