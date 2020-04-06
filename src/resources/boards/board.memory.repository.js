const boards = [
  {
    id: '1',
    title: 'Board1',
    columns: { id: '472347981479', title: 'column1', order: '1' }
  },
  {
    id: '2',
    title: 'Board2',
    columns: { id: '2', title: 'column2', order: '2' }
  }
];
// обращение к БД тут

const getAll = async () => boards;

const getById = async id => boards.find(item => item.id === id);

const save = async board => boards.push(board);

const update = async board => {
  const item = await getById(board.id);
  const index = boards.indexOf(item);
  boards[index] = board;
};

const deleteItem = async id => {
  const board = await getById(id);

  if (!board) {
    return false;
  }
  const index = boards.indexOf(board);
  boards.splice(index, 1);

  return true;
};

module.exports = { getAll, getById, save, update, deleteItem };
