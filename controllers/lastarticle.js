const LastArticle = require('../models/lastarticle');

exports.fetchLast = async (req, res, next) => {
  try {
    const [allArticle] = await LastArticle.fetchLast();
    res.status(200).json(allArticle);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

