let tasks = [
  {
    id: '1',
    title: 'Task1',
    order: '1',
    description: 'Description1',
    userId: '1', // assignee
    boardId: '1',
    columnId: '1'
  },
  {
    id: '472347981479',
    title: 'Task2',
    order: '2',
    description: 'Description2',
    userId: '2', // assignee
    boardId: '2',
    columnId: '2'
  }
];
// обращение к БД тут

const getAll = async () => tasks;

const getById = async id => tasks.find(item => item.id === id);

const save = async user => {
  tasks.push(user);
};

const update = async user => {
  const item = await getById(user.id);
  const index = tasks.indexOf(item);
  tasks[index] = user;
};

const deleteItem = async id => {
  const task = await getById(id);

  if (!task) {
    return false;
  }

  const index = tasks.indexOf(task);
  tasks.splice(index, 1);

  return true;
};

const deleteBoardTasks = id => {
  tasks = tasks.filter(curr => curr.boardId !== id);
};

module.exports = {
  getAll,
  getById,
  save,
  update,
  deleteItem,
  deleteBoardTasks
};
