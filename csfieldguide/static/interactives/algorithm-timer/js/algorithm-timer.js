const Mathjs = require('mathjs');

const COMPLEXITY_TEXT = {
  'log': 'log(n)',
  'nlog': 'nlog(n)',
  'linear': 'n',
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

const DIVISOR_LIMIT = Mathjs.bignumber('10000000000000000');                 //10^16
const STEP_LIMIT    = Mathjs.bignumber('100000000000000000000000000000000'); //10^32


$(document).ready(function() {
  var complexity = $('input[name=complexity]:checked').prop('id');
  var resultForm = $('input[name=result-form]:checked').prop('id');
  var n = $('#n-items').val();
  var speed = $('#speed').val();
  var processors = $('#processors').val();
  var timeUnits = $('input[name=time]:checked').prop('id');
  startingComplexityText = COMPLEXITY_TEXT[complexity];
  $('#complexity-chosen').html(startingComplexityText);
  if (inputIsValid(n, speed, processors, complexity)) {
    updateData();
  }

  $('input[name=complexity]').click(function() {
    complexity = $('input[name=complexity]:checked').prop('id');
    chosenComplexityText = COMPLEXITY_TEXT[complexity];
    $('#complexity-chosen').html(chosenComplexityText);
    if (inputIsValid(n, speed, processors, complexity)) {
      updateData();
    }
  });
  $('input[name=result-form]').click(function() {
    resultForm = $('input[name=result-form]:checked').prop('id');
    if (inputIsValid(n, speed, processors, complexity)) {
      updateData();
    }
  });
  $('#n-items').on('input', function() {
    n = $('#n-items').val();
    if (inputIsValid(n, speed, processors, complexity)) {
      updateData();
    }
  });
  $('#speed').on('input', function() {
    speed = $('#speed').val();
    if (inputIsValid(n, speed, processors, complexity)) {
      updateData();
    }
  });
  $('#processors').on('input', function() {
    processors = $('#processors').val();
    if (inputIsValid(n, speed, processors, complexity)) {
      updateData();
    }
  });
  $('input[name=time]').click(function() {
    timeUnits = $('input[name=time]:checked').prop('id');
    if (inputIsValid(n, speed, processors, complexity)) {
      updateData();
    }
  });

  /** Get the time it will take for the algorithm to finish executing
   *  and display it. Written this way for ease of translation */
  function updateData() {
    var result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    if (timeUnits == 'nanoseconds') {
      var format = ngettext('1 nanosecond', '%s nanoseconds', result);
    } else if (timeUnits == 'microseconds') {
      var format = ngettext('1 microsecond', '%s microseconds', result);
    } else if (timeUnits == 'milliseconds') {
      var format = ngettext('1 millisecond', '%s milliseconds', result);
    } else if (timeUnits == 'seconds') {
      var format = ngettext('1 second', '%s seconds', result);
    } else if (timeUnits == 'minutes') {
      var format = ngettext('1 minute', '%s minutes', result);
    } else if (timeUnits == 'hours') {
      var format = ngettext('1 hour', '%s hours', result);
    } else if (timeUnits == 'days') {
      var format = ngettext('1 day', '%s days', result);
    } else if (timeUnits == 'months') {
      var format = ngettext('1 month', '%s months', result);
    } else if (timeUnits == 'years') {
      var format = ngettext('1 year', '%s years', result);
    } else if (timeUnits == 'centuries') {
      var format = ngettext('1 century', '%s centuries', result);
    }
    var output = interpolate(format, [result]);
    $('#output').val(output);
  }
});


/** Calculates the time the algorithm will take to finish
 *  executing in the selected time units */
function calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits) {
  // can only have whole integers for number of items
  n = Math.round(n);
  $('#n-items').val(n);
  processors = Mathjs.bignumber(Math.round(processors));
  $('#processors').val(processors);
  speed = Mathjs.bignumber(speed);
  $('#speed').val(speed);
  var steps = calculateSteps(n, complexity);

  var denominator = Mathjs.multiply(speed, processors);
  var timeTaken = Mathjs.divide(steps, denominator);

  var timeScale = Mathjs.bignumber(TIME_SCALERS[timeUnits])
  timeTaken = Mathjs.multiply(timeTaken, timeScale);

  if (resultForm == 'scientific') {
    timeTaken = Mathjs.format(Mathjs.bignumber(timeTaken), {notation: 'exponential', precision: 3});
  } else {
    timeTaken = Mathjs.format(Mathjs.bignumber(timeTaken), {notation: 'fixed', precision: 2});
      // If there are no significant decimal places don't show any decimal places (non scientific mode only)
    if (timeTaken % 1 == 0) {
      timeTaken = Mathjs.format(Mathjs.bignumber(timeTaken), {notation: 'fixed', precision: 0});
    }
  }

  return timeTaken;
}


/** Calculates the number of steps required, given the number of items and complexity of the algorithm. */
function calculateSteps(n, complexity) {
  var steps;
  if (complexity == 'log') {
    steps = Math.ceil(Mathjs.log(n, 2));
  } else if (complexity == 'linear') {
    steps = Mathjs.bignumber(n);
  } else if (complexity == 'nlog') {
    // because log(1) == 0
    if (n == 1) {
      steps = 1;
    } else {
      steps = Math.ceil(n * Mathjs.log(n, 2));
    }
  } else if (complexity == 'squared') {
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
    n = Mathjs.bignumber(n);
    steps = Mathjs.factorial(n);
  }

  return steps;
}


/** Checks if the user input is valid */
function inputIsValid(n, speed, processors, complexity) {
  isValid = true;

  // validation for number of items
  nItems = $('#n-items');
  nItemsInvalidMsg = $('#n-items-input-invalid');
  nItemsTooBigMsg = $('#n-items-input-too-big');
  if (isNaN(n) || n < 1 || nTooBigGivenComplexity(n, complexity)) {
    nItems.addClass('is-invalid');
    isValid = false;
    if (isNaN(n) || n < 1) {
      nItemsInvalidMsg.removeClass('d-none');
      nItemsTooBigMsg.addClass('d-none');
    } else {
      nItemsTooBigMsg.removeClass('d-none');
      nItemsInvalidMsg.addClass('d-none');
    }
    $('#output').val('');
  } else {
    nItems.removeClass('is-invalid');
    nItemsTooBigMsg.addClass('d-none');
    nItemsInvalidMsg.addClass('d-none');
  }

  // validation for speed
  speedInput = $('#speed');
  speedInvalidMsg = $('#speed-input-invalid');
  speedTooBigMsg = $('#speed-input-too-big');
  if (isNaN(speed) || speed <= 0 || Mathjs.smaller(DIVISOR_LIMIT, Mathjs.bignumber(speed))) {
    speedInput.addClass('is-invalid');
    isValid = false;
    if (isNaN(speed) || speed <= 0) {
      speedInvalidMsg.removeClass('d-none');
      speedTooBigMsg.addClass('d-none');
    } else {
      speedTooBigMsg.removeClass('d-none');
      speedInvalidMsg.addClass('d-none');
    }
    $('#output').val('');
  } else {
    speedInput.removeClass('is-invalid');
    speedTooBigMsg.addClass('d-none');
    speedInvalidMsg.addClass('d-none');
  }

  // validation for processors
  processorsInput = $('#processors');
  processorsInvalidMsg = $('#processors-input-invalid');
  processorsTooManyMsg = $('#processors-input-too-big');
  if (isNaN(processors) || processors < 1 || Mathjs.smaller(DIVISOR_LIMIT, Mathjs.bignumber(processors))) {
    processorsInput.addClass('is-invalid');
    isValid = false;
    if (isNaN(processors) || processors < 1) {
      processorsInvalidMsg.removeClass('d-none');
      processorsTooManyMsg.addClass('d-none');
    } else {
      processorsTooManyMsg.removeClass('d-none');
      processorsInvalidMsg.addClass('d-none');
    }
    $('#output').val('');
  } else {
    processorsInput.removeClass('is-invalid');
    processorsTooManyMsg.addClass('d-none');
    processorsInvalidMsg.addClass('d-none');
  }

  return isValid;
}

function nTooBigGivenComplexity(n, complexity) {
  // With a big enough complexity, high enough values for n
  // will freeze the interactive if we actually calculate it
  if (complexity in ['fourth-power', 'sixth-power']) {
    return n > 1000000
  } else if (complexity in ['exponential', 'factorial']) {
    return n > 1000
  }
  //
  
  return Mathjs.smaller(STEP_LIMIT, calculateSteps(n, complexity))
}
