/*for(var j = 0;j<4;j++)
{
    var colHolder = document.createElement("div")
    colHolder.classList.add("column")
    for(var i = 0;i<5;i++)
    {
        var src = '';
        if(i == 0) src = "../images/illustration-small.png"
        if(i == 4) src = "../images/image.jpg"
        if(i == 2) src = "../images/illustration-big.png"
        if(i==3) src= "../images/photo-big.jpg"
        if(i==1) src= "../images/photo-tall.jpg"
        var pic = createImage(src)
        colHolder.appendChild(pic)
        var text = document.createTextNode("test message")
        colHolder.appendChild(text)
    }
    var a = document.getElementsByClassName("row")
    a[0].appendChild(colHolder)
}*/

getPosition();

//need code that initializes page

function getPosition(){
    return navigator.geolocation.getCurrentPosition(query);
}

//DONE
function query(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    $.get("/pull_data",longitude=long, latitude=lat).done(function(databaseArray){
        for (i = 0; i < databaseArray.length; i++){
            var frame = createFrame(databaseArray[i]);
            console.log(frame);
            createInfoWindow(frame);
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

    //interactivity copied from createImage
    frame.addEventListener('click',function(){
        //this needs to be changed
        //window.open(src, "_blank"); 
    });
    frame.addEventListener('mouseover',function(){
        frame.style.filter = "brightness(120%)";
        frame.style.zIndex = 50;
        frame.style.width = "102%";
    });
    frame.addEventListener('mouseout',function(){
        frame.style.filter = "brightness(100%)";
        frame.style.width = "100%";
        frame.style.position = "relative";

        frame.style.zIndex = 0;
    });
    return frame;
}

function createImage(src){
    var pic = document.createElement("img")
    pic.src = src
    pic.classList.add("image")
    pic.style.zIndex = -1;


    //interactivity
    pic.addEventListener('click',function(){
        window.open(src, "_blank"); 
    });
    pic.addEventListener('mouseover',function(){
        pic.style.filter = "brightness(120%)";
        pic.style.zIndex = 50;
        pic.style.width = "102%";
    });
    pic.addEventListener('mouseout',function(){
        pic.style.filter = "brightness(100%)";
        pic.style.width = "100%";
        pic.style.position = "relative";

        pic.style.zIndex = 0;
    });
    return pic;
}

