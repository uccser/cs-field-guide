var Parity = {};

$(document).ready(function(){
  // Create the grid on load
  Parity.grid = $('#interactive-parity-grid');
  setupGrid();

  if (getUrlParameter('mode') == 'sandbox') {
    Parity.mode = 'sandbox';
    Parity.current_mode = 'sandbox';
  } else if (getUrlParameter('mode') == 'set') {
    Parity.mode = 'set';
    Parity.current_mode = 'set';
  } else if (getUrlParameter('mode') == 'detect') {
    Parity.mode = 'detect';
    Parity.current_mode = 'detect';
  } else {
    Parity.mode = 'trick';
    Parity.current_mode = 'set';
  }
  setupMode();

  // On 'Check parity' button click
  $('#interactive-parity-check').on('click', function(){
    checkParity();
  });

  // On 'Add random data' button click
  $('#interactive-parity-random-data').on('click', function(){
    clearGrid();
    setRandomData();
  });

  // On 'Clear all' button click
  $('#interactive-parity-clear-all').on('click', function(){
    clearGrid();
  });

  // On 'Reset' button click
  $('#interactive-parity-reset').on('click', function(){
    if (Parity.current_mode == 'set') {
      clearGrid();
      setRandomData();
    }
  });

  // When the user click on the 'Flip a bit' button
  $('#interactive-parity-flip-bit').on('click', function(){
    $('.interactive-parity-trick-controls').hide();
    $('.interactive-parity-reset-controls').hide();
    $('#interactive-parity-grid-confusation').css( "display", "flex");
    timer(50, 2000, randomlyToggleBits, setupParityTrick);
  });

  // Toggle parity card when user clicks on card
  $('#interactive-parity-grid').on('click', '.parity-card', function(event) {
    if (Parity.flipping == 'all') {
      $(this).toggleClass('black');
    } else if (Parity.flipping == 'parity' && $(this).hasClass('parity-bit')) {
      $(this).toggleClass('black');
    }
  })

  // Change grid size on value change
  $('#interactive-parity-grid-size').on('change', function(){
      setupGrid();
  });
});

// This function is trigger when the confusation stage is over. This function:
// 1. Flips a bit in memory
// 2. Displays new grid
// 3. Hides the confusation overlay
function setupParityTrick() {
  $('#interactive-parity-grid-confusation').hide();
};


function setupMode() {
  var header = $('#interactive-parity-mode');

  // Hide all controls
  $('.interactive-parity-controls').hide()

  if (Parity.current_mode == 'sandbox') {
     header.text('Sandbox Mode');
     $('.interactive-parity-sandbox-controls').show();
     $('.interactive-parity-check-controls').show();
     Parity.flipping = 'all';
     setRandomData();
  } else if (Parity.current_mode == 'set') {
    header.text('Setting Parity');
    Parity.flipping = 'parity';
    if (Parity.mode == 'trick') {
      $('.interactive-parity-trick-controls').show();
    } else {
      $('.interactive-parity-check-controls').show();
    }
    $('.interactive-parity-reset-controls').show();
    setRandomData();
  } else if (Parity.current_mode == 'detect') {
    header.text('Detect the Error');
    Parity.flipping = 'none';
  }
};

function timer(interval, maxTime, callback, finished_callback) {
  var start = Date.now();
  var intervalID;
  function handler() {
    if (Date.now() - start > maxTime) {
      clearInterval(intervalID);
      finished_callback();
    }
    else if (callback !== undefined) {
      callback();
    }
  };
  intervalID = setInterval(handler, interval);
};


function setRandomData() {
  // Set random data values (except parity bits)
  Parity.grid.children().slice(0, -1).each(function( row_index, row ) {
    $(row).children().slice(0, -1).each(function( col_index, col ) {
      if (Math.random() >= 0.5) {
        $(col).addClass("black");
      }
    });
  });
};


function clearGrid() {
  // Clear all bits
  Parity.grid.children().each(function( row_index, row ) {
    $(row).children().each(function( col_index, col ) {
      $(col).removeClass("black");
    });
  });
};


function randomlyToggleBits() {
  // Random change data values
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


function setupGrid(){
  // Get grid size and set it
  Parity.gridSize = $('#interactive-parity-grid-size').val();

  // Clear feedback
  $('#interactive-parity-feedback').text('');

  if (Parity.gridSize > 21 || Parity.gridSize < 1 || isNaN(Parity.gridSize)) {
    // Error message
    alert('Please enter a value between 1 and 20');
    // Reset grid
    $('##interactive-parity-grid-size').val(6);
  } else {
    Parity.grid.empty();
    for(row = 0; row < Parity.gridSize; row++) {
        var $gridRow = $('<div class="flex-container">');
        Parity.grid.append($gridRow);
        for(col = 0; col < Parity.gridSize; col++) {
            var $bit = $('<div class="flex-item parity-card"></div>');
            $gridRow.append($bit);
            if (row == Parity.gridSize - 1 || col == Parity.gridSize - 1) {
              $bit.addClass("parity-bit");
            }
        }
        Parity.grid.append('</div>');
    }
  }
}

function checkParity() {
  // Set variables
  var $feedback = $('#interactive-parity-feedback');
  var valid = true;

  // For each row
  column_counts = new Array(Parity.grid.children().length).fill(0);
  Parity.grid.children().each(function( row_index, row ) {
    $row = $(row);
    // If odd number of white cards, then invalid parity
    if (($row.children().length - $row.children('.black').length) % 2 == 1) {
      valid = false
    }

    // Add to column values
    $row.children().each(function( col_index, col ) {
      $col = $(col);
      if (!$col.hasClass("black")) {
        column_counts[col_index] = column_counts[col_index] + 1
      }
    });
  });

  // Check column counts
  for (var i = 0; i < column_counts.length; i++) {
    if (column_counts[i] % 2 == 1) {
      valid = false
    }
  }

  // Display status
  if (valid) {
    $feedback.removeClass('error');
    $feedback.text('Correct: Every row and column has even parity (of white squares)');
  } else {
    $feedback.addClass('error');
    $feedback.text('Incorrect: Not every row and column has even parity (of white squares)');
  }
}

// From jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
