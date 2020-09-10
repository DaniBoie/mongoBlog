const { model, Schema } = require('mongoose')

const User = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  // Items is an array that refrences the item objects as children.
  Blogposts: [{
    type: Schema.Types.ObjectId,
    ref: 'Blogpost'
  }]
}, { timestamps: true })

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)