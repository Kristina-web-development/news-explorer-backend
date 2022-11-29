const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const {ERRORS, getUserIdFromToken} = require('../utils/constants')


const { JWT_SECRET } = require('../utils/config');

module.exports.getUser = (req, res, next) => {
  User.findById(getUserIdFromToken(req))
    .orFail(() => {
      throw new ERRORS.NotFoundError('User id not found.');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ERRORS.CastError('invalid data'));
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
        throw new ERRORS.CastError('Invalid data.');
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ERRORS.CastError('invalid data'));
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
    .orFail(() => {throw new ERRORS.AuthorizationError('Incorrect email or password.')})
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new ERRORS.AuthorizationError('Incorrect email or password.')
          }
          const access_token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '7d',
          });
          return res.send({ access_token });
        })
        .catch(next);
    })
    .catch(next);
};