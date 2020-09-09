const { model, Schema } = require('mongoose')

const Blogpost = new Schema({
  text: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = model('Blogpost', Blogpost)