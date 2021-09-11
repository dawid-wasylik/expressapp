const ExerciseOneResult = require('../models/exerciseOneResult');
const db = require('../util/database');
const { validationResult } = require('express-validator');
exports.fetchAll = async (req, res, next) => {
  try {
    const [allExcercise] = await ExerciseOneResult.fetchAll();
    res.status(200).json(allExcercise);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postExerciseOneResult = async (req, res, next) => {
    const errors = validationResult(req);


    if (!errors.isEmpty()){
      const idUser = req.body.idUser;
      const idExercise = req.body.idExercise;
      const value = req.body.value;
      var x = 0;
      var y = 0;
      let Time = 0;
      let Score = 0;
    try{
  
  
      const [time] = await db.query('SELECT * FROM exercise WHERE ID_exercise = ?', idExercise);
      const [score] = await db.query('SELECT *  FROM exercise WHERE ID_exercise = ?', idExercise);
  
       Time = time[0].time;
       Score = score[0].score;
   
    }catch (err) {
      console.log('nie dziala' +err)
    }
    console.log(x,y)

    if(Time == 1){ x = value; }
    if(Score == 1){ y = value; }


    try {
      
      console.log(x,y)
      const exercise = {
        idUser:  idUser,
        idExercise: idExercise,
        valuescore: y,
        valuetime: x,
      };

  await ExerciseOneResult.save(exercise);
  

  
      res.status(201).json({ message: 'ADDED!' });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }





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