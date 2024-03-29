const serverErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).send({
    message: statusCode === 500 ? message || 'An error occurred on the server' : message,
  });
};

module.exports = serverErrorHandler;
