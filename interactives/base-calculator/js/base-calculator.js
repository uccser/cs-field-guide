"use strict";

$(document).ready(function () {
    // Settings for interactive
    var baseCalculatorSettings = {
        BASE: Number(getUrlParameter('base')) || 2,
        DIGITS: Number(getUrlParameter('digits')) || 6,
        SHOW_POWER: !(getUrlParameter('show_power') == 'false'),
        SHOW_MULTIPLICATION: !(getUrlParameter('show_multiplication') == 'false'),
        SHOW_VALUE: !(getUrlParameter('show_value') == 'false'),
        SHOW_TOTAL: !(getUrlParameter('show_total') == 'false')
    }

    createCalculatorInterface(baseCalculatorSettings);
    updateHeading(baseCalculatorSettings.BASE);

    $('select').change(function() {
        var select = $(this);
        var column = select.parent().parent();
        if (baseCalculatorSettings.SHOW_POWER || baseCalculatorSettings.SHOW_MULTIPLICATION) {
            column.find('.orignal-value').text(parseInt(select.val(), baseCalculatorSettings.BASE));
        }
        if (baseCalculatorSettings.SHOW_VALUE) {
            var digit = select.data('digit');
            column.find('.computed-value').text(calculateValue(select.val(), baseCalculatorSettings.BASE, digit));
        }
        updateTotalColumn(baseCalculatorSettings);
    });
});


function updateHeading(base) {
    var header = document.getElementById('base-value');
    header.innerHTML = base;
}


function updateTotalColumn(baseCalculatorSettings) {
    var total = 0;
    $('#interactive-base-calculator select').each(function() {
        var select = $(this);
        var digit = select.data('digit');
        total += calculateValue(select.val(), baseCalculatorSettings.BASE, digit);
    });

    var totalColumn = $('#interactive-base-calculator #total-column');
    totalColumn.find('div').text(total);
};


function calculateValue(value, base, digit) {
    return parseInt(value, base) * Math.pow(base, digit);
};


// Sets up the cards for the interactive
function createCalculatorInterface(baseCalculatorSettings) {
    var calculatorColumns = document.getElementById("interactive-base-calculator-container");

    // Empty container
    while (calculatorColumns.firstChild) {
        calculatorColumns.removeChild(calculatorColumns.firstChild);
    }

    // Count number of rows needed
    var numberOfRows = 0;
    if (baseCalculatorSettings.SHOW_POWER) {
        numberOfRows += 1;
    }
    if (baseCalculatorSettings.SHOW_MULTIPLICATION) {
        numberOfRows += 1;
    }
    if (baseCalculatorSettings.SHOW_VALUE) {
        numberOfRows += 1;
    }

    for (var digit = baseCalculatorSettings.DIGITS - 1; digit >= 0; digit--) {
        var columnElement = createCalculatorColumnContainer();

        if (baseCalculatorSettings.SHOW_POWER) {
            columnElement.appendChild(createPowerElement(baseCalculatorSettings, digit));
        }
        if (baseCalculatorSettings.SHOW_MULTIPLICATION) {
            columnElement.appendChild(createMultiplicationElement(baseCalculatorSettings, digit));
        }
        if (baseCalculatorSettings.SHOW_VALUE) {
            columnElement.appendChild(createValueElement(baseCalculatorSettings, digit));
        }
        columnElement.appendChild(createSelectElement(baseCalculatorSettings, digit));

        calculatorColumns.appendChild(columnElement);
        if (digit > 0 || (baseCalculatorSettings.SHOW_TOTAL && digit == 0)) {
            calculatorColumns.appendChild(createSymbolColumn(digit, numberOfRows));
        }
    }
    if (baseCalculatorSettings.SHOW_TOTAL) {
        calculatorColumns.appendChild(createTotalsColumn(baseCalculatorSettings));
    }
    return calculatorColumns;
};


function createSelectElement(baseCalculatorSettings, digit) {
    var element = createCalculatorElement();
    element.className += ' pad-left'
    var select = document.createElement('select');
    $(select).data('digit', digit);
    select.className = 'calculator-element';
    for (var num = 0; num < baseCalculatorSettings.BASE; num++) {
        var option = document.createElement('option');
        option.text = option.value = num.toString(baseCalculatorSettings.BASE).toUpperCase();
        select.appendChild(option);
    }
    element.appendChild(select);
    return element;
};


function createCalculatorColumnContainer() {
    var columnContainer = document.createElement('div');
    columnContainer.className = 'calculator-column';
    return columnContainer;
};


function createSymbolColumn(columnNumber, numberOfRows) {
    var columnElement = createCalculatorColumnContainer();
    for (var i = 0; i < numberOfRows; i++) {
        var symbol = createCalculatorElement();
        symbol.className += ' calculator-symbol';
        if (columnNumber == 0) {
            symbol.innerHTML = '=';
        } else {
            symbol.innerHTML = '+';
        }
        columnElement.appendChild(symbol);
    }
    return columnElement;
};


function createTotalsColumn(baseCalculatorSettings) {
    var columnElement = createCalculatorColumnContainer();
    columnElement.id = 'total-column';

    if (baseCalculatorSettings.SHOW_POWER) {
        var element = createCalculatorElement();
        element.innerHTML = 0;
        columnElement.appendChild(element);
    }
    if (baseCalculatorSettings.SHOW_MULTIPLICATION) {
        var element = createCalculatorElement();
        element.innerHTML = 0;
        columnElement.appendChild(element);
    }
    if (baseCalculatorSettings.SHOW_VALUE) {
        var element = createCalculatorElement();
        element.innerHTML = 0;
        columnElement.appendChild(element);
    }
    return columnElement;
};


function createPowerElement(baseCalculatorSettings, digit) {
    var element = createCalculatorElement();
    var span = document.createElement('span');
    span.className = 'orignal-value';
    span.innerHTML = 0;
    element.appendChild(span);
    element.innerHTML += ' &times; ' + baseCalculatorSettings.BASE + '<sup>' + digit + '</sup>';
    return element;
};


function createMultiplicationElement(baseCalculatorSettings, digit) {
    var element = createCalculatorElement();
    var span = document.createElement('span');
    span.className = 'orignal-value';
    span.innerHTML = 0;
    element.appendChild(span);
    element.innerHTML += ' &times; ' + Math.pow(baseCalculatorSettings.BASE, digit);
    return element;
};


function createValueElement(baseCalculatorSettings, digit) {
    var element = createCalculatorElement();
    element.className += ' computed-value';
    element.innerHTML = Math.pow(baseCalculatorSettings.BASE, digit) * 0;
    return element;
};


function createCalculatorElement() {
    var element = document.createElement('div');
    element.className ='calculator-element';
    return element;
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
