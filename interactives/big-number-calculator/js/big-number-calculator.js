"use strict";

$(document).ready(function () {
    $('#interactive-big-number-calculator button').on('click', function(){
        var button_type = $(this).attr('id').split('-').pop();
        var x = getXValue();
        var y = getYValue();

        if (x && button_type == 'factorial') {
            factorial(x);
        } else if (x && y) {
            if (button_type == 'addition') {
                updateResult(x.add(y).toString(), true);
            }
            else if (button_type == 'subtraction') {
                updateResult(x.minus(y).toString(), true);
            }
            else if (button_type == 'multiply') {
                updateResult(x.times(y).toString(), true);
            }
            else if (button_type == 'division') {
                updateResult(x.div(y).toString(), true);
            }
            else if (button_type == 'power') {
                var power = parseInt(document.getElementById('interactive-big-number-calculator-y').value.replace(/[\,\s]/g, ""))
                updateResult(x.pow(power).toFixed(0), true);
            }
        } else if (x === undefined) {
            updateResult('Error! Your X value is not a valid number.', false);
        } else if (y === undefined) {
            updateResult('Error! Your Y value is not a valid number.', false);
        }

    });

    // On 'Clear' click
    $('#interactive-big-number-calculator-clear').on('click', function(){
        $('#interactive-big-number-calculator-x').val('').trigger('autoresize');
        $('#interactive-big-number-calculator-y').val('').trigger('autoresize');
        $('#interactive-big-number-calculator-result').val('').trigger('autoresize');
    });
});


function factorial(value) {
    if (value < 1800){
        var total = new Big(value);
        for (var i = value - 1; i > 0; i--) {
            total = total.times(i);
        }
        updateResult(total.toString(), true);
    } else {
        updateResult("The result of this factorial will be massive, over 5000 digits long! We won't try calculating this number as it's so big!", false);
    }
};


function getXValue() {
    var x;
    try {
        x = new Big(document.getElementById('interactive-big-number-calculator-x').value.replace(/[\,\s]/g, ""));
    } catch (e) {
        x = undefined;
    } finally {
        return x;
    }
};


function getYValue() {
    var y;
    try {
        y = new Big(document.getElementById('interactive-big-number-calculator-y').value.replace(/[\,\s]/g, ""));
    } catch (e) {
        y = undefined;
    } finally {
        return y;
    }
};


function updateResult(string, is_success) {
    var $result = $('#interactive-big-number-calculator-result');
    $result.val(string).trigger('autoresize');
    if (is_success == true) {
        $result.removeClass('error');
    } else {
        $result.addClass('error');
    }
}
