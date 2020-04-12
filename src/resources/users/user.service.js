const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
// here data processing before the database or client

const getAllUsers = async () => usersRepo.getAllUsers();

const getUserById = async id => {
  try {
    const user = await usersRepo.getUserById(id);

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
const createUser = async user => usersRepo.createUser(user);
const updateUser = user => usersRepo.updateUser(user);
const deleteUser = async id => {
  try {
    const assigned = await tasksRepo.getAllUserTasks(id);

    Promise.all(
      assigned.map(async task => {
        tasksRepo.updateTask({ ...task, userId: null });
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
