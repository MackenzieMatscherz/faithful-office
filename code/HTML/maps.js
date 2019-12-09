var map;
function initMap() {
    // var campus = {lat: 42.3896166, lng: -72.52946829999999};
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.186355,lng:-102.175498}, 
        zoom: 4.5
    });
    var iconBase ='http://maps.google.com/mapfiles/kml/shapes';
    var icons = {
        pic: {
          icon: 'http://maps.google.com/mapfiles/kml/shapes/square.png'
        },
        user: {
          icon: 'http://maps.google.com/mapfiles/kml/shapes/man.png'
        },
      };

    var marker;
    navigator.geolocation.getCurrentPosition(function(position) {
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
    })
}

function createInfoWindow(image,message)
{
    var infocontent = document.createElement("div");    //puts infocontent in infowindow
    var list = document.createElement('ul');
    var item1 = document.createElement('li');
    item1.textContent = message;
    list.appendChild(item1);
    list.classList.add("list")

    infocontent.appendChild(image)
    infocontent.appendChild(list)
    var infoWindow = new google.maps.InfoWindow;
    infoWindow.setContent(infocontent)
    return infoWindow;
}