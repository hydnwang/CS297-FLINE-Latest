var jaccard = require('jaccard');
const sql = require('./db')

var getUserScore = function (from, to, callback) {
    // Return similarity score between two users range from 0 to 100
    let queryStr = 'SELECT interests FROM users WHERE id=' + from + ' OR id=' + to;

    sql.query(queryStr, function (error, results, fields) {
        if (error) throw error;
        else if (from == to) {
            callback(1);
            return;
        } else if (results.length < 2) {
            callback(0);
            return;
        }

        ret = 100 * jaccard.index(JSON.parse(results[0].interests), JSON.parse(results[1].interests));
        callback(ret);
    });
}

module.exports = {
    getUserScore: getUserScore
}