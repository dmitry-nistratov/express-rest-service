const router = require('express').Router();
const createError = require('http-errors');

const auth = require('../../common/auth');
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(auth, async (req, res, next) => {
  try {
    const boards = await boardsService.getAllBoards();

    res.status(200).json(boards.map(Board.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(auth, async (req, res, next) => {
  try {
    const board = await boardsService.getBoardById(req.params.id);

    if (!board) {
      const err = new createError(404, 'Board not found');

      return next(err);
    }

    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(auth, async (req, res, next) => {
  try {
    const board = new Board(req.body);

    await boardsService.createBoard(board);

    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(auth, async (req, res, next) => {
  try {
    const board = await boardsService.updateBoard({
      ...req.body,
      ...req.params
    });

    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(auth, async (req, res, next) => {
  try {
    const board = await boardsService.deleteBoard(req.params.id);

    if (!board) {
      const err = new createError(404, 'Board not found');
      return next(err);
    }

    res.status(204).send('The board has been deleted');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
