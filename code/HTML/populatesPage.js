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

