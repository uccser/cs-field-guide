var items = [
  gettext("backpack"),
  gettext("banana"),
  gettext("bike"),
  gettext("book"),
  gettext("cactus"),
  gettext("calculator"),
  gettext("camera"),
  gettext("chair"),
  gettext("cup"),
  gettext("duck"),
  gettext("envelope"),
  gettext("forklift"),
  gettext("glasses"),
  gettext("guitar"),
  gettext("scissors"),
  gettext("sheep"),
  gettext("soccerball"),
  gettext("sock"),
  gettext("teapot"),
  gettext("tshirt"),
  gettext("toothbrush")
]

var itemsShown = [];
const NUM_ITEMS_SHOWN = 16;

$(document).ready(function(){
  $('#ready-button').click(function() {
    showItems();
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
    resetItems();
    $('#time-left').html(30);
    $('#stm-answer-input').val('');
  });
});


function showItems() {
  shuffle(items);
  itemsToShow = items.slice(0, NUM_ITEMS_SHOWN);
  itemsShown = itemsToShow;
  for (i = 0; i < itemsToShow.length; i++) {
    itemDiv = $('#item-' + itemsToShow[i]);
    itemDiv.removeClass('d-none');
  }
}


function resetItems() {
  for (i = 0; i < items.length; i++) {
    itemDiv = $('#item-' + items[i]);
    itemDiv.addClass('d-none');
  }
}


/**
 * Shuffles array in place.
 * @param {Array} a The array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
  }
}
