const Categories = require('../models/categories');
const { validationResult } = require('express-validator');
exports.fetchAll = async (req, res, next) => {
  try {
    const [allCategories] = await Categories.fetchAll();
    res.status(200).json(allCategories);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



exports.postCategories = async (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) return;
  
    const name = req.body.name;
   
    
  
    try {
      const cat = {
        name: name
      
      };
  await Categories.save(cat);
  

  
      res.status(201).json({ message: 'ADDED!' });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  

  exports.deleteCategories = async (req, res, next) => {
    try {
      const deleteResponse = await Categories.delete(req.params.id);
      res.status(200).json(deleteResponse);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
