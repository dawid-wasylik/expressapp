const express = require('express');

const { body } = require('express-validator');

const ExerciseController = require('../controllers/exercise');

const auth = require('../middleware/auth');


const router = express.Router();


router.get('/', ExerciseController.fetchAll);
router.get('/exerciseResults',ExerciseController.fetchResults);

router.post(
    '/',
    [
      
      body('name').trim().isLength({ min: 0}).not().isEmpty(),
      body('score').trim().isLength({ min: 0}).not().isEmpty(),
      body('time').trim().isLength({ min: 0}).not().isEmpty(),
      body('description').trim().isLength({ min: 0}).not().isEmpty()  
    ],
    ExerciseController.postExercise
  );
  router.delete('/:id', auth, ExerciseController.deleteExercise);

module.exports = router;
