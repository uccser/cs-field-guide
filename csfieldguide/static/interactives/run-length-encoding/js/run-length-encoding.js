
var urlParameters = require('../../../js/third-party/url-parameters.js');

$(document).ready(function(){
  var initialGridSize = urlParameters.getUrlParameter('grid-size') || '5';
  var initialEncoding = urlParameters.getUrlParameter('encoding') || '5\n5\n5\n5\n5';

  // Switch all pixels to black on clear click
  $('#clear-all').on('click', function(){
    $('.pixel').removeClass('black');
    updateEncodingText();
  });

  // Toggle all pixels to black on toggle click
  $('#invert').on('click', function(){
    $('.pixel').toggleClass('black');
    updateEncodingText();
  });

  // On key up, update squares (delegated)
  $('#encoding-text').bind('input propertychange', function(){
    updateEncodingGrid();
  });

  // Toggle pixel on pixel click
  $('#encoding-grid').on('click', '.pixel', function(event) {
    $(this).toggleClass('black');
    updateEncodingText();
  })

  // Change grid size on value change
  $('#grid-size').on('change', function(){
    setup_grid();
  });

  // Create the grid on load
  $('#grid-size').val(initialGridSize);
  setup_grid();
  $('#encoding-text').val(initialEncoding);
  updateEncodingGrid();
});

function setup_grid(){
  // Get grid size and set it globably
  this.$gridSize = $('#grid-size').val();

  // Clear all errors
  $('#encoding-text-feedback').text('');
  $('#encoding-text').removeClass('error');

  if ($gridSize > 21 || $gridSize < 1 || isNaN($gridSize)) {
    // Error message
    alert(gettext('Please enter a value between 0 and 100'));
    // Reset grid
    $('#grid-size').val(5);
    setup_grid()
  } else {
    // Add content to container
    $('#bit-count').text($gridSize * $gridSize);
    charCount = $gridSize >= 10 ? 2 * $gridSize : $gridSize;
    $('#char-count').text(charCount);

    // Create divs and set initial run length text
    var runText = "";
    var grid = $('#encoding-grid');
    grid.empty();
    for(row = 0; row < $gridSize; row++) {
      var gridRow = $('<div class="flex-container">');
      grid.append(gridRow);
      runText += $gridSize;
      for(col = 0; col < $gridSize; col++) {
          gridRow.append($('<div class="flex-item pixel"></div>'));
      }
      grid.append('</div>');
      if (row < $gridSize - 1) {
        runText += '\n';
      }
    }
    $('#encoding-text').val(runText);

    // Set suitable font size
    if ($gridSize <= 8) {
      fontSize = 25;
    } else if ($gridSize <= 12) {
      fontSize = 19;
    } else {
      fontSize = 14;
    }
    $('#encoding-text').css('font-size',fontSize);
  }
}

function updateEncodingGrid() {
  var $encodingText = $('#encoding-text');
  var $encodingFeedback = $('#encoding-text-feedback');
  var $encodingGrid = $('#encoding-grid');
  var encodingData = $encodingText.val().split('\n');
  var row = 0;
  while(row < encodingData.length) {
    encodingData[row] = encodingData[row].replace(/\s/g, '').split(',').map(Number);
    row++;
  }

  var is_valid_data = true;

  for (row = 0; row < encodingData.length; row++) {
    var row_total = 0
    for (var col = 0; col < encodingData[row].length; col++) {
      row_total += encodingData[row][col];
    }
    // Wrong total for row
    if (row_total != $gridSize) {
      $encodingFeedback.text(interpolate(gettext('Your numbers on row %s add up to a different number than the grid requires!'), [row + 1]));
      is_valid_data = false;
    }
  }

  // If wrong number of lines
  if (encodingData.length != $gridSize) {
    $encodingFeedback.text(gettext('You have a different number of lines than lines in the grid!'));
    is_valid_data = false;
  }

  if (is_valid_data) {
    $encodingFeedback.text('');
    $encodingText.removeClass('error');
    $encodingGrid.children().each(function( row_index, row ) {
      $row_element = $(row);
      var counting_colour = 'white';
      var child_count = 0;
      var row_data = encodingData[row_index];
      while (row_data.length > 0) {
        var colour_count = row_data.shift();
        for (var count = 0; count < colour_count; count++) {
          $row_element.children().eq(child_count).removeClass('black').addClass(counting_colour);
          child_count++;
        }
        counting_colour = counting_colour == 'white' ? 'black' : 'white';
      }
    });
    $('#char-count').text($encodingText.val().replace(/\s/g, '').length);
  } else {
    $encodingFeedback.addClass('error');
    $encodingText.addClass('error');
    $('#char-count').text('???');
  }
}

function updateEncodingText() {
  // Save variables
  var $encodingText = $('#encoding-text');
  var $encodingGrid = $('#encoding-grid');

  // Clear textbox
  $encodingText.val('');

  // For each row
  $encodingGrid.children().each(function( row_index, row ) {
    $row = $(row);
    var counting_colour = 'white';
    var colour_count = 0 ;
    var row_counts = [];
    // For each column
    $row.children().each(function( col_index, col ) {
      $col = $(col);
      var pixel_colour = $col.hasClass( "black" ) ? 'black' : 'white';
      if (pixel_colour == counting_colour) {
        colour_count++;
      } else {
        row_counts.push(colour_count);
        counting_colour = counting_colour == 'white' ? 'black' : 'white';
        colour_count = 1;
      }
    });
    row_counts.push(colour_count);
    // Add text to encoding text
    var text = $encodingText.val() + row_counts.join(', ');
    if (row_index < $gridSize - 1) {
      text += '\n';
    }
    $encodingText.val(text);
  });
  // Count characters required
  $('#char-count').text($encodingText.val().replace(/\s/g, '').length);
}

String.prototype.repeat = function( num )
{
  return new Array( num + 1 ).join( this );
}
