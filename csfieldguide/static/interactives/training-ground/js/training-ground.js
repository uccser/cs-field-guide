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

var $dataTable = $('#data-table');
var $sticksArea = $('#sticks-area');
var $remainingText = $('#remaining-sticks');
var $playedText = $('#games-played');
var $statusText = $('#status-text');
var $splashText = $('#splash-text');

const stickPath = base + 'interactives/training-ground/assets/sprites/stick.png';


$(document).ready(function() {
  reset();
  refresh();
  $('#start-button').on('click', function() {
    run();
  });
});

/**
 * Builds and executes the game.
 */
function run() {
  $('#game-parameters').addClass('d-none');
  refresh();
  ai = new AI.AI(numSticks, aiSensitivity);
  $statusText.html(gettext("Preparing..."));
  disableChoiceButtons();
  showChoiceButtons();
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
  $('#game-parameters').removeClass('d-none');
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
