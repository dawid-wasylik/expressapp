const express = require('express');

const { body } = require('express-validator');

const articleController = require('../controllers/article');


const router = express.Router();


router.get('/', articleController.fetchAll);


module.exports = router;
