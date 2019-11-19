const connectionString = 'mongodb+srv://testUser:test@faithfuloffice-qtvay.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose')
const multer = require('multer')
const express = require('express')
//const bodyParser = require('body-parser')
const fs = require('fs-extra')
const path = require('path')
const upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'})

const imageSchema = require('../models/ImageSchema.js')
const Image = mongoose.model('image', imageSchema, 'image')

var app=express();

  
app.post('/submit', upload.single('fileToUpload'), (req,res) => {               //Posting an image and its details
    var image = fs.readFileSync(req.file.path).toString('base64');
    var longitude = req.body.longitude
    var latitude = req.body.latitude
    var artist = req.body.artist
    var uploader = req.body.uploader
    //console.log(image);
  
    mongoose.connect(connectionString, function(err, client) {                  //Connecting to MongoDB Atlas
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        console.log('Connected...');
        data = new Image({ 
            "picture": Buffer.from(image, 'base64'),
            "location": [longitude, latitude],
            "artist": artist,
            "uploader": uploader
        })
        data.save();
        console.log(data);

        res.redirect('/success');
     });
}) 
  
app.get(('/success'), (req, res) => {
    mongoose.connect(connectionString, async function(err, client){
        if(err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        const image = await Image.findOne({}, (err, results) => {
            res.set('Content-Type', 'image/jpg');
            res.send(results.picture);
        })
        
    });
});

app.get('/',function(req,res){                              //The page that launches when opening site
    res.sendFile(path.join(__dirname+'/index.html'));
}).listen(3000) 
  
  
console.log("server listening at port 3000"); 