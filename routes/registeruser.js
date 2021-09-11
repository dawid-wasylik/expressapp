const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const RegisterUser = require('../models/registeruser');

const authController = require('../controllers/registeruser');

router.post(
  '/',
  [
    body('name').trim().not().isEmpty(),
    body('lastName').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await RegisterUser.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Email address already exist!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 3 }),
    body('phone').trim().not().isEmpty(),
    body('birth').trim().not().isEmpty(),
    body('city').trim().not().isEmpty(),
    body('weight').trim().not().isEmpty(),
    body('height').trim().not().isEmpty(),
    body('tokenClub').trim().not().isEmpty(),
  ],
  authController.signup
);


module.exports = router;
