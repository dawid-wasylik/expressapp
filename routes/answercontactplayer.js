const express = require('express');

const { body } = require('express-validator');

const auth = require('../middleware/auth');

const AnswercontactPlayerController = require('../controllers/answercontactplayer');

const router = express.Router();

//  router.get('/',auth, AnswercontactPlayerController.fetchAll);

router.post(
  '/',
  [
    body('body').trim().isLength({ min: 0}).not().isEmpty(),
    body('playerId').trim().isLength({ min: 0 }).not().isEmpty(),
    body('user').trim().isLength({ min: 0 }).not().isEmpty(),

    
  ],
  AnswercontactPlayerController.postAnswerContactPlayer
);

// router.delete('/:id', auth, AnswercontactPlayerController.deletePost);

module.exports = router;
