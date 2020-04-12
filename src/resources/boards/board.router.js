const router = require('express').Router();
const createError = require('http-errors');

const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAllBoards();

    res.status(200).json(boards.map(Board.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
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

router.route('/').post(async (req, res, next) => {
  try {
    const board = new Board(req.body);

    await boardsService.createBoard(board);

    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = new Board(req.body);

    await boardsService.updateBoard(Board.toResponse(board));

    res.status(200).json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
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
