const db = [
  {
    id: '1',
    name: 'string',
    login: 'string'
  }
];
// appeal to the database here

const getAllUsers = async () => db;

const getUserById = async id => {
  const user = db.find(item => item.id === id);

  if (!user) {
    return false;
  }

  return user;
};

const createUser = async user => db.push(user);

const updateUser = async user => {
  const item = await getUserById(user.id);
  const index = db.indexOf(item);
  db[index] = user;
};

const deleteUser = async id => {
  const user = await getUserById(id);

  if (!user) {
    return false;
  }

  const index = db.indexOf(user);

  db.splice(index, 1);

  return true;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
