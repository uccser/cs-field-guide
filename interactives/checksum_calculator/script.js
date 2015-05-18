/**
 * Checksum number calculator
 * For use in CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 */


//responds to button click
$(function() {
    $("input#create-boxes, a, button")
      .button()
      .click(function( event ) {
        event.preventDefault();
        var number_of_digits = $("input").val();
        var target_div = $("#digit-boxes");
        target_div.html("");
        for (var i = 0; i < number_of_digits; i++) {
            target_div.append($("<input />"));
        }
        var target_div = $("#multipliers");
        target_div.html("");
        for (var i = 0; i < number_of_digits; i++) {
            target_div.append($("<input />"))
        }
        //displayGeneratedExampleCodes(number_of_digits);
    });
});


$(function() {
    $("input#sum-digits, a, button")
      .button()
      .click(function(event) {
          event.preventDefault();
          sumDigits();
      });
});


function sumDigits() {
    var digits = [];
    var multipliers = [];
    var digit_inputs = document.getElementById('digit-boxes').getElementsByTagName('input');
    for (var i = 0; i < digit_inputs.length; i++) {
        digits.push(digit_inputs[i].value);
    }
    var multiplier_inputs = document.getElementById('multipliers').getElementsByTagName('input');
    for (var i = 0; i < multiplier_inputs.length; i++) {
        multipliers.push(multiplier_inputs[i].value);
    }
    var sums = [];
    for (var i = 0; i < digits.length; i++){
        sums.push(digits[i] * multipliers[i]);
    }
    var target_div = $("#sums");
    target_div.html = "";
    for (var i = 0; i < sums.length; i++){
        target_div.append($("<input value=" + sums[i] + ">"));
    }
}


$(function() {
    $("input#calculate, a, button")
        .button()
        .click(function(event) {
            event.preventDefault();
            getRemainder();
        });
});


function getRemainder() {
    var total = $("#total").val();
    var mod = $("#mod").val();
    var remainder = total%mod;
    console.log(remainder);
    $("#remainder").val(remainder);
}


