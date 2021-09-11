const db = require('../util/database');

module.exports = class AnswerContactPlayer {
  constructor(body, playerId, user, status ){
    this.body = body;
    this.playerId = playerId;
    this.user = user;
    this.status = status;
  }

 
  
  fetchAnswer(){
    return db.execute('SELECT * FROM answer_contact_player ORDER BY created DESC')
  }

  static save(player) {
    return db.execute(
      'INSERT INTO answer_contact_player (ID_contact_player, ID_user, body) VALUES (?, ?, ?)',
      [player.playerId, player.user, player.body]
    );
  }

    static updateBePlayerStatus(answer){
     return db.execute(
        'UPDATE contact_player SET answer = ? WHERE ID_contact_player = ?',
        [answer.status, answer.playerId]
     );
 }

};
