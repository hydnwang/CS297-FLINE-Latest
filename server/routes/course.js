const express = require('express')
const router = express.Router()
const courseModel = require('../models/websocapi.js')

router.get('/', function(req, res) {
	// console.log("hello");
	console.log("req body: " + JSON.stringify(req.query));
	// res.send('API is working properly');
	const opt = {
		term:req.query.term,
		department:req.query.department,
		GE:req.query.GE,
		courseCodes: req.query.courseCodes};
		courseModel.callWebSocAPI(opt,function(result){
			console.log("data:"+JSON.stringify(result));
			res.send({apiResponse:JSON.stringify(result)});
		});
})

module.exports = router