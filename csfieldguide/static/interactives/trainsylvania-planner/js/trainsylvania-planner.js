"use strict";

var Planner = {};

Planner.stations = {
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
Planner.station_destinations = {
    'station-1': { 'A': 'station-2', 'B': 'station-3' },
    'station-2': { 'A': 'station-9', 'B': 'station-4' },
    'station-3': { 'A': 'station-1', 'B': 'station-6' },
    'station-4': { 'A': 'station-1', 'B': 'station-7' },
    'station-5': { 'A': 'station-2', 'B': 'station-4' },
    'station-6': { 'A': 'station-1', 'B': 'station-9' },
    'station-7': { 'A': 'station-8', 'B': 'station-6' },
    'station-8': { 'A': 'station-4', 'B': 'station-5' },
    'station-9': { 'A': 'station-2', 'B': 'station-6' },
};
Planner.station_start = 'station-1';

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
        var d = {
            station_name: Planner.stations[current_station],
        }
        var fmts = gettext('You will end up at %(station_name)s')
        return interpolate(fmts, d, true);
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
