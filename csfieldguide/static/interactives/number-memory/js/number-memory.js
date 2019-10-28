const STALL_TEXT = [
  [1000, gettext("Finding some paper...")],
  [300, gettext("*BONK*")],
  [500, gettext("Ow!")],
  [1000, gettext("Bumped my head.")],
  [1500, gettext("Got it, now where was that pen?")],
  [300, gettext("Ah ha!")],
  [500, gettext("*Scribble scribble*")],
  [800, gettext("It's empty :(")],
  [500, gettext("Hmmm")],
  [2000, gettext("Really need to sort out this room someday...")],
  [600, gettext("There you are.")],
  [500, gettext("*Scribble scribble*")],
  [500, gettext("It works!")]
];
const MIN = 100000;
const MAX = 999999;
const HARD_MIN = 10000000;
const HARD_MAX = 99999999;
const TXT_WHAT_WAS = gettext("What was the number?");
const TXT_REMEMBER = gettext("Remember this number!");
const TXT_PREVIOUS = gettext("What was the PREVIOUS (shorter) number?");
const TXT_CORRECT = gettext("Correct!");
const TXT_INCORRECT = gettext("That wasn't the number!");
var oldNumber;
var generatedNumber;
var isHardMode;
var isMemoryMode;

$(document).ready(function() {
  isHardMode = false;
  isMemoryMode = false;
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
  $('#continue-button').on('click', function() {
    reset(true);
  });
    
  $(document).on('keypress', function(key) {
    if(key.which == 13 && !$('#submit-button').hasClass('d-none')) {
      // Enter was pressed, act like submit button was clicked
      submit();
    }
  });
});

/**
 * Hides the number to remember and starts the game
 */
function start() {
  $('#number-text').html('');
  showStallScreen();
  stall();
}

/**
 * If the interactive is in Hard Mode, runs a stalling function to distract the user.
 * Else it skips that and shows the submit screen
 */
function stall() {
  if (!isHardMode) {
    showSubmitScreen();
  } else {
    recursiveStall(0);
  }
}

/**
 * Checks the number entered in the input box against the saved value.
 * Displays a message and reveals either the reset or continue buttons depending on
 * the mode and if the user is correct.
 */
function submit() {
  showEndScreen();
  if ($('#number-input').val() == generatedNumber) {
    $('#middle-text').html('<span class="green">' + TXT_CORRECT + '</span>');
    if (isMemoryMode) {
      $('#reset-button').removeClass('d-none');
    } else {
      $('#continue-button').removeClass('d-none');
    }
  } else {
    $('#middle-text').html('<span class="red">' + TXT_INCORRECT + '</span><br>' + generatedNumber);
    $('#reset-button').removeClass('d-none');
  }
}

/**
 * Resets the game to as it was when first loaded. If runHardMode, starts the game in Hard mode.
 * If runHardMode and the game is already in Hard mode, runs the game with the number from the game previous.
 */
function reset(runHardMode) {
  if (isHardMode && runHardMode) {
    isMemoryMode = true;
    showMemoryScreen();
  } else {
    isHardMode = runHardMode;
    isMemoryMode = false;
    showStartScreen();
  }
}

/**
 * Recursively displays each string in STALL_TEXT for the amount of time also defined in it (ms)
 */
function recursiveStall(x) {
  if (x >= STALL_TEXT.length) {
    showSubmitScreen();
  } else {
    $('#middle-text').html(STALL_TEXT[x][1]);
    setTimeout(function() {recursiveStall(x + 1)}, STALL_TEXT[x][0]);
  }
}

/**
 * Hides irrrelevant HTML divs, then reveals relevant ones.
 * Also resets the number input box and sets the title to the remember text.
 */
function showStartScreen() {
  $('#number-input').val('');
  $('#number-memory-title').html(TXT_REMEMBER);
  generateNumber();
  
  // Hide
  $('#number-input-form').addClass('d-none');
  $('#middle-text').addClass('d-none');
  $('#submit-button').addClass('d-none');
  $('#reset-button').addClass('d-none');
  $('#continue-button').addClass('d-none');

  // Show
  $('#number-memory-title').removeClass('d-none');
  $('#number-text-container').removeClass('d-none');
  $('#start-button').removeClass('d-none');
}

/**
 * Hides irrrelevant HTML divs, then reveals relevant ones.
 */
function showStallScreen() {
  // Hide
  $('#number-memory-title').addClass('d-none');
  $('#number-text-container').addClass('d-none');
  $('#number-input-form').addClass('d-none');
  $('#start-button').addClass('d-none');
  $('#submit-button').addClass('d-none');
  $('#reset-button').addClass('d-none');
  $('#continue-button').addClass('d-none');

  // Show
  $('#middle-text').removeClass('d-none');
}

/**
 * Hides irrrelevant HTML divs, then reveals relevant ones.
 * Also sets the title to the submit text and focuses the input box.
 */
function showSubmitScreen() {
  $('#number-memory-title').html(TXT_WHAT_WAS);

  // Hide
  $('#number-text-container').addClass('d-none');
  $('#middle-text').addClass('d-none');
  $('#start-button').addClass('d-none');
  $('#reset-button').addClass('d-none');
  $('#continue-button').addClass('d-none');

  // Show
  $('#number-memory-title').removeClass('d-none');
  $('#number-input-form').removeClass('d-none');
  $('#submit-button').removeClass('d-none');

  // Focus on the input
  $('#number-input').focus();
}

/**
 * Hides irrrelevant HTML divs, then reveals relevant ones.
 */
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
 * Hides irrrelevant HTML divs, then reveals relevant ones.
 * Also sets the title to the memory text and focuses the input box.
 */
function showMemoryScreen() {
  $('#number-input').val('');
  $('#number-memory-title').html(TXT_PREVIOUS);
  generatedNumber = oldNumber;

  // Hide
  $('#number-text-container').addClass('d-none');
  $('#middle-text').addClass('d-none');
  $('#start-button').addClass('d-none');
  $('#reset-button').addClass('d-none');
  $('#continue-button').addClass('d-none');

  // Show
  $('#number-memory-title').removeClass('d-none');
  $('#number-input-form').removeClass('d-none');
  $('#submit-button').removeClass('d-none');

  // Focus on the input
  $('#number-input').focus();
}

/**
 * Generates a random 6-digit number and displays it appropriately
 */
function generateNumber() {
  oldNumber = generatedNumber;
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
