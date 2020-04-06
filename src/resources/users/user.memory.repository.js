const db = [
  {
    id: '1',
    name: 'Dima',
    login: 'dima '
  },
  {
    id: '2',
    name: 'Dima2',
    login: 'dima2 '
  }
];
// обращение к БД тут

const getAll = async () => db;

const getById = async id => db.find(item => item.id === id);

const save = async user => db.push(user);

const update = async user => {
  const item = await getById(user.id);
  const index = db.indexOf(item);
  db[index] = user;
};

const deleteItem = async id => {
  const item = await getById(id);
  const index = db.indexOf(item);
  db.splice(index, 1);

  return db;
};

module.exports = { getAll, getById, save, update, deleteItem };
