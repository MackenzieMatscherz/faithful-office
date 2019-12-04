const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  picture: {
     data: Buffer, 
     contentType: String 
  },
  location: {
    type: [Number],
    required: [false]
  },
  title: {
    type: String,
    required: [false]
  },
  artist: {
    type: String,
    required: [false]
  },
  uploader: {
    type: String,
    required: [false, 'Uploader Name is required']
  }
})

module.exports = ImageSchema