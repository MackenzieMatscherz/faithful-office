const connectionString = 'mongodb+srv://testUser:test@faithfuloffice-qtvay.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose')
const multer = require('multer')
const express = require('express')
//const bodyParser = require('body-parser')
const fs = require('fs-extra')
const path = require('path')
const upload = multer({limits: {fileSize: 2000000 },dest:'/uploads'})
const imageSchema = require('../models/ImageSchema.js')
const Image = mongoose.model('image', imageSchema, 'image')

var app=express();
app.use(express.static(__dirname));

  
app.get('/',function(req,res){                                                          //The page that launches when opening site - Map View
    //res.sendFile(path.join(__dirname+'/HTML/map_view.html'));
    res.sendFile(path.join(__dirname+'/index.html'));
}).listen(3000)

app.get('/map_view', function(req, res){                                                //Secondary Map View Route for testing
    res.sendFile(path.join(__dirname+'/HTML/map_view.html'));
});

app.get('/submission_form', function(req, res){                                         //Submission Form page
    res.sendFile(path.join(__dirname+'/HTML/submission_form.html'));
});

app.post('/submit', upload.single('fileToUpload'), (req,res) => {                       //Posting an image and its details
    var image = fs.readFileSync(req.file.path).toString('base64');
    var longitude = req.body.longitude
    var latitude = req.body.latitude
    var title = req.body.title
    var artist = req.body.artist
    var uploader = req.body.uploader
    //console.log(image);
  
    mongoose.connect(connectionString, function(err, client) {                          //Connecting to MongoDB Atlas
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        console.log('Connected...');
        data = new Image({ 
            "picture.data": Buffer.from(image, 'base64'),
            "location": [latitude, longitude],
            "title": title,
            "artist": artist,
            "uploader": uploader
        })
        data.picture.contentType = req.file.mimetype
        data.save();
        console.log(data);

        res.redirect('/success');
     });
}) 
  
app.get(('/success'), function(req, res){                                               //successfully uploaded image
    mongoose.connect(connectionString, async function(err, client){
        if(err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        //console.log("Finding Image");
        const image = await Image.findOne({}, (err, results) => {                       //shows random image from database
            res.set('Content-Type', results.picture.contentType);
            res.send(results.picture.data);
        })
        
    });
});


app.get(('/pull_data'), function(req, res){                                             //pull data for map
    var curr_longitude = req.query.longitude;
    var curr_latitude = req.query.latitude;
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopolology: true}, async function(err, client){
        if(err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        //console.log("Finding Image");
        const images = await Image.aggregate([
            { "$match": { "$expr": { 
                "$lte": [Math.sqrt(Math.pow((curr_longitude - "$location.0"),2) + Math.pow((curr_latitude - "$location.1"),2)), 1 ]
                //"$lte": [2*Math.pow(Math.asin(Math.sqrt(Math.sin((curr_latitude-"$location.0")/2)),2)) + Math.cos(curr_latitude)*Math.cos("$location.0")*Math.pow(Math.sin((curr_longitude-"#location.1")/2),2)] 
            } } }
          ]).limit(15);
            //TODO: Create proper Great Circle distance calculation - Currently finds absolute long/lat number <= 1
            //d=2*asin(sqrt((sin((lat1-lat2)/2))^2 + cos(lat1)*cos(lat2)*(sin((lon1-lon2)/2))^2))
        console.log(images);
        res.json(images);
    });
});
  
app.get('/grid_view', function(req, res){                                               //Grid View page
    res.sendFile(path.join(__dirname+'/HTML/grid_view.html'));
});

app.get('/frame_test', function(req, res){                                               
    res.sendFile(path.join(__dirname+'/create_frames_test.html'));
});
  
console.log("server listening at port 3000"); 