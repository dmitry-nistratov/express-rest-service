const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');

const user = new User({ name: 'Dmitry', login: 'admin', password: 'admin' });

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection Error'));
  db.once('open', () => {
    console.log("we're connected!");
    user.save();
    db.dropDatabase();
    cb();
  });
};

module.exports = connectToDB;
