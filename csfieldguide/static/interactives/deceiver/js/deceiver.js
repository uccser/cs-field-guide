var Deceiver = {};

$(document).ready(function(){

    $(".interactive-deceiver-button").click(function() {
        var clickedButton = ($(this).html().trim());
        if (clickedButton == deceiver_il8n["odd"]) {
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
    $feedback.stop(true, true).fadeIn(0).html(deceiver_il8n["correct"]).fadeOut(1000);
    Deceiver.score++;
}

function questionIncorrect() {
    var $feedback = $("#interactive-deceiver-feedback");
    $feedback.addClass('interactive-deceiver-wrong');
    $feedback.removeClass('interactive-deceiver-correct');
    $feedback.stop(true, true).fadeIn(0).html(deceiver_il8n["wrong"]).fadeOut(3000);
    endGame();
}

function setupQuestionGame() {
    Deceiver.count = 0;
    Deceiver.maxCount = 3;
    Deceiver.secs = 15;
    Deceiver.score = 0;
    $("#interactive-deceiver-heading").html(deceiver_il8n["heading"]);
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
    $("#interactive-deceiver-timer").html(deceiver_il8n["score"] + Deceiver.score);
    setupQuestionGame();
}

function startGame() {
    $("#interactive-deceiver-start-panel").hide();
    $("#interactive-deceiver-game-buttons").show();
    newQuestion();
    $("#interactive-deceiver-timer").html('<span id="interactive-deceiver-seconds">15</span>' + deceiver_il8n["seconds"]);
    decrementTimer();
}
