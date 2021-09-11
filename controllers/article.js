const Article = require('../models/article');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allArticle] = await Article.fetchAll();
    res.status(200).json(allArticle);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

