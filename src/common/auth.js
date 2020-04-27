const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('./config');
const { ErrorNames } = require('./constants');

const auth = async (req, res, next) => {
  try {
    const authorization = req.header('authorization');
    if (!authorization) {
      return next(ErrorNames.NOT_AUTHORIZED);
    }

    const token = req.header('authorization').replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        return next(ErrorNames.NOT_AUTHORIZED);
      }
      next();
    });
  } catch (error) {
    return next(ErrorNames.NOT_AUTHORIZED);
  }
};

module.exports = auth;
