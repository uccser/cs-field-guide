"use strict";

const Big = require('big.js');

$(document).ready(function () {
  $('#interactive-big-number-calculator button').on('click', function(){
    var button_type = $(this).attr('id').split('-').pop();
    var x = getXValue();
    var y = getYValue();

    if (x && button_type == 'factorial') {
      factorial(x);
    } else if (x && y) {
      if (button_type == 'addition') {
        updateResult(x.add(y).toFixed(), true);
      }
      else if (button_type == 'subtraction') {
        updateResult(x.minus(y).toFixed(), true);
      }
      else if (button_type == 'multiply') {
        if (x.toString().length > 5000 || y.toString().length > 5000) {
          updateResult(gettext("The result of this calculation will be massive! We won't try calculating this number as it's so big!"), false);
        } else {
          updateResult(x.times(y).toFixed(), true);
        }
      }
      else if (button_type == 'division') {
        try {
          updateResult(x.div(y).toFixed(), true);
        } catch (exception) {
          if (y == 0) {
            updateResult(gettext("You can't divide by zero!"), false);
          } else {
            updateResult(exception, false);
          }
        }
      }
      else if (button_type == 'power') {
        try {
          var y = parseInt(document.getElementById('interactive-big-number-calculator-y').value.replace(/[\,\s]/g, ""));
          if ((x.toString().length + y.toString().length) < 10) {
            updateResult(x.pow(y).toFixed(0), true);
          } else {
            throw false;
          }
        } catch (exception) {
          updateResult(gettext("The result of this calculation will be massive! We won't try calculating this number as it's so big!"), false);
        }
      }
    } else if (x === undefined) {
      updateResult(gettext("Error! Your X value is not a valid number."), false);
    } else if (y === undefined) {
      updateResult(gettext("Error! Your Y value is not a valid number."), false);
    }

  });

  // On 'Clear' click
  $('#interactive-big-number-calculator-clear').on('click', function(){
    $('#interactive-big-number-calculator-x').val('').trigger('autoresize');
    $('#interactive-big-number-calculator-y').val('').trigger('autoresize');
    $('#interactive-big-number-calculator-result').text('');
  });
});


function factorial(value) {
  if (value < 1800){
    var total = new Big(value);
    for (var i = value - 1; i > 0; i--) {
        total = total.times(i);
    }
    updateResult(total.toFixed(), true);
  } else {
    updateResult(gettext("The result of this factorial will be massive, over 5000 digits long! We won't try calculating this number as it's so big!"), false);
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
  $result.text(string);
  if (is_success == true) {
    $result.removeClass('error');
  } else {
    $result.addClass('error');
  }
}
