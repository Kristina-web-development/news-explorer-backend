const { FORBIDDEN } = require('./constants');

class NotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.name = FORBIDDEN.name;
    this.statusCode = FORBIDDEN.statusCode;
  }
}

module.exports = NotAllowedError;
