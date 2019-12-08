const sql = require('./db')
// const Date =require('Date');
const mysql = require('mysql')

exports.addCourse=function(course_id, user_id, course_title, course_type, course_time, term){
    var date = new Date();
    selectCourse(course_id, user_id, term,(Data) => {
        if (Array.isArray(Data) && Data.length) {
          console.log("you are already in the course");
        } else {
            var query = "INSERT INTO registration (course_id,user_id, reg_time,course_title, course_type,meeting_time, term) VALUES (?);";
            var value=[course_id,user_id,date.getTime(),course_title,course_type,course_time, term];
            sql.query(query, [value],function(err,result){
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
        }
    });
}
exports.dropCourse=function(course_id, user_id, term){
    var c_id=parseInt(course_id);
    var query = "delete from registration where course_id = ? and user_id = ? and term = ? ";
    var value = [c_id,user_id, term];
    query=mysql.format(query, value);
    sql.query(query,function(err,result){
        if (err) throw err;
        console.log("Number of records delete: " + result.affectedRows);
    });
};

selectCourse = function(course_id, user_id, term, callback){
    let query = 'SELECT * FROM registration WHERE ??=? AND ??=? AND ?? = ?'
    let param = ['course_id', course_id, 'user_id', user_id, 'term', term]
    sql.query(query, param, function (error, result) {
    if (error) { console.log('[Error] ', error) }
    callback(result);
  });
};

exports.searchCourse = function(course_id,user_id,callback){
    let query = 'SELECT * FROM registration WHERE ??=? and ?? = ? limit 1'
    let param = ['course_id', course_id, 'user_id', user_id]
    sql.query(query, param, function (error, result) {
    if (error) { console.log('[Error] ', error) }
    callback(result);
    });
};