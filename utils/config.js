const {
  NODE_ENV,
  JWT_SECRET = 'kristina_secret_key',
  MONGO_DB = 'mongodb://localhost:27017/news-explorer',
  PORT = 3001,
} = process.env;

module.exports = {
  JWT_SECRET, MONGO_DB, NODE_ENV, PORT,
};