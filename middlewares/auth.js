const jwt = require('jsonwebtoken');
const {
  ERRORS,
 } = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');

const allowedUrls = ['/signin','/signup','/home']

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (allowedUrls.includes(req.url)) {
      next();
    } else {
      if (!authorization || !authorization.startsWith('Bearer ')) {
            next(new ERRORS.AuthorizationError('Authorization Required'));
            return
      }

      const token = authorization.replace('Bearer ', '');
      let payload;

      try {
        payload = jwt.verify(token, JWT_SECRET);
      } catch (err) {
        next(new ERRORS.AuthorizationError('Authorization Required'));
        return
      }

      req.user = payload; // assigning the payload to the request object

      next(); // sending the request to the next middleware
    }
  } catch (err) {
     next(new ERRORS.ServerError('Server Error'))
     return
  }
};