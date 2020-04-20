const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection Error'));
  db.once('open', () => {
    console.log("we're connected!");
    db.dropDatabase();
    cb();
  });
};

module.exports = connectToDB;
