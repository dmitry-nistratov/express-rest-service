const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
// тут обработка данных перед бд или клиентом

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const save = board => boardsRepo.save(board);
const update = board => boardsRepo.update(board);
const deleteItem = id => {
  tasksRepo.deleteBoardTasks(id);
  return boardsRepo.deleteItem(id);
};

module.exports = { getAll, getById, save, update, deleteItem };
