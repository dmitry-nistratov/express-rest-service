const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');
const Task = require('../tasks/task.model');
// here data processing before the database or client

const getAllUsers = () => usersRepo.getAllUsers();

const getUserById = async id => {
  try {
    const user = await usersRepo.getUserById(id);

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
const createUser = user => usersRepo.createUser(user);
const updateUser = user => usersRepo.updateUser(user);
const deleteUser = async id => {
  try {
    const assigned = await tasksRepo.getAllUserTasks(id);
    Promise.all(
      assigned.map(async task => {
        await tasksRepo.updateTask({ ...Task.toResponse(task), userId: null });
      })
    );

    const result = await usersRepo.deleteUser(id);

    return result;
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
