
function changeColour() {
    console.log("hi");
    var new_colour = document.getElementById('interactive-hex-background-colour-input').value;
    console.log(new_colour);
    document.body.style.background = '#' + new_colour;
}


function resetColour() {
}
