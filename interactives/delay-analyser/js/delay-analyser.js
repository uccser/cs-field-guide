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

  // Toggle all pixels to black on toggle click
  $('#view-statistics').on('click', function(){
     displayStatistics();
  });

  // Create the grid on load
  setup_delay_grid();
});

function reveal_tile(element) {
  element.removeClass('black');
  // Check if all tiles have black removed and display stats button
}

function displayStatistics() {
  var total_delays_for_each = 4;
  var delays_percieved = {};
  for (i = 0; i < delay_types.length; i++) {
    delays_percieved[delay_types[i]] = 0;
  }

  var $grid = $('#delay-grid');
  // For each row
  $grid.children().each(function( row_index, row ) {
    $row = $(row);
    // For each tile
    $row.children().each(function( tile_index, tile ) {
      $tile = $(tile);
      if ($tile.hasClass('delayed')) {
        delays_percieved[$tile.data('delay')] += 1;
      }
    });
  });
  
}

function setup_delay_grid() {
  // Create variables
  var gridSize = 6;
  // Delays stored in milliseconds
  this.delay_types = [0, 25, 50, 75, 100, 150, 200, 350, 600];
  var delay_values = delay_types;
  for (repeat = 0; repeat < (gridSize * gridSize) / delay_types.length; repeat++) {
    delay_values = delay_values.concat(this.delay_types);
  }
  delay_values = shuffle(delay_values);

  // Create tile divs
  var grid = $('#delay-grid');
  grid.empty();
  for (row = 0; row < gridSize; row++) {
      var gridRow = $('<div class="flex-container">');
      grid.append(gridRow);
      for(col = 0; col < gridSize; col++) {
          var $element = $('<div class="flex-item tile black"></div>');
          $element.data('delay', delay_values.pop());
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
