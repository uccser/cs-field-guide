"use strict";

var Planner = {};

Planner.stations = {
    'central' : gettext('Central Station'),
    'airport' : gettext('Airport Station'),
    'east'    : gettext('East Station'),
    'factory' : gettext('Factory Station'),
    'midway'  : gettext('Midway Station'),
    'north'   : gettext('North Station'),
    'south'   : gettext('South Station'),
    'harbour' : gettext('Harbour Station'),
    'west'    : gettext('West Station')
};
Planner.station_destinations = {
    'central' : {'A': 'airport' ,'B': 'midway'},
    'airport' : {'A': 'west'    ,'B': 'south'},
    'east'    : {'A': 'west'    ,'B': 'factory'},
    'factory' : {'A': 'airport' ,'B': 'east'},
    'midway'  : {'A': 'north'   ,'B': 'factory'},
    'north'   : {'A': 'central' ,'B': 'harbour'},
    'south'   : {'A': 'airport' ,'B': 'factory'},
    'harbour' : {'A': 'west'    ,'B': 'central'},
    'west'    : {'A': 'east'    ,'B': 'central'}
};
Planner.station_start = 'airport';

$(document).ready(function() {
  $('#interactive-trainsylvania-planner-input').on('change paste keyup', function() {
    updatePlannerResult();
  });
  updatePlannerResult();
});

function updatePlannerResult() {
    var trains = $('#interactive-trainsylvania-planner-input').val().toUpperCase();
    var result = $('#interactive-trainsylvania-planner-result');
    result.removeClass('error');
    result.html(travelOnTrain(Planner.station_start, trains, 1));
};

function travelOnTrain(current_station, trains_to_ride, trip_number) {
    if (trains_to_ride == '') {
        return gettext('You will end up at') + ' <strong>' + Planner.stations[current_station] + '</strong>.';
    } else {
        var train_to_ride = trains_to_ride[0].toUpperCase();
        if (train_to_ride in Planner.station_destinations[current_station]) {
            current_station = Planner.station_destinations[current_station][train_to_ride];
            return travelOnTrain(current_station, trains_to_ride.substring(1), trip_number + 1);
        } else {
            $('#interactive-trainsylvania-planner-result').addClass('error');
            var d = {
              station: Planner.stations[current_station],
              train: train_to_ride,
              trip: trip_number
            }
            var fmts = gettext('%(station)s has no %(train)s train for ride number %(trip)s!')
            return interpolate(fmts, d, true);
        }
    }
};
