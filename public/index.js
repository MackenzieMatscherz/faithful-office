const connectionString = 'mongodb+srv://testUser:test@faithfuloffice-qtvay.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose')
const imageSchema = require('../models/ImageSchema.js')
const Image = mongoose.model('image', imageSchema, 'image')

async function createImage(artist) {
  return new Image({
    location: "Here!",
    artist,
    uploader: "Me!"
  }).save()
}

async function findImage(image) {
  return await Image.findOne({ image })
}

;(async () => {
  const connector = mongoose.connect(connectionString)
  const imagename = process.argv[2].split('=')[1]

  let image = await connector.then(async () => {
    return findImage(imagename)
  })

  if (!image) {
    image = await createImage(imagename)
  }

  console.log(image)
  process.exit(0)
})()