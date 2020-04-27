const User = require('../users/user.model');

const generateToken = async ({ login, password }) => {
  const user = await User.findByCredentials(login, password);
  const token = await user.generateAuthToken();

  return token;
};

module.exports = { generateToken };
