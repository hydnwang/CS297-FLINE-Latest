const express = require('express')
const router = express.Router()
const Reg = require('../models/registration')

router.get('/', function(req, res) {
	Reg.searchCourse(req.query.course_id,req.query.user_id, (data)=>{
		res.send(data);
	})
})

router.post('/add', function(req, res) {
	console.log(req.body);
	Reg.addCourse(req.body.firstParam,req.body.secondParam,req.body.thirdParam,req.body.forthParam,req.body.fifthParam, req.body.sixthParam);
	res.send("ok");
})

router.post('/drop', function(req, res) {
	console.log(req.body);
	Reg.dropCourse(req.body.firstParam, req.body.secondParam, req.body.thirdParam);
	res.send("ok");
})

module.exports = router