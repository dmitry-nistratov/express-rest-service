/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
const mongoose = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../../common/config');
const { ErrorNames } = require('../../common/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    login: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    token: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const { id, login } = user;
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: 10 });

  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) {
    throw ErrorNames.INCORRECT;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw ErrorNames.INCORRECT;
  }

  return user;
};

userSchema.statics.toResponse = ({ id, name, login }) => ({ id, name, login });

const User = mongoose.model('User', userSchema);

module.exports = User;
