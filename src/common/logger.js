const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      filename: 'logs/error.log',
      handleExceptions: true,
      level: 'error',
      json: true,
      colorize: false
    }),
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
      json: true,
      colorize: false
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: 'logs/exceptions.log',
      format: format.combine(format.uncolorize(), format.json())
    })
  ],
  exitOnError: true
});

logger.stream = {
  // eslint-disable-next-line no-unused-vars
  write(message, encoding) {
    logger.debug(message);
  }
};

module.exports = logger;
