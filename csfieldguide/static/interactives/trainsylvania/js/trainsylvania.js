var img_extension = '.png';

var Trainsylvania = {
  'slide_time': 800
};

Trainsylvania.stations = {
  'central' : gettext('Central Station'),
  'city'    : gettext('City Mall Station'),
  'east'    : gettext('East Station'),
  'railington'   : gettext('Railington Station'),
  'midway'  : gettext('Midway Station'),
  'north'   : gettext('North Station'),
  'south'   : gettext('South Station'),
  'suburb'  : gettext('Suburbopolis Station'),
  'west'    : gettext('West Station')
};
Trainsylvania.station_destinations = {
  'central' : {'a': 'city'    ,'b': 'midway'},
  'city'    : {'a': 'west'    ,'b': 'south'},
  'east'    : {'a': 'west'    ,'b': 'railington'},
  'railington'   : {'a': 'city'    ,'b': 'east'},
  'midway'  : {'a': 'north'   ,'b': 'railington'},
  'north'   : {'a': 'central' ,'b': 'suburb'},
  'south'   : {'a': 'city'    ,'b': 'railington'},
  'suburb'  : {'a': 'west'    ,'b': 'central'},
  'west'    : {'a': 'east'    ,'b': 'central'}
};
Trainsylvania.station_start = 'city';
Trainsylvania.station_finish = 'suburb';

$(document).ready(function() {
  // Add images on load to preload for animations
  Trainsylvania.$image_div = $('#interactive-trainsylvania-image-div');
  setup_station_images();
  setup_trainsylvania();

  $('#interactive-trainsylvania-train-a, #interactive-trainsylvania-train-b').on('click', function(){
    travel_on_train(this.id.slice(-1));
  });

  $('#interactive-trainsylvania-reset').on('click', function(){
    setup_trainsylvania();
  });
});

function setup_station_images() {
  var $base_url = $('#interactive-trainsylvania-image-link').attr('href');
  for (var station in Trainsylvania.stations) {
    var station_image_url = $base_url + station + img_extension;
    Trainsylvania.$image_div.prepend($('<img>', {
      class: 'interactive-trainsylvania-image',
      id: 'interactive-trainsylvania-image-' + station,
      src: station_image_url
    }))
  }
}

function travel_on_train(train) {
  $('.interactive-trainsylvania-train-button').prop("disabled", true);

  if (train == 'start') {
    // Reset to start
    var destination = Trainsylvania.station_start;
  } else {
    // Find destination
    var destination = Trainsylvania.station_destinations[Trainsylvania.station_current][train];
  }

  // Slide stations
  if (Trainsylvania.station_current != destination) {
    slide_out_station(Trainsylvania.station_current)
    slide_in_station(destination)

    // Check if at station goal
    if (Trainsylvania.station_current == Trainsylvania.station_finish) {
      $('#interactive-trainsylvania-train-buttons').hide();
      $('#interactive-trainsylvania-train-success').show();
    }
  } else {
    // Re-enable buttons for use
    $('.interactive-trainsylvania-train-button').prop("disabled", false);
  }
}

function slide_in_station(destination) {
  var $image_destination = $('#interactive-trainsylvania-image-' + destination);
  $image_destination.fadeIn({queue: false, duration: Trainsylvania.slide_time * 0.8});
  $image_destination.animate({left: 0}, Trainsylvania.slide_time, function() {
    $('.interactive-trainsylvania-train-button').prop("disabled", false);
  });

  // Set new station as current and update text
  Trainsylvania.station_current = destination;
  $('#interactive-trainsylvania-current-station').html(Trainsylvania.stations[Trainsylvania.station_current]);
}

function slide_out_station(current) {
  var $image_current = $('#interactive-trainsylvania-image-' + Trainsylvania.station_current);
  $image_current.fadeOut({queue: false, duration: Trainsylvania.slide_time * 0.8});
  $image_current.animate({right: '100%'}, Trainsylvania.slide_time, function() {
    $(this).css({left: '100%', right: 0});
  });
}

function setup_trainsylvania() {
  $('#interactive-trainsylvania-train-buttons').show();
  $('#interactive-trainsylvania-train-success').hide();
  travel_on_train('start');
}
