var urlParameters = require('../../../js/third-party/url-parameters.js')
"use strict";

$(document).ready(function () {
    // Settings for interactive
    var binaryValueSettings = {
        BASE: Number(urlParameters.getUrlParameter('base')) || 2,
        DIGITS: Number(urlParameters.getUrlParameter('digits')) || 8,
        OFFSET: Number(urlParameters.getUrlParameter('offset')) || 0
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

    // Create cards within container and update count
    createCards(binaryValueSettings);
    updateDotCount();
});


// Sets up the cards for the interactive
function createCards(settings) {
    var cardContainer = $('#interactive-binary-cards-container');

    var value = Math.pow(settings.BASE, settings.DIGITS + settings.OFFSET - 1);
    var starting_sides = urlParameters.getUrlParameter('start') || "";

    // Iterate through card values
    for (var digit = 0; digit < settings.DIGITS; digit++) {
        cardContainer.append(createCard(value, starting_sides[digit] == 'B'));
        value /= settings.BASE;
    }
};


// Returns the HTML for a card for a given value
function createCard(value, is_black) {
    var cardContainer = $("<div class='binary-card-container'></div>");
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
        if (!card.hasClass('flipped')) {
            dotCount += card.data("value");
        }
    });

    var dotText = $('#dot-decimal-count');
    var format = ngettext('1 dot is visible', '%(dot_count)s dots are visible', dotCount);
    var dotCountText = interpolate(format, {"dot_count": dotCount}, true);
    dotText.html(dotCountText);
};
