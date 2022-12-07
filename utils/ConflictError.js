const { CONFLICT } = require('./constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = CONFLICT.name;
    this.statusCode = CONFLICT.statusCode;
  }
}

module.exports = ConflictError;
