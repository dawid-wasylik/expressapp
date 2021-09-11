const express = require('express');

const postsController = require('../controllers/posts');
const multer = require('multer');

const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/')
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + '_' + file.originalname);
  }
})
/** 
 const fileFilter  = (req, file, cb) => { 
  // reject a file
  if(file.mimetype ==- 'image/ipeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
     cb(null,false);
   }
}
*/
const upload = multer({
  storage: storage
 // limits: {
//  fileSize: 1024 * 1024 *5
  // }
  });

const router = express.Router();

router.get('/', auth, postsController.fetchAll);

router.post(
  '/',
  auth,
  upload.single('file'),
  postsController.postPost
);

router.delete('/:id', auth, postsController.deletePost);

module.exports = router;
