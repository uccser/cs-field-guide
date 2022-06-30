var img_extension = '.svg';

var Trainsylvania = {
  'slide_time': 800
};

Trainsylvania.stations = {
    'station-1': gettext('Station 1: Airport'),
    'station-2': gettext('Station 2: West'),
    'station-3': gettext('Station 3: South'),
    'station-4': gettext('Station 4: Central'),
    'station-5': gettext('Station 5: Harbour'),
    'station-6': gettext('Station 6: Factory'),
    'station-7': gettext('Station 7: Midway'),
    'station-8': gettext('Station 8: North'),
    'station-9': gettext('Station 9: East'),
};
Trainsylvania.station_destinations = {
    'station-1': {'A': 'station-2', 'B': 'station-3'},
    'station-2': {'A': 'station-9', 'B': 'station-4'},
    'station-3': {'A': 'station-1', 'B': 'station-6'},
    'station-4': {'A': 'station-1', 'B': 'station-7'},
    'station-5': {'A': 'station-2', 'B': 'station-4'},
    'station-6': {'A': 'station-1', 'B': 'station-9'},
    'station-7': {'A': 'station-8', 'B': 'station-6'},
    'station-8': {'A': 'station-4', 'B': 'station-5'},
    'station-9': {'A': 'station-2', 'B': 'station-6'},
};
Trainsylvania.station_start = 'station-1';
Trainsylvania.station_finish = 'station-5';

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
   var destination = Trainsylvania.station_destinations[Trainsylvania.station_current][train.toUpperCase()];
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
