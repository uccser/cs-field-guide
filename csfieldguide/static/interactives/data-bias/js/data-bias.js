const noUiSlider = require('nouislider');
const wNumb = require('wnumb');

const COLOURS = ['red', 'lime', 'blue', 'yellow', 'purple', 'darkorange', 'fuchsia', 'deepskyblue'];
const START_TEXT = gettext("Click each dot that you see on the screen, then click 'Next stage' to reveal the answer!");
const MISSED_CIRCLES_TEXT = gettext('You seem to have missed some dots! <br><br>Forced perspective like this can be used in data representation and cause bias in the overall results.');
const SLIDER_TEXT = gettext('Click and drag the slider to change the background colour. <br>What do you notice is happening?')
const SLIDER_MIN = 0;
const SLIDER_MAX = 360;
const PERENTAGE_BOUNDARY_UPPER = 85; // 85%
const PERCENTAGE_ADJUSTMENT = 15; // 15%
const PERENTAGE_BOUNDARY_LOWER = 5; // 5%
const NUM_CIRCLES_TO_ADD = 8; // in addition to the 3 circles created that are the same colour as the background colour
// below dictionary holds the 'H' value of the HSL colours.
// these numbers correspond to the slider value of that colour, e.g blue is at value 240 on the slider.
const SLIDER_COLOUR_VALUES = {
    'red': 0,
    'lime': 120,
    'blue': 240,
    'yellow': 60,
    'purple': 277,
    'darkorange': 33,
    'fuchsia': 300,
    'deepskyblue': 195
}
var firstStage = true;
var bgColourSlider = $('#background-colour-slider');
var sliderStartPos = 0;
var startColour = 'red';


$(document).ready(function() {
    init();
    $('#next-stage').click(loadNextStage);
    $('#start-again').click(restartInteractive);
});


/** 
 * Returns everything to the inital 'page loaded' state.
 */
function init() {
    // get random background colour to start
    startColour = getRandomColour();
    sliderStartPos = SLIDER_COLOUR_VALUES[startColour];
    $('#circles-area').addClass(startColour);
    // make sure we have at least 2 circles that are the same as the background colour
    // a third circle is added later in loadNextStage to make sure the user NEVER finds all of the circles
    createCircle(startColour);
    createCircle(startColour);
    // generate 8 more randomly coloured circles
    for (i=0; i < NUM_CIRCLES_TO_ADD; i++) {
        createCircle();
    }
    $('#next-stage').removeClass('d-none');
    $('#start-again').addClass('d-none');
}


/** 
 * Creates slider that controls background colour.
 */
function createSlider() {
    noUiSlider.create(bgColourSlider[0], {
        start: sliderStartPos,
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
}


/** 
 * Updates background colour when slider is moved.
 */
function updateSlider() {
    var value = bgColourSlider[0].noUiSlider.get();
    hslColour = 'hsl(' + value + ', 100%, 50%)';
    $('#circles-area').css('background', hslColour);
    $('.noUi-handle').css('background', hslColour);
}


/** 
 * Returns a random position in the form of {top: ..., left: ...} to randomly place circles.
 */
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


/** 
 * Creates a circle div and adds it to the page.
 */
function createCircle(colour) {
    var colour =  colour || getRandomColour();
    var $circle = $("<div>").addClass('circle ' + colour);
    $circle.css(getRandomPosition());
    // so overlapping circles don't give away the hidden circles
    // brings non hidden circles up 1 layer
    if (colour !== startColour) {
        $circle.css('z-index', 1);
    }
    $('#circles-area').append($circle);
    $circle.click(function() {
        // toggle glow around clicked circle
        $circle.toggleClass('glow');
    });
}


/** 
 * Loads the next stage which is either revealing the hidden circles or adjusting the background colour with the slider.
 */
function loadNextStage() {
    if (firstStage) {
        // add a sneaky extra circle in the off chance they find all of the hidden circles :P
        // withheld data is also a bias after all
        createCircle(startColour);
        // so the grey fades in
        $('#circles-area').addClass('fade-bg-colour');
        $('#circles-area').removeClass(startColour);
        $('#circles-area').addClass('grey');
        $('#instruction-text').html(MISSED_CIRCLES_TEXT);
        firstStage = false;
    } else {
        createSlider();
        bgColourSlider[0].noUiSlider.on('update', updateSlider);
        $('#instruction-text').html(SLIDER_TEXT);
        $('.circle').removeClass('glow');
        $('#circles-area').removeClass('grey fade-bg-colour');
        $('#circles-area').addClass(startColour);
        $('#next-stage').addClass('d-none');
        $('#start-again').removeClass('d-none');
        $('#background-colour-slider-container').removeClass('d-none');
    }
}


/**
 * Resets the interactive and calls init() to return page to the 'page loaded' state.
 */
function restartInteractive() {
    $('.circle').remove();
    $('#background-colour-slider-container').addClass('d-none');
    firstStage = true;
    $('#instruction-text').html(START_TEXT);
    bgColourSlider[0].noUiSlider.destroy();
    $('#circles-area').removeClass(startColour);
    init();
}


/**
 * Returns a random colour from the COLOURS array.
 */
function getRandomColour() {
    return COLOURS[Math.floor(Math.random() * COLOURS.length)];
}
