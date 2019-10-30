const COLOURS = ['red', 'green', 'blue', 'yellow', 'purple', 'white', 'black', 'lime', 'darkorange', 'fuchsia'];
const CIRCLE_RADIUS = 25; // 25 pixels
const missedCirclesText = gettext('You seem to have missed some dots! Forced perspective like this can be used in data representation and cause bias in the overall results.');
var count = 0;
var firstStage = true;

$(document).ready(function() {
    // randomly set position of 3 black circles already created.
    $('.circle').offset(getRandomPosition());
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
    $('#next-stage').click(loadNextStage);
});

function getRandomPosition() {
    // minus CIRCLE_RADIUS so the middle of the circle doesn't get put on the edge of the container
    var circlesAreaWidth = $('#circles-area').width() - CIRCLE_RADIUS;
    var circlesAreaHeight = $('#circles-area').height() - CIRCLE_RADIUS;
    var randWidth = Math.floor((Math.random() * circlesAreaWidth))
    var randHeight = Math.floor((Math.random() * circlesAreaHeight))

    return {
        top: randHeight,
        left: randWidth
    };
}

function createCircle() {
    var colour =  COLOURS[Math.floor(Math.random() * COLOURS.length)];
    var $circle = $("<div>").addClass('circle d-none ' + colour);
    $circle.offset(getRandomPosition());
    $('#circles-area').append($circle);
}

function loadNextStage() {
    if (firstStage) {
        // what happens if they haven't missed any circles?
        $('#circles-area').css('background-color', 'grey');
        $('#instruction-text').text(missedCirclesText);
    }
}
