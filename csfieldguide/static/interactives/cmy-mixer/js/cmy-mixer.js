// Adapted from http://refreshless.com/nouislider/examples/#section-colorpicker

var urlParameters = require('../../../js/third-party/url-parameters.js')
const noUiSlider = require('nouislider');
var useHex = false;

const sFormat = {
  to: function (value) {
    if (useHex) {
      return decimalToHex(Math.round(value));
    }
    return Math.round(value);
  },
  from: function (value) {
    return Math.round(Number(value));
  }
};

CMY_Mixer = {};

CMY_Mixer.minimum = 0
CMY_Mixer.maximum = 255

CMY_Mixer.sliders = document.getElementsByClassName('interactive-cmy-mixer-slider');
CMY_Mixer.result = document.getElementById('interactive-cmy-mixer-result');

$(document).ready(function () {
  useHex = (urlParameters.getUrlParameter('hex') || 'false') == 'true';
  $("input[id='interactive-cmy-mixer-hex-colour-code']").prop('checked', useHex);
  $("input[id='interactive-cmy-mixer-dec-colour-code']").prop('checked', !useHex);

  if ((urlParameters.getUrlParameter('hide-selector') || 'false') == 'true') {
    $("#numeral-system").addClass('d-none');
  }

  for ( var i = 0; i < CMY_Mixer.sliders.length; i++ ) {
    noUiSlider.create(CMY_Mixer.sliders[i], {
      start: Math.floor(Math.random() * CMY_Mixer.maximum),
      step: 1,
      connect: "lower",
      orientation: "horizontal",
      range: {
        'min': CMY_Mixer.minimum,
        'max': CMY_Mixer.maximum
      },
      format: sFormat,
      pips: {
        mode: 'count',
    		values: 9,
    		density: 9,
        stepped: true,
        format: sFormat
    	}
    });
  }

  $('#interactive-cmy-mixer-cyan-value').on('input', CMY_Mixer.setColorFromInputBox);
  $('#interactive-cmy-mixer-magenta-value').on('input', CMY_Mixer.setColorFromInputBox);
  $('#interactive-cmy-mixer-yellow-value').on('input', CMY_Mixer.setColorFromInputBox);
  // Bind the color changing function
  // to the update event. Fires immediately so has to be outside for-loop.
  CMY_Mixer.sliders[0].noUiSlider.on('update', CMY_Mixer.setColor);
  CMY_Mixer.sliders[1].noUiSlider.on('update', CMY_Mixer.setColor);
  CMY_Mixer.sliders[2].noUiSlider.on('update', CMY_Mixer.setColor);

  // Update display
  CMY_Mixer.setColor();
});


$("input[name='interactive-cmy-mixer-colourCode']").click(function() {
  var temp = $("input[name='interactive-cmy-mixer-colourCode']:checked").val() == 'hex';
  if (temp != useHex) {
    useHex = temp;
    var c_val = $('#interactive-cmy-mixer-cyan-value').val() || 0;
    var m_val = $('#interactive-cmy-mixer-magenta-value').val() || 0;
    var y_val = $('#interactive-cmy-mixer-yellow-value').val() || 0;
    var vals = [c_val, m_val, y_val];

    if (useHex) {
      c_val = decimalToHex(parseInt(c_val));
      m_val = decimalToHex(parseInt(m_val));
      y_val = decimalToHex(parseInt(y_val));
    } else {
      c_val = parseInt(c_val, 16);
      m_val = parseInt(m_val, 16);
      y_val = parseInt(y_val, 16);
      vals = [c_val, m_val, y_val];
    }
    $('#interactive-cmy-mixer-cyan-value').val(c_val);
    $('#interactive-cmy-mixer-magenta-value').val(m_val);
    $('#interactive-cmy-mixer-yellow-value').val(y_val);

    for ( var i = 0; i < CMY_Mixer.sliders.length; i++ ) {
      CMY_Mixer.sliders[i].noUiSlider.destroy();
      noUiSlider.create(CMY_Mixer.sliders[i], {
        start: vals[i],
        step: 1,
        connect: "lower",
        orientation: "horizontal",
        range: {
          'min': CMY_Mixer.minimum,
          'max': CMY_Mixer.maximum
        },
        format: sFormat,
        pips: {
          mode: 'count',
          values: 9,
          density: 9,
          stepped: true,
          format: sFormat
        }
      });
    }
  }
  
  CMY_Mixer.sliders[0].noUiSlider.on('update', CMY_Mixer.setColor);
  CMY_Mixer.sliders[1].noUiSlider.on('update', CMY_Mixer.setColor);
  CMY_Mixer.sliders[2].noUiSlider.on('update', CMY_Mixer.setColor);
});


/**
 * Displays the given colour values as text and colours the coloured box
 * _technically_ it should be CMYK since this is describing what printers do, but let's not get into that
 */
CMY_Mixer.writeColourBox = function(rgb_colour, cmy_colour) {
  var font_colour = getFontColour(rgb_colour[0], rgb_colour[1], rgb_colour[2]);
  var colour_text;
  if (!useHex) {
    colour_text = 'cmy(' +
      cmy_colour[0] + ',' +
      cmy_colour[1] + ',' +
      cmy_colour[2] + ')';
  } else {
    colour_text = 'cmy(' +
      '0x' + decimalToHex(cmy_colour[0], true) + ',' +
      '0x' + decimalToHex(cmy_colour[1], true) + ',' +
      '0x' + decimalToHex(cmy_colour[2], true) + ')';
  }
  $('#interactive-cmy-mixer-colour-code')
    .text(colour_text)
    .css('color', font_colour);

  var color = 'rgb(' +
    rgb_colour[0] + ',' +
    rgb_colour[1] + ',' +
    rgb_colour[2] + ')';

  // Fill the color box.
  CMY_Mixer.result.style.background = color;
  CMY_Mixer.result.style.color = color;
}


CMY_Mixer.setColor = function() {
  // Get the slider values,
  var cyan_val = CMY_Mixer.sliders[0].noUiSlider.get();
  var magenta_val = CMY_Mixer.sliders[1].noUiSlider.get();
  var yellow_val = CMY_Mixer.sliders[2].noUiSlider.get();
  // stick them together.
  var cmy_as_rgb;
  if (useHex) {
    cmy_as_rgb = cmy_to_rgb(parseInt(cyan_val, 16),
                            parseInt(magenta_val, 16),
                            parseInt(yellow_val, 16));
  } else {
    cmy_as_rgb = cmy_to_rgb(cyan_val, magenta_val, yellow_val);
  }

  CMY_Mixer.writeColourBox(cmy_as_rgb, [cyan_val, magenta_val, yellow_val]);

  // Set text for labels
  $('#interactive-cmy-mixer-cyan-value').val(CMY_Mixer.sliders[0].noUiSlider.get());
  $('#interactive-cmy-mixer-magenta-value').val(CMY_Mixer.sliders[1].noUiSlider.get());
  $('#interactive-cmy-mixer-yellow-value').val(CMY_Mixer.sliders[2].noUiSlider.get());
}


CMY_Mixer.setColorFromInputBox = function() {
  // Get the input values
  cyan_val = $('#interactive-cmy-mixer-cyan-value').val() || 0;
  magenta_val = $('#interactive-cmy-mixer-magenta-value').val() || 0;
  yellow_val = $('#interactive-cmy-mixer-yellow-value').val() || 0;
	// stick them together.
  if (useHex) {
    cyan_val = parseInt(cyan_val, 16);
    magenta_val = parseInt(magenta_val, 16);
    yellow_val = parseInt(yellow_val, 16);
  }
  var cmy_as_rgb = cmy_to_rgb(cyan_val, magenta_val, yellow_val);
  
  CMY_Mixer.writeColourBox(cmy_as_rgb, [cyan_val, magenta_val, yellow_val]);

  // Set slider handle position
  CMY_Mixer.sliders[0].noUiSlider.set(cyan_val);
  CMY_Mixer.sliders[1].noUiSlider.set(magenta_val);
  CMY_Mixer.sliders[2].noUiSlider.set(yellow_val);
}

function cmy_to_rgb(c, m, y) {
  var
  r = 255 - c,
  g = 255 - m,
  b = 255 - y;
  return [r,g,b];
}

/**
 * Returns a string of the given decimal number in hexadecimal
 * If enforceTwoChar is true and the resulting hex is just one character, a 0 will be prepended
 */
function decimalToHex(d, enforceTwoChar=false) {
  var hex = d.toString(16).toUpperCase();
  if (enforceTwoChar && hex.length == 1) {
    hex = '0' + hex;
  }
  return hex;
}

/**
 * Determines what the font colour of the hex/rgb code should be
 * based on the background colour of the box.
 */
function getFontColour(r, g, b) {
  // http://www.w3.org/TR/AERT#color-contrast
  var brightness = Math.round(((parseInt(r) * 299) +
                      (parseInt(g) * 587) +
                      (parseInt(b) * 114)) / 1000);
  var font_colour = (brightness > 125) ? 'black' : 'white';
  return font_colour
}
