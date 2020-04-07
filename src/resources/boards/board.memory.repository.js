const boards = [];

const getAllBoards = async () => boards;

const getBoardById = async id => boards.find(item => item.id === id);

const createBoard = async board => boards.push(board);

const updateBoard = async board => {
  const item = await getBoardById(board.id);
  const index = boards.indexOf(item);
  boards[index] = board;
};

const deleteBoard = async id => {
  const board = await getBoardById(id);

  if (!board) {
    throw new Error('Board not found');
  }

  const index = boards.indexOf(board);

  boards.splice(index, 1);
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
