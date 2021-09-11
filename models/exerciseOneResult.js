const db = require('../util/database');

module.exports = class ExerciseOneResult {
  constructor(idUser,idExercise,valuetime,valuescore) {
    this.idUser = idUser;
    this.idExercise = idExercise;
    this.valuetime = valuetime;
    this.valuescore = valuescore;
  }
  static save(exercise) {

    return db.execute(
      'INSERT INTO results_workout (ID_User,ID_exercise,score,time) VALUES (?,?,?,?)',
      [exercise.idUser, exercise.idExercise, exercise.valuescore, exercise.valuetime]
    );
  }



  static fetchAll() {
    return db.execute('SELECT * FROM results_workout');
  }
  static delete(id) {
    return db.execute('DELETE FROM exercise WHERE ID_exercise = ?', [id]);
  }

}