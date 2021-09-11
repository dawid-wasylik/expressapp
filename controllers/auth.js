const { validationResult } = require('express-validator');
const db = require('../util/database');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);


  function toBoolean(value){
    if(value =="true"){
     value = true;
    }else { value = false;
    }
    return value
   }

  if (!errors.isEmpty()) return;

  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const admin = toBoolean(req.body.admin);
   const deffensiveFormation = toBoolean(req.body.deffensiveFormation);
  const offensiveFormation = toBoolean(req.body.offensiveFormation);
 const player = toBoolean(req.body.player);
  const redactor = toBoolean(req.body.redactor);
  const couch = toBoolean(req.body.couch);
  const captainDeffensive = toBoolean(req.body.captainDeffensive);
  const captainOffensive = toBoolean(req.body.captainOffensive);


  
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
  
    const userDetails = {
      name: name,
      lastName: lastName,
      email: email,
      password: hashedPassword
    };
  await User.save(userDetails);
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', email);

   const permissions = { 
     ID_user: rows[0].ID_user,
     admin: admin,
     deffensiveFormation: deffensiveFormation,
      offensiveFormation: offensiveFormation,
      player: player,
    redactor: redactor,
    couch: couch,
    captainDeffensive: captainDeffensive,
    captainOffensive: captainOffensive  
   };

  await User.savePermissions(permissions);

    res.status(201).json({ message: permissions.offensiveFormation});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find(email);

    if (user[0].length !== 1) {
      const error = new Error('Użytkownik o tym email nie został odnaleziony');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];

    const isEqual = await bcrypt.compare(password, storedUser.password);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.ID_user,
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token,
       userId: storedUser.ID_user,
       admin: storedUser.admin,
       deffensiveFormation: storedUser.deffensiveFormation,
       offensiveFormation: storedUser.offensiveFormation,
      player: storedUser.player,
      redactor: storedUser.redactor,
      couch: storedUser.couch,
      captainDeffensive: storedUser.captainDeffensive,
      captainOffensive: storedUser.captainOffensive
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



exports.fetchAllUser = async (req, res, next) => {
  try {
    const [allPosts] = await User.fetchAllUser();
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

