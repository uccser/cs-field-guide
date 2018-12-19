var hex_start_colour;

window.onload = function() {
    hex_start_colour = document.body.style.backgroundColor;
}

/* Change the background colour of the page to match the user's input */
function changeColour() {

    var new_colour = document.getElementById('interactive-hex-background-colour-input').value;

    // check the user entered a valid hex code
    var valid_codes = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if ( valid_codes.test(new_colour) ) {
        document.body.style.background = '#' + new_colour;
    } else {
        document.getElementById('interactive-hex-background-colour-input').value = gettext('invalid!');
    }

}

/* Reset the background colour to the original page colour */
function resetColour() {
    document.body.style.backgroundColor = hex_start_colour;
    document.getElementById('interactive-hex-background-colour-input').value = hex_start_colour;
}

/* Run the changeColour function when the appropriate button is clicked */
$("#interactive-hex-background-colour-submit-btn").click(function() {
    changeColour();
});

/* Run the resetColour function when the appropriate button is clicked */
$("#interactive-hex-background-colour-reset-btn").click(function() {
    resetColour();
});
