const createError = require('http-errors');

const ErrorNames = {
  NOT_AUTHORIZED: new createError(
    401,
    'Not authorized to access this resource'
  ),
  INCORRECT: new createError(403, 'Incorrect login or password')
};

module.exports = { ErrorNames };
