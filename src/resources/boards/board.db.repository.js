const Board = require('./board.model');

const getAllBoards = () => Board.find({});

const getBoardById = id => Board.findById(id);

const createBoard = board => Board.create(board);

const updateBoard = board => Board.updateOne({ _id: board.id }, board);

const deleteBoard = async id =>
  (await Board.deleteOne({ _id: id })).deletedCount;

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
