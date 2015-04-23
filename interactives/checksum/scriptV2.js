/**
 * Checksum number generator
 * For use in CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 */



//default type
var code_type = "ISBN-10";
var example_codes = [];


//get the code_type whenever selected changes
$(document).ready(function () {
    $("select").change(function() {
    	code_type = $(this).find(':selected').val();
    	console.log(code_type);
    });
});


//responds to button click
$(function() {
    $( "input[type=submit], a, button" )
      .button()
      .click(function( event ) {
        event.preventDefault();
        example_codes = [];
        if (code_type == "ISBN-13") {
        	ISBN13Generator();
        }
        displayGeneratedExampleCodes();
    });
});


//generates random ISBN-13 numbers
function ISBN13Generator() {

	var number_valid = 0;
	var temp;

	for (var a = 0; a < 5; a++) {

		var number = "";

		//generates 12 random numbers
		for (var i = 0; i < 12; i++){
			number += (Math.floor(Math.random()*10)).toString();
		}

		var sum = 0;

		//calculates the sum of the 12 digits - according to the ISBN13 algorithm
		//odd indexed digits  = *1, even indexed digits = *3
		for (var i in number) {
			if (number[i]%2 == 1) {
				sum += parseInt(number[i]);
			} else {
				sum += parseInt(number[i]) * 3;
			}
		}

		if (a > 2 && number_valid < 2) {
			number += sum%10;
			console.log("valid");
			number_valid += 1;
		} else {
			temp = Math.round(Math.random()) //randomly generate 0 or 1
		
			if (temp == 0) {
				number += sum%10;
				console.log("valid")
			} else {
				//calculates random check digit
				number += (Math.floor(Math.random()*10)).toString();
				console.log("invalid")
			}
		}

		example_codes.push(number);
		
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
























