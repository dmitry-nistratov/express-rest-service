const router = require('express').Router();
const createError = require('http-errors');

const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();

    res.status(200).json(users.map(User.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);

    if (!user) {
      const err = new createError(404, 'User not found');
      return next(err);
    }

    res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = new User(req.body);

    await usersService.createUser(user);

    res.status(200).json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res) => {
  const user = new User(req.body);

  await usersService.updateUser(User.toResponse(user));

  res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const user = await usersService.deleteUser(req.params.id);

    if (!user) {
      const err = new createError(404, 'User not found');
      return next(err);
    }

    res.status(204).send('The user has been deleted');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
