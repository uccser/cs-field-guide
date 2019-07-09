var itemsShown = [
  gettext("banana"),
  gettext("bicycle"),
  gettext("book"),
  gettext("cactus"),
  gettext("calculator"),
  gettext("camera"),
  gettext("duck"),
  gettext("toothbrush"),
  gettext("forklift"),
  gettext("guitar"),
  gettext("scissors"),
  gettext("soccerball"),
  gettext("sock"),
  gettext("teapot")
]

const NUM_ITEMS_SHOWN = 14;

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
    var answerList = answer.split(',');

    var correct = 0;
    for (i = 0; i < answerList.length; i++) {
      if (itemsShown.includes(answerList[i])) {
        correct += 1;
      }
    }

    $('#num-correct').html(correct);
    $('#answer-input').addClass('d-none');

    if (correct !== NUM_ITEMS_SHOWN) {
      var answerSet = new Set(answerList);
      var itemsShownSet = new Set(itemsShown);
      var itemsMissedSet = new Set([...itemsShownSet].filter(x => !answerSet.has(x)));

      // Lists the items that were missed
      var itemsMissed = '';
      itemsMissedSet.forEach(function(value) {
        itemsMissed += value + '<br>';
      })

      $('#items-missed').html(itemsMissed);
      $('#items-missed-text').removeClass('d-none');
    } else {
      $('#items-correct-text').removeClass('d-none');
    }

    $('#restart-div').removeClass('d-none');
  });

  $('#restart-button').click(function() {
    $('.intro-content').removeClass('d-none');
    $('#stm-timer b').css('color', '#212529');
    $('#completion-message').addClass('d-none');
    $('#restart-div').addClass('d-none');
    $('#items-correct-text').addClass('d-none');
    $('#items-missed-text').addClass('d-none');
    $('#items-missed').html('');
    $('#time-left').html(30);
    $('#stm-answer-input').val('');
  });
});
