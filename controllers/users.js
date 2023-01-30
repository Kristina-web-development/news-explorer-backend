const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const NotFoundError = require('../utils/NotFoundError');
const ConflictError = require('../utils/ConflictError');
const CastError = require('../utils/BadRequestError');
const AuthorizationError = require('../utils/AuthorizationError');

const { JWT_SECRET } = require('../utils/config');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('User id not found.');
    })
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('User with this data already exists'));
        }
        if (err.name === 'ValidationError') {
          next(new CastError('invalid data'));
        }
      })
      .then((user) => {
        if (user) {
          return res.send({
            name: user.name,
            email: user.email,
            id: user._id,
          });
        }
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new CastError('invalid data'));
        }
        if (err.code === 11000) {
          next(new ConflictError('User already exists.'));
        } else next(err);
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => { throw new AuthorizationError('Incorrect email or password.'); })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new AuthorizationError('Incorrect email or password.');
          }
          const accessToken = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '7d',
          });
          return res.send({ access_token: accessToken, user });
        })
        .catch(next);
    })
    .catch(next);
};
