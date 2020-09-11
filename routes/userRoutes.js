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

router.get('/users/posts', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

// GET all Users
// router.get('/users', (req, res) => {
//   User.find()
//     .populate('Blogposts')
//     .then(users => { res.json(users) })
//     .catch(err => console.log(err))
// })

// POST one User
// router.post('/users', (req, res) => {
//   User.create(req.body)
//     .then(user => res.json(user))
//     .catch(err => console.log(err))
// })

// PUT one User
// router.put('/users/:id', (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

// DELETE one User
// router.delete('/users/:id', (req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })


module.exports = router