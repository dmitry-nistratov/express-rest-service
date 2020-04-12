let tasks = [
  {
    id: '1',
    title: 'string',
    order: 0,
    description: 'string',
    userId: '1',
    boardId: '1',
    columnId: '1'
  }
];

const getAllTasks = async () => tasks;

const getTaskById = async (id, boardId) => {
  const task = tasks.find(item => item.id === id && item.boardId === boardId);

  if (!task) {
    return false;
  }

  return task;
};

const createTask = async user => {
  tasks.push(user);
};

const updateTask = async task => {
  const existed = tasks.find(item => item.id === task.id);

  if (!existed) {
    return false;
  }

  const index = tasks.indexOf(existed);

  tasks[index] = task;

  return task;
};

const deleteTask = async (id, boardId) => {
  const task = await getTaskById(id, boardId);

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

const getAllUserTasks = async id => tasks.filter(task => task.userId === id);

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteBoardTasks,
  getAllUserTasks
};
