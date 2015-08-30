/**
 * Awful Calculator Floateractive
 * For use in the CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 */

$(document).ready(function () {

    var expression = [];

    $(".interactive-calculator-good button").click(function(){
        var input = $(this).val();
        element = document.getElementById("interactive-good-calculator-output");
        updateDisplay(input, expression, element);
    });


    $(".interactive-calculator-awful button").click(function(){
        var input = $(this).val();
        element = document.getElementById("interactive-bad-calculator-output");
        var delayTime = (Math.random() * (2 - 0.1) + 0.1)*1000;
        console.log(delayTime);
        setTimeout(function() {
            setInterval(updateDisplay(input, expression, element), delayTime);
        }, delayTime);
    });

});


// recursively calculates each part of the expression (does not use BEDMAS)
function evaluateExpression(expression, x, operator, y) {
    var evaluate = {
        "+": function (x, y) { return x + y },
        "-": function (x, y) { return x - y },
        "*": function (x, y) { return x * y },
        "/": function (x, y) { return x / y }
    };
    answer = evaluate[operator](parseFloat(x), parseFloat(y));
    if (expression.length > 0) {
        return evaluateExpression(expression, answer, expression.splice(0, 1), expression.splice(0, 1));
    } else {
        expression[0] = answer;
        return answer;
    }
}


function updateDisplay(input, expression, element) {
    if (".+-/*0123456789".indexOf(input) != -1) {
        if (input == parseFloat(input) || input == ".") {
            // accounts for numbers greater than 1 digit long
            if (expression.length >= 1){
                if (expression[(expression.length)-1] == parseFloat(expression[expression.length-1])) {
                    input = expression[expression.length-1] + input; // change input to multi digit number
                    expression.splice(expression.length - 1); // remove last input from list
                }
            }
        }
        expression.push(input); // add input to expression
        element.innerHTML = expression.join(" "); // update display
    } else if (input == "C") {
        // clear
        console.log("clearing list");
        expression.splice(0); // clear expression list
        element.innerHTML = ""; // clear display
    } else if (input == "=") {
        // evaluate
        element.innerHTML = evaluateExpression(expression, expression.splice(0, 1), expression.splice(0, 1), expression.splice(0, 1));
    }
    console.log(expression);
}
