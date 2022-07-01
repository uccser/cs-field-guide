var urlParameters = require("../../../js/third-party/url-parameters.js")
"use strict";
const MAX_NUM_CARDS = 333;
const MIN_NUM_CARDS = 1;
const DEFAULT_NUM_CARDS_TO_SHOW = 8;
const EXPONENTIAL_THRESHOLD = 11;
var numberOfCards = DEFAULT_NUM_CARDS_TO_SHOW;
var currentCards = 0;
var allCardsContainerElement;
var cardsInputElement;
var cardsHelpElement;
var cardSideValues = [];
var binaryCardsSettings = {};

$(document).ready(function () {
    // Load values from URL parameters
    binaryCardsSettings.BASE = Number(urlParameters.getUrlParameter("base")) || 2;
    binaryCardsSettings.OFFSET = Number(urlParameters.getUrlParameter("offset")) || 0;
    binaryCardsSettings.INPUT = urlParameters.getUrlParameter("input") || true;
    binaryCardsSettings.TOTAL_COUNT = urlParameters.getUrlParameter("total") || true;
    var parameterNumberOfCards = Number(urlParameters.getUrlParameter("cards") || urlParameters.getUrlParameter("digits"));
    var startingSides = urlParameters.getUrlParameter("start") || "";
    const hide_ui = urlParameters.getUrlParameter("hide-ui") || true;
    const rtl = urlParameters.getUrlParameter("rtl") || false;

    // Set data and interactive
    allCardsContainerElement = document.getElementById("interactive-binary-cards-container");
    cardsInputElement = document.getElementById("cards-to-show");
    cardsHelpElement = document.getElementById("cards-to-show-help");
    setCardsValue(parameterNumberOfCards);
    cardsInputElement.setAttribute("min", MIN_NUM_CARDS);
    cardsInputElement.setAttribute("max", MAX_NUM_CARDS);

    // Load face values array, including any defined in start parameter
    // Trim start of parameter if too long
    if (startingSides.length > MAX_NUM_CARDS) {
        startingSides = startingSides.substring(MAX_NUM_CARDS - startingSides.length)
    }
    var paddingAmount = MAX_NUM_CARDS - startingSides.length;
    cardSideValues = Array.from("W".repeat(paddingAmount) + startingSides)

    // Hide elements if required
    // Checks for string version of false so invalid values stay are default.
    if (binaryCardsSettings.INPUT == "false") {
        $("#cards-input").addClass("d-none");
    }
    if (binaryCardsSettings.TOTAL_COUNT == "false") {
        $("#cards-total").addClass("d-none");
        $("#dot-decimal-count").addClass("d-none");
    }
    if (rtl == "true") {
        allCardsContainerElement.style.justifyContent = "flex-end";
        document.getElementById("dot-decimal-count").style.textAlign = "right";
    }
    if (hide_ui == "true") {
        document.getElementById("interactive-binary-cards-title").style.display = "none";
        document.getElementById("interactive-options").style.display = "none";
    }

    $("#interactive-binary-cards").on("click", ".binary-card", function() {
        $(this).toggleClass("flipped");
        updateDotCount();
    });

    // Flip all cards to black
    $("#interactive-binary-cards button#flip-to-black").on("click", function() {
        $("#interactive-binary-cards-container > div.binary-card-container > div.binary-card").addClass("flipped");
        updateDotCount();
    });

    // Flip all cards to white
    $("#interactive-binary-cards button#flip-to-white").on("click", function(){
        $("#interactive-binary-cards-container > div.binary-card-container > div.binary-card").removeClass("flipped");
        updateDotCount();
    });

    // Set event handler for input box
    // Does nothing if input ends up blank (allowing backspace)
    cardsInputElement.addEventListener('input', function () {
        if (this.value) {
            setCardsValue(parseInt(this.value));
            updateCards();
            updateDotCount();
        }
    });

    // Set event handler for total checkbox
    document.getElementById("card-total-show").addEventListener('change', function () {
        if (this.checked) {
            document.getElementById("dot-decimal-count").classList.remove("d-none");
        } else {
            document.getElementById("dot-decimal-count").classList.add("d-none");
        }
    });

    // Create cards within container and update count
    updateCards();
    updateDotCount();
});


// Ensure cards value is between MIN_NUM_CARDS and MAX_NUM_CARDS
function setCardsValue(cardsValue) {
    if (Number.isInteger(cardsValue) && cardsValue >= MIN_NUM_CARDS && cardsValue <= MAX_NUM_CARDS) {
        binaryCardsSettings.CARDS = cardsValue;
    } else if (currentCards != 0) {
        cardsHelpElement.classList.remove('d-none');
        binaryCardsSettings.CARDS = currentCards;
    } else {
        binaryCardsSettings.CARDS = DEFAULT_NUM_CARDS_TO_SHOW;
    }
    cardsInputElement.value = binaryCardsSettings.CARDS;
}


// Sets the correct number of cards for the interactive
function updateCards() {

    var cardDifference = binaryCardsSettings.CARDS - currentCards;
    if (cardDifference > 0) {
        // Cards need to be added
        for (var cardPlace = currentCards + 1; cardPlace <= binaryCardsSettings.CARDS; cardPlace++) {
            createCard(cardPlace);
        }
    } else if (cardDifference < 0) {
        // Cards need to be deleted
        for (var cardPlace = currentCards; cardPlace > binaryCardsSettings.CARDS; cardPlace--) {
            var card = allCardsContainerElement.firstChild;
            // Get card face
            var cardFaceValue = card.firstChild.classList.contains("flipped") ? "B" : "W";
            // Set card face in array
            setPlaceFace(cardPlace, cardFaceValue);
            // Delete element
            allCardsContainerElement.removeChild(card);
        }
    }
    currentCards = binaryCardsSettings.CARDS;
};


// Returns the HTML for a card for a given value
function createCard(place) {

    var cardValue = getPlaceValue(place);

    var cardContainer = document.createElement("div");
    cardContainer.classList.add("binary-card-container", "visible");
    var card = document.createElement("div");
    card.classList.add('binary-card');
    cardContainer.append(card);

    var front = document.createElement("div");
    front.classList.add("binary-card-side", "binary-card-front");
    front.append(getDots(cardValue), getCardLabel(cardValue));
    card.append(front);

    var back = document.createElement("div");
    back.classList.add("binary-card-side", "binary-card-back");
    card.append(back);

    card.dataset.value = cardValue;
    card.dataset.place = place;

    if (getPlaceFace(place) == "B") {
        card.classList.add("flipped");
    }

    // Add to start of all cards as cards are ordered in reverse
    allCardsContainerElement.prepend(cardContainer);
};


// Returns a canvas object with the given number of dots drawn on it
function getDots(dots) {
    var canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 240;
    var context = canvas.getContext("2d");
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
      if (dots > 2000) {
          context.fillStyle = "#444";
      }
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
      gradient.addColorStop(1, "#777");
      context.fillStyle = gradient;
      var gap = 4;
      context.fillRect(gap, gap, canvas.width - (gap * 2), canvas.height - (gap * 2));
    }
    return canvas;
};


// Returns the HTML for the card label to represent a given
// value. Decimals are represented as fractions.
function getCardLabel(value) {
    var label = document.createElement("div");
    if (value < 1) {
        var fractionTop = document.createElement("span");
        fractionTop.append(document.createTextNode(1));
        var fractionBottom = document.createElement("span")
        fractionBottom.append(document.createTextNode(formatCardDotsNumber(1 / value)));
        label.append(fractionTop, fractionBottom);
        label.classList.add("fraction");
    } else {
        label.append(document.createTextNode(formatCardDotsNumber(value)));
    }

    label.classList.add("binary-card-number");
    if (value.toString().length > EXPONENTIAL_THRESHOLD) {
        label.classList.add("exponential-text");
    } else if (value.toString().length > 7) {
        label.classList.add("small-text");
    }

    return label
}


function formatCardDotsNumber(number){
    if (number.toString().length > EXPONENTIAL_THRESHOLD) {
        return Number.parseFloat(number).toExponential();
    } else {
        return number.toLocaleString();
    }
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
    $("#interactive-binary-cards-container").children().each(function(cardPosition, card) {
        var card = $(card.children[0]);
        if (!card.hasClass("flipped") && !card.parent().hasClass("d-none")) {
            dotCount += card.data("value");
        }
    });
    var dotText = $("#dot-decimal-count");
    var format = ngettext("1 dot is visible", "%(dot_count)s dots are visible", dotCount);
    var dotCountText = interpolate(format, {"dot_count": dotCount}, true);
    dotText.html(dotCountText);
};


function getPlaceValue(place) {
    return Math.pow(binaryCardsSettings.BASE, place + binaryCardsSettings.OFFSET - 1)
}


function getPlaceFace(place) {
    // Gets the face value from the place array
    return cardSideValues[cardSideValues.length - place];
}


function setPlaceFace(place, face) {
    return cardSideValues[cardSideValues.length - place] = face;
}
