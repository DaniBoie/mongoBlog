const router = require('express').Router()
const { User, Blogpost } = require('../models')
const passport = require('passport')

// GET all Blogposts
// router.get('/blogposts', (req, res) => {
//   Blogpost.find()
//     .populate('user')
//     .then(Blogposts => res.json(Blogposts))
//     .catch(err => console.log(err))
// })

// POST one Blogpost
router.post('/blogposts', passport.authenticate('jwt'), (req, res) => {
  Blogpost.create({
    text: req.body.text,
    user: req.user._id
  })
    .then(blogpost => {
      User.findByIdAndUpdate(blogpost.user, { $push: { Blogposts: blogpost._id } })
        .then(() => res.json(blogpost))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// OFFLINE functionality route
router.post('/posts/bulk', passport.authenticate('jwt'), (req, res) => {
  const posts = req.body.map(post => ({
    ...post,
    user: req.user._id
  }))

  Blogpost.create(posts)
  .then(posts => {
    const postsIds = posts.map(post => post._id)
    User.findById(req.user._id)
      .then(user => {
        const allPosts = [...user.posts, ...postIds]
        User.findByIdAndUpdate(req.user._id, {posts: allPosts})
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
      })

    })
  })

// PUT one Blogpost
router.put('/blogposts/:id', passport.authenticate('jwt'), (req, res) => {
  Blogpost.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// DELETE one Blogpost
router.delete('/blogposts/:id', passport.authenticate('jwt'), (req, res) => {
  Blogpost.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router