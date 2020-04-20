const boardsRepo = require('./board.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAllBoards = () => boardsRepo.getAllBoards();
const getBoardById = id => boardsRepo.getBoardById(id);
const createBoard = board => boardsRepo.createBoard(board);
const updateBoard = board => boardsRepo.updateBoard(board);
const deleteBoard = async id => {
  const result = await boardsRepo.deleteBoard(id);

  if (result) {
    await tasksRepo.deleteBoardTasks(id);
  }

  return result;
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
