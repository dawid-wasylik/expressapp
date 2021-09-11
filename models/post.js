const db = require('../util/database');

module.exports = class Post {
  constructor(title, body, categories, image, active, user) {
    this.title = title;
    this.body = body;
    this.categories = categories;
    this.active = active;
    this.image = image;
    this.user = user;
    
 
 
  }

  static fetchAll() {
    return db.execute('SELECT `posts`.*, `users`.name, `users`.last_name FROM posts INNER JOIN users ON posts.ID_user = users.ID_user ORDER BY `posts`.created DESC')
    
  }

  static save(post) {
    return db.execute(
      'INSERT INTO posts (title, body, categories, active, ID_user, postImage) VALUES (?, ?, ?, ?, ?, ?)',
      [post.title, post.body, post.categories, post.active, post.user, post.image]
    );
  }


  static delete(id) {
    return db.execute('DELETE FROM posts WHERE ID_post = ?', [id]);
  }
};
