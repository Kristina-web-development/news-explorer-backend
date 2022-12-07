const {BAD_REQUEST} = require("./constants");

class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = BAD_REQUEST.name;
    this.statusCode = BAD_REQUEST.statusCode;
  }
}

module.exports = CastError

