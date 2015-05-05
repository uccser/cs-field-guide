
$(document).ready(function () {
    console.log($("basic").val());
});


//responds to button click
$(function() {
    $( "input[type=submit], a, button" )
      .button()
      .click(function( event ) {
        event.preventDefault();
        console.log($("input").val());
    });
});
