const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);

  res.json(user);
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);

  await usersService.save(user);

  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = new User(req.body);

  await usersService.update(User.toResponse(user));

  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const users = await usersService.deleteItem(req.params.id);

  res.json(users.map(User.toResponse));
});

module.exports = router;
