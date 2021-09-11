const { validationResult } = require('express-validator');
const Post = require('../models/post');




exports.fetchAll = async (req, res, next) => {
  try {
    const [allPosts] = await Post.fetchAll();
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postPost =  async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return;


  const active = 1;

    if(req.body.active == "false"){
        active = 0;
        console.log(active)
    }


  const title = req.body.title;
  const body = req.body.body;
  const categories = req.body.categories;
  const image = req.file.path;
  const user = parseInt(req.body.user);



  try {
    const post = {
      title: title,
      body: body,
      categories: categories,
      image: image,
      active: active,
      user: user,
    };

    console.log(post)
await Post.save(post);

    res.status(201).json({ message: post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      console.log()
    }
    next(err);
  } 
}





exports.deletePost = async (req, res, next) => {
  try {
    const deleteResponse = await Post.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
