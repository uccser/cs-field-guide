const STALL_TEXT = [
  [1000, gettext("Finding some paper...")],
  [300, gettext("*BONK*")],
  [500, gettext("Ow!")],
  [1000, gettext("Bumped my head.")],
  [1500, gettext("Got it, now where was that pen?")],
  [300, gettext("Ah ha!")],
  [500, gettext("*Tap tap tap*")],
  [800, gettext("Empty. :(")],
  [500, gettext("Hmmm")],
  [2000, gettext("Really need to sort out this room someday...")],
  [600, gettext("There you are.")],
  [500, gettext("*scribble scribble*")],
  [500, gettext("It works!")]
];
const MIN = 100000;
const MAX = 999999;
const HARD_MIN = 10000000;
const HARD_MAX = 99999999;
const TXT_WHAT_WAS = gettext("What was the number?");
const TXT_REMEMBER = gettext("Remember this number!");
const TXT_CORRECT = gettext("Correct!");
const TXT_INCORRECT = gettext("That wasn't the number!");
var generatedNumber;
var isHardMode;

$(document).ready(function() {
  isHardMode = false;
  showStartScreen();
  $('#start-button').on('click', function() {
    start();
  });
  $('#submit-button').on('click', function() {
    submit();
  });
  $('#reset-button').on('click', function() {
    reset(false);
  });
  $('#reset-hard-button').on('click', function() {
    reset(true);
  });
});

function start() {
  $('#number-text').html('');
  showStallScreen();
  stall();
}

function stall() {
  if (!isHardMode) {
    showSubmitScreen();
  } else {
    recursiveStall(0);
  }
}

function submit() {
  showEndScreen();
  if ($('#number-input').val() == generatedNumber) {
    $('#middle-text').html('<span class="green">' + TXT_CORRECT + '</span>');
    $('#reset-hard-button').removeClass('d-none');
  } else {
    $('#middle-text').html('<span class="red">' + TXT_INCORRECT + '</span><br>' + generatedNumber);
    $('#reset-button').removeClass('d-none');
  }
}

function reset(runHardMode) {
  isHardMode = runHardMode;
  showStartScreen();
}

function recursiveStall(x) {
  if (x >= STALL_TEXT.length) {
    showSubmitScreen();
  } else {
    $('#middle-text').html(STALL_TEXT[x][1]);
    setTimeout(function() {recursiveStall(x + 1)}, STALL_TEXT[x][0]);
  }
}

function showStartScreen() {
  $('#number-input').val('');
  $('#number-memory-title').html(TXT_REMEMBER);
  generateNumber();
  
  // Hide
  $('#number-input-form').addClass('d-none');
  $('#middle-text').addClass('d-none');
  $('#submit-button').addClass('d-none');
  $('#reset-button').addClass('d-none');
  $('#reset-hard-button').addClass('d-none');

  // Show
  $('#number-memory-title').removeClass('d-none');
  $('#number-text-container').removeClass('d-none');
  $('#start-button').removeClass('d-none');
}

function showStallScreen() {
  // Hide
  $('#number-memory-title').addClass('d-none');
  $('#number-text-container').addClass('d-none');
  $('#number-input-form').addClass('d-none');
  $('#start-button').addClass('d-none');
  $('#submit-button').addClass('d-none');
  $('#reset-button').addClass('d-none');
  $('#reset-hard-button').addClass('d-none');

  // Show
  $('#middle-text').removeClass('d-none');
}

function showSubmitScreen() {
  $('#number-memory-title').html(TXT_WHAT_WAS);

  // Hide
  $('#number-text-container').addClass('d-none');
  $('#middle-text').addClass('d-none');
  $('#start-button').addClass('d-none');
  $('#reset-button').addClass('d-none');
  $('#reset-hard-button').addClass('d-none');

  // Show
  $('#number-memory-title').removeClass('d-none');
  $('#number-input-form').removeClass('d-none');
  $('#submit-button').removeClass('d-none');
}

function showEndScreen() {
  // Hide
  $('#number-text-container').addClass('d-none');
  $('#start-button').addClass('d-none');
  $('#submit-button').addClass('d-none');

  // Show
  $('#number-memory-title').removeClass('d-none');
  $('#number-input-form').removeClass('d-none');
  $('#middle-text').removeClass('d-none');
}

/**
 * Generates a random 6-digit number and displays it appropriately
 */
function generateNumber() {
  if (isHardMode) {
    generatedNumber = getRandomInteger(HARD_MIN, HARD_MAX);
  } else {
    generatedNumber = getRandomInteger(MIN, MAX);
  }
  $('#number-text').html(generatedNumber);
}

/**
 * Returns a random integer between min and max inclusive.
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
