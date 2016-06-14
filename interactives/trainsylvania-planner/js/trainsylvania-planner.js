"use strict";

var Planner = {};

Planner.stations = {
  'central'   : 'Central Station',
  'city'      : 'City Mall Station',
  'east'      : 'East Station',
  'railington': 'Railington Station',
  'midway'    : 'Midway Station',
  'north'     : 'North Station',
  'south'     : 'South Station',
  'suburb'    : 'Suburbopolis Station',
  'west'      : 'West Station'
};
Planner.station_destinations = {
  'central'   : {'a': 'city'    ,'b': 'midway'},
  'city'      : {'a': 'west'    ,'b': 'south'},
  'east'      : {'a': 'west'    ,'b': 'railington'},
  'railington': {'a': 'city'    ,'b': 'east'},
  'midway'    : {'a': 'north'   ,'b': 'railington'},
  'north'     : {'a': 'central' ,'b': 'suburb'},
  'south'     : {'a': 'city'    ,'b': 'railington'},
  'suburb'    : {'a': 'west'    ,'b': 'central'},
  'west'      : {'a': 'east'    ,'b': 'central'}
};
Planner.station_start = 'city';

$(document).ready(function() {
  $('#interactive-trainsylvania-planner-input').on('change paste keyup', function() {
    updatePlannerResult();
  });
  updatePlannerResult();
});

function updatePlannerResult() {
    var trains = $('#interactive-trainsylvania-planner-input').val();
    var result = $('#interactive-trainsylvania-planner-result');
    result.removeClass('error');
    result.html(travelOnTrain(Planner.station_start, trains, 1));
};

function travelOnTrain(current_station, trains_to_ride, trip_number) {
    if (trains_to_ride == '') {
        return 'You will end up in <strong>' + Planner.stations[current_station] + '</strong>.';
    } else {
        var train_to_ride = trains_to_ride[0];
        if (train_to_ride in Planner.station_destinations[current_station]) {
            current_station = Planner.station_destinations[current_station][train_to_ride];
            return travelOnTrain(current_station, trains_to_ride.substring(1), trip_number + 1);
        } else {
            $('#interactive-trainsylvania-planner-result').addClass('error');
            return Planner.stations[current_station] + ' has no ' + train_to_ride + ' train for ride number ' + trip_number;
        }
    }
};
