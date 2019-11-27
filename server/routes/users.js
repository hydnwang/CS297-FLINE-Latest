const express = require('express')
const router = express.Router()
const userModel = require('../models/users')

router.get('/all', function (req, res) {
  userModel.getUsersByIds((data) => {
    res.send(data)
  });
})

router.get('/:userId', function (req, res) {
  let { userId } = req.params
  if (!userId) { res.status(404).end(); return; }
  userId = parseInt(userId, 10)
  userModel.getUsersByIds(function (data) {
    res.send(data)
  }, [userId])
})

router.post('/batch', function (req, res) {
  let { userIds } = req.body
  if (!Array.isArray(userIds)) { res.status(400).end(); return; }

  userModel.getUsersByIds((data) => {
    res.send(data)
  }, userIds)
})

router.post('/login', function (req, res) {  
  const { username, password } = req.body
  if (!username || !password) { res.status(404).end(); return; }

  userModel.getUserByName(username, password, (userData) => {
    if (Array.isArray(userData) && userData.length) {
      const { id } = userData[0]
      res.send({ userId: id })  
    } else {
      let err = new Error('User not found')
      res.status(404).json(err)
    }
  })
})

router.post('/create', function (req, res) {
  const { realname, username, password, major, interests } = req.body
  let payload = {
    name: realname,
    email: username,
    password: password, 
    major: major,
    interests: JSON.stringify(interests)
  }
  userModel.createUser(payload, (result) => {
    res.send(result)
  })
})

router.post('/update', function (req, res) {
  const { id, realname, username, password, major, interests } = req.body
  let payload = {
    name: realname, 
    email: username, 
    major: major, 
    interests: JSON.stringify(interests)
  }
  if (password && password !== '') {
    payload['password'] = password
  }
  userModel.updateUserById(id, payload, (result) => {
    res.send({ message: result })
  })
})

module.exports = router

