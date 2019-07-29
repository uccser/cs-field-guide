/**
 * trAIning ground
 * 
 * Creates and executes the game
 */

var TABLE = require('./html-table.js');
var IMG_GRID = require('./image-grid.js');
var AI = require('./ai.js');
var noUiSlider = require('nouislider');

var chanceOfPlayerStart;
var numSticks;
var remainingSticks;
var aiSensitivity;
var numSimulations;
var networkTable;
var sticksGrid;
var ai;
var gamesPlayed;
var aiWins;
var isSimulation;
var isStart;
var doCancelSims;
var practiceOpponent;
var quickSims;

var $dataTable = $('#data-table');
var $sticksArea = $('#sticks-area');
var $remainingText = $('#remaining-sticks');
var $aiWinsText = $('#ai-wins');
var $playedText = $('#games-played');
var $statusText = $('#status-text');
var $splashText = $('#splash-text');
var whoStartsRange;
var numSticksRange;
var sensitivityRange;
var numSimulationsRange;

const stickPath = base + 'interactives/training-ground/img/stick.png';
const PLAYERS = {
  NONE: 0,
  // These next three match their HTML radiobutton value counterparts
  INTELLIBOT: 1,
  RANDOBOT: 2,
  AI_PRACTICE: 3,
  //
  HUMAN: 4,
  AI: 5,
}

var TXT_LOSS = gettext("Nathaniel wins");
var TXT_WIN = gettext("You win!");
var TXT_TURN = gettext("Your turn.");
var TXT_WAIT = gettext("Nathaniel is thinking.");
var TXT_SIMULATING_SMART = gettext("Simulating games<br>(smart opponent)");
var TXT_SIMULATING_RANDOM = gettext("Simulating games<br>(random opponent)");
var TXT_SIMULATING_ITSELF = gettext("Simulating games<br>(against itself)");
var TXT_SIMULATED = gettext("Simulations finished");
var TXT_INITIAL = gettext("Set the initial parameters below, then hit start");
var TXT_STARTTURN = gettext("You start, how many sticks will you remove?");
var TXT_AI_ALWAYS = gettext("Always");
var TXT_PLAYER_ALWAYS = gettext("Never");

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
  refresh();
  $('#game-parameters').addClass('d-none');
  $('#button_start').addClass('d-none');
  $statusText.html("...");
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
  whoStartsRange.noUiSlider.reset();
  numSticksRange.noUiSlider.reset();
  sensitivityRange.noUiSlider.reset();
  numSimulationsRange.noUiSlider.reset();
  $('#practice-opponent-select input:radio:checked').prop('checked', false).parent().removeClass('active');
  $('#radio_smartbot').prop('checked', true).parent().addClass('active');
  $('#quick-simulations-select input:radio:checked').prop('checked', false).parent().removeClass('active');
  $('#radio_false').prop('checked', true).parent().addClass('active');
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
  if (Math.random() < chanceOfPlayerStart) {
    // (no need to be more precise)
    $statusText.html(TXT_STARTTURN);
    readyPlayerTurn();
  } else {
    takeAiTurn();
  }
}

/**
 * Simulates the given number of games between the AI and a preset practice bot.
 * Runs as quickly as possible, without displaying anything to the user 
 */
function runQuickSimulation(num) {
  var aiTurn;
  var choice;
  while (num > 0) {
    ai.newGame();
    choice = 0;
    aiTurn = !(Math.random() < chanceOfPlayerStart);
    while (ai.sticksLeft > 0) {
      if (aiTurn) {
        choice = ai.takeTurn();
        ai.sticksLeft -=choice;
        aiTurn = false;
      } else {
        if (practiceOpponent == PLAYERS.AI_PRACTICE) {
          choice = ai.takeTurn(true);
        } else {
          choice = ai.takeBotTurn((practiceOpponent == PLAYERS.INTELLIBOT) ? true : false);
        }
        ai.sticksLeft -=choice;
        aiTurn = true;
      }
    }
    ai.updateAI(aiTurn); // If it is currently the AI's turn it's opponent won
    if (!aiTurn) {
      aiWins++;
    }
    gamesPlayed++;
    num--;
  }
  networkTable.populateTable(ai.map);
  displayBaseVariables();
}

/**
 * Simulates the given number of games between the AI and a preset practice bot
 */
function simulate(num) {
  if (quickSims) {
    runQuickSimulation(num);
    endSimulation();
    return;
  }
  if (practiceOpponent == PLAYERS.INTELLIBOT) {
    $splashText.html(TXT_SIMULATING_SMART);
  } else if (practiceOpponent == PLAYERS.RANDOBOT) {
    $splashText.html(TXT_SIMULATING_RANDOM);
  } else {
    $splashText.html(TXT_SIMULATING_ITSELF);
  }
  $splashText.removeClass('d-none');
  doCancelSims = false;
  isSimulation = true;
  disableChoiceButtons();
  hideChoiceButtons();
  hideEndButtons();
  showCancelButton();
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
  var chanceOfAiStart = whoStartsRange.noUiSlider.get();
  if (chanceOfAiStart == TXT_AI_ALWAYS) {
    chanceOfPlayerStart = 0;
  } else if (chanceOfAiStart == TXT_PLAYER_ALWAYS) {
    chanceOfPlayerStart = 1;
  } else {
    chanceOfPlayerStart = 1 - (parseInt(chanceOfAiStart) / 100);
  }

  numSticks = numSticksRange.noUiSlider.get();
  aiSensitivity = sensitivityRange.noUiSlider.get();
  numSimulations = numSimulationsRange.noUiSlider.get();

  var opponent = $('#practice-opponent-select input:radio:checked').val();
  if (opponent == "smart") {
    practiceOpponent = PLAYERS.INTELLIBOT;
  } else if (opponent == "random") {
    practiceOpponent = PLAYERS.RANDOBOT;
  } else {
    practiceOpponent = PLAYERS.AI_PRACTICE;
  }
  quickSims = $('#quick-simulations-select input:radio:checked').val() == 'true';
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
 * Creates the nouislider sliders for choosing initial parameters.
 * 'format:' sections from https://stackoverflow.com/a/38435763
 */
function createSliders() {
  whoStartsRange = document.getElementById('who-starts-select');
  noUiSlider.create(whoStartsRange, {
    range: {
      'min': 0,
      'max': 100
    },
    start: 100,
    step: 10,
    tooltips: true,
    format: {
      to: function(value) {
        if (value == 100) {
          return TXT_AI_ALWAYS;
        }
        if (value == 0) {
          return TXT_PLAYER_ALWAYS;
        }
        return value;
      },
      from: function(value) {
        return value;
      }
    },

    pips: {
      mode: 'positions',
      values: [0, 50, 100],
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
    endGame(isSimulation ? PLAYERS.INTELLIBOT : PLAYERS.HUMAN);
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
 * Prepares appropriate buttons for the Player to take its turn.
 * If games are being simulated, takes the preset bot's turn instead
 */
function readyPlayerTurn() {
  var num;
  if (remainingSticks <= 0) {
    // The AI won
    endGame(PLAYERS.AI);
  } else if (isSimulation) {
    if (practiceOpponent == PLAYERS.AI_PRACTICE) {
      num = ai.takeTurn(true);
    } else if (practiceOpponent == PLAYERS.INTELLIBOT) {
      num = ai.takeBotTurn(true);
    } else {
      num = ai.takeBotTurn(false);
    }
    applyMove(practiceOpponent, num);
  } else {
    enableQuitButtons();
    enableChoiceButtons();
  }
}

/**
 * Applies the turn the given player chose
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
  } else if (player != PLAYERS.NONE) {
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
  } else if (winner != PLAYERS.NONE) {
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
