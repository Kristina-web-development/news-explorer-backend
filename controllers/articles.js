const mongoose = require('mongoose');
const Article = require('../models/article');
const { ERRORS,getUserIdFromToken } = require('../utils/constants')


module.exports.getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
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
    owner: getUserIdFromToken(req),
  })
    .then((article) => {
      if (article) {
        res.send({ data: article });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ERRORS.CastError('Invalid data'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(mongoose.Types.ObjectId(req.params.articleId))
    .orFail(() => {
      throw new ERRORS.NotFoundError('No card found with that id.');
    })
    .then((article) => {
      if (article.owner.equals(req.user._id)) {
        article.remove(() => res.send({ data: article }));
      } else {
        throw new ERRORS.NotAllowedError(
          'Access to the requested resource is forbidden.',
        );
      }
    })
    .catch(next);
};