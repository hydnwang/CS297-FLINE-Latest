const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.send({ message: 'user page is under construction.' })
})

router.post('/login', function (req, res) {
  console.log("req body: " + JSON.stringify(req.body))
  res.send({ message: req.body.email })
})

module.exports = router