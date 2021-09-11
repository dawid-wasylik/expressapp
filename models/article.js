const db = require('../util/database');

module.exports = class Post {
  constructor(title, body, categories, user) {
    this.title = title;
    this.body = body;
    this.categories = categories;
    this.user = user;
    
 
 
  }

  static fetchAll() {
    return db.execute('SELECT * FROM posts ORDER BY created DESC');
  }
}