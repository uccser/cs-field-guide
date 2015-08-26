/**
 * Awful Calculator Interactive
 * For use in the CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 */

$(document).ready(function () {
    var display = "";

    $(".interactive-calculator-good button").click(function(){
        console.log($(this).val());
        var operation = $(this).val();
        if (operation == "=") {
            // evaluate
        } else if (operation == "C") {
            // clear
        } else {
            display += operation
        }
        document.getElementById("interactive-good-calculator-output").innerHTML = display;
    });


    $(".interactive-calculator-awful button").click(function(){
        console.log($(this).val());
    });

    document.getElementById("interactive-good-calculator-output").innerHTML = display;
});

