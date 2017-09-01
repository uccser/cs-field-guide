
"use strict";

$(document).ready(function () {
    // Settings for interactive
    var binaryValueSettings = {
        BASE: Number(getUrlParameter('base')) || 2,
        DIGITS: Number(getUrlParameter('digits')) || 8,
        OFFSET: Number(getUrlParameter('offset')) || 0
    }
	var starting_totalvalue = getUrlParameter('totalvalue') || "";
		if (starting_totalvalue == ''){ starting_totalvalue = 'true';}
    $('#interactive-binary-cards').on('click', '.binary-card', function(event) {
        $(this).toggleClass('flipped');
        updateDotCount(starting_totalvalue == 'true');
    });

    // Flip all cards to black
    $('#interactive-binary-cards button#flip-to-black').on('click', function(){
        $('#interactive-binary-cards-container > div.binary-card-container > div.binary-card').addClass('flipped');
        updateDotCount(starting_totalvalue == 'true');
    });

    // Flip all cards to white
    $('#interactive-binary-cards button#flip-to-white').on('click', function(){
        $('#interactive-binary-cards-container > div.binary-card-container > div.binary-card').removeClass('flipped');
        updateDotCount(starting_totalvalue == 'true');
    });

    // Create cards within container and update count
    createCards(binaryValueSettings);
    updateDotCount(starting_totalvalue == 'true');
});


// Sets up the cards for the interactive
function createCards(settings) {
    var cardContainer = $('#interactive-binary-cards-container');

    var value = Math.pow(settings.BASE, settings.DIGITS + settings.OFFSET - 1);
    var starting_sides = getUrlParameter('start') || "";
	var starting_dot = getUrlParameter('dot') || "";
	var starting_value = getUrlParameter('value') || "";
	if (starting_dot == ''){ starting_dot = 'true';}
	if (starting_value == ''){ starting_value = 'true';}
	var digit_color = settings.DIGITS - 12;
	var range_color = parseInt(100 / digit_color);
	var color = 50;
	var t = (settings.DIGITS + settings.OFFSET) - 12;
	var u = .33654;
	var y = 24 - ( t * u);
	var font_size = y ;
	var r = 24 - y;
	var range_size =  r / t ; 
	
    // Iterate through card values
    for (var digit = 0, r = 20, m = 0; digit < settings.DIGITS; digit++) {
		if (value >= 4095){
			cardContainer.append(createCard(value, starting_sides[digit] == 'B', starting_dot == 'true', starting_value == 'true', color, font_size));
			color += range_color;
			font_size += range_size;
		}else if (value <= (1/67108864)){
			var font_size = r;
			cardContainer.append(createCard(value, starting_sides[digit] == 'B', starting_dot == 'true', starting_value == 'true', 255, font_size));
			if ( m > 6){r -=4; m = 0;}
			m++;
		}else {cardContainer.append(createCard(value, starting_sides[digit] == 'B', starting_dot == 'true', starting_value == 'true', color, 24));}
		value /= settings.BASE;
    }
};


// Returns the HTML for a card for a given value
function createCard(value, is_black, is_dot, is_value, color, font_size) {
    var cardContainer = $("<div class='binary-card-container'></div>");
    var card = $("<div class='binary-card'></div>");
    cardContainer.append(card);
    var front = $("<div class='binary-card-side binary-card-front'></div>");
	if (value < 4095 && value > (1/67108864)){
		if (is_dot == true){
			front.append(createDots(value));
		} else{
			front.append($("<div style='width: 120px;height: 140px;'></div>"));
		}
		if (is_value == true){
			front.append($("<div class='binary-card-number' style = 'font-size: 24px;'>" + createCardLabel(value) + "</div>"));
		} else{}
	}else{
		if (is_dot == true){
			if (is_value == true){
				front.append($("<div style='width: 118px;height: 140px;background:rgb("+color+","+color+","+color+");'>"+  +"</div>"));
				front.append($("<div class='binary-card-number' style = 'font-size: "+ font_size +"px;'>" + createCardLabel(value) + "</div>"));
			} else {
				front.append($("<div style='width: 118px;height: 140px;background:rgb("+color+","+color+","+color+");'>"+  +"</div>"));
			}
		} else{
			if (is_value == true){
				front.append($("<div style='width: 120px;height: 140px;'></div><div class='binary-card-number' style = 'font-size: "+ font_size +"px;'>" + createCardLabel(value) + "</div>"));
			}
		}
	}
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
    return canvas;
};

// Returns the HTML for the card label to represent a given
// value. Decimals are represented as fractions.
function createCardLabel(value) {
    var label;
    if (value < 1) {
			label = '<sup>1</sup>&frasl;<sub>'  + (1 / value).toLocaleString() + '</sub>';
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
function updateDotCount(totalvalue) {
    var dotCount = 0;
    $('#interactive-binary-cards-container').children().each(function(cardPosition, card) {
        var card = $(card.children[0]);
        if (!card.hasClass('flipped')) {
            dotCount += card.data("value");
        }
    });
	if (totalvalue == true){
    var dotText = $('#dot-decimal-count');
    if (dotCount == 1) {
        dotText.html('1 dot is visible');
    } else {
        dotText.html(dotCount + ' dots are visible');
    }
	}
};


// From jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
