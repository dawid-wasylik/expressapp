const express = require('express');

const { body } = require('express-validator');

const auth = require('../middleware/auth');

const contactPlayerController = require('../controllers/contactplayer');

const router = express.Router();

  router.get('/',auth, contactPlayerController.fetchAll);
  router.post(
  '/',
  [
    body('email').trim().isLength({ min: 0}).not().isEmpty(),
    body('name').trim().isLength({ min: 0 }).not().isEmpty(),
    body('lastName').trim().isLength({ min: 0 }).not().isEmpty(),
    body('age').trim().isLength({ min: 0 }).not().isEmpty(),
    body('height').trim().isLength({ min: 0 }).not().isEmpty(),
    body('weight').trim().isLength({ min: 0 }).not().isEmpty(),
    body('city').trim().isLength({ min: 0 }).not().isEmpty(),
    body('phone').trim().isLength({ min: 0 }).not().isEmpty(),
    
  ],
  contactPlayerController.postContactPlayer
);

// router.delete('/:id', auth, contactPlayerController.deletePost);

module.exports = router;
