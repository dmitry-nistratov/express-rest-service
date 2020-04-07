const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAllTasks();

  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.getTaskById(req.params.id);

    res.json(task);
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/').post(async (req, res) => {
  const boardId = req.params.boardId;
  const task = new Task({ ...req.body, boardId });

  await tasksService.createTask(task);

  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  try {
    const task = new Task(req.body);

    await tasksService.updateTask(task);

    res.json(task);
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.deleteTask(req.params.id);

    res.status(204).send('The task has been deleted');
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

module.exports = router;
