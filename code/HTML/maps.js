var map;
function initMap() {
    // var campus = {lat: 42.3896166, lng: -72.52946829999999};
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.186355,lng:-102.175498}, 
        zoom: 6
    });
    $('#map').css("height",($(window).height()*.9));
    $('#map').css("width",$(window).width());
    google.maps.event.trigger(map, 'resize');
    map.setZoom( map.getZoom() );
   

    var marker;
    getPosition();
    /*navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        map.setCenter(pos)
        map.setZoom(12);

        marker = new google.maps.Marker({
            position:pos, 
            map:map,
            icon:icons['user'].icon
        });
    })*/
}

function getPosition(){
    navigator.geolocation.getCurrentPosition(query);
}

function restofInitmap(){
    //create test image
    var pic = document.createElement("img");
    pic.src = "../images/image.jpg";
    pic.classList.add('pics')


    marker.addListener('mouseover',function(){
        var info = createInfoWindow(pic,"hello, world")
        info.open(map,marker);
        marker.addListener('mouseout',function(){
            info.close();
        });
    });
    
    marker.addListener('click',function(){
        window.open( "../images/image.jpg", "_blank"); 
    });

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




//DONE
function query(position) {
    var long = position.coords.longitude;
    var lat = position.coords.latitude;
    var pos = {lat:lat, lng:long};
    var iconBase ='http://maps.google.com/mapfiles/kml/shapes';
    var icons = {
        pic: {
          icon: 'http://maps.google.com/mapfiles/kml/shapes/square.png'
        },
        user: {
          icon: 'http://maps.google.com/mapfiles/kml/shapes/man.png'
        },
      };
      
    map.setCenter(pos)
    map.setZoom(16);

    marker = new google.maps.Marker({
        position:pos, 
        map:map,
        icon:icons['user'].icon
    });

    var markerArray = []
    $.get("/pull_data",longitude=long, latitude=lat).done(function(databaseArray){
        var img_marker;
        for (var i = 0; i < databaseArray.length; i++){
            var frame = createFrame(databaseArray[i]);
            var window = createInfoWindow(frame);
            var img_pos = {lat:databaseArray[i].location[0],lng:databaseArray[i].location[1]}
            
            img_marker = new google.maps.Marker({
                position:img_pos,
                map:map,
                icon:icons['pic'].icon
            })

            img_marker.addListener('click',function(){
                window.open(map,img_marker)
            })


        }
    });
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

$(window).resize(function(){
    $('#map').css("height",($(window).height()*.9));
    $('#map').css("width",$(window).width());
    google.maps.event.trigger(map, 'resize');
    map.setZoom( map.getZoom() );
});