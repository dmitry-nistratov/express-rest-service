const { PORT } = require('./common/config');
const app = require('./app');

const logger = require('./common/logger');

// To check for uncaughtException and unhandledRejection, uncomment the following code:

// setTimeout(() => {
//   Promise.reject(new Error('Oops, rejection!'));
// }, 1000);
// setTimeout(() => {
//   throw new Error('Oops, exception!');
// }, 2000);

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', error => {
  logger.error(`Captured error: ${error.message}`);
  process.exitCode = 1;
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled rejection detected: ${reason.message}`);
});
