const sql = require('./db')
const USER_TABLE = 'users'

exports.getUsersByIds = function (callback, userIds=[]) {
  if (!Array.isArray(userIds)) { callback([]); return; }

  let query = 'SELECT * FROM ??', param = [USER_TABLE]
  if (userIds.length) {
    query += ' WHERE ?? IN (?)'
    param.push('id', userIds)
  }
  sql.query(query, param, function (error, results, fields) {
    if (error) { console.log('[Error] ', error) }
    callback(results);
  });
};

exports.getUserByName = function (username, password, callback) {
  let query = 'SELECT * FROM ?? WHERE ??=? AND ??=?'
  let param = [USER_TABLE, 'email', username, 'password', password]
  sql.query(query, param, function (error, result, fields) {
    if (error) { console.log('[Error] ', error) }
    callback(result);
  });
};

exports.createUser = function (data, callback) {
  let query = 'INSERT INTO ??'
  let param = [USER_TABLE]

  let idx = Object.keys(data).length
  let column = '', values = ''
  Object.keys(data).forEach(key => {
    idx -= 1
    param.push(key)
    column += '??'
    values += '?'
    if (idx > 0) { column += ','; values += ','; }
  });
  query = query + ' (' + column + ') VALUES(' + values + ');'
  for (let key in data) {
    param.push(data[key])
  }
  sql.query(query, param, function (error, result, fields) {
    if (error) { console.log('[Error] ', error); callback(); return; }
    callback({message: 'ok', userId: result.insertId});
  });
}

exports.updateUserById = function (id, data, callback) {
  let query = 'UPDATE ?? SET'
  let param = [USER_TABLE]
  let idx = Object.keys(data).length
  Object.keys(data).forEach(key => {
    idx -= 1
    param.push(key, data[key])
    query += ' ??=?'
    if (idx > 0) { query += ','; }
  });
  query += ' WHERE ??=?'
  param.push('id', id)

  sql.query(query, param, function (error, result, fields) {
    if (error) { console.log('[Error] ', error) }
    callback(result);
  });
}
