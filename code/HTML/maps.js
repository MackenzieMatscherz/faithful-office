var map;
//get position
//local cache 

function getLoc(){
    navigator.geolocation.getCurrentPosition(initMap);
}


function initMap(position) {
    var lat = position.coords.latitude
    var lng = position.coords.longitude
    var pos = {lat,lng}
    var iconBase ='http://maps.google.com/mapfiles/kml/shapes';
    var icons = {
        pic: {
          icon: 'http://maps.google.com/mapfiles/kml/shapes/square.png'
        },
        user: {
          icon: 'http://maps.google.com/mapfiles/kml/shapes/man.png'
        },
      };

    // var campus = {lat: 42.3896166, lng: -72.52946829999999};
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos, 
        zoom: 13
    });
    var marker = new google.maps.Marker({
        position:pos, 
        map:map,
        icon:icons['user'].icon
    });


    


//create test image
    var pic = document.createElement("img");
    pic.src = "../images/image.jpg";
    pic.classList.add('pics')


    marker.addListener('mouseover',function(){
        //infoWindow.setContent(infocontent);
        var info = createInfoWindow(pic,"hello, world")
        info.open(map,marker);
        // var marker = dropMarker(campus,map,pic,"hello, world")
        marker.addListener('mouseout',function(){
            info.close();
        });
    });
    
    marker.addListener('click',function(){
        window.open( "../images/image.jpg", "_blank"); 
    });
}



//STILL NEEDS TO BE DONE
function query(position) {
    //add degree of 1 for roughly 70 miles
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var databaseArray;
    for (i = 0; i < databaseArray.length; i++){
        var frame = createFrame(databaseArray[i]);
        createInfoWindow(frame);

    }
}

function dropMarker(position,map,image,message){
    var marker = new google.maps.Marker({position:position, map:map});
    var info = createInfoWindow(image,message);
    info.open(map,marker);
    return marker;
}



function createInfoWindow(frame)
{
    var infocontent = document.createElement("div");    //puts infocontent in infowindow
    infocontent.appendChild(frame);
    var infoWindow = new google.maps.InfoWindow;
    infoWindow.setContent(infocontent);
    return infoWindow;
}

function createFrame(databaseObject)
{
    var frame = document.createElement("div");
    var picture = document.createElement("img");

    var text = document.createElement("div");

    var titleDiv = document.createElement("div");
    var titleLabel = document.createElement("label");
    var title = document.createElement("p");

    var artistDiv = document.createElement("div");
    var artistLabel = document.createElement("label");
    var artist = document.createElement("p");

    var uploaderDiv = document.createElement("div");
    var uploaderLabel = document.createElement("label");
    var uploader = document.createElement("p");

    frame.appendChild(picture);
    frame.appendChild(text);

    text.appendChild(titleDiv);
    text.appendChild(artistDiv);
    text.appendChild(uploaderDiv);

    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(title);

    artistDiv.appendChild(artistLabel);
    artistDiv.appendChild(artist);

    uploaderDiv.appendChild(uploaderLabel);
    uploaderDiv.appendChild(uploader);

    document.body.appendChild(frame);

    frame.classList.add("frame");
    picture.classList.add("picture");
    text.classList.add("textbox");
    titleDiv.classList.add("field");
    artistDiv.classList.add("field");
    uploaderDiv.classList.add("field");

    titleLabel.textContent = "Title";
    uploaderLabel.textContent = "Uploader";
    artistLabel.textContent = "Artist";

    title.textContent = databaseObject.Title
    artist.textContent = databaseObject.artist;
    uploader.textContent = databaseObject.uploader;
    picture.src = "data:" + databaseObject.picture.contentType + ";base64, " + databaseObject.picture.data;
    picture.alt = "Alt";
    return frame;
}