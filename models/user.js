const { pool } = require('../util/database');
const db = require('../util/database');

module.exports =  class User {

  constructor( 
    name, 
    lastname,
    email,
     password,
    admin,
   deffensiveFormation,
    offensiveFormation,
    player,
    redactor,
    couch,
    captainDefensive,
    captainOffensive
   
    ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.admin = admin; 
    this.deffensiveFormation = deffensiveFormation;
    this.offensiveFormation = offensiveFormation;
    this.player = player;
    this.redactor = redactor;
    this.couch = couch;
    this.captainDefensive = captainDefensive;
    this.captainOffensive = captainOffensive;
  
      
  }

  

  static fetchAllUser(){
    return db.execute('SELECT `users`.*, `permissions`.* ,`club`.name AS "club_name" FROM users LEFT JOIN permissions ON users.ID_user = permissions.ID_user LEFT JOIN club ON club.ID_club = users.ID_club ORDER BY `users`.ID_user DESC;');
  }

  static find(email) {
    return db.execute('SELECT * FROM users INNER JOIN permissions ON users.ID_user = permissions.ID_user WHERE email = ?', [email]);
  }

   static save(user) {
       return  db.execute(
      'INSERT INTO users (email, name, last_name,  password) VALUES (?, ? ,?, ?)',
      [user.email,user.name, user.lastName ,  user.password]);
    };

  static savePermissions(permission) {
  //  return db.execute('INSERT INTO permissions (ID_user, admin, deffensiveFormation, offensiveFormation, player, redactor, couch, captainDeffensive, captainOffensive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
  return db.execute('INSERT INTO permissions (ID_user, admin ,deffensiveFormation, offensiveFormation, player, redactor, couch, captainDeffensive, captainOffensive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
 [permission.ID_user,
  permission.admin,
     permission.deffensiveFormation,
     permission.offensiveFormation,
     permission.player,
     permission.redactor,
     permission.couch,
     permission.captainDeffensive,
     permission.captainOffensive
 ]);
      
     }
};


