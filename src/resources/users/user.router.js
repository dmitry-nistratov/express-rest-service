const router = require('express').Router();
const createError = require('http-errors');

const auth = require('../../common/auth');
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(auth, async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();

    res.status(200).json(users.map(User.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(auth, async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);

    if (!user) {
      const err = new createError(404, 'User not found');
      return next(err);
    }

    res.status(200).json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(auth, async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);

    res
      .status(200)
      .json({ ...User.toResponse(user.newUser), token: user.token });
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(auth, async (req, res, next) => {
  try {
    const user = await usersService.updateUser({
      ...req.body,
      ...req.params
    });

    res.status(200).json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(auth, async (req, res, next) => {
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
