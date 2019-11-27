const express = require('express')
const router = express.Router()
const recomModel = require('../models/recommendation.js')

router.get('/', function(req, res) {
    res.send({})
})

router.get('/get-user-score/:from-:to', function (req, res) {
    try {
        recomModel.getUserScore(req.params.from, req.params.to, (ret) => {
            // console.log('data: ', ret)
            res.send({'data': ret})
        });
    } catch (err) {
        res.status = 400;
        res.send({'msg': err.message})
    }
})

module.exports = router