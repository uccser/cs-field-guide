/*
 * Define global variables
 */
var sticks; //group of stick objects
var startingSticks; //number of sticks initially
var button_1, button_2, button_3;
var rematch_btn, quit_btn;
var turn; //true = AI turn, false = player turn
var gameOver; //boolean
var ai;
var player;
var sticksLeft; //number of sticks left
var playerWin; //boolean
var simulation; //boolean tracking whether simulation is occuring
var simGames; //number of games left to simulate
var gamesPlayed; //Keeps track of how many games the AI has played
var simulated; //true = the simulate button was just pressed

//AI globals:
var map; //the AI's neural net, a hashmap
var moves; //hashmap that records the current game moves by the AI
var stickschosen; //the number of sticks the AI last chose


function createSticks(){
  var stick;

  sticks.removeAll(true);

  var sticksArray = startingSticks;

  for (var y = 0; y < 3; y++){
      for (var x = 0; x < 7; x++){
          if(sticksArray > 0){
            stick = sticks.create(40 + (x * 60), 50 + (y * 130), 'stick_key', null, 7*x + y +1);
          }
          sticksArray--
      }
  }
}

function startGame(){
  simulation = true;
  gamesPlayed = 0;
  simulated = false;

  //Sets the starting number of sticks based on the slider arrow on the menu screen
  startingSticks = (menuState.numSticks_arrow.x/50) + 8;

  initVars();

  ai.init();

  sticksLeft = startingSticks;
  createSticks();

  moveButtonsEnabled(false);
  rematch_btn.visible = false;
  simulate_btn.visible = false;

  $('#excelDataTable').empty();
  buildHtmlTable('#excelDataTable');
  $('#excelDataTable').show();


  var startTime = new Date().getTime() / 1000;
  ai.trainAI(simGames);
  var endTime = new Date().getTime() / 1000;
  var simTime = endTime - startTime;
  Logger.info('%c Simulation took ' + simTime + ' seconds', 'background: #222; color: #fff');

  Logger.debug('Done w simulation');

  initVars();
  ai.takeTurn();
}

function endGame(){
  gameOver = true;
  if(turn){
      playerWin = true;
  }else{
    playerWin = false;
  }
  ai.updateAI();

  rematch_btn.visible = true;
  simulate_btn.visible = true;
  moveButtonsEnabled(false);
}

function rematch(){
  initVars();
  createSticks();

  moveButtonsEnabled(false);
  rematch_btn.visible = false;
  simulate_btn.visible = false;
  ai.takeTurn();
}

function simulate(){
    simulate_btn.visible = false;
    simulation = true;
    simGames = 10;
    ai.trainAI(simGames);
    simulate_btn.visible = true;
    gameOver = true;
    simulated = true;
}

function initVars(){
  simulated = false;
  turn = true;
  gameOver = false;
  moves = {};
  playerWin = false;

  sticksLeft = startingSticks;
}

function moveButtonsEnabled(bool){
  button_1.visible = bool;
  button_2.visible = bool;
  button_3.visible = bool;
  button_1.inputEnabled = bool;
  button_2.inputEnabled = bool;
  button_3.inputEnabled = bool;
}

/*
 * Action of removing sticks, visual removal of sticks if simulate is false
 */
function removeSticks(num){
    if(!simulation){
        sticks.removeBetween(0, num - 1, true, true);
        moveButtonsEnabled(turn);
    }
    sticksLeft -= num;
    turn = !turn;
}

//Builds HTML table based on the AI map
function buildHtmlTable(selector) {
  var columns = addAllColumnHeaders(selector);

  for (var i = startingSticks; i > 0; i--) {
    var row$ = $('<tr/>');
    //for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      for (var choices = 0; choices < columns.length; choices++){
        var cellValue = map[i][choices];
        if (cellValue == null) cellValue = "";
        row$.append($('<td/>').html(cellValue));
        if(map[i][0] in moves && !simulation){
          if(playerWin) row$.css('background-color', '#ff0000'); //Changed cells become red if player wins
          else row$.css('background-color', '#149800'); // Changed cells become green if AI wins
        }
      }
    //}
    $(selector).append(row$);
  }
}

//Sets up column headers for the HTML table
function addAllColumnHeaders(selector) {
  var columnSet = ["# of sticks left", "1 stick", "2 sticks", "3 sticks"];

  var headerTr$ = $('<tr/>');

  for (var i = 0; i < columnSet.length; i++) {

    headerTr$.append($('<th/>').html(columnSet[i]));

  }
  $(selector).append(headerTr$);


  return columnSet;
}

function takeTurn(num){

    moveButtonsEnabled(false);
    if(num > sticksLeft){
        num = sticksLeft;
    }
    removeSticks(num);
    if(sticksLeft > 0) ai.takeTurn();
}

function goToMenu(){
  game.state.start('menu');
  $('#excelDataTable').hide();
}
