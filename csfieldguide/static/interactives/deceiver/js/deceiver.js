var Deceiver = {};

$(document).ready(function(){

    $(".interactive-deceiver-button").click(function() {
        var clickedButton = ($(this).html().trim());
        if (clickedButton == gettext('Odd')) {
            if (Deceiver.number % 2 == 1) {
                questionCorrect();
                checkButtons();
            } else {
                questionIncorrect();
            }
        } else {
            if (Deceiver.number % 2 == 1) {
                questionIncorrect();
            } else {
                questionCorrect();
                checkButtons();
            }
        }
    });

    $("#interactive-deceiver-start-button").click(function(){
        startGame();
    });

    setupQuestionGame();
});

function questionCorrect() {
    var $feedback = $("#interactive-deceiver-feedback");
    $feedback.addClass('interactive-deceiver-correct');
    $feedback.removeClass('interactive-deceiver-wrong');
    $feedback.stop(true, true).fadeIn(0).html(gettext('CORRECT')).fadeOut(1000);
    Deceiver.score++;
}

function questionIncorrect() {
    var $feedback = $("#interactive-deceiver-feedback");
    $feedback.addClass('interactive-deceiver-wrong');
    $feedback.removeClass('interactive-deceiver-correct');
    $feedback.stop(true, true).fadeIn(0).html(gettext('WRONG')).fadeOut(3000);
    endGame();
}

function setupQuestionGame() {
    Deceiver.count = 0;
    Deceiver.maxCount = 3;
    Deceiver.secs = 15;
    Deceiver.score = 0;
    $("#interactive-deceiver-heading").html(gettext('Answer as many questions as you can'));
    $("#interactive-deceiver-start-panel").show();
    $("#interactive-deceiver-game-buttons").hide();
    resetButtonCounter();
}

function newQuestion() {
    Deceiver.number = Math.floor((Math.random()*100)+1);
    $("#interactive-deceiver-heading").html(Deceiver.number);
}

function checkButtons() {
    Deceiver.count++
    if (Deceiver.count == Deceiver.maxCount) {
        switchButtons();
        resetButtonCounter();
    }
    newQuestion();
}

function resetButtonCounter() {
    Deceiver.maxCount = Math.floor((Math.random()*3)+2);
    Deceiver.count = 0;
}

function switchButtons() {
    var $buttonLeft = $("#interactive-deceiver-button-left");
    var $buttonRight = $("#interactive-deceiver-button-right");
    var temp = $buttonRight.html();
    $buttonRight.html($buttonLeft.html());
    $buttonLeft.html(temp);
}

function decrementTimer() {
    var $seconds = $("#interactive-deceiver-seconds");
    $seconds.html(Deceiver.secs);
    Deceiver.secs--;
    if (Deceiver.secs >= 0) {
        Deceiver.timer = setTimeout(decrementTimer,1000);
    } else {
        endGame();
    }
}

function endGame() {
    clearTimeout(Deceiver.timer);
    format = gettext('Score: %(score)s');
    score_text = interpolate(format, {"score": Deceiver.score}, true);
    $("#interactive-deceiver-timer").html(score_text);
    setupQuestionGame();
}

function startGame() {
    $("#interactive-deceiver-start-panel").hide();
    $("#interactive-deceiver-game-buttons").show();
    newQuestion();
    $("#interactive-deceiver-timer").html(gettext('<span id="interactive-deceiver-seconds">15</span> seconds left'));
    decrementTimer();
}
