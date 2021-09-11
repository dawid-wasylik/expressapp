const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const registerUserRoutes = require('./routes/registeruser');

const postsRoutes = require('./routes/posts');

const articleRoutes = require('./routes/article');

const categoriesRoutes = require('./routes/categories');

const contactPlayerRoutes = require('./routes/contactplayer');

const ExerciseRoutes = require('./routes/exercise');
const ExerciseOneResultRoutes = require('./routes/exerciseOneResult');

const TrainingRoutes = require('./routes/training');
const auth = require('./middleware/auth');
const AnswercontactPlayerRoutes = require('./routes/answercontactplayer');


const errorController = require('./controllers/error');
const cors = require('cors');
const multer = require('multer');
const lastarticleRoutes = require('./routes/lastarticle');

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

const upload = multer({ dest:"uploads"});

app.post('/file', upload.single('file'), (req, res) => {
  const file = req.file;

  if(file) {
    res.json(file);
  }else { 
    throw new Error("File upload unsuccefull")
  }
})

app.use('/post/categories', categoriesRoutes);

app.use('/auth', authRoutes);

app.use('/post', postsRoutes);

app.use('/training', TrainingRoutes);

app.use('/exercise', ExerciseRoutes);
app.use('/exerciseoneresult', ExerciseOneResultRoutes);

app.use('/contactplayer', contactPlayerRoutes);

app.use('/uploads/',express.static('uploads'))

app.use('/article', articleRoutes);

app.use('/lastarticle', lastarticleRoutes);

app.use('/answercontactplayer', AnswercontactPlayerRoutes);


app.use('/register', registerUserRoutes);


app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));



// async..await is not allowed in global scope, must use a wrapper

