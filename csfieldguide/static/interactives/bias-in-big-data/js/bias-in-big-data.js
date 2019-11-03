const noUiSlider = require('nouislider');
const wNumb = require('wnumb');

const COLOURS = ['red', 'lime', 'blue', 'yellow', 'purple', 'darkorange', 'fuchsia', 'aquamarine', 'deeppink'];
const START_TEXT = gettext("Click each dot that you see on the screen, then click 'Next stage' to reveal the answer!");
const MISSED_CIRCLES_TEXT = gettext('You seem to have missed some dots! Forced perspective like this can be used in data representation and cause bias in the overall results.');
const SLIDER_TEXT = gettext('Click and drag the slider to change background colour. What do you notice is happening?')
const SLIDER_MIN = 0;
const SLIDER_MAX = 360;
const PERENTAGE_BOUNDARY_UPPER = 95; // 95%
const PERCENTAGE_ADJUSTMENT = 5; // 5%
const PERENTAGE_BOUNDARY_LOWER = 5; // 5%
var count = 0;
var firstStage = true;
var bgColourSlider = $('#background-colour-slider');

$(document).ready(function() {
    init();
    createSlider();
    $('#next-stage').click(loadNextStage);
    $('#start-again').click(restartInteractive);
});

function init() {
    // randomly set position of 3 red circles already created.
    $('.circle').each(function() {
        $(this).css(getRandomPosition());
    });
    for (i=0; i < 8; i++) {
        createCircle();
    }
    $('.circle').removeClass('d-none');
    $('#count').text(count).removeClass('d-none');
    $('.circle').click(function() {
        count += 1;
        $('#count').text(count);
        // add glow around clicked circle
        $(this).addClass('glow');
    });
    $('#next-stage').removeClass('d-none');
    $('#start-again').addClass('d-none');
}

function createSlider() {
    noUiSlider.create(bgColourSlider[0], {
        start: 0,
        step: 1,
        connect: "lower",
        orientation: "horizontal",
        range: {
          'min': SLIDER_MIN,
          'max': SLIDER_MAX
        },
        format: wNumb({
          decimals: 0
        })
    });
    bgColourSlider[0].noUiSlider.on('update', function() {
        var value = bgColourSlider[0].noUiSlider.get();
        hslColour = 'hsl(' + value + ', 100%, 50%)';
        $('#circles-area').css('background-color', hslColour);
        $('.noUi-handle').css('background-color', hslColour);
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

    // reduces or increases percentage by 5% to prevent circles going outside of parent
    if (heightInPercentage >= PERENTAGE_BOUNDARY_UPPER) {
        heightInPercentage -= PERCENTAGE_ADJUSTMENT;
    } else if (heightInPercentage <= PERENTAGE_BOUNDARY_LOWER) {
        heightInPercentage += PERCENTAGE_ADJUSTMENT
    }
    if (widthInPercentage >= PERENTAGE_BOUNDARY_UPPER) {
        widthInPercentage -= PERCENTAGE_ADJUSTMENT;
    } else if (widthInPercentage <= PERENTAGE_BOUNDARY_LOWER) {
        widthInPercentage += PERCENTAGE_ADJUSTMENT;
    }

    return {
        top: heightInPercentage + '%',
        left: widthInPercentage + '%'
    };
}

function createCircle() {
    var colour =  COLOURS[Math.floor(Math.random() * COLOURS.length)];
    var $circle = $("<div>").addClass('circle dynamic d-none ' + colour);
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
        $('.circle').removeClass('glow');
        $('#circles-area').css('background-color', 'red');
        $('#next-stage').addClass('d-none');
        $('#start-again').removeClass('d-none');
        bgColourSlider.removeClass('d-none');
        // disable click event for circles
        $('.circle').off('click');
        $('#count').addClass('d-none');
    }
}

function restartInteractive() {
    $('.circle.dynamic').remove();
    bgColourSlider.addClass('d-none');
    $('.noUi-handle').css('background-color', 'red');
    bgColourSlider[0].noUiSlider.set(0);
    firstStage = true;
    count = 0;
    $('#instruction-text').text(START_TEXT);
    init();
    $('#circles-area').css('background-color', 'red');
}
