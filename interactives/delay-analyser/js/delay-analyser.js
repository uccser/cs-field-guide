// Delays stored in milliseconds
this.delay_types = [0, 25, 50, 75, 100, 150, 200, 350, 600];
this.gridSize = 6; // Multiples of three required
this.total_delays_for_each = (gridSize * gridSize) / delay_types.length;

$(document).ready(function() {
  // Toggle pixel on pixel click
  $('#delay-grid').on('click', '.tile', function() {
    var $tile = $(this);
    var delay = $tile.data('delay');
    if ($tile.hasClass('black')) {
      $tile.data('delay-start', performance.now());
      setTimeout(function() {reveal_tile($tile)}, delay);
    } else {
      $tile.toggleClass('delayed');
    }
  })

  $('#toggle-view').on('click', function(){
    $('#statistics-div').toggle();
    $('#delay-grid-div').toggle();
    if ($('#statistics-div').is(":visible")) {
      calculateStatistics();
      $('#toggle-view').html('View grid');
    } else {
      $('#toggle-view').html('View statistics');
    }
  });

  $('#reset').on('click', function(){
    setup_delay_grid();
    if ($('#statistics-div').is(":visible")) {
      $('#toggle-view').html('View grid');
    } else {
      $('#toggle-view').html('View statistics');
    }
  });

  // Create the grid on load
  setup_delay_grid();
});

function reveal_tile(element) {
  element.removeClass('black');
  element.data('delay', Math.round(performance.now() - element.data('delay-start')));
}

function calculateStatistics() {
  var delays_perceived = [];
  var $grid = $('#delay-grid');
  // For each row
  $grid.children().each(function( row_index, row ) {
    $row = $(row);
    // For each tile
    $row.children().each(function( tile_index, tile ) {
      $tile = $(tile);
      if (!$tile.hasClass('black')) {
        var delay = $tile.data('delay');
        if ($tile.hasClass('delayed')) {
          delays_perceived.push([delay, 'perceived']);
        } else {
          delays_perceived.push([delay, 'not perceived']);
        }
      }
    });
  });
  delays_perceived.sort(function(a,b){return a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0);})

  if (delays_perceived.length != gridSize * gridSize) {
    $('#statistics-feedback').html("You still have tiles to reveal!");
    $('#statistics-feedback').show();
  } else {
    $('#statistics-feedback').html("");
    $('#statistics-feedback').hide();
  }

  var $table = $('#statistics-table-values');
  $table.empty();
  for (i = 0; i < delays_perceived.length; i++) {
    if (delays_perceived[i][1] == 'not perceived') {
      $table.append('<tr><td>' + delays_perceived[i][0] + ' ms</td><td><br /></td></tr>');
    } else {
      $table.append('<tr><td><br /></td><td>' + delays_perceived[i][0] + ' ms</td></tr>');
    }
  }
}

function setup_delay_grid() {
  $('#statistics-div').hide();
  $('#delay-grid-div').show();
  var delay_values = [];
  for (repeat = 0; repeat < total_delays_for_each; repeat++) {
    delay_values = delay_values.concat(delay_types);
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
          var delay = delay_values.pop();
          delay += Math.floor((Math.random() * (delay * 0.5)));
          $element.data('delay', delay);
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

// Testing class
function perceiveAll() {
  var $grid = $('#delay-grid');
  // For each row
  $grid.children().each(function( row_index, row ) {
    $row = $(row);
    // For each tile
    $row.children().each(function( tile_index, tile ) {
      $tile = $(tile);
      $tile.trigger('click');
      $tile.addClass('delayed');
    });
  });
  return 'All tiles selected!'
}
