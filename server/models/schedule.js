const sql = require('./db')

exports.getUserData = function (userId = -1, term, callback) {
  let queryStr = 'SELECT * FROM registration '
  console.log("userId:"+userId);
  if (userId > 0) {
    queryStr += 'WHERE user_id=' + userId+ ' and term =' + term;
  }
  console.log(queryStr);
  sql.query(queryStr, function (error, results) {
    if (error) throw error;
    callback(results);
  });
};

exports.getCoursesList = function (userId = -1, callback) {
  let queryStr = 'SELECT * FROM registration '
  console.log("userId:"+userId);
  if (userId > 0) {
    queryStr += 'WHERE user_id=' + userId;
  }
  console.log(queryStr);
  sql.query(queryStr, function (error, results) {
    if (error) throw error;
    callback(results);
  });
};