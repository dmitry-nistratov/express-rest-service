const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAllUsers();

  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);

  res.json(user);
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);

  await usersService.createUser(user);

  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = new User(req.body);

  await usersService.updateUser(User.toResponse(user));

  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.deleteUser(req.params.id);

    res.status(204).send('The user has been deleted');
  } catch (err) {
    res.status(404).send('User not found');
  }
});

module.exports = router;
