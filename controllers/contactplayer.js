const { validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const ContactPlayer = require('../models/contactplayer');

 exports.fetchAll = async (req, res, next) => {
  try {
    const [allPosts] = await ContactPlayer.fetchAll();
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};






exports.postContactPlayer = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const email = req.body.email;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const height = req.body.height;
  const weight = req.body.weight;
  const city = req.body.city;
  const phone = req.body.phone;

  try {

    const contactplayer = {
        email: email,
        name: name,
        lastName: lastName,
        age: age,
        height: height,
        weight: weight,
        city: city,
        phone: phone
      };

      await ContactPlayer.save(contactplayer);
  



    // send mail: 


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

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Barbarians Koszalin - zgloszenie zawodnika" <barbarians.zgloszenia@gmail.com>', // sender address
    to: "dawid.wasylik97@gmail.com", // list of receivers
    subject: "Zgłoszenie zawodnika - " + name + " " + lastName, // Subject line
    html: "<p>Adres email: "  + email + "</p>" +
         "<p>Imię i Nazwisko: "  + name + " " + lastName + "</p>" + // html body
         "<p>Wiek: "  + age+ "</p>" + // html body
         "<p>Wzrost: "  + height+ "</p>" + // html body
         "<p>Waga: "  + weight+ "</p>" + // html body
         "<p>Miasto: "  + city+ "</p>" + // html body
         "<p>Telefon: "  + phone+ "</p>", // html body
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
