const Exercise = require('../models/exercise');
const { validationResult } = require('express-validator');
exports.fetchAll = async (req, res, next) => {
  try {
    const [allExcercise] = await Exercise.fetchAll();
    res.status(200).json(allExcercise);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchResults = async (req, res, next) => {
  try {
    const [allExcercise] = await Exercise.fetchResults();
    res.status(200).json(allExcercise);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.postExercise = async (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) return;
  
    const name = req.body.name;
    const score = req.body.score;
    const time = req.body.time;
    const description = req.body.description;
   
     function ToNumberFromBool(bool){
        x = 0;
        if(bool == 'true') return x = 1;
        return x;
      }
  
    try {
      const exercise = {
        name: name,
        score:  ToNumberFromBool(score),
        time: ToNumberFromBool(time),
        description: description
      
      };
  await Exercise.save(exercise);
  

  
      res.status(201).json({ message: 'ADDED!' });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  

  exports.deleteExercise = async (req, res, next) => {
    try {
      const deleteResponse = await Exercise.delete(req.params.id);
      res.status(200).json(deleteResponse);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };