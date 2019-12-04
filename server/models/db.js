const mysql = require('mysql');

var connection = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'cpy0821',
  database: 'fline'
});

module.exports = connection;
