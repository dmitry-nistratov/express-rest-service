const router = require('express').Router({ mergeParams: true });
const createError = require('http-errors');

const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks();

    res.json(tasks.map(el => Task.toResponse(el)));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const { id, boardId } = req.params;
    const task = await tasksService.getTaskById(id, boardId);

    if (!task) {
      const err = new createError(404, 'Task not found');
      return next(err);
    }

    res.status(200).json(Task.toResponse(task));
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const task = new Task({ ...req.body, boardId });

    await tasksService.createTask(task);

    res.status(200).json(Task.toResponse(task));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const updatedTask = await tasksService.updateTask({
      ...req.body,
      ...req.params
    });

    if (!updatedTask) {
      return res.status(404).send('Task not found');
    }

    res.status(200).json(Task.toResponse(updatedTask));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const task = await tasksService.deleteTask(
      req.params.id,
      req.params.boardId
    );

    if (!task) {
      const err = new createError(404, 'Task not found');
      return next(err);
    }

    res.status(204).send('The task has been deleted');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
