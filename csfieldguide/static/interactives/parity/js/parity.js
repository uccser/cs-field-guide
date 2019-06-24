var urlParameters = require('../../../js/third-party/url-parameters.js');
var Parity = {};

$(document).ready(function(){
  // Create the grid on load
  Parity.grid = $('#interactive-parity-grid');
  Parity.feedback = $('#interactive-parity-feedback');
  setupGrid();

  if (urlParameters.getUrlParameter('mode') == 'sandbox') {
    Parity.mode = 'sandbox';
    Parity.current_mode = 'sandbox';
  } else if (urlParameters.getUrlParameter('mode') == 'set') {
    Parity.mode = 'set';
    Parity.current_mode = 'set';
  } else if (urlParameters.getUrlParameter('mode') == 'detect') {
    Parity.mode = 'detect';
    Parity.current_mode = 'detect';
  } else {
    Parity.mode = 'trick';
    Parity.current_mode = 'set';
  }
  setupMode();

  // On 'Check parity' button click
  $('#interactive-parity-check').on('click', function(){
    var parity_status = checkParity();
    // Display status
    if (parity_status) {
      Parity.feedback.removeClass('error');
      Parity.feedback.text(gettext("Correct: Every row and column has even parity (of black squares)"));
    } else {
      Parity.feedback.addClass('error');
      Parity.feedback.text(gettext("Incorrect: Not every row and column has even parity (of black squares)"));
    }
  });

  // On 'Add random data' button click
  $('#interactive-parity-random-data').on('click', function(){
    clearGrid();
    setRandomBits();
    updateGrid();
  });

  // On 'Clear all' button click
  $('#interactive-parity-clear-all').on('click', function(){
    clearGrid();
  });

  // On 'Reset' button click
  $('#interactive-parity-reset').on('click', function(){
    // If set stage in set or trick mode
    if (Parity.current_mode == 'set') {
      clearGrid();
      setRandomBits();
      updateGrid();
    // Else if detect stage in trick mode
    } else if (Parity.mode == 'trick') {
      Parity.valid_parity_bits = undefined;
      Parity.current_mode = 'set';
      clearGrid();
      setupMode()
    // Else if detect stage in detect mode
    } else {
      clearGrid();
      setupMode();
    }
    // Remove green success highlight around bit if correct bit found
    $('#interactive-parity-grid .parity-card').removeClass('correct-bit');
    Parity.feedback.removeClass('error');
    Parity.feedback.text("");
  });

  // When the user click on the 'Flip a bit' button
  $('#interactive-parity-flip-bit').on('click', function(){
    $('.interactive-parity-size-controls').hide();
    $('.interactive-parity-trick-controls').hide();
    $('.interactive-parity-reset-controls').hide();
    $('#interactive-parity-grid-confusation').css( "display", "flex");
    timer(50, 2000, randomlyToggleBits, setupParityTrick);
  });

  // Toggle parity card when user clicks on card
  $('#interactive-parity-grid').on('click', '.parity-card', function(event) {
    $bit = $(this);
    if (Parity.valid_parity_bits == false) {
      Parity.feedback.addClass('error');
      Parity.feedback.text(gettext("Your parity bits weren't set correctly, try starting again."));
    } else if (Parity.current_mode == 'detect' && Parity.flipping == 'all') {
      if ($bit.data("row") == Parity.flipped_row && $bit.data("col") == Parity.flipped_col) {
        $bit.addClass("correct-bit");
        Parity.feedback.removeClass('error');
        Parity.feedback.text(gettext("Correct! You spotted the flipped bit!"));
        Parity.flipping = 'none';
      } else {
        Parity.feedback.addClass('error');
        Parity.feedback.text(gettext("That's not the flipped bit!"));
      }
    } else if (Parity.flipping == 'all' || (Parity.flipping == 'parity' && $bit.hasClass('parity-bit'))) {
      // We toggle bit manually rather than call updateGrid() to stay O(1)
      $bit.toggleClass('black');
      Parity.grid_values[$bit.data("row")][$bit.data("col")] = !$bit.hasClass("black");
    }
  });

  // Change grid size on value change
  $('#interactive-parity-grid-size').on('change', function(){
      setupGrid();
      setupMode();
  });
});


// This function is trigger when the confusation stage is over.
function setupParityTrick() {
  // Check if parity was incorrect before
  Parity.valid_parity_bits = checkParity();
  // Update interface for current mode
  Parity.current_mode = 'detect';
  setupMode();
  // Flips a bit in memory
  flipBit();
  // Displays new grid
  updateGrid();
  // Hides the confusation overlay
  $('#interactive-parity-grid-confusation').hide();
  // Allow flipping of bit
  Parity.flipping = 'all';
};


// Set interface for current mode
function setupMode() {
  var header = $('#interactive-parity-mode');

  // Hide all controls
  $('.interactive-parity-controls').hide()

  if (Parity.current_mode == 'sandbox') {
     header.text("Sandbox Mode");
     $('.interactive-parity-sandbox-controls').show();
     $('.interactive-parity-size-controls').show();
     $('.interactive-parity-check-controls').show();
     Parity.flipping = 'all';
     setRandomBits();
     updateGrid();
  } else if (Parity.current_mode == 'set') {
    header.text(gettext("Setting Parity"));
    Parity.flipping = 'parity';
    $('.interactive-parity-size-controls').show();
    if (Parity.mode == 'trick') {
      $('.interactive-parity-trick-controls').show();
    } else {
      $('.interactive-parity-check-controls').show();
    }
    $('.interactive-parity-reset-controls').show();
    setRandomBits();
    updateGrid();
  } else if (Parity.current_mode == 'detect') {
    header.text(gettext("Detect the Error"));
    Parity.flipping = 'all';
    $('.interactive-parity-detect-controls').show();
    $('.interactive-parity-reset-controls').show();
    // If detect only mode (not trick mode)
    if (Parity.mode == 'detect') {
      $('.interactive-parity-size-controls').show();
      setRandomBits();
      setParityBits();
      flipBit();
      updateGrid();
    }
  }
};


// Calls a function at each interval (ms) for a certain length (ms)
function timer(interval, length, callback, finished_callback) {
  var start = Date.now();
  var intervalID;
  function handler() {
    if (Date.now() - start > length) {
      clearInterval(intervalID);
      finished_callback();
    }
    else if (callback !== undefined) {
      callback();
    }
  };
  intervalID = setInterval(handler, interval);
};


// This function flips one bit and does not update the grid
function flipBit() {
  Parity.flipped_row = Math.floor(Math.random() * Parity.grid_size);
  Parity.flipped_col = Math.floor(Math.random() * Parity.grid_size);
  Parity.grid_values[Parity.flipped_row][Parity.flipped_col] = !Parity.grid_values[Parity.flipped_row][Parity.flipped_col];
};


// Set random bit values (except for parity row)
function setRandomBits() {
  for (var row = 0; row < Parity.grid_values.length - 1; row++) {
    for (var col = 0; col < Parity.grid_values.length - 1; col++) {
      if (Math.random() >= 0.5) {
        Parity.grid_values[row][col] = true;
      } else {
        Parity.grid_values[row][col] = false;
      }
    }
  }
};


// Set random data values (except parity bits)
function updateGrid() {
  Parity.grid.children().each(function( row_index, row ) {
    $(row).children().each(function( col_index, col ) {
      $col = $(col);
      if (Parity.grid_values[row_index][col_index]) {
        $col.removeClass("black");
      } else {
        $col.addClass("black");
      }
    });
  });
};


// Clear all bits
function clearGrid() {
  for (var row = 0; row < Parity.grid_values.length; row++) {
    for (var col = 0; col < Parity.grid_values.length; col++) {
      Parity.grid_values[row][col] = true;
    }
  }
  updateGrid();
};


// Random change bits during confusation
function randomlyToggleBits() {
  Parity.grid.children().each(function( row_index, row ) {
    $(row).children().each(function( col_index, col ) {
      if (Math.random() >= 0.5) {
        if ($(col).hasClass("black")) {
          $(col).removeClass("black");
        } else {
          $(col).addClass("black");
        }
      }
    });
  });
};


// Set grid size and data values
function setupGrid(){
  // Get grid size and set it
  Parity.grid_size = parseInt($('#interactive-parity-grid-size').val());

  // Create 2D array of bit values - true is on (white) while false is off (black)
  Parity.grid_values = new Array(Parity.grid_size);
  for (var row = 0; row < Parity.grid_values.length; row++) {
    Parity.grid_values[row] = new Array(Parity.grid_size).fill(true);
  }

  // Clear feedback
  $('#interactive-parity-feedback').text('');

  if (Parity.grid_size > 21 || Parity.grid_size < 1 || isNaN(Parity.grid_size)) {
    // Error message
    alert(gettext("Please enter a value between 1 and 20"));
    // Reset grid
    $('##interactive-parity-grid-size').val(6);
  } else {
    Parity.grid.empty();
    for(row = 0; row < Parity.grid_size; row++) {
        var $gridRow = $('<div class="flex-container">');
        Parity.grid.append($gridRow);
        for(col = 0; col < Parity.grid_size; col++) {
            var $bit = $('<div class="flex-item parity-card"></div>');
            $gridRow.append($bit);
            // Storing the column and row positions on a bit
            // allows updating grid_values in O(1)
            $bit.data("col", col);
            $bit.data("row", row);
            if (row == Parity.grid_size - 1 || col == Parity.grid_size - 1) {
              $bit.addClass("parity-bit");
            }
        }
        Parity.grid.append('</div>');
    }
  }
};


// Return boolean of parity status
function checkParity() {
  var parity_status = true;

  column_counts = new Array(Parity.grid_values.length).fill(0);
  for (var row = 0; row < Parity.grid_values.length; row++) {
    var black_bit_count = 0;
    for (var col = 0; col < Parity.grid_values.length; col++) {
      // If white (true) add to counts
      if (Parity.grid_values[row][col] == 0) {
        black_bit_count++;
        column_counts[col]++;
      }
    }
    if (black_bit_count % 2 == 1) {
      parity_status = false;
    }
  }

  // Check column counts
  for (var col = 0; col < column_counts.length; col++) {
    if (column_counts[col] % 2 == 1) {
      parity_status = false;
    }
  }

  return parity_status;
};


// Sets the last row and column parity bits correctly
function setParityBits() {

  column_counts = new Array(Parity.grid_values.length).fill(0);
  for (var row = 0; row < Parity.grid_values.length-1; row++) {
    var black_bit_count = 0;
    for (var col = 0; col < Parity.grid_values.length-1; col++) {
      // If black add to counts
      if (Parity.grid_values[row][col] == 0) {
        black_bit_count++;
        column_counts[col]++;
      }
    }
    // Last bit in row
    if (black_bit_count % 2 == 0) {
      Parity.grid_values[row][Parity.grid_values.length-1] = false;
    } else {
      column_counts[Parity.grid_values.length-1]++;
    }
  }
  // Last bit in column
  for (var col = 0; col < column_counts.length; col++) {
    if (column_counts[col] % 2 == 0) {
      Parity.grid_values[Parity.grid_values.length-1][col] = false;
    }
  }
};
