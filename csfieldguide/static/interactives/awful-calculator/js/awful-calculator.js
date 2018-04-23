/**
 * Awful Calculator Interactive
 * For use in the CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 * Modified by Jack Morgan, University of Canterbury
 * Logic from thecodeplayer.com/walkthrough/javascript-css3-calculator
 */

var AwfulCalculator = {};

$(document).ready(function () {
    AwfulCalculator.operators = ['+', '-', '\u00D7', '\u00F7'];
    AwfulCalculator.decimal_added = false;

    $("#calculator-good button").click(function(){
        var button_value = this.innerHTML.trim();
        output_element = document.getElementById("good-calculator-output");
        processInput(button_value, output_element);
    });


    $("#calculator-awful button").click(function(){
        var button_value = this.innerHTML.trim();
        output_element = document.getElementById("awful-calculator-output");
        var delayTime = (Math.random() * (2 - 0.1) + 0.1)*1000;
        setTimeout(function() {
            processInput(button_value, output_element);
        }, delayTime);
    });

});

function processInput(button_value, output_element) {
    var output_value = output_element.innerHTML;

    // Clear
    if (button_value == "C") {
        output_element.innerHTML = ""; // clear display
    }
    // Evaluate
    else if (button_value == "=") {
			  var last_char = output_value[output_value.length - 1];
  			// Replace all instances of x and ÷ with * and / respectively. This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
  			output_value = output_value.replace(/\u00D7/g, '*').replace(/\u00F7/g, '/');

			// Final thing left to do is checking the last character of the equation. If it's an operator or a decimal, remove it
			if(AwfulCalculator.operators.indexOf(last_char) > -1 || last_char == '.') {
        output_value = output_value.slice(0, -1);
      }
			if(output_value) {
        output_element.innerHTML = eval(output_value);
      }
    }
    // Operator
    else if(AwfulCalculator.operators.indexOf(button_value) > -1) {
        // Get the last character from the equation
        var last_char = output_value[output_value.length - 1];

        // Allow minus if the string is empty
        if(output_value == '' && button_value == '-') {
          output_element.innerHTML += button_value;
        }
        else if(AwfulCalculator.operators.indexOf(last_char) > -1 && output_value.length > 1) {
          // Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
          output_element.innerHTML = output_value.slice(0, -1) + button_value;
        }
        // Only add operator if input is not empty and there is no operator at the last
        else if(output_value != '' && AwfulCalculator.operators.indexOf(last_char) == -1) {
          output_element.innerHTML += button_value;
        }
        // Replace the last operator (if exists) with the newly pressed operator
        // Reset decimal
        AwfulCalculator.decimal_added = false;
    }
    // Decimal place
    else if (button_value == ".") {
        if(!AwfulCalculator.decimal_added) {
            output_element.innerHTML += button_value;
            AwfulCalculator.decimal_added = true;
        }
    }
    // Number
    else {
      output_element.innerHTML += button_value;
    }
  }
