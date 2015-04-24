/**
 * Checksum number generator
 * For use in CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 */


//TODO: force incorrect check digits (10% chance of being correct)
//TODO: invalid numbers produced after generate clicked multiple times

//default type
var code_type = "ISBN-10";

var example_codes = [];
var valid_code_count = 0;
var check_digit_type = 0;
var number = "";
var sum = 0;
var primary_weights = [3, 2, 7, 6, 5, 4, 3, 2];
var secondary_weights = [7, 4, 3, 2, 5, 2, 7, 6];


//get the code_type whenever selected changes
$(document).ready(function () {
    $("select").change(function() {
    	code_type = $(this).find(':selected').val();
    });
});


//responds to button click
$(function() {
    $( "input[type=submit], a, button" )
      .button()
      .click(function( event ) {
        event.preventDefault();

		example_codes = [];
        
        for (var a = 0; a < 5; a++) {
        	chooseAlgorithm(code_type, a);
       		number = "";
        }

        displayGeneratedExampleCodes();
    
    });
});


//decide which algorithm to use
function chooseAlgorithm(code_type, count){
    
    if (code_type == "ISBN-10") {
    	ISBN10Generator(count);
    } else if (code_type == "ISBN-13" || code_type == "EAN-13") {
    	ISBN13Generator(count);
    } else if (code_type == "IRD-number") {
    	IRDGenerator(count);
    } else {
    	console.log("something else...");
    }
    example_codes.push(number);

}


//generates random ISBN-10 numbers
function ISBN10Generator(count) {
		
	//generates 9 random numbers
	generateRandomDigits(9);

	var multiplier = 10;

	//calculates the sum of the 12 digits - according to the ISBN13 algorithm
	//odd indexed digits  = *1, even indexed digits = *3
	for (var i in number) {
		sum += parseInt(number[i])*multiplier;
		multiplier -= 1;
	}

	check_digit = determineCheckDigitType(count, sum, 11);

	ISBN10CheckDigit(check_digit);
		
}


//decides if check digit should be calculated randomly or correctly
function determineCheckDigitType(count, sum, modulus){

	if (count < 2) {
		check_digit_type = 0;
	} else if (count < 4) {
		check_digit_type = 1;
	} else {
		check_digit_type = Math.round(Math.random());
	}

	if (check_digit_type == 0) {
		return modulusCalculator(sum, modulus);
	} else {
		var ignore = modulusCalculator(sum, modulus);
		return randomCheckDigit(ignore);
	}

}


//checks if checkdigit is integer or "X" for ISBN10
function ISBN10CheckDigit(check_digit) {
	if (check_digit == "10") {
		number += "X";
	} else {
		number += check_digit;
	}
}


//calculates valid checkdigit
function modulusCalculator(sum, modulus) {
	return (sum%modulus).toString();
}


//generates random check digit
function randomCheckDigit(ignore){
	check_digit = (Math.floor(Math.random()*10)).toString();
	if (check_digit == ignore){
		randomCheckDigit(ignore);
	} else {
		return check_digit;
	}
}


//generates random ISBN-13 numbers
function ISBN13Generator(count) {

		//generates 12 random numbers
		generateRandomDigits(12);

		//calculates the sum of the 12 digits - according to the ISBN13 algorithm
		//odd indexed digits  = *1, even indexed digits = *3
		for (var i in number) {
			if (number[i]%2 == 1) {
				sum += parseInt(number[i]);
			} else {
				sum += parseInt(number[i]) * 3;
			}
		}

		number += determineCheckDigitType(count, sum, 10);
}


//generate the first 8 numbers
function IRDGenerator(count) {

	generateRandomDigits(8);
	IRDCheckDigit(primary_weights, count, 0);

}


//calculates the check digit for an IRD number
//NOTE: there is a small probability that this function is repeated infinitely
function IRDCheckDigit(weights, count, repeat_count) {

	sum = calculateIRDSum(weights);
	check_digit = determineCheckDigitType(count, sum, 11);
	
	if (check_digit == 1) {
		if (repeat_count == 0) {
			check_digit = IRDCheckDigit(secondary_weights, count, repeat_count+1);
		} else {
			IRDGenerator(count, primary_weights);
		}
	} else if (check_digit == 0) {
		number += check_digit;
	} else {
		number += (11 - parseInt(check_digit)).toString();
	}

}


//caclulates sum based on weights
function calculateIRDSum(weights) {

	for (var i in number) {
		sum += parseInt(number[i] * weights[i]);
	}

	return sum;
}


//generate random numbers for start of code
function generateRandomDigits(count) {
	for (var i = 0; i < count; i++){
		number += (Math.floor(Math.random()*10)).toString();
	}
}


//display generated codes on page
function displayGeneratedExampleCodes() {
	
	//remove previous values
	var elem = document.getElementById("list");
	elem.parentNode.removeChild(elem);

	//create new elements for new list
	list_containter = document.getElementById("generated_codes");
	list_element = document.createElement("ul");
	list_element.id = "list"
	list_containter.appendChild(list_element);
	
	//each code displayed as a new list item
	for(var i in example_codes) {
		var list_item = document.createElement("li");
		list_item.innerHTML = example_codes[i];
		list_element.appendChild(list_item);
	}	

}
























