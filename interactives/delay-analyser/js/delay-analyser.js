$(document).ready(function() {
  // Toggle pixel on pixel click
  $('#delay-grid').on('click', '.tile', function() {
    var $tile = $(this);
    var delay = $tile.data('delay');
    if ($tile.hasClass('black')) {
      setTimeout(function() {reveal_tile($tile)}, delay);
    } else {
      $tile.toggleClass('delayed');
    }
  })

  // Create the grid on load
  setup_delay_grid();
});

function reveal_tile(element) {
  element.removeClass('black');
}

function setup_delay_grid() {
  // Create variables
  var gridSize = 6;
  // Delays stored in milliseconds
  var delays = [0, 25, 50, 75, 100, 150, 200, 350, 600];
  for (repeat = 0; repeat < (gridSize * gridSize) / delays.length; repeat++) {
    delays = delays.concat(delays);
  }
  delays = shuffle(delays);

  // Create tile divs
  var grid = $('#delay-grid');
  grid.empty();
  for (row = 0; row < gridSize; row++) {
      var gridRow = $('<div class="flex-container">');
      grid.append(gridRow);
      for(col = 0; col < gridSize; col++) {
          var $element = $('<div class="flex-item tile black"></div>');
          $element.data('delay', delays.pop());
          gridRow.append($element);
      }
      grid.append('</div>');
  }
}

// Shuffle function from http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var counter = array.length, temp, index;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
