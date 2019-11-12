const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, 'TEMP']
  },
  artist: {
    type: String,
    required: [false]
  },
  uploader: {
    type: String,
    required: [true, 'Uploader Name is required']
  }
})

module.exports = ImageSchema