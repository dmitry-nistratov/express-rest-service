const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAllBoards = () => boardsRepo.getAllBoards();
const getBoardById = id => boardsRepo.getBoardById(id);
const createBoard = board => boardsRepo.createBoard(board);
const updateBoard = board => boardsRepo.updateBoard(board);
const deleteBoard = async id => {
  tasksRepo.deleteBoardTasks(id);
  const result = await boardsRepo.deleteBoard(id);

  return result;
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
