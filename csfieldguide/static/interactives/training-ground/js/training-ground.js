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
var aiSensitivity;
var $dataTable;
var networkTable;
var sticksGrid;
var $sticksArea;
var ai;

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
}

/**
 * Recalculates the number of sticks to display and other initial parameters
 */
function refresh() {
  getParameters();
  networkTable.createTable(numSticks);
  sticksGrid.createGrid(numSticks);
}

function getParameters() {
  numSimulations = $('#num-simulations-select').val();
  numSticks = $('#num-sticks-select').val();
  aiSensitivity = $('#sensitivity-select').val();
}

function reset() {
  //game.destroy() or something
  $('#num-simulations-select').val('0');
  $('#num-sticks-select').val('17');
  $('#sensitivity-select').val('5');
  getParameters();
  $dataTable = $('#data-table');
  $sticksArea = $('#sticks-area');
  networkTable = new TABLE.HtmlTable($dataTable);
  sticksGrid = new IMG_GRID.ImageGrid($sticksArea, stickPath, 7);
  $('#game-parameters').removeClass('d-none');
}
