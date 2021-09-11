const db = require('../util/database');

module.exports = class Training {
  constructor(date) {
    this.date = date;

    
 
 
  }
  static save(date) {
    return db.execute(
      'INSERT INTO training (date) VALUES (?)',
      [date.toString()]
      
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM training ORDER BY date DESC');
  }
  static delete(id) {
    return db.execute('DELETE FROM training WHERE ID_training = ?', [id]);
  }

}