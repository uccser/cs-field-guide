$(document).ready(function() {
  var delayTypes = [0, 25, 50, 75, 100, 150, 200, 350, 600]; // Delays stored in milliseconds
  var gridSize = 6; // Multiples of three required
  var totalDelaysForEach = (gridSize * gridSize) / delayTypes.length;

  // Toggle pixel on pixel click
  $('#delay-grid').on('click', '.tile', function() {
    var $tile = $(this);
    var delay = $tile.data('delay');
    if ($tile.hasClass('black')) {
      $tile.data('delay-start', performance.now());
      setTimeout(function() {revealTile($tile)}, delay);
    } else {
      $tile.toggleClass('delayed');
    }
  })

  $('#toggle-view').on('click', function(){
    $('#statistics-div').toggle();
    $('#delay-grid').toggle();
    if ($('#statistics-div').is(":visible")) {
      calculateStatistics(gridSize);
      $('#toggle-view').html(gettext('View grid'));
    } else {
      $('#toggle-view').html(gettext('View statistics'));
    }
  });

  $('#reset').on('click', function(){
    setupDelayGrid(delayTypes, totalDelaysForEach, gridSize);
    if ($('#statistics-div').is(":visible")) {
      $('#toggle-view').html(gettext('View grid'));
    } else {
      $('#toggle-view').html(gettext('View statistics'));
    }
  });

  // Create the grid on load
  setupDelayGrid(delayTypes, totalDelaysForEach, gridSize);
});

function revealTile(element) {
  element.removeClass('black');
  element.data('delay', Math.round(performance.now() - element.data('delay-start')));
}

function calculateStatistics(gridSize) {
  var delaysPerceived = [];
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
          delaysPerceived.push([delay, 'perceived']);
        } else {
          delaysPerceived.push([delay, 'not perceived']);
        }
      }
    });
  });
  delaysPerceived.sort(function(a,b){return a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0);})

  if (delaysPerceived.length == 0) {
      $('#statistics-table').hide();
  } else {
      $('#statistics-table').show();
  }

  if (delaysPerceived.length != gridSize * gridSize) {
    $('#statistics-feedback').html(gettext('You still have tiles to reveal!'));
    $('#statistics-feedback').show();
  } else {
    $('#statistics-feedback').html("");
    $('#statistics-feedback').hide();
  }

  var $table = $('#statistics-table-values');
  $table.empty();
  for (i = 0; i < delaysPerceived.length; i++) {
    if (delaysPerceived[i][1] == 'not perceived') {
      $table.append('<tr><td>' + delaysPerceived[i][0] + ' ms</td><td><br /></td></tr>');
    } else {
      $table.append('<tr><td><br /></td><td>' + delaysPerceived[i][0] + ' ms</td></tr>');
    }
  }
}

function setupDelayGrid(delayTypes, totalDelaysForEach, gridSize) {
  $('#statistics-div').hide();
  $('#delay-grid').show();
  var delayValues = [];
  for (repeat = 0; repeat < totalDelaysForEach; repeat++) {
    delayValues = delayValues.concat(delayTypes);
  }
  delayValues = shuffle(delayValues);

  // Create tile divs
  var grid = $('#delay-grid');
  grid.empty();
  for (row = 0; row < gridSize; row++) {
      var gridRow = $('<div class="flex-container">');
      grid.append(gridRow);
      for(col = 0; col < gridSize; col++) {
          var $element = $('<div class="flex-item tile black"></div>');
          var delay = delayValues.pop();
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
