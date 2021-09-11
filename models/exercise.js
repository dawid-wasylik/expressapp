const db = require('../util/database');

module.exports = class Exercise {
  constructor(name,score,time,description) {
    this.name = name;
    this.score = score;
    this.time = time;
    this.description = description;
  }
  static save(exercise) {
    return db.execute(
      'INSERT INTO exercise (name,score,time,description) VALUES (?,?,?,?)',
      [exercise.name, exercise.score, exercise.time, exercise.description]
    );
  }

  static fetchAll() {
    return db.execute('SELECT  `exercise`.name, `exercise`.description, `exercise`.ID_exercise as Exercise_Id, `exercise`.score, `exercise`.time, MAX(`results_workout`.time) as `timeMaxValue`, MIN(`results_workout`.time) as `timeMinValue`, MAX(`results_workout`.score) as `scoreMaxValue`, MIN(`results_workout`.score) as `scoreMinValue` FROM exercise LEFT JOIN results_workout ON results_workout.ID_exercise = exercise.ID_exercise GROUP By `exercise`.ID_exercise');
  }
  static fetchResults(){
    return db.execute('SELECT `users`.name,`users`.last_name, `results_workout`.score, `results_workout`.time, `results_workout`.ID_exercise, `exercise`.name as `Exercise_name`, `exercise`.score as `scoreTrueArea`, `exercise`.time as `timeTrueArea` FROM users INNER JOIN results_workout ON results_workout.ID_user = users.ID_user INNER JOIN exercise ON exercise.ID_exercise = results_workout.ID_exercise;');
  }
  static delete(id) {
    return db.execute('DELETE FROM exercise WHERE ID_exercise = ?', [id]);
  }

}