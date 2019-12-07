var map;

//get position
//local cache 

function initMap() {
    /*
    Maps initialized to UMass Amherst with latlng(42.391155,-72.526711)
    */
    var campus = {lat: 42.3896166, lng: -72.52946829999999};

    map = new google.maps.Map(document.getElementById('map'), {
        center: campus, 
        zoom: 13
    });
    var marker = new google.maps.Marker({position:campus, map:map});

//create test image
    var pic = document.createElement("img");
    pic.src = "../images/image.jpg";
    pic.classList.add('pics')


    marker.addListener('mouseover',function(){
        //infoWindow.setContent(infocontent);
        // var info = createInfoWindow(pic,"hello, world")
        // info.open(map,marker);
        var marker = dropMarker(campus,map,pic,"hello, world")
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