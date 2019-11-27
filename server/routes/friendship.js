const express = require('express')
const router = express.Router()
const frdModel = require('../models/friendship.js')

router.get('/', function(req, res) {
    res.send({})
})

router.get('/get-friends/:uid', function (req, res) {
    try {
        frdModel.getFriends(req.params.uid, (ret) => {
            // console.log('data: ', ret)
            res.send({'data': ret})
        });
    } catch (err) {
        res.status = 400;
        res.send({'msg': err.message})
    }
})

router.get('/discover-friends-enrollment/:uid', function (req, res) {
    try {
        frdModel.discoverFriendsEnrollment(req.params.uid, (ret) => {
            // console.log('data: ', ret)
            res.send({'data': ret})
        });
    } catch (err) {
        res.status = 400;
        res.send({'msg': err.message})
    }
})

router.get('/enrollment/:course', function (req, res) {
    try {
        frdModel.enrollment(req.params.course, req.cookies.token, (ret) => {
            // console.log('data: ', ret)
            res.send({'data': ret})
        });
    } catch (err) {
        res.status = 400;
        res.send({'msg': err.message})
    }
})

router.post('/request-friend', function (req, res) {
    const from = req.body.from;
    const to = req.body.to;
    if (!from || !to) {
        res.status(400).end(); return;
    }
    try {
        frdModel.requestFriend(from, to);
    } catch (err) {
        res.status = 400;
        res.send({'msg': err.message})
    }
});

router.post('/accept-friend', function (req, res) {
    const from = req.body.from;
    const to = req.body.to;
    if (!from || !to) {
        res.status(400).end(); return;
    }
    try {
        frdModel.acceptFriend(from, to);
    } catch (err) {
        res.status = 400;
        res.send({'msg': err.message})
    }
});

module.exports = router