const { NOT_FOUND } = require('./constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = NOT_FOUND.name;
    this.statusCode = NOT_FOUND.statusCode;
  }
}

module.exports = NotFoundError;
