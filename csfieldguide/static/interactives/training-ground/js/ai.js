/**
 * AI contains all functions used by the AI to calculate, save, and update its neural net.
 */

require('phaser');

class AI {

  constructor(gameScene, initialSticks, initialSensitivity) {
    this.scene = gameScene;
    this.floor = 0;     // The lowest value the neural net percentages can individually reach
    this.ceiling = 100; // The highest value the neural net percentages can individually reach
    this.map;           // The AI neural net
    this.smartMap;      // The model neural net that the AI trains against in simulation
    this.startingSticks = initialSticks;
    this.sticksLeft = initialSticks;
    this.sensitivity = initialSensitivity;
    this.isSimulation = false;
    this.moves = {};    // hashmap that records the current game moves by the AI
  }

  /**
   * Initializes the AI neural net with an equal chance of choosing 1, 2, or 3,
   * and initializes an intelligent model neural net to train against.
   */
  init() {
    console.log('Creating AI');
    this.map = {};
    this.smartMap = {};
    var weight;
    for(var i = this.startingSticks; i > 0; i--) {
      this.map[i.toString()] = [i, 33.33, 33.33, 33.34];

      if(i < 5) {
        weight = 100;
      }
      else if(i < 9) {
        weight = 90;
      }
      else if(i < 13) {
        weight = 80;
      }
      else if(i < 17) {
        weight = 70;
      }
      else {
        weight = 60;
      }

      if(i%4 == 1) {
        this.smartMap[i.toString()] = [i, weight, (100-weight)/2, (100-weight)/2];
      }
      else if(i%4 == 2) {
        this.smartMap[i.toString()] = [i, (100-weight)/2, weight, (100-weight)/2];
      }
      else if(i%4 == 3) {
        this.smartMap[i.toString()] = [i, (100-weight)/2, (100-weight)/2, weight];
      }
      else {
        this.smartMap[i.toString()] = [i, 33.33, 33.33, 33.34];
      }

      this.handlers = {
        'remainingSticks': this.updateRemainingSticks
      };
  
      this.scene.registry.events.on('changedata', this.registryUpdate, this);
    }

    // Hard coded rules, cannot choose more sticks than are available
    this.map['2'] = [2, 50, 50, 0];
    this.map['1'] = [1, 100, 0, 0];
    this.smartMap['2'] = [2, 0, 100, 0];
    this.smartMap['1'] = [1, 100, 0, 0];

    console.log(JSON.stringify(this.smartMap));
  }

  /**
   * Simulates AI turn being taken, determines the number of sticks to remove based on
   * its neural net and records the decision.
   */
  takeTurn() {
    console.log('AI taking turn: ', this.sticksLeft);

    // Random pick from weighted map of choices
    var num = this.chooseNum(this.map[this.sticksLeft.toString()]);

    if (num > this.sticksLeft) {
      num = this.sticksLeft;
      console.log('ERROR: Impossible move chosen, changed');
    }

    console.log('chose ' + num + ' sticks w sticksLeft = ' + this.sticksLeft);
    if (!this.isSimulation) {
      // Create time lag if this is against a real player
      var lag = 1500;
      var ai = this;
      setTimeout(function() {
        ai.applyMove(num);
      }, lag)
    }
    else {
      this.applyMove(num);
    }
  }

  /**
   * Applies the move the AI chose to make
   * 
   * @param {int} num The number of sticks the AI chose to remove
   */
  applyMove(num) {
    this.moves[this.sticksLeft.toString()] = num;
    this.scene.registry.set('sticksChosen', num);
  }

  /**
   * Updates the AI's neural net based on its decisions during the previous game
   * and the results of that game. Also determines change in percentage based on
   * slider arrow.
   */
  updateAI() {
    var change = slider_arrow.x/7; // Get percentage from the slider on screen
    if (playerWin) {
      change *= -1; // Decrement values for chosen moves
    }

    var keys = Object.keys(moves);
    for (var i in keys) {
      var key = keys[i]
      // If key is in map (should always be true) update map values
      if(key in map){
        console.log(key + ":" + moves[key]);
        var cur_vals = map[key];
        var spot = moves[key];

        map[key] = this.calculateVals(cur_vals, spot, change);
        cur_vals = [];
      }
    }

    // Update HTML table
    $('#dataTable').empty();
    buildHtmlTable('#dataTable');

    gamesPlayed++;

    if (this.isSimulation) {
      this.trainAI(--simGames); //recursively call trainAI function
    }
  }

  /**
   * Takes the array corresponding to a specific number of sticks left in the AI neural net and 
   * updates it.
   *
   * @param {[int, int, int, int]} start_vals     an array from map for a specific sticksLeft value
   * @param {int} move                            the number (1, 2, or 3) that was chosen by the AI
   * @param {int} change                          the max change value
   * @return {[int, int, int, int]} new_vals      an updated array for a specific sticksLeft value
   */
  calculateVals(start_vals, move, change) {
    var new_vals = start_vals;

    // Calculate actual change
    // If the AI won, check against the ceiling, otherwise against the floor
    var check = (change > 0) ? this.ceiling : this.floor;


    // The change is the lower of either the set change value or the maximum that can be 
    // added or subtracted without making the percentage outside of the floor:ceiling bounds
    var r_change = (Math.abs(change) < Math.abs(check - start_vals[move])) ? change : (check - start_vals[move]);
    var total = 0;
    var length = start_vals.length;
    var div = 2;

    // Check special case rules
    if (start_vals[0] == 1) {
      length = 1;
    }
    else if (start_vals[0] == 2) {
      length = 3;
      div = 1;
    }

    // Loop through the current map percentages and update the two that weren't chosen by the AI
    for (var count = 1; count < length; count++) {
      if (count == move) {
        continue;
      }

      // If the change puts the percentage outside of the bounds, set the percentage equal to the bound
      if ((start_vals[count] - r_change/div) > this.floor) {
        if ((start_vals[count] - r_change/div) < this.ceiling) {
          new_vals[count] = Math.floor((start_vals[count] - r_change/div)*100)/100;
        }
        else {
          new_vals[count] = this.ceiling;
        }
      }
      else {
        new_vals[count] = this.floor;
      }
      total += new_vals[count];
    }

    // Update the move that was chosen by the AI
    new_vals[move] = Math.floor((100 - total)*100)/100;

    return new_vals;
  }

  /**
   * Triggers simulation of a given number of games against an intelligent model. It 
   * is called recursively, and stops when the input value is 0.
   *
   * @param {int} num    The number of simulations left to perform
   */
  trainAI(num) {
    console.log('Simulations left: ', num);

    if(num <= 0) {
      quit_btn.inputEnabled = true;
      simulation = false;
    }
    else {
      initVars();
      this.simulateGame();
    }
  }

  /**
   * Simulates one game for our AI against an intelligent model. When one game is 
   * complete, the updateAI function is called to update our AI's neural net.
   */
  simulateGame() {
    // While statement continues until either the AI or the model wins
    while(this.sticksLeft > 0) {
      // AI takes turn, same as in regular game
      this.takeTurn();

      if(this.sticksLeft <= 0) {
        // If AI picked up last stick, AI won
        playerWin = false;
        break;
      }

      // Model takes turn based on random pick from weighted smart map of choices
      var num = this.chooseNum(this.smartMap[this.sticksLeft.toString()]);
      console.log('NUMBER CHOSEN BY SIM: ', num)
      removeSticks(num);

      if (this.sticksLeft<=0) {
        playerWin = true;
      }
    }


    this.updateAI();
  }

  /**
   * This function uses a random number generator and an input weighted map to choose
   * a number, 1 through 3, which represents the number of sticks to be removed. It is
   * used by the AI and the model to determine how many sticks to pick up at a given
   * number of sticks left.
   *
   * @param {[int, int, int, int]} weighted_map   The weighted map for a given number of sticks
   * @return int num                              The number (1-3) chosen
   */
  chooseNum(weighted_map) {
    var randNum = Math.floor((Math.random() * 10000) + 1)/100;
    var num;

    if (randNum <= weighted_map[1]) {
      num = 1;
    }
    else if ((weighted_map[1] < randNum) && (randNum <= (weighted_map[1]+weighted_map[2]))) {
      num = 2;
    }
    else if (((weighted_map[1]+weighted_map[2]) < randNum) && (randNum <= 100)) {
      num = 3;
    }

    return num;
  }

  /**
   * Handler function for a registry update.
   * If a handler is defined for the given key, apply the set handler for that key.
   */
  registryUpdate(parent, key, data) {
    if (this.handlers[key]) {
      this.handlers[key](this, data);
    }
  }

  updateRemainingSticks(scene, numSticks) {
    scene.sticksLeft = numSticks;
  }
}

module.exports = {
  AI
};
