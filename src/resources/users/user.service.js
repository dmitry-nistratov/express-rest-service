const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
// тут обработка данных перед бд или клиентом

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const save = user => usersRepo.save(user);
const update = user => usersRepo.update(user);
const deleteItem = async id => {
  await tasksRepo
    .getAll()
    .then(tasks => tasks.filter(task => task.userId === id))
    .then(assigned => {
      assigned.forEach(item => {
        // eslint-disable-next-line no-unused-vars
        const { userId, ...rest } = item;

        tasksRepo.update({ ...rest, userId: null });
      });
    });

  return await usersRepo.deleteItem(id);
};

module.exports = { getAll, getById, save, update, deleteItem };
