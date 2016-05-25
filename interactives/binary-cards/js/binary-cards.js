"use strict";

$(document).ready(function () {
    // Settings for interactive
    var binaryValueSettings = {
        LOWEST_CARD_VALUE: 1,
        HIGHEST_CARD_VALUE: 128,
    }

    $('#interactive-binary-cards').on('click', '.binary-card', function(event) {
        $(this).toggleClass('flipped');
        updateDotCount();
    });

    // Create cards within container
    createCards(binaryValueSettings);
    updateDotCount();
});

// Sets up the cards for the interactive
function createCards(binaryValueSettings) {
    var cardContainer = $('#interactive-binary-cards-container');

    // Iterate through card values
    for (var i = binaryValueSettings.HIGHEST_CARD_VALUE; i >= binaryValueSettings.LOWEST_CARD_VALUE; i /= 2) {
        cardContainer.append(createCard(i));
    }
};

function createCard(value) {
    var cardContainer = $("<div class='binary-card-container'></div>");
    var card = $("<div class='binary-card'></div>");
    cardContainer.append(card);
    card.append($("<div class='binary-card-side binary-card-front'>" + value + "</div>"))
    card.append($("<div class='binary-card-side binary-card-back'></div>"))
    card.data("value", value);
    return cardContainer;
};

// Counts the number of dots on the cards
function updateDotCount() {
    var dotCount = 0;
    $('#interactive-binary-cards-container').children().each(function(cardPosition, card) {
        var card = $(card.children[0]);
        if (!card.hasClass('flipped')) {
            dotCount += card.data("value");
        }
    });

    var dotText = $('#dot-decimal-count');
    if (dotCount == 1) {
        dotText.html('1 dot is visible');
    } else {
        dotText.html(dotCount + ' dots are visible');
    }
};
