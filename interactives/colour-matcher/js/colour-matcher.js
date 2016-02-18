ColourMatcher = {};

$(document).ready(function () {
  ColourMatcher.goal_panel = document.getElementById('interactive-colour-matcher-goal');
  ColourMatcher.help_stage = 0;

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
      }),
      pips: {
        mode: 'count',
    		values: 9,
    		density: 3,
		    stepped: true
    	}
    });

    // Bind the color changing function to the slide event.
    ColourMatcher.bit_24.sliders[i].noUiSlider.on('slide', update24BitPanel);
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

    // Bind the color changing function to the slide event.
    ColourMatcher.bit_8.sliders[i].noUiSlider.on('slide', update8BitPanel);
  }

  reset();

  // If help button triggered
  $("#interactive-colour-matcher-help").click(function(){
    if (ColourMatcher.help_stage < 3) {
      ColourMatcher.bit_24.sliders[ColourMatcher.help_stage].noUiSlider.set(ColourMatcher.goal_colour[ColourMatcher.help_stage]);
      ColourMatcher.bit_24.sliders[ColourMatcher.help_stage].setAttribute('disabled', true);
      ColourMatcher.help_stage++;
    }
    if (ColourMatcher.help_stage == 3) {
      $("#interactive-colour-matcher-help").addClass('disabled');
    }
    update24BitPanel();
  });

  // If reset button triggered
  $("#interactive-colour-matcher-reset").click(function(){
    reset();
  });

});

function reset() {
  setGoalPanel();
  set24BitPanel();
  update24BitPanel();
  set8BitPanel();
  update8BitPanel();
  $("#interactive-colour-matcher-help").removeClass('disabled');
  // Reset help stages
  ColourMatcher.help_stage = 0;
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
  // Setup colours for goal panel
  ColourMatcher.goal_colour = [Math.floor(Math.random() * 256),
                               Math.floor(Math.random() * 256),
                               Math.floor(Math.random() * 256)];

  // Update goal panel
  ColourMatcher.goal_panel.style.background = toRGBString(ColourMatcher.goal_colour, 24)
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

  // Set text for labels
  for (var i = 0; i < ColourMatcher.bit_24.value_labels.length; i++) {
    ColourMatcher.bit_24.value_labels[i].innerHTML = colours[i];
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

  // Set text for labels
  for (var i = 0; i < ColourMatcher.bit_8.value_labels.length; i++) {
    ColourMatcher.bit_8.value_labels[i].innerHTML = colours[i];
  }

  // Update 8 bit panel
  ColourMatcher.bit_8.result.style.background = toRGBString(colours, 8)
};
