const sql = require('./db')
// const Date =require('Date');
const mysql = require('mysql')

exports.addCourse=function(course_id, user_id, course_title, course_type, course_time){
    var date = new Date();
    var query = "INSERT INTO registration (course_id,user_id, reg_time,course_title, course_type,meeting_time) VALUES (?);";
    var value=[course_id,user_id,date.getTime(),course_title,course_type,course_time];
    sql.query(query, [value],function(err,result){
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}
exports.dropCourse=function(course_id, user_id){
    var c_id=parseInt(course_id);
    var query = "delete from registration where course_id = ? and user_id = ?";
    var value = [c_id,user_id];
    query=mysql.format(query, value);
    sql.query(query,function(err,result){
        if (err) throw err;
        console.log("Number of records delete: " + result.affectedRows);
    });
};