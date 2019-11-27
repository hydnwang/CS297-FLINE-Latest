const sql = require('./db')
const userModel = require('./users')
const recomModel = require('./recommendation')
var async = require('async')
var Heap = require('heap');

var getFriends = function (uid, callback) {
    let queryStr = "SELECT id, name, status FROM friendship INNER JOIN users ON \
        users.id = friendship.to_id WHERE from_id=" + uid;

    sql.query(queryStr, function (error, results, fields) {
        if (error) throw error;
        var frd_list = [], pending_list = [];
        for (var i = 0; i < results.length; i++) {
            if (results[i].status == 'friend') {
                frd_list.push(results[i]);
            } else {
                pending_list.push(results[i]);
            }
        }
        callback({"frd_list": frd_list, "pending_list": pending_list});
    });
}

var getRequests = function (uid, callback) {
    let queryStr = "SELECT id, name, status FROM friendship INNER JOIN users ON \
        users.id = friendship.from_id WHERE status='pending' AND to_id=" + uid;

    sql.query(queryStr, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}

var getEnrollment = function (course_id, uid, callback) {
    let queryStr = "SELECT id, name FROM registration INNER JOIN users ON \
        users.id = registration.user_id WHERE course_id=" + course_id + " AND user_id!=" + uid;

    sql.query(queryStr, function (error, results, fields) {
        if (error) throw error;
        
        getFriends(uid, (data) => {
            var frd_dict = {}
            for (var i = 0; i < data.frd_list.length; i++) {
                frd_dict[data.frd_list[i].id] = data.frd_list[i].status;
            }
            for (var i = 0; i < data.pending_list.length; i++) {
                frd_dict[data.pending_list[i].id] = data.pending_list[i].status;
            }

            async.eachSeries(results, function (item, next) {
                if (item.id in frd_dict) {
                    item.status = frd_dict[item.id];
                } else {
                    item.status = '';
                }
                recomModel.getUserScore(uid, item.id, (ret) => {
                    item.degree = ret;
                    
                    next(); // This is how the forEach knows to continue to the next loop.
                });
            }, function(err) {
                callback(results);
            });
        });
    });
}

var getSortedEnrollment = function (uid, name, callback) {
    let queryStr = "SELECT course_id, course_title, timestamp FROM registration \
        WHERE user_id=" + uid + " ORDER BY timestamp DESC LIMIT 10";
    sql.query(queryStr, function (error, results, fields) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
            results[i].name = name;
        }
        callback(results);
    });
}

var mergeFriendsEnrollments = function (enroll_lists) {
    var out = [];
    var heap = new Heap(function(a, b) {
        return b.timestamp - a.timestamp;
    });

    for (var i = 0; i < enroll_lists.length; i++) {
        for (var j = 0; j < enroll_lists[i].length; j++) {
            heap.push(enroll_lists[i][j]);
        }
    }
    while (!heap.empty()) {
        out.push(heap.pop());
    }
    return out;
}
    

var discoverFriendsEnrollment = function (uid, callback) {
    var enroll_lists = [];
    getFriends(uid, (data) => {
        async.eachSeries(data.frd_list, function (friend, next) {
            getSortedEnrollment(friend.id, friend.name, (ret) => {
                enroll_lists.push(ret);
                
                next(); // This is how the forEach knows to continue to the next loop.
            });
        }, function(err) {
            sorted_enroll_lists = mergeFriendsEnrollments(enroll_lists);
            callback(sorted_enroll_lists);
        });
    });
}

var requestFriend = function (from, to) {
    let queryStr = "INSERT INTO friendship (from_id, to_id, status) values (" + from + ", " + to + ", 'pending')";
    sql.query(queryStr, function (error, results, fields) {
        if (error) throw error;
    });
}

var acceptFriend = function (from, to) {
    let queryStr = "UPDATE friendship SET status='friend' WHERE from_id=" + from + " AND to_id=" + to;
    let queryStr2 = "INSERT INTO friendship (from_id, to_id, status) values (" + to + ", " + from + ", 'friend')";
    sql.query(queryStr, function (error, results, fields) {
        if (error) throw error;
        sql.query(queryStr2, function (error, results, fields) {
            if (error) throw error;
        });
    });
}

module.exports = {
    getFriends: getFriends,
    getRequests: getRequests,
    discoverFriendsEnrollment: discoverFriendsEnrollment,
    getEnrollment: getEnrollment,
    requestFriend: requestFriend,
    acceptFriend: acceptFriend
}