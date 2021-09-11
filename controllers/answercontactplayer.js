const { validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const AnswerContactPlayer = require('../models/answercontactplayer');
const db = require('../util/database');


exports.postAnswerContactPlayer = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const body = req.body.body;
  const playerId = req.body.playerId;
  const user = req.body.user;
  const status = 1;  

  try {


    const statusUpdate = {
        status: status,
        playerId: playerId,
    };

    const answercontactplayer = {
        body: body,
        playerId: playerId,
        user: user,
      };

      const [rows] =  await db.query('SELECT * FROM contact_player WHERE ID_contact_player = ?', playerId);

         const ID_user = rows[0].email;
        
       await AnswerContactPlayer.save(answercontactplayer);
  
       await AnswerContactPlayer.updateBePlayerStatus(statusUpdate);


 //    send mail: 


  // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,
     secure: false, // true for 465, false for other ports
     auth: {
       user: 'barbarians.zgloszenia@gmail.com', // generated ethereal user
       pass: '6999447917Dawid', // generated ethereal password
     },
  });
  console.log('prawie dziala')
 //  send mail with defined transport object
  await transporter.sendMail({
     from: '"Barbarians Koszalin - zgloszenie zawodnika" <barbarians.zgloszenia@gmail.com>', // sender address
     to: ID_user, // list of receivers
     subject: "Odpowiedź na zgłoszenie do drużyny - Barbarians Koszalin ", // Subject line
     html: body,  // html body
    });    
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
/** 
exports.deletePost = async (req, res, next) => {
  try {
    const deleteResponse = await Post.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

*/
