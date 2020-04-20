const User = require('./user.model');
// appeal to the database here

const getAllUsers = async () => User.find({});

const getUserById = async id => User.findById(id);

const createUser = async user => User.create(user);

const updateUser = async user => User.updateOne({ _id: user.id }, user);

const deleteUser = async id => (await User.deleteOne({ _id: id })).deletedCount;

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
