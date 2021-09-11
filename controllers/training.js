const Training = require('../models/training');
const { validationResult } = require('express-validator');
exports.fetchAll = async (req, res, next) => {
  try {
    const [allTraining] = await Training.fetchAll();
    res.status(200).json(allTraining);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



exports.postTraining = async (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) return;
  
    const date = req.body.date;
   
    
  
    try {
      
       
      
     
      console.log(date)
  await Training.save(date);
  

  
      res.status(201).json({ message: 'ADDED!' });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  

  exports.deleteTraining = async (req, res, next) => {
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