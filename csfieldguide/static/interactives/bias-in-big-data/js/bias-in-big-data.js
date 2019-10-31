const noUiSlider = require('nouislider');
const wNumb = require('wnumb');

const COLOURS = ['red', 'green', 'blue', 'yellow', 'purple', 'white', 'black', 'lime', 'darkorange', 'fuchsia'];
const MANIPULATE_BOUNDARY = 10; // reduce by 10%
const MISSED_CIRCLES_TEXT = gettext('You seem to have missed some dots! Forced perspective like this can be used in data representation and cause bias in the overall results.');
const SLIDER_TEXT = gettext('Click and drag the slider to change background colour. What do you notice is happening?')
const SLIDER_MIN = 0;
const SLIDER_MAX = 255;
var count = 0;
var firstStage = true;

$(document).ready(function() {
    // randomly set position of 3 black circles already created.
    $('.circle').each(function() {
        $(this).css(getRandomPosition());
    });
    $('#circles-area').css('background-color', 'black');
    for (i=0; i < 8; i++) {
        createCircle();
    }
    $('.circle').removeClass('d-none');
    $('.circle').click(function() {
        count += 1;
        $('#count').text(count);
        // make clicked circle white
        $(this).addClass('glow');
    })
    createSlider();
    $('#next-stage').click(loadNextStage);
});

function createSlider() {
    var bgColourSlider = $('#background-colour-slider');
    noUiSlider.create(bgColourSlider[0], {
        start: Math.floor(Math.random() * SLIDER_MAX),
        step: 1,
        connect: "lower",
        orientation: "horizontal",
        range: {
          'min': SLIDER_MIN,
          'max': SLIDER_MAX
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
    bgColourSlider[0].noUiSlider.on('update', function() {
        var value = bgColourSlider[0].noUiSlider.get();
        var hexValue = value.toString(16);
    });
}

function getRandomPosition() {
    var circlesAreaHeight = $('#circles-area').height();
    var circlesAreaWidth = $('#circles-area').width();
    var randHeight = Math.floor((Math.random() * circlesAreaHeight));
    var randWidth = Math.floor((Math.random() * circlesAreaWidth));

    // convert px to %
    heightInPercentage = Math.floor((randHeight / circlesAreaHeight) * 100);
    widthInPercentage = Math.floor((randWidth / circlesAreaWidth) * 100);

    // reduces percentage by 6% to prevent circles going outside of parent
    if (heightInPercentage >= 95) {
        heightInPercentage -= 6;
    }
    if (widthInPercentage >= 95) {
        widthInPercentage -= 6;
    }

    return {
        top: heightInPercentage + '%',
        left: widthInPercentage + '%'
    };
}

function createCircle() {
    var colour =  COLOURS[Math.floor(Math.random() * COLOURS.length)];
    var $circle = $("<div>").addClass('circle d-none ' + colour);
    $circle.css(getRandomPosition());
    $('#circles-area').append($circle);
}

function loadNextStage() {
    if (firstStage) {
        // what happens if they haven't missed any circles?
        $('#circles-area').css('background-color', 'grey');
        $('#instruction-text').text(MISSED_CIRCLES_TEXT);
        firstStage = false;
    } else {
        $('#instruction-text').text(SLIDER_TEXT);
        $('#background-colour-slider').removeClass('d-none');
    }
}
