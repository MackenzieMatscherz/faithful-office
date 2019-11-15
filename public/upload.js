const connectionString = 'mongodb+srv://testUser:test@faithfuloffice-qtvay.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose')
const imageSchema = require('../models/ImageSchema.js')
const Image = mongoose.model('image', imageSchema, 'image')

async function createImage() {
  return new Image({
    image: document.getElementById("fileToUpload"),
    location: "Here!",
    artist: "Picasso",
    uploader: "Me!"
  }).save()
}

async function findImage(image) {
  return await Image.findOne({ image })
}

getElementById("submitForm").onsubmit = function() {
  const connector = mongoose.connect(connectionString)


  let image = connector.then(async () => {
    return findImage(imagename)
  })

  if (!image) {
    image = createImage(imagename)
  }

  console.log(image)
  process.exit(0)
};