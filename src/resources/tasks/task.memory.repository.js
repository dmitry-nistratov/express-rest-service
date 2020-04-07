let tasks = [];

const getAllTasks = async () => tasks;

const getTaskById = async id => {
  const task = tasks.find(item => item.id === id);

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
};

const createTask = async user => {
  tasks.push(user);
};

const updateTask = async user => {
  const task = await getTaskById(user.id);

  if (!task) {
    throw new Error('Task not found');
  }

  const index = tasks.indexOf(task);

  tasks[index] = user;
};

const deleteTask = async id => {
  const task = await getTaskById(id);

  if (!task) {
    throw new Error('Task not found');
  }

  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
};

const deleteBoardTasks = id => {
  tasks = tasks.filter(curr => curr.boardId !== id);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteBoardTasks
};
