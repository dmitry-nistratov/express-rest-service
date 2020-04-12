const errorNotFound = name => {
  const err = new Error();
  err.status = '404';
  err.message = `${name} not found`;

  throw err;
};

module.exports = errorNotFound;
