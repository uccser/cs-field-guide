/**
 * trAIning ground
 * 
 * Creates and executes the game
 */

var TABLE = require('./html-table.js');
var IMG_GRID = require('./image-grid.js');
var AI = require('./ai.js');

var numSimulations;
var numSticks;
var remainingSticks;
var aiSensitivity;
var networkTable;
var sticksGrid;
var ai;
var gamesPlayed;
var isSimulation;

var $dataTable = $('#data-table');
var $sticksArea = $('#sticks-area');
var $remainingText = $('#remaining-sticks');
var $playedText = $('#games-played');
var $statusText = $('#status-text');
var $splashText = $('#splash-text');
var isStart;

const stickPath = base + 'interactives/training-ground/assets/sprites/stick.png';
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

$(document).ready(function() {
  isSimulation = false;
  reset();
  refresh();
  $('#button_start').on('click', function() {
    run();
  });
  $('#button_1').on('click', function() {
    applyMove(PLAYERS.HUMAN, 1);
  });
  $('#button_2').on('click', function() {
    applyMove(PLAYERS.HUMAN, 2);
  });
  $('#button_3').on('click', function() {
    applyMove(PLAYERS.HUMAN, 3);
  });
  $('#button_rematch').on('click', function() {
    rematch();
  });
  $('#button_simulate').on('click', function() {
    simulate(10);
  });
});

/**
 * Builds and executes the game.
 */
function run() {
  isStart = true;
  $('#game-parameters').addClass('d-none');
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

function reset() {
  //game.destroy() or something
  $('#num-simulations-select').val('0');
  $('#num-sticks-select').val('17');
  $('#sensitivity-select').val('5');
  gamesPlayed = 0;
  networkTable = new TABLE.HtmlTable($dataTable);
  sticksGrid = new IMG_GRID.ImageGrid($sticksArea, stickPath, 7);
  refresh();
  hideQuitButtons();
  $('#game-parameters').removeClass('d-none');
}

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

function simulate(num) {
  isSimulation = true;
  $splashText.html(TXT_SIMULATING);
  $splashText.removeClass('d-none');
  disableChoiceButtons();
  hideChoiceButtons();
  hideEndButtons();
  recursiveSim(num);
}

function recursiveSim(num) {
  if (num <= 0) {
    endSimulation();
  } else {
    setTimeout(function() {recursiveSim(num - 1)}, 100);
    rematch();
  }
}

function endSimulation() {
  $statusText.html(TXT_SIMULATED);
  networkTable.uncolourCells();
  $splashText.addClass('d-none');
  isSimulation = false;
  console.log('simulation ended');
  if (isStart) {
    isStart = false;
    showQuitButtons();
    rematch();
  } else {
    showEndButtons();
  }
}

function getParameters() {
  numSimulations = $('#num-simulations-select').val();
  numSticks = $('#num-sticks-select').val();
  aiSensitivity = $('#sensitivity-select').val();
}

function displayBaseVariables() {
  $remainingText.html(remainingSticks);
  $playedText.html(gamesPlayed);
}

function disableChoiceButtons() {
  $('#button_1').prop('disabled', true);
  $('#button_2').prop('disabled', true);
  $('#button_3').prop('disabled', true);
}

function enableChoiceButtons() {
  $('#button_1').prop('disabled', false);
  $('#button_2').prop('disabled', false);
  $('#button_3').prop('disabled', false);
}

function hideChoiceButtons() {
  $('#game-buttons').addClass('d-none');
}

function showChoiceButtons() {
  $('#game-buttons').removeClass('d-none');
}

function showEndButtons() {
  $('#end-buttons').removeClass('d-none');
}

function hideEndButtons() {
  $('#end-buttons').addClass('d-none');
}

function showQuitButtons() {
  $('#quit-buttons').removeClass('d-none');
}

function hideQuitButtons() {
  $('#quit-buttons').addClass('d-none');
}

function takeAiTurn() {
  if (remainingSticks <= 0) {
    // The Player/Practice bot won
    endGame(isSimulation? PLAYERS.INTELLIBOT : PLAYERS.HUMAN);
  } else {
    disableChoiceButtons();
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

function updateRemainingSticks(number) {
  remainingSticks = number;
  ai.sticksLeft = remainingSticks;
  displayBaseVariables();
}

function readyPlayerTurn() {
  if (remainingSticks <= 0) {
    // The AI won
    endGame(PLAYERS.AI);
  } else if (isSimulation) {
    var num = ai.takeBotTurn();
    applyMove(PLAYERS.INTELLIBOT, num);
  } else {
    enableChoiceButtons();
  }
}

function endGame(winner) {
  gamesPlayed++;
  displayBaseVariables();
  if (winner == PLAYERS.AI) {
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
