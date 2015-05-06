/**
 * Checksum number calculator
 * For use in CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 */


//responds to button click
$(function() {
    $( "input[type=submit], a, button" )
      .button()
      .click(function( event ) {
        event.preventDefault();
        var number_of_digits = $("input").val();
        var target_div = $("#digit-boxes");
        target_div.html("");
        for (var i = 0; i < number_of_digits; i++) {
            target_div.append($("<input />"));
        }
        //displayGeneratedExampleCodes(number_of_digits);
    });
});



//display generated codes on page
function displayGeneratedExampleCodes(number_of_digits) {

    //remove previous values
    var elem = document.getElementById("list");
    elem.parentNode.removeChild(elem);

    //create new elements for new list
    list_containter = document.getElementById("digit-boxes");
    list_element = document.createElement("ul");
    list_element.id = "list"
    list_containter.appendChild(list_element);

    //each code displayed as a new list item
    for(var i = 0; i < number_of_digits; i++) {
        var list_item = document.createElement("li");
        list_item.innerHTML = i;
        list_element.appendChild(list_item);
    }

}

