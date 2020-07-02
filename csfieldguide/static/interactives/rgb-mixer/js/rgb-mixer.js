// Adapted from http://refreshless.com/nouislider/examples/#section-colorpicker

var urlParameters = require('../../../js/third-party/url-parameters.js')
const noUiSlider = require('nouislider');
const wNumb = require('wnumb');

RGB_Mixer = {};

$(document).ready(function () {
  RGB_Mixer.minimum = 0
  RGB_Mixer.maximum = 255

  RGB_Mixer.sliders = document.getElementsByClassName('interactive-rgb-mixer-slider');
  RGB_Mixer.result = document.getElementById('interactive-rgb-mixer-result');

  for ( var i = 0; i < RGB_Mixer.sliders.length; i++ ) {
    noUiSlider.create(RGB_Mixer.sliders[i], {
      start: Math.floor(Math.random() * RGB_Mixer.maximum),
      step: 1,
      connect: "lower",
      orientation: "horizontal",
      range: {
        'min': RGB_Mixer.minimum,
        'max': RGB_Mixer.maximum
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

  $('#interactive-rgb-mixer-red-value').on('input', RGB_Mixer.setColorFromInputBox);
  $('#interactive-rgb-mixer-green-value').on('input', RGB_Mixer.setColorFromInputBox);
  $('#interactive-rgb-mixer-blue-value').on('input', RGB_Mixer.setColorFromInputBox);

  // Bind the color changing function
  // to the update event. Fires immediately so has to be outside for-loop.
  RGB_Mixer.sliders[0].noUiSlider.on('update', RGB_Mixer.setColor);
  RGB_Mixer.sliders[1].noUiSlider.on('update', RGB_Mixer.setColor);
  RGB_Mixer.sliders[2].noUiSlider.on('update', RGB_Mixer.setColor);
  // Update display
  RGB_Mixer.setColor();
});


RGB_Mixer.setColor = function(){
	// Get the slider values,
	// stick them together.
	var color = 'rgb(' +
		RGB_Mixer.sliders[0].noUiSlider.get() + ',' +
		RGB_Mixer.sliders[1].noUiSlider.get() + ',' +
		RGB_Mixer.sliders[2].noUiSlider.get() + ')';

	// Fill the color box.
	RGB_Mixer.result.style.background = color;
	RGB_Mixer.result.style.color = color;

  // Set text for labels
  $('#interactive-rgb-mixer-red-value').val(RGB_Mixer.sliders[0].noUiSlider.get());
  $('#interactive-rgb-mixer-green-value').val(RGB_Mixer.sliders[1].noUiSlider.get());
  $('#interactive-rgb-mixer-blue-value').val(RGB_Mixer.sliders[2].noUiSlider.get());
};

RGB_Mixer.setColorFromInputBox = function(){
  // Get the slider values,
  red_val = $('#interactive-rgb-mixer-red-value').val();
  green_val = $('#interactive-rgb-mixer-green-value').val();
  blue_val = $('#interactive-rgb-mixer-blue-value').val();
	// stick them together.
	var color = 'rgb(' + red_val + ',' + green_val + ',' + blue_val + ')';

	// Fill the color box.
	RGB_Mixer.result.style.background = color;
	RGB_Mixer.result.style.color = color;

  // Set slider handle position
  RGB_Mixer.sliders[0].noUiSlider.set(red_val);
  RGB_Mixer.sliders[1].noUiSlider.set(green_val);
  RGB_Mixer.sliders[2].noUiSlider.set(blue_val);
};
