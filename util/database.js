const mysql = require('mysql2');

const config = require('../config/config.json');

const pool = mysql.createPool({
  port : config.port,
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password,
});

module.exports = pool.promise();
