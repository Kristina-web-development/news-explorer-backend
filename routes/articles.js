const router = require('express').Router();

const {
  getArticles,
  createArticle,
  deleteArticle,
  searchArticles
} = require('../controllers/articles');
const auth = require('../middlewares/auth');

const {
  articlesValidation,
  articleIdValidation,
} = require('../middlewares/validation');

router.post("/everything", searchArticles);


router.get('/', auth, getArticles);

router.post('/', auth, articlesValidation, createArticle);

router.delete('/:articleId', auth, articleIdValidation, deleteArticle);

module.exports = router;
