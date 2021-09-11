const express = require('express');

const { body } = require('express-validator');

const ExerciseOneResultController = require('../controllers/exerciseOneResult');

const auth = require('../middleware/auth');


const router = express.Router();


router.get('/', ExerciseOneResultController.fetchAll);

router.post(
    '/',
    [
      body('idUser').trim().isEmpty(),
      body('idExercise').trim().isEmpty(),
      body('value').trim().isEmpty(), 
    ],
    ExerciseOneResultController.postExerciseOneResult
  );
  router.delete('/:id', auth, ExerciseOneResultController.deleteExercise);

module.exports = router;
