const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message}`);
  if (!err.status) {
    res.status(500).send('Internal Server Error');
  }
  res.status(err.status).send(err.message);
  next();
};

module.exports = errorHandler;
