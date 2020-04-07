const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAllBoards();

  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await boardsService.getBoardById(req.params.id);

    res.json(Board.toResponse(user));
  } catch (err) {
    res.status(404).send('Board not found');
  }
});

router.route('/').post(async (req, res) => {
  const board = new Board(req.body);

  await boardsService.createBoard(board);

  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = new Board(req.body);

  await boardsService.updateBoard(Board.toResponse(board));

  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.deleteBoard(req.params.id);

    res.status(204).send('The board has been deleted');
  } catch (err) {
    res.status(404).send('Board not found');
  }
});

module.exports = router;
