const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { ERRORS } = require('../utils/constants');
const { createUser, login } = require('../controllers/users');
const {
  loginValidation,
  registerValidation,
} = require('../middlewares/validation');

router.post('/signup', registerValidation, createUser);
router.post('/signin', loginValidation, login);

// router.use(auth);

router.use('/users', auth, usersRouter);
router.use('/articles', articlesRouter);

// router.use('*', (req, res, next) => {
//   next(new ERRORS.NotFoundError('Requested resource not found'));
// });

module.exports = router;
