const db = require('../util/database');

module.exports = class Post {
  constructor(name) {
    this.name = name;

    
 
 
  }
  static save(category) {
    return db.execute(
      'INSERT INTO category (name) VALUES (?)',
      [category.name]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM category ORDER BY ID_cat DESC');
  }
  static delete(id) {
    return db.execute('DELETE FROM category WHERE ID_cat = ?', [id]);
  }

}