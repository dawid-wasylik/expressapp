const { pool } = require('../util/database');
const db = require('../util/database');

module.exports =  class RegisterUser {

  constructor( 
    name, 
    lastname,
    email,
     password,
     phone,
     birth,
     city,
     tokenClub
   
    ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.birth = birth;
    this.city = city;
    this.tokenClub = tokenClub;
  }

  static find(email) {
    return db.execute('SELECT * FROM users INNER JOIN permissions ON users.ID_user = permissions.ID_user WHERE email = ?', [email]);
  }

   static save(user) {
       return  db.execute(
      'INSERT INTO users (email, name, last_name, password, phone, city, birthDay, ID_club, active) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?)',
      [user.email,user.name, user.lastName , user.password, user.phone, user.city, user.birth, user.ID_club, 0]);
    };

  static savePermissions(perm) {
  //  return db.execute('INSERT INTO permissions (ID_user, admin, deffensiveFormation, offensiveFormation, player, redactor, couch, captainDeffensive, captainOffensive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
  return db.execute('INSERT INTO permissions (ID_user, admin ,deffensiveFormation, offensiveFormation, player, redactor, couch, captainDeffensive, captainOffensive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
 [perm,
  0,
     0,
     0,
     1,
     0,
     0,
     0,
     0
 ]);
      
     }
};


