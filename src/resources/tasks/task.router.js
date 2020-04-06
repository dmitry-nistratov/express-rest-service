const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();

  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const isExist = await tasksService.getById(req.params.id);

  if (!isExist) {
    return res.status(404).send('Task not found');
  }

  res.json(Task.toResponse(isExist));
});

router.route('/').post(async (req, res) => {
  const task = new Task(req.body);

  await tasksService.save(task);

  if (!task) {
    return res.status(404).send('Task not found');
  }

  res.json(Task.toResponse(task));
});

router.route('/:id').put(async (req, res) => {
  const task = new Task(req.body);

  await tasksService.update(Task.toResponse(task));

  if (!task) {
    return res.status(404).send('Task not found');
  }

  res.json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res) => {
  const isExist = await tasksService.deleteItem(req.params.id);

  if (!isExist) {
    return res.status(404).send('Task not found');
  }

  res.status(204).send('Success');
});

module.exports = router;
