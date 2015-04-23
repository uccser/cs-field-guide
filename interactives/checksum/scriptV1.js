//sets background colour to blue - temporary test for js connection
document.bgColor = "#72B6F2"

var INPUTS = document.getElementsByTagName('input');


$(function() {
	/*
	Responds to "Calculate" button click
	*/
    $( "input[type=submit], a, button" )
      .click(function( event ) {
        event.preventDefault();
        var code = INPUTS[0].value;
        var check_number = INPUTS[1].value;
        var check_digit = calculate_check_digit(code, check_number)
        if (check_number == '') { //user did not enter check digit
        	//calculate check digit for user
			output_check_digit_widet(check_digit);
		} else {
			validate_given_input(check_number, check_digit);
		}
    });
});


function validate_given_input(check_number, check_digit){
	/*
	Checks if user gave correct check digit
	*/
	if (check_number == check_digit) {
		console.log("same");
	}
}

function calculate_check_digit(code, check_number) {
	/*
	Calculates check digit
	*/

    digits = [];
    sNumber = code.toString();

	for (var i = 0, len = sNumber.length; i < len; i += 1) {
	    digits.push(+sNumber.charAt(i));
	}

	var sum = 0
	for (var i = 0; i < digits.length; i++){
		if ( i % 2  == 0) {
			sum += digits[i];
		} else {
			sum += digits[i] * 3;
		}
	}

	sSum = sum.toString();
	var last_digit = [];

	for (var i = 0, len = sSum.length; i < len; i += 1) {
	    last_digit.push(+sSum.charAt(i));
	}

	console.log(last_digit[last_digit.length - 1])

	var check_digit = 10 - last_digit[last_digit.length - 1];
	if (check_digit == 10) {
		check_digit = 0;
	}

	
    return check_digit;

}


function output_check_digit_widet(check_digit){
	/*
	Fills check button input widget with correct check digit
	*/

	INPUTS[1].value = check_digit;
	console.log("The check digit is", check_digit);
}