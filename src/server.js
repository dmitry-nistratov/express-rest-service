const connectToDB = require('./db/db.client');
const { PORT } = require('./common/config');
const app = require('./app');

const logger = require('./common/logger');

connectToDB(() =>
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  )
);

process.on('uncaughtException', error => {
  logger.error(`Captured error: ${error.message}`);
  process.exitCode = 1;
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled rejection detected: ${reason.message}`);
});
