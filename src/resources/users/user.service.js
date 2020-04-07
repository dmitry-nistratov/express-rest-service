const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
// here data processing before the database or client

const getAllUsers = () => usersRepo.getAllUsers();
const getUserById = id => usersRepo.getUserById(id);
const createUser = user => usersRepo.createUser(user);
const updateUser = user => usersRepo.updateUser(user);
const deleteUser = async id => {
  try {
    const tasks = await tasksRepo.getAllTasks();
    const assigned = tasks.filter(task => task.userId === id);

    await assigned.forEach(async task => {
      tasksRepo.updateTask({ ...task, userId: null });
    });

    await usersRepo.deleteUser(id);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
