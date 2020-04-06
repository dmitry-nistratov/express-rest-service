const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const isExist = await boardsService.getById(req.params.id);

  if (!isExist) {
    return res.status(404).send('Board not found');
  }

  res.json(Board.toResponse(isExist));
});

router.route('/').post(async (req, res) => {
  const board = new Board(req.body);

  await boardsService.save(board);

  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = new Board(req.body);

  await boardsService.update(Board.toResponse(board));

  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  const isExist = await boardsService.deleteItem(req.params.id);

  if (!isExist) {
    return res.status(404).send('Not found');
  }

  res.status(204).send('Success');
});

module.exports = router;
