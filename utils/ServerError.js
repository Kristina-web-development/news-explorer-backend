const { SERVER_ERROR } = require('./constants');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = SERVER_ERROR.name;
    this.statusCode = SERVER_ERROR.statusCode;
  }
}

module.exports = ServerError;
