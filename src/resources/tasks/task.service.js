const tasksRepo = require('./task.memory.repository');
// тут обработка данных перед бд или клиентом

const getAll = () => tasksRepo.getAll();
const getById = id => tasksRepo.getById(id);
const save = task => tasksRepo.save(task);
const update = task => tasksRepo.update(task);
const deleteItem = id => tasksRepo.deleteItem(id);

module.exports = { getAll, getById, save, update, deleteItem };
