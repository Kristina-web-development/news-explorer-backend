const router = require('express').Router();

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const {
  articlesValidation,
  articleIdValidation,
} = require('../middlewares/validation');

router.get('/', getArticles);

router.post('/', articlesValidation, createArticle);

router.delete('/:articleId', articleIdValidation, deleteArticle);

module.exports = router;