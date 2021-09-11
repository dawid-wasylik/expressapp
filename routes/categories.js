const express = require('express');

const { body } = require('express-validator');

const categoriesController = require('../controllers/categories');

const auth = require('../middleware/auth');


const router = express.Router();


router.get('/', categoriesController.fetchAll);

router.post(
    '/',
    [
      auth,
      body('name').trim().isLength({ min: 0}).not().isEmpty()  
    ],
    categoriesController.postCategories
  );
  router.delete('/:id', auth, categoriesController.deleteCategories);

module.exports = router;
