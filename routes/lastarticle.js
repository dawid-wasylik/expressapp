const express = require('express');

const { body } = require('express-validator');

const lastarticleController = require('../controllers/lastarticle');


const router = express.Router();


router.get('/', lastarticleController.fetchLast);


module.exports = router;
