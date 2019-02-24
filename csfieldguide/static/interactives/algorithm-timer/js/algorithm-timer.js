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
  var result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
  $('#output').val(result);

  $('input[name=complexity]').click(function() {
    complexity = $('input[name=complexity]:checked').prop('id');
    result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    chosenComplexityText = COMPLEXITY_TEXT[complexity];
    $('#complexity-chosen').html(chosenComplexityText);
    $('#output').val(result);
  });
  $('input[name=result-form]').click(function() {
    resultForm = $('input[name=result-form]:checked').prop('id');
    result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    $('#output').val(result);
  });
  $('#n-items').on('input', function() {
    // TODO: Put limit of 1-1000 on input
    n = $('#n-items').val();
    result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    $('#output').val(result);
  });
  $('#speed').on('input', function() {
    speed = $('#speed').val();
    result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    $('#output').val(result);
  });
  $('#processors').on('input', function() {
    processors = $('#processors').val();
    result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    $('#output').val(result);
  });
  $('input[name=time]').click(function() {
    timeUnits = $('input[name=time]:checked').prop('id');
    result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    $('#output').val(result);
  });
});


function calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits) {
  n = parseInt(n);
  speed = parseInt(speed);
  processors = parseInt(processors);
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
  timeTaken = steps / (parseInt(speed) * parseInt(processors));

  if (timeUnits == 'seconds' || timeUnits == 'milliseconds' || 
    timeUnits == 'microseconds'|| timeUnits == 'nanoseconds') {
      timeTaken = timeTaken * TIME_SCALERS[timeUnits];
  } else {
    timeTaken = timeTaken / TIME_SCALERS[timeUnits];
  }

  if (resultForm == 'scientific') {
    timeTaken = timeTaken.toExponential();
  }
  // TODO: if NaN return blank
  return timeTaken.toString();
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
