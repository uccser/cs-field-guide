var hex_start_colour;

window.onload = function() {
    hex_start_colour = document.body.style.backgroundColor;
}


function changeColour() {
    var new_colour = document.getElementById('interactive-hex-background-colour-input').value;
}


function resetColour() {
    document.body.style.backgroundColor = hex_start_colour;
}
