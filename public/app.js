const connectionString = 'mongodb+srv://testUser:test@faithfuloffice-qtvay.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')

const imageSchema = require('../models/ImageSchema.js')
const Image = mongoose.model('image', imageSchema, 'image')

var app=express() 

app.use(bodyParser.json()); 
//app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
  
app.post('/submit', (req,res) => { 
    var image = req.body.fileToUpload
    var longitude = req.body.longitude
    var latitude = req.body.latitude
    var artist = req.body.artist
    var uploader = req.body.uploader
    console.log(image);
  
    mongoose.connect(connectionString, function(err, client) {
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        console.log('Connected...');
        data = new Image({ 
            "picture": image,
            "location": [longitude, latitude],
            "artist": artist,
            "uploader": uploader
        }).save()

        res.sendFile(path.join(__dirname+'/success.html'));
     });
}) 
  
  
app.get('/',function(req,res){ 
    res.sendFile(path.join(__dirname+'/index.html'));
}).listen(3000) 
  
  
console.log("server listening at port 3000"); 