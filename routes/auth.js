const express = require('express');

const { body } = require('express-validator');

const auth = require('../middleware/auth');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
  '/signup',
  [
    body('name').trim().not().isEmpty(),
    body('lastName').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Email address already exist!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 3 }),
    body('admin').trim().not().isEmpty(),
    body('deffensiveFormation').trim().not().isEmpty(),
    body('offensiveFormation').trim().not().isEmpty(),
    body('player').trim().not().isEmpty(),
    body('redactor').trim().not().isEmpty(),
    body('couch').trim().not().isEmpty(),
    body('captainDeffensive').trim().not().isEmpty(),
    body('captainOffensive').trim().not().isEmpty()
  
  ],
  authController.signup
);

router.post('/login', authController.login);

router.get('/', auth, authController.fetchAllUser)

module.exports = router;
