const mongoose = require('mongoose');
const Article = require('../models/article');
const CastError = require('../utils/BadRequestError');
const NotAllowedError = require('../utils/ForbiddenError');
const NotFoundError = require('../utils/NotFoundError');


module.exports.getArticles = (req, res, next) => {

  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      if (article) {
        res.send({ data: article });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Invalid data'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(mongoose.Types.ObjectId(req.params.articleId))
    .orFail(() => {
      throw new NotFoundError('No card found with that id.');
    })
    .then((article) => {
      if (article.owner.equals(req.user._id)) {
        article.remove(() => res.send({ data: article }));
      } else {
        throw new NotAllowedError(
          'Access to the requested resource is forbidden.',
        );
      }
    })
    .catch(next);
};