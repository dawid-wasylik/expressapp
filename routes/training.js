const express = require('express');

const { body } = require('express-validator');

const trainingController = require('../controllers/training');

const auth = require('../middleware/auth');


const router = express.Router();


router.get('/', trainingController.fetchAll);

router.post(
    '/',
    [
      auth,
      body('date').trim().isLength({ min: 0}).not().isEmpty()  
    ],
    trainingController.postTraining
  );
  router.delete('/:id', auth, trainingController.deleteTraining);

module.exports = router;
