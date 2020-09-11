const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')


// ROUTE to register a new user
router.post('/users/register', (req, res) => {
  const {name, email, username, password} = req.body
  User.register(new User({name, email, username}), password, err => {
    if (err) {
    console.log(err)} res.sendStatus(200)
  })
})

// ROUTE to login an existing user
router.post('/users/login', (req, res) => {
  const {username, password} = req.body
  User.authenticate()(username, password, (err, user) => {
    if(err) {console.log(err)}
    res.json(user ? jwt.sign({ id: user._id}, process.env.SECRET) : null)
  })
})

// ROUTE to get the posts from a specific user
router.get('/users/posts', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

module.exports = router