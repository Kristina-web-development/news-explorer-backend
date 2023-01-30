const mongoose = require('mongoose');
const Article = require('../models/article');
const CastError = require('../utils/BadRequestError');
const NotAllowedError = require('../utils/ForbiddenError');
const NotFoundError = require('../utils/NotFoundError');
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI('a77285bd02ad42e6912105c089db3e73');

module.exports.searchArticles = (req, res) => {
  const { question } = req.body;
  console.log(req.body)
  const priorDateParse = Date.parse(new Date()) - 7 * 24 * 60 * 60 * 1000;
  const priorDate = new Date(priorDateParse).toJSON().slice(0, 10);
  newsapi.v2
    .topHeadlines({
      q: question,
      from: priorDate,
      to: new Date().toJSON().slice(0, 10),
      pageSize: 100,
    })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => console.log(err));
};


module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;
  const { fromDate } = req.body;
  newsapi.v2
    .topHeadlines({
      q: req.body.question,
    })
    .then((response) => {
      const result = response.articles.find(
        (art) => art.publishedAt === fromDate,
      );

      Article.find({ owner }).then((articles) => {
        if (
          !articles.find(
            (i) => i.publishedAt === fromDate && i.keyword === req.body.question,
          )
        ) {
          Article.create({
            keyword: req.body.question,
            title: result.title,
            description: result.description,
            publishedAt: result.publishedAt,
            source: { name: result.source.name },
            url: result.url,
            urlToImage: result.urlToImage,
            owner: req.user._id,
          }).then(() => {
            Article.find({ owner }).then((resAllArticles) => res.send(resAllArticles));
          });
        }
      });
    })
    .catch((err) => console.log(err));
};

module.exports.deleteArticle = (req, res, next) => {
  const owner = req.user._id;
  Article.findById(mongoose.Types.ObjectId(req.params.articleId))
    .orFail(() => {
      throw new NotFoundError('No card found with that id.');
    })
    .then((article) => {
      if (article.owner.equals(req.user._id)) {
        article.remove(() =>
          Article.find({ owner }).then((articles) => {
            res.send({ data: articles });
          }));
      } else {
        throw new NotAllowedError(
          'Access to the requested resource is forbidden.',
        );
      }
    })
    .catch(next);
};
