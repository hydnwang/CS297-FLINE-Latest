const express = require('express')
const router = express.Router()
const ScheduleModel = require('../models/schedule')

router.get('/', function(req, res) {
	// console.log("hello");
	console.log("req body: " +JSON.stringify(req.query));
    // res.send('API is working properly');
    var userId = parseInt(req.query.user_id);
    console.log(userId);
    ScheduleModel.getUserData(userId, (data) => {
      console.log(data);
        res.send(data)
      });
})

module.exports = router