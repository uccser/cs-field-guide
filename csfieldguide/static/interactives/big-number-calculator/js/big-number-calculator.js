"use strict";

const Big = require('big.js');
// Dictionary key is the number of digits the base (x) has.
// Dictionary value is the maximum value that the exponent (y) can have for the given number of digits.
// E.g for bases that have a value in the range 10 - 99 (2 digits), the exponent value must not exceed 15,000.
const MAX_EXPONENT_VALUES = {
  '1': 50000,
  '2': 15000,
  '3': 7500,
  '4': 6000,
  '5': 5000,
  '6': 999,
  '7': 99
};
const TIMEOUT_MS = 10;

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
          updateResult(gettext("The result of this calculation could be massive! We won't try calculating this number as it's so big!"), false);
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

          var x_length = x.toString().length;
          var y_length = y.toString().length;
          // big.js cannot calculate powers when the exponent is greater than 1 million
          // however we don't want to throw an error if the base is 1
          if (x == 1) {
            updateResult(1, true);
          } else if (y_length == 1 || y_length == 2) {
            disableButtons();
            setTimeout(function() {
              updateResult(x.pow(y).toFixed(0), true);
            }, TIMEOUT_MS);
          } else if ((x_length + y_length) < 10) {
            // check if the exponent is less than the maximum allowed value
            if (y <= MAX_EXPONENT_VALUES[x_length]) {
              disableButtons();
              setTimeout(function() {
                updateResult(x.pow(y).toFixed(0), true);
              }, TIMEOUT_MS);
            } else {
              throw false;
            }
          } else {
            throw false;
          }
        } catch (exception) {
          updateResult(gettext("The result of this calculation could be massive! We won't try calculating this number as it's so big!"), false);
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
  if (value < 1800) {
    var total = new Big(value);
    for (var i = value - 1; i > 0; i--) {
        total = total.times(i);
    }
    updateResult(total.toFixed(), true);
  } else {
    updateResult(gettext("The result of this factorial could be massive, over 5000 digits long! We won't try calculating this number as it's so big!"), false);
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
  $('#interactive-big-number-calculator button').removeClass('disabled');
  var $result = $('#interactive-big-number-calculator-result');
  $result.text(string);
  if (is_success == true) {
    $result.removeClass('calculating').removeClass('error');
  } else {
    $result.removeClass('calculating').addClass('error');
  }
};

function disableButtons() {
  $('#interactive-big-number-calculator button').addClass('disabled');
  $('#interactive-big-number-calculator-result')
  .removeClass('error')
  .addClass('calculating')
  .text(gettext('Calculating...'));
};
