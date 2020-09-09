const router = require('express').Router()
const { User, Blogpost } = require('../models')

// GET all Blogposts
router.get('/blogposts', (req, res) => {
  Blogpost.find()
    .populate('user')
    .then(Blogposts => res.json(Blogposts))
    .catch(err => console.log(err))
})

// POST one Blogpost
router.post('/blogposts', (req, res) => {
  Blogpost.create(req.body)
    .then(blogpost => {
      User.findByIdAndUpdate(blogpost.user, { $push: { Blogposts: blogpost._id } })
        .then(() => res.json(blogpost))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// PUT one Blogpost
router.put('/blogposts/:id', (req, res) => {
  Blogpost.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// DELETE one Blogpost
router.delete('/blogposts/:id', (req, res) => {
  Blogpost.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router