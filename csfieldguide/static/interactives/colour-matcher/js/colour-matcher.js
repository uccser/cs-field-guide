// The JS is not currently written for efficiency
// but rather as a proof of concept.
// This JS will be rewritten in a future update.
var urlParameters = require('../../../js/third-party/url-parameters.js');

const noUiSlider = require('nouislider');
const wNumb = require('wnumb');

ColourMatcher = {};

$(document).ready(function () {
  // Default values
  ColourMatcher.representations = [24, 8];
  ColourMatcher.goal_panels = $('.interactive-colour-matcher-goal');
  ColourMatcher.help_stage = 0;
  ColourMatcher.help_text = [
                              [gettext('Help me set 24 bit red'), 'danger'],
                              [gettext('Help me set 24 bit green'), 'success'],
                              [gettext('All help given'), 'secondary'],
                            ];
  ColourMatcher.display_hexadecimal = false;

  // Display hexadecimal values
  if (urlParameters.getUrlParameter('hexadecimal') == 'true') {
    ColourMatcher.display_hexadecimal = true;
    $('#interactive-colour-matcher .hexadecimal').show();
  }

  // Setup 24 bit sliders
  ColourMatcher.bit_24 = {};
  ColourMatcher.bit_24.sliders = document.getElementsByClassName('interactive-colour-matcher-24-bit-slider');
  ColourMatcher.bit_24.value_labels = $('#interactive-colour-matcher-24-bit-sliders span');
  ColourMatcher.bit_24.result = document.getElementById('interactive-colour-matcher-24-bit-result');

  for (var i = 0; i < ColourMatcher.bit_24.sliders.length; i++) {
    var min = 0;
    var max = 255;
    var start = Math.floor(Math.random() * (max+1));
    noUiSlider.create(ColourMatcher.bit_24.sliders[i], {
      start: start,
      step: 1,
      connect: "lower",
      orientation: "horizontal",
      range: {
        'min': min,
        'max': max
      },
      format: wNumb({
        decimals: 0
      })
    });
  }

  // Setup 8 bit sliders
  ColourMatcher.bit_8 = {};
  ColourMatcher.bit_8.sliders = document.getElementsByClassName('interactive-colour-matcher-8-bit-slider');
  ColourMatcher.bit_8.value_labels = $('#interactive-colour-matcher-8-bit-sliders span');
  ColourMatcher.bit_8.result = document.getElementById('interactive-colour-matcher-8-bit-result');

  for (var i = 0; i < ColourMatcher.bit_8.sliders.length; i++) {
    var min = 0;
    var max = i == 2 ? 3 : 7;
    var start = Math.floor(Math.random() * (max+1));
    noUiSlider.create(ColourMatcher.bit_8.sliders[i], {
      start: start,
      step: 1,
      connect: "lower",
      orientation: "horizontal",
      range: {
        'min': min,
        'max': max
      },
      format: wNumb({
        decimals: 0
      }),
      pips: {
        mode: 'count',
    		values: 8,
    		density: 100,
		    stepped: true
    	}
    });
  }

  // Create data bits for representations
  var representation_id = '#interactive-colour-matcher-bit-representation-';
  for (var i = 0; i < ColourMatcher.representations.length; i++) {
    var representation_length = ColourMatcher.representations[i];
    var representation = $(representation_id + representation_length);
    for (var j = 0; j < representation_length; j++) {
      var bit = $('<div class="bit">0</div>');
      if (j < (representation_length / 3)) {
        bit.css('border-color', 'red');
      } else if (j < (representation_length / 3 * 2)) {
        bit.css('border-color', 'lime');
      } else {
        bit.css('border-color', 'blue');
      }
      representation.append(bit);
    }
  }

  reset();

  // If help button triggered
  $("#interactive-colour-matcher-help").click(function(){
    if (ColourMatcher.help_stage < 2) {
      // Set slider to correct value
      ColourMatcher.bit_24.sliders[ColourMatcher.help_stage].noUiSlider.set(ColourMatcher.goal_colour[ColourMatcher.help_stage]);
      // Set slider to disabled
      // ColourMatcher.bit_24.sliders[ColourMatcher.help_stage].setAttribute('disabled', true);
      // Increment help stage
      ColourMatcher.help_stage++;
      // Set new text for help button
      $('#interactive-colour-matcher-help').text(ColourMatcher.help_text[ColourMatcher.help_stage][0]);
      // Update help button colour
      $('#interactive-colour-matcher-help').attr('class', 'btn btn-' + ColourMatcher.help_text[ColourMatcher.help_stage][1]);
    }

    if (ColourMatcher.help_stage == 2) {
      $("#interactive-colour-matcher-help").prop('disabled', true);
    }
    update24BitPanel();
  });

  // If reset button triggered
  $("#interactive-colour-matcher-reset").click(function(){
    reset();
  });

  // When user clicks on bit in representation
  $('.section').on('click', '.bit', function(){
    var $bit = $(this);
    if ($bit.html() == 0) {
      $bit.html(1);
    } else {
      $bit.html(0);
    }
    updateSlidersFromRepresentation();
  });

  // Bind the color changing function to the update event.
  // Fires immediately so has to be outside for-loop and ran last.
  ColourMatcher.bit_24.sliders[0].noUiSlider.on('update', update24BitPanel);
  ColourMatcher.bit_24.sliders[1].noUiSlider.on('update', update24BitPanel);
  ColourMatcher.bit_24.sliders[2].noUiSlider.on('update', update24BitPanel);
  // Bind the color changing function to the update event.
  // Fires immediately so has to be outside for-loop and ran last.
  ColourMatcher.bit_8.sliders[0].noUiSlider.on('update', update8BitPanel);
  ColourMatcher.bit_8.sliders[1].noUiSlider.on('update', update8BitPanel);
  ColourMatcher.bit_8.sliders[2].noUiSlider.on('update', update8BitPanel);

});

function reset() {
  setGoalPanel();
  set24BitPanel();
  update24BitPanel();
  set8BitPanel();
  update8BitPanel();
  $("#interactive-colour-matcher-help").prop('disabled', false);
  // Reset help stages
  ColourMatcher.help_stage = 0;
  $('#interactive-colour-matcher-help').text(ColourMatcher.help_text[ColourMatcher.help_stage][0])
  $('#interactive-colour-matcher-help').attr('class', 'btn btn-' + ColourMatcher.help_text[ColourMatcher.help_stage][1]);
  for (var i = 0; i < ColourMatcher.bit_24.sliders.length; i++) {
    ColourMatcher.bit_24.sliders[i].removeAttribute('disabled');
  }
};


// Convert array of colour values to RGB string for setting CSS
function toRGBString(colours, bit_type) {
  if (bit_type == 8) {
    colours[0] = Math.floor(colours[0] * 36.428571429);
    colours[1] = Math.floor(colours[1] * 36.428571429);
    colours[2] = Math.floor(colours[2] * 85);
  }
  return 'rgb(' + colours[0] + ',' + colours[1] + ',' + colours[2] + ')';
};


function setGoalPanel(){
  // Set goals colours as half way between 8 bit values for difficulty
  var red = Math.floor((Math.floor(Math.random() * 7) + 0.5) * 36.428571429);
  var green = Math.floor((Math.floor(Math.random() * 7) + 0.5) * 36.428571429);
  var blue = Math.floor((Math.floor(Math.random() * 3) + 0.5) * 85);

  // Set colour
  ColourMatcher.goal_colour = [red, green, blue];

  // Update goal panels
  ColourMatcher.goal_panels.css('background-color', toRGBString(ColourMatcher.goal_colour, 24));
};


function set24BitPanel() {
  // Pick random start positions for 24 bit
  for (var i = 0; i < ColourMatcher.bit_24.sliders.length; i++) {
    ColourMatcher.bit_24.sliders[i].noUiSlider.set(Math.floor(Math.random() * 256));
  }
};


function update24BitPanel(){
  // Get values
  var colours = [ColourMatcher.bit_24.sliders[0].noUiSlider.get(),
                 ColourMatcher.bit_24.sliders[1].noUiSlider.get(),
                 ColourMatcher.bit_24.sliders[2].noUiSlider.get()];

  // Update 24 bit panel
  ColourMatcher.bit_24.result.style.background = toRGBString(colours, 24);

  // Set text for labels and accumulate binary
  var total_binary = ""
  for (var i = 0; i < ColourMatcher.bit_24.value_labels.length; i++) {
    var binary = convertToBinaryString(colours[i], 8);
    total_binary += binary;
    ColourMatcher.bit_24.value_labels[i].innerHTML = binary;
  }
  setBinaryRepresentation('interactive-colour-matcher-bit-representation-24', total_binary);
  if (ColourMatcher.display_hexadecimal) {
    setHexadecimalRepresentation('24', colours);
  }
};


function set8BitPanel() {
  // Pick random start positions for 8 bit
  ColourMatcher.bit_8.sliders[0].noUiSlider.set(Math.floor(Math.random() * 8));
  ColourMatcher.bit_8.sliders[1].noUiSlider.set(Math.floor(Math.random() * 8));
  ColourMatcher.bit_8.sliders[2].noUiSlider.set(Math.floor(Math.random() * 4));
};


function update8BitPanel(){
  // Get values
  var colours = [ColourMatcher.bit_8.sliders[0].noUiSlider.get(),
                 ColourMatcher.bit_8.sliders[1].noUiSlider.get(),
                 ColourMatcher.bit_8.sliders[2].noUiSlider.get()];

  // Set text for labels and accumulate binary
  var total_binary = ""
  for (var i = 0; i < ColourMatcher.bit_8.value_labels.length; i++) {
    var binary = convertToBinaryString(colours[i], i == 2 ? 2 : 3);
    total_binary += binary;
    ColourMatcher.bit_8.value_labels[i].innerHTML = binary;
  }
  setBinaryRepresentation('interactive-colour-matcher-bit-representation-8', total_binary);
  if (ColourMatcher.display_hexadecimal) {
    setHexadecimalRepresentation('8', colours);
  }

  // Update 8 bit panel
  ColourMatcher.bit_8.result.style.background = toRGBString(colours, 8);
};


// Converts a given decimal value to binary to the given number of digits
function convertToBinaryString(decimal_value, digits) {
  binary_value = Number(decimal_value).toString(2);
  padded_string = "0".repeat(digits)
  return padded_string.substr(binary_value.length) + binary_value
};


// Sets the binary representation to the slider values
function setBinaryRepresentation (representation_id, binary_string) {
  var bits = $('#' + representation_id).children();
  for (var i = 0; i < binary_string.length; i++) {
    bits[i].innerHTML = binary_string[i];
  }
};


// Set the hexadecimal representation from the given colours
function setHexadecimalRepresentation(bit, colours) {
  var hexadecimal = '';
  for (var i = 0; i < colours.length; i++) {
    value = Number(colours[i]).toString(16);
    hexadecimal += "00".substr(value.length) + value
  }
  $('#interactive-colour-matcher-hexadecimal-representation-' + bit).html(hexadecimal.toUpperCase());
}


// Update sliders from binary representations
function updateSlidersFromRepresentation() {
  // Get all the values first; setting a nouislider triggers code that may change them
  var values = [
    getValuesFromRepresentation(24,0,8),
    getValuesFromRepresentation(24,8,16),
    getValuesFromRepresentation(24,16,24),
    getValuesFromRepresentation(8,0,3),
    getValuesFromRepresentation(8,3,6),
    getValuesFromRepresentation(8,6,8)
  ];
  ColourMatcher.bit_24.sliders[0].noUiSlider.set(values[0]);
  ColourMatcher.bit_24.sliders[1].noUiSlider.set(values[1]);
  ColourMatcher.bit_24.sliders[2].noUiSlider.set(values[2]);

  ColourMatcher.bit_8.sliders[0].noUiSlider.set(values[3]);
  ColourMatcher.bit_8.sliders[1].noUiSlider.set(values[4]);
  ColourMatcher.bit_8.sliders[2].noUiSlider.set(values[5]);
};


// Get specific binary string from bit representation
function getValuesFromRepresentation(slider_id_num, start, finish) {
  var total_binary = "";
  var bits = $('#interactive-colour-matcher-bit-representation-' + slider_id_num).children();
  for (var i = start; i < finish; i++) {
    total_binary += $(bits[i]).html();
  }
  return parseInt(total_binary, 2);
};
