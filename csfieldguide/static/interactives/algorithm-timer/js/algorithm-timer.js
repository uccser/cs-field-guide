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
  'minutes': 60,
  'hours': 3600,
  'days': 86400,
  'years': 31557600,
  'centuries': 3155760000,
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

  function updateData() {
    var result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    $('#output').val(result + ' ' + timeUnits);
  }
});


function calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits) {
  n = Math.round(n);
  // can only have whole integers for number of items
  $('#n-items').val(n);
  speed = Number(speed);
  processors = Number(processors);
  var steps;
  
  if (complexity == 'squared') {
    steps = Math.pow(n, 2);
  } else if (complexity == 'cubed') {
    steps = Math.pow(n, 3);
  } else if (complexity == 'fourth-power') {
    steps = Math.pow(n, 4);
  } else if (complexity == 'sixth-power') {
    steps = Math.pow(n, 6);
  } else if (complexity == 'exponential') {
    steps = Math.pow(2, n);
  } else if (complexity == 'factorial') {
    steps = getFactorial(n);
  }
  timeTaken = steps / (speed * processors);

  if (timeUnits == 'seconds' || timeUnits == 'milliseconds' || 
    timeUnits == 'microseconds'|| timeUnits == 'nanoseconds') {
      timeTaken = timeTaken * TIME_SCALERS[timeUnits];
  } else {
    timeTaken = timeTaken / TIME_SCALERS[timeUnits];
  }

  if (resultForm == 'scientific') {
    timeTaken = timeTaken.toExponential(2);
  } else {
    timeTaken = timeTaken.toFixed(2);
  }

  if (isNaN(timeTaken)) {
    return '';
  }
  return timeTaken;
}


// below function from 
// https://stackoverflow.com/questions/3959211/what-is-the-fastest-factorial-function-in-javascript
factorial = [];
function getFactorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  }
  if (factorial[n] > 0) {
    return factorial[n];
  }
  return factorial[n] = getFactorial(n-1) * n;
}


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
