/**
 * trAIning ground
 * 
 * Creates and executes the game
 */

var TABLE = require('./html-table.js');
var IMG_GRID = require('./image-grid.js');
var AI = require('./ai.js');
var noUiSlider = require('nouislider');

var numSimulations;
var numSticks;
var remainingSticks;
var aiSensitivity;
var networkTable;
var sticksGrid;
var ai;
var gamesPlayed;
var aiWins;
var isSimulation;
var isStart;
var doCancelSims;

var $dataTable = $('#data-table');
var $sticksArea = $('#sticks-area');
var $remainingText = $('#remaining-sticks');
var $aiWinsText = $('#ai-wins');
var $playedText = $('#games-played');
var $statusText = $('#status-text');
var $splashText = $('#splash-text');
var numSimulationsRange;
var numSticksRange;
var sensitivityRange;

const stickPath = base + 'interactives/training-ground/assets/stick.png';
const PLAYERS = {
  NONE: 0,
  HUMAN: 1,
  AI: 2,
  INTELLIBOT: 3
}

var TXT_LOSS = gettext("Nathaniel wins");
var TXT_WIN = gettext("You win!");
var TXT_TURN = gettext("Your turn.");
var TXT_WAIT = gettext("Nathaniel is thinking.");
var TXT_SIMULATING = gettext("Simulating games...");
var TXT_SIMULATED = gettext("Simulations finished");
var TXT_INITIAL = gettext("Set the initial parameters below, then hit start");

$(document).ready(function() {
  isSimulation = false;
  createSliders();
  reset();
  refresh();
  $('#button_start').on('click', run);
  $('#button_1').on('click', function() {
    applyMove(PLAYERS.HUMAN, 1);
  });
  $('#button_2').on('click', function() {
    applyMove(PLAYERS.HUMAN, 2);
  });
  $('#button_3').on('click', function() {
    applyMove(PLAYERS.HUMAN, 3);
  });
  $('#button_rematch').on('click', rematch);
  $('#button_simulate').on('click', function() {
    simulate(10);
  });
  $('#button_cancel').on('click', function() {
    doCancelSims = true;
  });
  $('#button_quit').on('click', reset);
  numSticksRange.noUiSlider.on('update', refresh);
});

/**
 * Builds and executes the game.
 */
function run() {
  isStart = true;
  $('#game-parameters').addClass('d-none');
  $('#button_start').addClass('d-none');
  refresh();
  $statusText.html(gettext("Preparing..."));
  ai = new AI.AI(numSticks, aiSensitivity);
  ai.init();
  networkTable.populateTable(ai.map);
  simulate(numSimulations);
}

/**
 * Recalculates the number of sticks to display and other initial parameters
 */
function refresh() {
  getParameters();
  networkTable.createTable(numSticks);
  sticksGrid.createGrid(numSticks);
  remainingSticks = numSticks;
  displayBaseVariables();
}

/**
 * Returns the game to its initial 'page loaded' state
 */
function reset() {
  numSimulationsRange.noUiSlider.reset();
  numSticksRange.noUiSlider.reset();
  sensitivityRange.noUiSlider.reset();
  $statusText.html(TXT_INITIAL);
  gamesPlayed = 0;
  aiWins = 0;
  networkTable = new TABLE.HtmlTable($dataTable);
  sticksGrid = new IMG_GRID.ImageGrid($sticksArea, stickPath, 7);
  refresh();
  hideQuitButtons();
  hideEndButtons();
  hideChoiceButtons();
  $splashText.addClass('d-none');
  $('#game-parameters').removeClass('d-none');
  $('#button_start').removeClass('d-none');
}

/**
 * Starts a new match within the game
 */
function rematch() {
  ai.newGame();
  networkTable.uncolourCells();
  updateRemainingSticks(numSticks);
  displayBaseVariables();
  if (!isSimulation) {
    sticksGrid.createGrid(numSticks);
    $splashText.addClass('d-none');
    hideEndButtons();
    showChoiceButtons();
  }
  takeAiTurn();
}

/**
 * Simulates the given number of games between the AI and a preset practice bot
 */
function simulate(num) {
  doCancelSims = false;
  isSimulation = true;
  $splashText.html(TXT_SIMULATING);
  $splashText.removeClass('d-none');
  disableChoiceButtons();
  hideChoiceButtons();
  hideEndButtons();
  showCancelButton();
  console.log('Running ' + num + ' simulations...');
  recursiveSim(num);
}

/**
 * Simulates games between the AI and a preset practice bot recursively until there
 * are none left to do or the user cancels the simulation
 */
function recursiveSim(num) {
  if (doCancelSims || num <= 0) {
    endSimulation();
  } else {
    setTimeout(function() {recursiveSim(num - 1)}, 100);
    rematch();
  }
}

/**
 * Runs post-simulation setup for the game. If this is the initial game-start simulations
 * a new match is started immediately
 */
function endSimulation() {
  hideCancelButton();
  $statusText.html(TXT_SIMULATED);
  networkTable.uncolourCells();
  $splashText.addClass('d-none');
  isSimulation = false;
  console.log('simulation ended');
  enableQuitButtons();
  if (isStart) {
    isStart = false;
    showQuitButtons();
    rematch();
  } else {
    showEndButtons();
  }
}

/**
 * Stores the initial game parameters chosen by the user in appropriate variables
 */
function getParameters() {
  numSimulations = numSimulationsRange.noUiSlider.get();
  numSticks = numSticksRange.noUiSlider.get();
  aiSensitivity = sensitivityRange.noUiSlider.get();
}

/**
 * Displays base game variables: number of sticks remaining, number of wins, and number of games played
 */
function displayBaseVariables() {
  $remainingText.html(remainingSticks);
  $aiWinsText.html(aiWins);
  $playedText.html(gamesPlayed);
}

/**
 * Creates the 3 nouislider sliders for choosing initial parameters.
 * 'format:' sections from https://stackoverflow.com/a/38435763
 */
function createSliders() {
  numSimulationsRange = document.getElementById('num-simulations-select');
  noUiSlider.create(numSimulationsRange, {
    range: {
      'min': 0,
      'max': 500
    },
    start: 0,
    step: 50,

    tooltips: true,
    format: {
      from: function(value) {
        return parseInt(value);
      },
      to: function(value) {
        return parseInt(value);
      }
    },

    pips: {
      mode: 'positions',
      values: [0, 20, 40, 60, 80, 100],
      density: 10,
      stepped: true
    }
  });

  numSticksRange = document.getElementById('num-sticks-select');
  noUiSlider.create(numSticksRange, {
    range: {
      'min': 15,
      'max': 21
    },
    start: 17,
    step: 1,
    tooltips: true,
    format: {
      from: function(value) {
        return parseInt(value);
      },
      to: function(value) {
        return parseInt(value);
      }
    },

    pips: {
      mode: 'count',
      values: 4,
      density: 14,
      stepped: true
    }
  });

  sensitivityRange = document.getElementById('sensitivity-select');
  noUiSlider.create(sensitivityRange, {
    range: {
      'min': 0,
      'max': 40
    },
    start: 5,
    step: 1,
    tooltips: true,
    format: {
      from: function(value) {
        return parseInt(value);
      },
      to: function(value) {
        return parseInt(value);
      }
    },

    pips: {
      mode: 'positions',
      values: [0, 25, 50, 75, 100],
      density: 15,
      stepped: true
    }
  });
}

/**
 * Disables controls for the user to choose a number of sticks to remove.
 * Does not affect visibility
 */
function disableChoiceButtons() {
  $('#button_1').prop('disabled', true);
  $('#button_2').prop('disabled', true);
  $('#button_3').prop('disabled', true);
}

/**
 * Enables controls for the user to choose a number of sticks to remove.
 * Does not affect visibility
 */
function enableChoiceButtons() {
  $('#button_1').prop('disabled', false);
  $('#button_2').prop('disabled', false);
  $('#button_3').prop('disabled', false);
}

/**
 * Hides controls for the user to choose a number of sticks to remove
 */
function hideChoiceButtons() {
  $('#game-buttons').addClass('d-none');
}

/**
 * Shows controls for the user to choose a number of sticks to remove
 */
function showChoiceButtons() {
  $('#game-buttons').removeClass('d-none');
}

/**
 * Disables the quit button, does not affect its visibility
 */
function disableQuitButtons() {
  $('#button_quit').prop('disabled', true);
}

/**
 * Enables the quit button, does not affect its visibility
 */
function enableQuitButtons() {
  $('#button_quit').prop('disabled', false);
}

/**
 * Hides controls for the user to 'quit', i.e. reset the game to its 'page-loaded' state
 */
function hideQuitButtons() {
  $('#quit-buttons').addClass('d-none');
}

/**
 * Shows controls for the user to 'quit', i.e. reset the game to its 'page-loaded' state
 */
function showQuitButtons() {
  $('#quit-buttons').removeClass('d-none');
}

/**
 * Hides controls for the user to choose to simulate matches or have a rematch
 */
function hideEndButtons() {
  $('#end-buttons').addClass('d-none');
}

/**
 * Shows controls for the user to choose to simulate matches or have a rematch
 */
function showEndButtons() {
  $('#end-buttons').removeClass('d-none');
}

/**
 * Hides the stop simulating button
 */
function hideCancelButton() {
  $('#button_cancel').addClass('d-none').prop('disabled', true);
}

/**
 * Shows the stop simulating button
 */
function showCancelButton() {
  $('#button_cancel').removeClass('d-none').prop('disabled', false);
}

/**
 * Runs the AI turn
 */
function takeAiTurn() {
  if (remainingSticks <= 0) {
    // The Player/Practice bot won
    endGame(isSimulation? PLAYERS.INTELLIBOT : PLAYERS.HUMAN);
  } else {
    disableChoiceButtons();
    disableQuitButtons();
    $statusText.html(TXT_WAIT);
    var num = ai.takeTurn();
    if (!isSimulation) {
      // Create time lag if this is against a real player
      var lag = 1500;
      setTimeout(function() {
        applyMove(PLAYERS.AI, num);
      }, lag);
    }
    else {
      applyMove(PLAYERS.AI, num);
    }
  }
}

/**
 * Applies the turn the AI chose
 */
function applyMove(player, numChosen) {
  if (player == PLAYERS.AI) {
    if (!isSimulation) {
      sticksGrid.removeSticks(numChosen);
    }
    networkTable.highlightCell(remainingSticks, numChosen, TABLE.HIGHLIGHTS.UNDECIDED);
    updateRemainingSticks(remainingSticks - numChosen);

    var format = ngettext("Nathaniel chose 1 stick.", "Nathaniel chose %(num_sticks)s sticks.", numChosen);
    var numChosenText = interpolate(format, {'num_sticks': numChosen}, true);
    $statusText.html(numChosenText + " " + TXT_TURN);

    readyPlayerTurn();
  } else if (player == PLAYERS.HUMAN || player == PLAYERS.INTELLIBOT) {
    if (!isSimulation) {
      sticksGrid.removeSticks(numChosen);
    }
    updateRemainingSticks(remainingSticks - numChosen);
    takeAiTurn();
  }
}

/**
 * Updates the remaining number of sticks in the AI's internal data, and the game screen
 */
function updateRemainingSticks(number) {
  remainingSticks = number;
  ai.sticksLeft = remainingSticks;
  displayBaseVariables();
}

/**
 * Prepares appropriate buttons for the Player to take its turn.
 * If games are being simulated, takes the preset practice bot's turn instead
 */
function readyPlayerTurn() {
  if (remainingSticks <= 0) {
    // The AI won
    endGame(PLAYERS.AI);
  } else if (isSimulation) {
    var num = ai.takeBotTurn();
    applyMove(PLAYERS.INTELLIBOT, num);
  } else {
    enableQuitButtons();
    enableChoiceButtons();
  }
}

/**
 * Runs post-match processing of match results and AI learning
 */
function endGame(winner) {
  gamesPlayed++;
  displayBaseVariables();
  if (winner == PLAYERS.AI) {
    aiWins++;
    $statusText.html(TXT_LOSS);
    ai.updateAI(false);
    networkTable.recolourCells(TABLE.HIGHLIGHTS.WIN);
    if (!isSimulation) {
      $splashText.html(TXT_LOSS);
      $splashText.removeClass('d-none');
    }
  } else if (winner == PLAYERS.HUMAN || winner == PLAYERS.INTELLIBOT) {
    ai.updateAI(true);
    $statusText.html(TXT_WIN);
    networkTable.recolourCells(TABLE.HIGHLIGHTS.LOSS);
    if (!isSimulation) {
      $splashText.html(TXT_WIN);
      $splashText.removeClass('d-none');
    }
  }
  networkTable.populateTable(ai.map);
  if (!isSimulation) {
    hideChoiceButtons();
    showEndButtons();
  }
}
