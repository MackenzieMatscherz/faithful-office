const input = document.getElementById("user_image")
var t = document.createTextNode("Hello World");
function f(){
    var box = document.getElementById("display_img")
    var file = input.files[0];
    box.appendChild(t)
}
input.addEventListener('change',f);

