for(var j = 0;j<4;j++)
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
    }
    var a = document.getElementsByClassName("row")
    a[0].appendChild(colHolder)
}



function createImage(src){
    var pic = document.createElement("img")
    pic.src = src
    pic.classList.add("image")
    return pic;
}

