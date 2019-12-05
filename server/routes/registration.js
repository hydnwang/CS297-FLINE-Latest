const express = require('express')
const router = express.Router()
const Reg = require('../models/registration')

router.get('/', function(req, res) {
	res.send("registration");
})

router.post('/add', function(req, res) {
	console.log(req.body);
	Reg.addCourse(req.body.firstParam,req.body.secondParam,req.body.thirdParam,req.body.forthParam,req.body.fifthParam, req.body.term);
	res.send("ok");
})

router.post('/drop', function(req, res) {
	console.log(req.body);
	Reg.dropCourse(req.body.firstParam, req.body.secondParam);
	res.send("ok");
})

module.exports = router