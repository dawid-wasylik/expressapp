const db = require('../util/database');

module.exports = class ContactPlayer {
  constructor(email, name, lastName, age, height, weight, city, phone) {
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.city = city;
    this.phone = phone;
    
 
 
  }

  static fetchAll() {
    return db.execute('SELECT `contact_player`.*, `answer_contact_player`.ID_answer_contact_player, `answer_contact_player`.ID_user, `answer_contact_player`.date_of_answer, `answer_contact_player`.body, `users`.name AS answer_name, `users`.last_name AS answer_last_name FROM contact_player LEFT JOIN answer_contact_player ON contact_player.ID_contact_player = answer_contact_player.ID_contact_player LEFT JOIN users ON answer_contact_player.ID_user = users.ID_user ORDER BY answer');
  }
  
  static save(player) {
    return db.execute(
      'INSERT INTO contact_player (email, name, lastName, age, height, weight, city, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [player.email, player.name, player.lastName, player.age, player.height,  player.weight,  player.city,  player.phone]
    );
  }

};
