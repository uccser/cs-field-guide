// Adapted from http://refreshless.com/nouislider/examples/#section-colorpicker

var urlParameters = require('../../../js/third-party/url-parameters.js')
const noUiSlider = require('nouislider');
const wNumb = require('wnumb');
var useHex = 'false';

CMY_Mixer = {};

$(document).ready(function () {
  useHex = urlParameters.getUrlParameter('hex') || 'false';

  CMY_Mixer.minimum = 0
  CMY_Mixer.maximum = 255

  CMY_Mixer.sliders = document.getElementsByClassName('interactive-cmy-mixer-slider');
  CMY_Mixer.result = document.getElementById('interactive-cmy-mixer-result');

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
      format: wNumb({
        decimals: 0
      }),
      pips: {
        mode: 'count',
    		values: 9,
    		density: 9,
		    stepped: true
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


CMY_Mixer.setColor = function(){
	// Get the slider values,
	// stick them together.
  var cmy_as_rgb = cmy_to_rgb(CMY_Mixer.sliders[0].noUiSlider.get(),
                              CMY_Mixer.sliders[1].noUiSlider.get(),
                              CMY_Mixer.sliders[2].noUiSlider.get());
	var color = 'rgb(' +
		cmy_as_rgb[0] + ',' +
		cmy_as_rgb[1] + ',' +
		cmy_as_rgb[2] + ')';

	// Fill the color box.
	CMY_Mixer.result.style.background = color;
	CMY_Mixer.result.style.color = color;

  // Set text for labels
  $('#interactive-cmy-mixer-cyan-value').val(CMY_Mixer.sliders[0].noUiSlider.get());
  $('#interactive-cmy-mixer-magenta-value').val(CMY_Mixer.sliders[1].noUiSlider.get());
  $('#interactive-cmy-mixer-yellow-value').val(CMY_Mixer.sliders[2].noUiSlider.get());
}


CMY_Mixer.setColorFromInputBox = function() {
  // Get the input values
  cyan_val = $('#interactive-cmy-mixer-cyan-value').val();
  magenta_val = $('#interactive-cmy-mixer-magenta-value').val();
  yellow_val = $('#interactive-cmy-mixer-yellow-value').val();
	// stick them together.
  var cmy_as_rgb = cmy_to_rgb(cyan_val, magenta_val, yellow_val);

	var color = 'rgb(' +
		cmy_as_rgb[0] + ',' +
		cmy_as_rgb[1] + ',' +
		cmy_as_rgb[2] + ')';

	// Fill the color box.
	CMY_Mixer.result.style.background = color;
	CMY_Mixer.result.style.color = color;

  // Set slider handle position
  CMY_Mixer.sliders[0].noUiSlider.set(cyan_val);
  CMY_Mixer.sliders[1].noUiSlider.set(magenta_val);
  CMY_Mixer.sliders[2].noUiSlider.set(yellow_val);
}

function cmy_to_rgb(c, m, y){
    var
    r = 255 - c,
    g = 255 - m,
    b = 255 - y;
    return [r,g,b];
}

// Taken from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
