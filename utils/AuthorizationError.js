const {UNAUTHORIZED} = require("./constants");

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = UNAUTHORIZED.name;
    this.statusCode = UNAUTHORIZED.statusCode;
  }
}

module.exports = AuthorizationError

