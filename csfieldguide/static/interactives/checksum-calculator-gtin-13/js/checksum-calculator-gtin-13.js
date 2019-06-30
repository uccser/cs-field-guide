/**
 * GTIN-13 Number Checker
 * For use in CS Field Guide
 * Created by Jack Morgan and Hayley van Waas, University of Canterbury
 */

var NumberCheckerGTIN13 = {};

$(document).ready(function () {

    $("#interactive-checksum-calculator-gtin-13-check").click(function() {
        // Read number and remove any whitespace within number
        var number = document.getElementById('interactive-checksum-calculator-gtin-13-input').value;
        number = number.replace(/\s+/g, '');

        // Check number only contains 12 digits
        if (number.match(/^\d{12}$/)) {
            NumberCheckerGTIN13.feedback.removeClass('invalid');
            var checksum = {'checksum': calculateCheckSumDigit(number)};
            var format = gettext("Checksum digit is %(checksum)s");
            var feedback_string = interpolate(format, checksum, true);
            NumberCheckerGTIN13.feedback.text(feedback_string);
        } else {
            NumberCheckerGTIN13.feedback.addClass('invalid');
            NumberCheckerGTIN13.feedback.text(gettext("Your input must only contain 12 numbers"));
        }
    });

    // Set feedback element
    NumberCheckerGTIN13.feedback = $("#interactive-checksum-calculator-gtin-13-feedback");
});



function calculateCheckSumDigit(number) {
    // Caclulates the checksum digit for the given number
    var sum = 0;
    // Calculates the sum of the 12 digits
    for (var i in number) {
        if (i % 2 == 0) {
            sum += parseInt(number[i]);
        } else {
            sum += parseInt(number[i]) * 3;
        }
    }
    // Returns the check digit which is the 10 minus the sum mod 10
    return (10 - (sum % 10)) % 10;
};
