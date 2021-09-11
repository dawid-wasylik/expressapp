const { validationResult } = require('express-validator');
const db = require('../util/database');
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const RegisterUser = require('../models/registeruser');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const birth = req.body.birth;
  const city = req.body.city;
  const weight = req.body.weight;
  const height = req.body.height;
  const tokenClub = req.body.tokenClub;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const [tokenClubRows] = await db.query('SELECT * FROM club WHERE token = ?', tokenClub);
    const userDetails = {
      name: name,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      phone: phone,
      city: city,
      birth: birth,
      weight: weight,
      height: height,
      ID_club: tokenClubRows[0].ID_club,

    };
  await RegisterUser.save(userDetails);
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', email);

   const iduser = rows[0].ID_user;

  await RegisterUser.savePermissions(iduser);


  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'barbarians.zgloszenia@gmail.com', // generated ethereal user
 pass: 'Barbarians2021', // generated ethereal password
    },
 });

//  send mail with defined transport object
 await transporter.sendMail({
    from: '"Barbarians Koszalin - nowy zawodnik" <barbarians.zgloszenia@gmail.com>', // sender address
    to: userDetails.email , // list of receivers
    subject: "Witamy w drużynie - Barbarians Koszalin ", // Subject line
    html: "Poczekaj na rozpatrzenie przyjęcia do klubu ",  // html body 
   });    


    res.status(201).json({ message: 'udalo sie'});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


