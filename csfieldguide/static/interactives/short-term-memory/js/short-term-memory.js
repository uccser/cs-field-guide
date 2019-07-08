var itemsShown = [
  "banana",
  "bicycle",
  "book",
  "cactus",
  "calculator",
  "camera",
  "duck",
  "toothbrush",
  "forklift",
  "guitar",
  "scissors",
  "soccerball",
  "sock",
  "teapot"
]

$(document).ready(function(){
  $('#ready-button').click(function() {
    $('#items-container').removeClass('d-none');
    $('.intro-content').addClass('d-none');

    var timerDisplay = $('#stm-timer');
    timerDisplay.removeClass('d-none');
    var timeLeft = 30;
    var timerText = $('#time-left');
    var timerFunction = setInterval(countdown, 1000);
  
    function countdown() {
      if (timeLeft == 0) {
        clearTimeout(timerFunction);
        $('#items-container').addClass('d-none');
        timerDisplay.addClass('d-none');
        $('#answer-input').removeClass('d-none');
      } else {
        timeLeft--;
        if (timeLeft <= 5) {
          $('#stm-timer b').css('color', 'red');
        }
        timerText.html(timeLeft);
      }
    }
  });

  $('#submit-button').click(function() {
    var answer = $('#stm-answer-input').val();
    // Remove whitespace
    answer = answer.replace(/\s/g, '');
    answerList = answer.split(',');

    var correct = 0;
    for (i = 0; i < answerList.length; i++) {
      if (itemsShown.includes(answerList[i])) {
        correct += 1;
      }
    }

    $('#num-correct').html(correct);
    $('#answer-input').addClass('d-none');

    answerSet = new Set(answerList);
    itemsShownSet = new Set(itemsShown);
    itemsMissedSet = new Set([...itemsShownSet].filter(x => !answerSet.has(x)));

    itemsMissed = '';
    itemsMissedSet.forEach(function(value) {
      itemsMissed += value + '<br>';  
    })

    $('#items-missed').html(itemsMissed);
    $('#completion-message').removeClass('d-none');
    $('#restart-button').removeClass('d-none');
  });

  $('#restart-button').click(function() {
    $('.intro-content').removeClass('d-none');
    $('#stm-timer b').css('color', '#212529');
    $('#completion-message').addClass('d-none');
    $('#restart-button').addClass('d-none');
  });
});
