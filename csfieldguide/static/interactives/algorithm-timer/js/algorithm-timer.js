const Mathjs = require('mathjs');

const COMPLEXITY_TEXT = {
  'squared': 'n&sup2;',
  'cubed': 'n&sup3;',
  'fourth-power': 'n<sup>4</sup>',
  'sixth-power': 'n<sup>6</sup>',
  'exponential': '2<sup>n</sup>',
  'factorial': 'n!',
};

const TIME_SCALERS = {
  'nanoseconds': 1000000000,
  'microseconds': 1000000,
  'milliseconds': 1000,
  'seconds': 1,
  'minutes': Mathjs.divide(1, 60),
  'hours': Mathjs.divide(1, 3600),
  'days': Mathjs.divide(1, 86400),
  'years': Mathjs.divide(1, 31557600),
  'centuries': Mathjs.divide(1, 3155760000),
};


$(document).ready(function() {
  var complexity = $('input[name=complexity]:checked').prop('id');
  var resultForm = $('input[name=result-form]:checked').prop('id');
  var n = $('#n-items').val();
  var speed = $('#speed').val();
  var processors = $('#processors').val();
  var timeUnits = $('input[name=time]:checked').prop('id');
  updateData()

  $('input[name=complexity]').click(function() {
    complexity = $('input[name=complexity]:checked').prop('id');
    chosenComplexityText = COMPLEXITY_TEXT[complexity];
    $('#complexity-chosen').html(chosenComplexityText);
    updateData()
  });
  $('input[name=result-form]').click(function() {
    resultForm = $('input[name=result-form]:checked').prop('id');
    updateData()
  });
  $('#n-items').on('input', function() {
    n = $('#n-items').val();
    if (inputIsValid(n, speed, processors) == true) {
      updateData()
    }
  });
  $('#speed').on('input', function() {
    speed = $('#speed').val();
    if (inputIsValid(n, speed, processors) == true) {
      updateData()
    }
  });
  $('#processors').on('input', function() {
    processors = $('#processors').val();
    if (inputIsValid(n, speed, processors) == true) {
      updateData()
    }
  });
  $('input[name=time]').click(function() {
    timeUnits = $('input[name=time]:checked').prop('id');
    updateData()
  });

  /** Get the time it will take for the algorithm to finish executing
   *  and display it. */
  function updateData() {
    var result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    $('#output').val(result + ' ' + timeUnits);
  }
});


/** Calculates the time the algorithm will take to finish
 *  executing in the selected time units */
function calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits) {
  // can only have whole integers for number of items
  n = Mathjs.bignumber(Math.round(n));
  $('#n-items').val(n);
  speed = Mathjs.bignumber(speed);
  processors = Mathjs.bignumber(processors);
  var steps;
  
  if (complexity == 'squared') {
    steps = Mathjs.bignumber(Math.pow(n, 2));
  } else if (complexity == 'cubed') {
    steps = Mathjs.bignumber(Math.pow(n, 3));
  } else if (complexity == 'fourth-power') {
    steps = Mathjs.bignumber(Math.pow(n, 4));
  } else if (complexity == 'sixth-power') {
    steps = Mathjs.bignumber(Math.pow(n, 6));
  } else if (complexity == 'exponential') {
    steps = Mathjs.bignumber(Math.pow(2, n));
  } else if (complexity == 'factorial') {
    steps = Mathjs.factorial(n);
  }

  var denominator = Mathjs.multiply(speed, processors);
  var timeTaken = Mathjs.divide(steps, denominator);

  var timeScale = Mathjs.bignumber(TIME_SCALERS[timeUnits])
  timeTaken = Mathjs.multiply(timeTaken, timeScale);

  if (resultForm == 'scientific') {
    timeTaken = Mathjs.format(Mathjs.bignumber(timeTaken), {notation: 'exponential', precision: 3});
  } else {
    timeTaken = Mathjs.format(Mathjs.bignumber(timeTaken), {notation: 'fixed', precision: 2});
  }

  if (isNaN(timeTaken)) {
    return '';
  }
  return timeTaken;
}


/** Checks if the user input is valid */
function inputIsValid(n, speed, processors) {
  isValid = true;

  // validation for number of items
  nItems = $('#n-items');
  nItemsErrorMsg = $('#n-items-input-error');
  if (n < 1 || n > 1000 || isNaN(n)) {
    nItems.addClass('is-invalid');
    nItemsErrorMsg.removeClass('d-none');
    isValid = false;
    $('#output').val('');
  } else if ((1 <= n <= 1000) && !nItemsErrorMsg.hasClass('d-none')) {
    nItems.removeClass('is-invalid');
    nItemsErrorMsg.addClass('d-none');
  }

  // validation for speed
  speedInput = $('#speed');
  speedErrorMsg = $('#speed-input-error');
  if (speed < 1 || isNaN(speed)) {
    speedInput.addClass('is-invalid');
    speedErrorMsg.removeClass('d-none');
    isValid = false;
    $('#output').val('');
  } else if (speed > 0 && !speedErrorMsg.hasClass('d-none')) {
    speedInput.removeClass('is-invalid');
    speedErrorMsg.addClass('d-none');
  }

  // validation for processors
  processorsInput = $('#processors');
  processorsErrorMsg = $('#processors-input-error');
  if (processors < 1 || isNaN(processors)) {
    processorsInput.addClass('is-invalid');
    processorsErrorMsg.removeClass('d-none');
    isValid = false;
    $('#output').val('');
  } else if (processors > 0 && !processorsErrorMsg.hasClass('d-none')) {
    processorsInput.removeClass('is-invalid');
    processorsErrorMsg.addClass('d-none');
  }

  return isValid;
}
