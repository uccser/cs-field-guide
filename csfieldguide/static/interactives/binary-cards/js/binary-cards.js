var urlParameters = require('../../../js/third-party/url-parameters.js')
"use strict";
MAX_NUM_CARDS = 16;
DEFAULT_NUM_CARDS_TO_SHOW = 8;

$(document).ready(function () {
    // Settings for interactive
    // Since users can possibly choose the num of cards from an input box,
    // we first load the max possible num of cards so it is easy to hide and re display cards.
    // URL parameter for cards is checked after initial 16 cards have loaded.
    var binaryValueSettings = {
        BASE: Number(urlParameters.getUrlParameter('base')) || 2,
        CARDS: MAX_NUM_CARDS,
        OFFSET: Number(urlParameters.getUrlParameter('offset')) || 0,
        INPUT: urlParameters.getUrlParameter('input') || 'true',
    }

    var showInputBox = (binaryValueSettings.INPUT == 'true');
    // Don't display the input box
    if (!showInputBox) {
        $("#cards-input").addClass('d-none');
    }

    $('#interactive-binary-cards').on('click', '.binary-card', function(event) {
        $(this).toggleClass('flipped');
        updateDotCount();
    });

    // Flip all cards to black
    $('#interactive-binary-cards button#flip-to-black').on('click', function(){
        $('#interactive-binary-cards-container > div.binary-card-container > div.binary-card').addClass('flipped');
        updateDotCount();
    });

    // Flip all cards to white
    $('#interactive-binary-cards button#flip-to-white').on('click', function(){
        $('#interactive-binary-cards-container > div.binary-card-container > div.binary-card').removeClass('flipped');
        updateDotCount();
    });

    // Update number of cards shown based on input
    $('input').change(function() {
        binaryValueSettings.CARDS = $('input')[1].value;
        putCardsWithinLimits(binaryValueSettings.CARDS, showInputBox, binaryValueSettings);
        updateCards(binaryValueSettings.CARDS);
        updateDotCount();
    });

    // Create cards within container and update count
    createCards(binaryValueSettings);
    // Check if digit URL parameter was given and hide appropriate cards if so
    if (Number(urlParameters.getUrlParameter('cards'))) {
        cards = Number(urlParameters.getUrlParameter('cards'));
        putCardsWithinLimits(cards, showInputBox, binaryValueSettings);
        updateCards(binaryValueSettings.CARDS);
    } else {
        // Show default number of cards
        binaryValueSettings.CARDS = DEFAULT_NUM_CARDS_TO_SHOW;
        updateCards(binaryValueSettings.CARDS);
    }
    updateDotCount();
});


// Ensure cards value is between 1 and MAX_NUM_CARDS
function putCardsWithinLimits(cards, showInputBox, binaryValueSettings) {
    if (cards > MAX_NUM_CARDS) {
        binaryValueSettings.CARDS = MAX_NUM_CARDS;
    } else if (cards < 1) {
        binaryValueSettings.CARDS = 1;
    } else {
        binaryValueSettings.CARDS = cards;
    }
    if (showInputBox) {
        $('input')[1].value = binaryValueSettings.CARDS;
    }
}


// Sets up the cards for the interactive
function createCards(settings) {
    var cardContainer = $('#interactive-binary-cards-container');

    var value = Math.pow(settings.BASE, settings.CARDS + settings.OFFSET - 1);
    var starting_sides = urlParameters.getUrlParameter('start') || "";
    // Since we always load max num of cards to begin with we should pad the `start` URL parameter
    // if it contains less than max num values.
    if (starting_sides != "" && starting_sides.length < MAX_NUM_CARDS) {
        var padding_length = MAX_NUM_CARDS - starting_sides.length;
        starting_sides = "W".repeat(padding_length) + starting_sides;
    }

    // Iterate through card values
    for (var digit = 0; digit < settings.CARDS; digit++) {
        cardContainer.append(createCard(value, starting_sides[digit] == 'B'));
        value /= settings.BASE;
    }
};


// Returns the HTML for a card for a given value
function createCard(value, is_black) {
    var cardContainer = $("<div class='binary-card-container visible'></div>");
    var card = $("<div class='binary-card'></div>");
    cardContainer.append(card);
    var front = $("<div class='binary-card-side binary-card-front'></div>");
    front.append(createDots(value));
    var label = $("<div class='binary-card-number'></div>");
    label.html(createCardLabel(value))
    if (value > 9999999) {
      label.addClass('small-text');
    }
    front.append(label);
    card.append(front);
    card.append($("<div class='binary-card-side binary-card-back'></div>"));
    card.data("value", value);
    if (is_black == true) {
        card.addClass('flipped');
    }
    return cardContainer;
};


// Returns a canvas object with the given number of dots drawn on it
function createDots(dots) {
    var canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 120;
    var context = canvas.getContext('2d');
    context.imageSmoothingEnabled = true;

    if (dots < 5000) {
      var sizes = calculateDotGridSize(dots);
      var gridRows = sizes[0] + 1;
      var gridRowWidth = canvas.height / gridRows;
      var gridCols = sizes[1] + 1;
      var gridColWidth = canvas.width / gridCols;
      var dotSize = Math.min(gridRowWidth, gridColWidth) * 0.4;
      var dotStartAngle = Math.PI * 0.5;
      var dotFinishAngle = Math.min(Math.PI * 2, Math.PI * 2 * dots) + dotStartAngle;
      for (var row = 1; row < gridRows; row++) {
          for (var col = 1; col < gridCols; col++) {
              context.beginPath();
              context.arc(col * gridColWidth, row * gridRowWidth, dotSize, dotStartAngle, dotFinishAngle, false);
              if (dots < 1) {
                  context.lineTo(col * gridColWidth, row * gridRowWidth);
              }
              context.closePath();
              context.fill();
          }
      }
    } else {
      var gradient_circle_size = canvas.width / 2
      var gradient = context.createRadialGradient(
          gradient_circle_size,
          gradient_circle_size,
          gradient_circle_size * 5,
          gradient_circle_size,
          gradient_circle_size,
          10
      );
      gradient.addColorStop(0, "white");
      gradient.addColorStop(1, "black");
      context.fillStyle = gradient;
      context.fillRect(1, 1, canvas.width - 4, canvas.height - 4);
    }
    return canvas;
};


// Returns the HTML for the card label to represent a given
// value. Decimals are represented as fractions.
function createCardLabel(value) {
    var label;
    if (value < 1) {
        label = '<sup>1</sup>&frasl;<sub>' + (1 / value).toLocaleString() + '</sub>';
    } else {
        label = value.toLocaleString();
    }
    return label
}


// Returns an array containing the [rows, columns]
// to optimally display the grid of dots for the given
// given number of dots
function calculateDotGridSize(dots) {
    var sizes;
    if (dots >= 2) {
        var factors = [];
        for (var i = 1; i <= Math.floor(Math.sqrt(dots)); i += 1) {
            if (dots % i === 0) {
                factors.push(i);
                if (dots / i !== i) {
                    factors.push(dots / i);
                }
            }
        }
        factors.sort(function(a, b){return a - b;});  // numeric sort
        var middleArrayIndex = factors.length / 2;

        if (middleArrayIndex % 1) {
            sizes = new Array(factors[middleArrayIndex - 0.5], factors[middleArrayIndex - 0.5]);
        } else {
            sizes = new Array(factors[middleArrayIndex], factors[middleArrayIndex - 1]);
        }
    } else {
        sizes = [1, 1];
    }
    return sizes;
};


// Counts the number of dots on the cards
function updateDotCount() {
    var dotCount = 0;
    $('#interactive-binary-cards-container').children().each(function(cardPosition, card) {
        var card = $(card.children[0]);
        if (!card.hasClass('flipped') && !card.parent().hasClass('d-none')) {
            dotCount += card.data("value");
        }
    });

    var dotText = $('#dot-decimal-count');
    var format = ngettext('1 dot is visible', '%(dot_count)s dots are visible', dotCount);
    var dotCountText = interpolate(format, {"dot_count": dotCount}, true);
    dotText.html(dotCountText);
};


// Change the number of cards shown
function updateCards(num_cards_to_show) {
    // mapping of card to child number in DOM tree
    // 16th card (2^15) is the first child, 15th card (2^14) is the second and so on..
    var card_num_to_child_num = {
        16: 1,
        15: 2,
        14: 3,
        13: 4,
        12: 5,
        11: 6,
        10: 7,
        9: 8,
        8: 9,
        7: 10,
        6: 11,
        5: 12,
        4: 13,
        3: 14,
        2: 15,
        1: 16,
    };
    num_current_cards_shown = $('#interactive-binary-cards-container div.visible').length;
    difference = Math.abs(num_current_cards_shown - num_cards_to_show);
    if (num_current_cards_shown > num_cards_to_show) {
        // hide cards
        for (i=0; i<difference; i++) {
            child_num = card_num_to_child_num[num_current_cards_shown - i]
            element = $('#interactive-binary-cards-container > div:nth-child(' + child_num + ')');
            element.removeClass('visible').addClass('d-none');
        }
    } else if (num_current_cards_shown < num_cards_to_show) {
        // show more cards
        for (i=1; i<=difference; i++) {
            child_num = card_num_to_child_num[num_current_cards_shown + i]
            element = $('#interactive-binary-cards-container > div:nth-child(' + child_num + ')');
            element.removeClass('d-none').addClass('visible');
        }
    }
}
