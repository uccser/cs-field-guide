$(document).ready(function() {
    var complexity = $('input[name=complexity]:checked').prop('id');
    var resultForm = $('input[name=result-form]:checked').prop('id');
    var n = $('#n-items]').val();
    var speed = $('#speed').val();
    var processors = $('#processors').val();
    var timeUnits = $('input[name=time]:checked').prop('id');
    var result = timecalculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);

    $('input[name=complexity]').click(function() {
        complexity = $('input[name=complexity]:checked').prop('id');
        result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    })
    $('input[name=result-form]').click(function() {
        resultForm = $('input[name=result-form]:checked').prop('id');
        result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    })
    $('#n-items').on('input', function() {
        n = $('#n-items]').val();
        result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    })
    $('#speed').on('input', function() {
        speed = $('#speed').val();
        result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    })
    $('#processors').on('input', function() {
        processors = $('#processors').val();
        result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    })
    $('input[name=time]').click(function() {
        timeUnits = $('input[name=time]:checked').prop('id');
        result = calculateTimeTaken(complexity, resultForm, n, speed, processors, timeUnits);
    })


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
    return timeTaken;
}


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
