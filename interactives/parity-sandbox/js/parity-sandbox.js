$(document).ready(function(){
  // Check parity on button click
  $('#interactive-parity-sandbox-check').on('click', function(){
     checkParity();
  });

  // Toggle parity card when user clicks on card
  $('#interactive-parity-sandbox-grid').on('click', '.parity-card', function(event) {
      $(this).toggleClass('black');
  })

  // Change grid size on value change
  $('#interactive-parity-sandbox-grid-size').on('change', function(){
      setup_grid();
  });

  // Create the grid on load
  setup_grid();
});

function setup_grid(){
  // Get grid size and set it globably
  this.$gridSize = $('#interactive-parity-sandbox-grid-size').val();

  // Clear feedback
  $('#interactive-parity-sandbox-feedback').text('');

  if ($gridSize > 21 || $gridSize < 1 || isNaN($gridSize)) {
    // Error message
    alert('Please enter a value between 0 and 100');
    // Reset grid
    $('##interactive-parity-sandbox-grid-size').val(6);
  } else {
    // Create divs and set initial run length text
    var $grid = $('#interactive-parity-sandbox-grid');
    $grid.empty();
    for(row = 0; row < $gridSize; row++) {
        var $gridRow = $('<div class="flex-container">');
        $grid.append($gridRow);
        for(col = 0; col < $gridSize; col++) {
            $gridRow.append($('<div class="flex-item parity-card"></div>'));
        }
        $grid.append('</div>');
    }
  }
}

function checkParity() {
  // Set variables
  var $feedback = $('#interactive-parity-sandbox-feedback');
  var $grid = $('#interactive-parity-sandbox-grid');
  var valid = true;

  // For each row
  column_counts = new Array($grid.children().length).fill(0);
  $grid.children().each(function( row_index, row ) {
    $row = $(row);
    // If odd number of white cards, then invalid parity
    if (($row.children().length - $row.children('.black').length) % 2 == 1) {
      valid = false
    }

    // Add to colum values
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
