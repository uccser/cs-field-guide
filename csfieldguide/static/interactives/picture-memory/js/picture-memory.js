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
  gettext("football"),
  gettext("forklift"),
  gettext("glasses"),
  gettext("guitar"),
  gettext("scissors"),
  gettext("sheep"),
  gettext("sock"),
  gettext("teapot"),
  gettext("t-shirt"),
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
    var itemsChecked = [];
    $.each($("input[name='answers']:checked"), function() {            
      itemsChecked.push($(this).val());
    });

    var correct = 0;
    var incorrect = 0;
    for (i = 0; i < itemsChecked.length; i++) {
      if (itemsShown.includes(itemsChecked[i])) {
        correct += 1;
      } else {
        incorrect += 1;
      }
    }

    $('#num-correct').html(correct);
    $('#answer-input').addClass('d-none');
    var answerSet = new Set(itemsChecked);
    if (correct === NUM_ITEMS_SHOWN) {
      var itemsShownSet = new Set(itemsShown);
      var itemsIncorrect = new Set([...answerSet].filter(x => !itemsShownSet.has(x)));

      $('#items-correct-text').removeClass('d-none');

      if (itemsIncorrect.size > 0) {
        itemsIncorrectString = '';
        // List items the user checked that were never shown
        itemsIncorrect.forEach(function(value) {
          itemsIncorrectString += value.charAt(0).toUpperCase() + value.slice(1) + '<br>';
        });
        $('#incorrect-items-div').removeClass('d-none');
        $('#incorrect-items').html(itemsIncorrectString);
      }
    } else if (correct < NUM_ITEMS_SHOWN) {
      // Show the items that were missed
      answerSet.forEach(function(value) {
        itemDiv = $('#item-' + value);
        itemDiv.addClass('d-none');
      });

      $('#items-missed-text').removeClass('d-none');
      $('#items-container').removeClass('d-none');
    } else {
      $('#items-correct-text').removeClass('d-none');
    }

    $('#restart-div').removeClass('d-none');
  });

  $('#restart-button').click(function() {
    $('.intro-content').removeClass('d-none');
    $('#stm-timer b').css('color', '#212529');
    $('#answer-input').addClass('d-none');
    $('input[type="checkbox"]').prop('checked', false);
    $('#completion-message').addClass('d-none');
    $('#restart-div').addClass('d-none');
    $('#items-correct-text').addClass('d-none');
    $('#items-missed-text').addClass('d-none');
    $('#items-missed').html('');
    $('#incorrect-items-div').addClass('d-none');
    $('#incorrect-items').html('');
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
 * Taken from high-score-boxes.js
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
