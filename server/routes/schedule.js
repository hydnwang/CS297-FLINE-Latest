const express = require('express')
const router = express.Router()
const ScheduleModel = require('../models/schedule')

router.get('/', function(req, res) {
	console.log("req body: " +JSON.stringify(req.query));
    var userId = parseInt(req.query.user_id);
    var term = '\''+req.query.term+'\'';
    ScheduleModel.getUserData(userId, term, (data) => {
      console.log(data);
        res.send(data)
      });
})

module.exports = router