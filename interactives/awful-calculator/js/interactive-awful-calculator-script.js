/**
 * Awful Calculator Interactive
 * For use in the CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 */

$(document).ready(function () {
    var expression = [];

    $(".interactive-calculator-good button").click(function(){
        var input = $(this).val();
        // TODO: should change order of these if statements
        if (input == "=") {
            // evaluate
            document.getElementById("interactive-good-calculator-output").innerHTML = evaluateExpression(expression);
        } else if (input == "C") {
            // clear
        } else {
            if (input == parseInt(input)) {
                if (expression.length >= 1){
                    if (expression[(expression.length)-1] == parseInt(expression[expression.length-1])) {
                        input = expression[expression.length-1] + input;
                        expression.splice(expression.length - 1);
                    }
                }
            }
            expression.push(input);
            document.getElementById("interactive-good-calculator-output").innerHTML = expression.join(" ");
        }
    });


    $(".interactive-calculator-awful button").click(function(){
        console.log($(this).val());
    });

});


function evaluateExpression(expression) {
    var evaluate = {
        "+": function (x, y) { return x + y },
        "-": function (x, y) { return x - y },
        "*": function (x, y) { return x * y },
        "/": function (x, y) { return x / y }
    };
    // TODO: hardcoded for only first operation in expression, needs to evaluate whole expression
    x = expression[0];
    y = expression[2];
    return evaluate[expression[1]](parseInt(x), parseInt(y));
}
