const db = [];
// appeal to the database here

const getAllUsers = async () => db;

const getUserById = async id => db.find(item => item.id === id);

const createUser = async user => db.push(user);

const updateUser = async user => {
  const item = await getUserById(user.id);
  const index = db.indexOf(item);
  db[index] = user;
};

const deleteUser = async id => {
  const item = await getUserById(id);
  const index = db.indexOf(item);

  db.splice(index, 1);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
