const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.send({ message: 'user page is under construction.' })
})

module.exports = router