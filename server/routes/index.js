const express = require('express')
const router = express.Router()

router.get('/status', function (req, res) {
  res.send({ api_status: 'on' })
})

router.use('/users', require('./users'))
router.use('/course', require('./course'))
router.use('/registration', require('./registration'))
router.use('/schedule',require('./schedule'))
router.use('/testAPI',require('./testAPI'))
router.use('/friendship', require('./friendship'))
router.use('/recommendation', require('./recommendation'))

module.exports = router