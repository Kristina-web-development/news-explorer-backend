const jwt = require('jsonwebtoken');
const ServerError = require('../utils/ServerError')
const AuthorizationError = require('../utils/AuthorizationError')
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {

      if (!authorization || !authorization.startsWith('Bearer ')) {
            next(new AuthorizationError('Authorization Required'));
            return
      }

      const token = authorization.replace('Bearer ', '');
      let payload;

      try {
        payload = jwt.verify(token, JWT_SECRET);
      } catch (err) {
        next(new AuthorizationError('Authorization Required'));
        return
      }

      req.user = payload; // assigning the payload to the request object

      next(); // sending the request to the next middleware

  } catch (err) {
     next(new ServerError('Server Error'))
     return
  }
};