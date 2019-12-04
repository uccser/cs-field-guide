var CONFIG = require('./config.js');

var bakerySim = {};

bakerySim.currentCustomer = 1;
bakerySim.numQuestionsAsked = 0;
bakerySim.maxQuestions = 6;


$(document).ready(function() {
    createModal();
    createRadioButtons();
    $('#start-button').click(function() {
        $('#starter-info').addClass('d-none');
        loadCustomer();
    });
    $('#start-asking').click(function() {
        $('#customer-answer').addClass('d-none');
        $('#question-list').removeClass('d-none');
        $('#start-asking').addClass('d-none');
        $('#num-qs-asked-text').addClass('d-none');
    });
    $('#question-list p').click(askQuestion);
    $('#bake-cake').click(getCakeCreated);
    $('#next-customer').click(loadCustomer);
    $('#restart').click(function() {
        bakerySim.currentCustomer = 1;
        loadCustomer();
    });
});


/** 
 * Reset variables and the content displayed for new customer
 */
function loadCustomer() {
    bakerySim.numQuestionsAsked = 0;
    $('#num-qs-asked-text').html(CONFIG.NUM_QS_COUNT_TEXT);
    $('#background-image').attr('src', bakerySimImages['customer-' + bakerySim.currentCustomer]);
    $('#customer-answer').text(CONFIG.CUSTOMER_INTRO).removeClass('d-none');
    $('#dialogue-box').removeClass('d-none');
    $('#start-asking').removeClass('d-none');
    $('#result-table').addClass('d-none');
    $('.table-row').remove();
    $('#next-customer').addClass('d-none');
    $('#restart').addClass('d-none');
    $('#question-list p').removeClass('d-none');
}


/** 
 * Show the customer's answer to question selected
 */
function askQuestion() {
    questionID = $(this).attr('id');
    $('#question-list').addClass('d-none');
    if (bakerySim.currentCustomer == 1) {
        $('#customer-answer').text(CONFIG.CUSTOMER_1_ANS[questionID]).removeClass('d-none');
    } else if (bakerySim.currentCustomer == 2) {
        $('#customer-answer').text(CONFIG.CUSTOMER_2_ANS[questionID]).removeClass('d-none');
    } else if (bakerySim.currentCustomer == 3) {
        $('#customer-answer').text(CONFIG.CUSTOMER_3_ANS[questionID]).removeClass('d-none');
    }

    bakerySim.numQuestionsAsked += 1
    $('#num-asked').text(bakerySim.numQuestionsAsked);
    // hide question so it cannot be asked again
    $(this).addClass('d-none');

    if (bakerySim.numQuestionsAsked == 6) {
        $('#question-list').addClass('d-none');
        $('#start-asking').addClass('d-none');
        $('#num-qs-asked-text').text(CONFIG.QUESTIONS_MAX_REACHED);
        $('#time-to-bake').removeClass('d-none');
    } else {
        $('#num-qs-asked-text').removeClass('d-none');
        $('#start-asking').removeClass('d-none');
    }
}


/** 
 * Check user's cake against what the customer wanted
 */
function checkResult(cakeCreated) {
    if (bakerySim.currentCustomer == 1) {
        var cakeWanted = CONFIG.CUSTOMER_1_CAKE;
    } else if (bakerySim.currentCustomer == 2) {
        var cakeWanted = CONFIG.CUSTOMER_2_CAKE;
    } else if (bakerySim.currentCustomer == 3) {
        var cakeWanted = CONFIG.CUSTOMER_3_CAKE;
    }

    createResultTable(cakeWanted, cakeCreated);
    $('#result-table').removeClass('d-none');
}


/** 
 * Get values user selected from radio buttons
 */
function getCakeCreated() {
    $('#dialogue-box').addClass('d-none');
    $('#time-to-bake').addClass('d-none');
    var cakeCreated = {};
    // loop through each option and get selected value
    for (i=0; i < CONFIG.FIELD_NAMES.length; i++) {
        var name = CONFIG.FIELD_NAMES[i];
        var selected = $('.active input[name=' + name + ']').serialize();
        // decorations can have multiple options selected
        if (name === 'decorations') {
            var decorations = [];
            var values = selected.split('&');
            for (j=0; j < values.length; j++) {
                value = values[j].split('=')[1];
                decorations.push(value);
            }
            cakeCreated[name] = decorations;
        } else {
            // is not the decorations field
            var value = selected.split('=')[1];
            cakeCreated[name] = value;
        }
    }
    checkResult(cakeCreated);
}


/** 
 * Create modal that contains radio buttons for creating cake
 */
function createModal() {
    var $modalContainer = $('<div>').addClass('modal').attr({
        id: 'baking-options',
        tabindex: '-1',
        role: 'dialog',
    });
    var $modalDialog = $('<div>').addClass('modal-dialog modal-lg').attr('role', 'document');
    var $modalContent = $('<div>').addClass('modal-content');
    var $modalHeader = $('<div>').addClass('modal-header');
    var $modalTitle = $('<div>').addClass('modal-title').text(CONFIG.MODAL_TITLE);
    var $modalBody = $('<div>').addClass('modal-body text-left').attr('id', 'modal-body');
    var $modalFooter = $('<div>').addClass('modal-footer');
    var $bakeButton = $('<button>').addClass('btn btn-success').text(gettext('Bake!'));
    $bakeButton.attr({
        'data-dismiss': 'modal',
        'id': 'bake-cake',
    });
    $modalContainer.append($modalDialog);
    $modalDialog.append($modalContent);
    $modalContent.append($modalHeader);
    $modalHeader.append($modalTitle);
    $modalContent.append($modalBody);
    $modalContent.append($modalFooter);
    $modalFooter.append($bakeButton);
    $('#bakery-simulator-container').append($modalContainer);
}


/** 
 * Create radio buttons for each cake option
 */
function createRadioButtons() {
    for (i=0; i < CONFIG.FIELD_OPTIONS.length; i++) {
        var option = CONFIG.FIELD_OPTIONS[i];
        var $container = $('<div>').addClass('mb-2 col-8').attr('id', option.name + '-radio');
        var $title = $('<p>').addClass('d-inline text-left').text(option.title);
        $container.append($title);
        var $buttonGroup = $('<div>').addClass('btn-group btn-group-toggle').attr('data-toggle', 'buttons');
        $container.append($buttonGroup);
        // start iterating
        for (j=0; j < option.values.length; j++) {
            var value = option.values[j];
            // shorthand if statement means if it is first radio option make it active
            var $radioLabel = $('<label>').text(value).addClass('btn btn-secondary' + ((j == 0) ? ' active' : ''));
            var $radioInput = $('<input>').attr({
                type: (option.name === 'decorations' ? 'checkbox' : 'radio'),
                name: option.name,
                value: value,
                id: option.name + '-' + value.toLowerCase(),
                autocomplete: 'off',
            });
            // If first radio button add checked attr
            if (j == 0) {
                $radioInput.attr('checked', 'checked');
            }
            $radioLabel.append($radioInput);
            $buttonGroup.append($radioLabel);
        }
        $('#modal-body').append($container);
    }
}


/** 
 * Create a table comparing what the customer wanted to what the user selected.
 * Background of table row will be green if correct, red if incorrect.
 */
function createResultTable(cakeWanted, cakeCreated) {
    var $table = $('#result-table')
    for (i=0; i < CONFIG.FIELD_OPTIONS.length; i++) {
        fieldDictionary = CONFIG.FIELD_OPTIONS[i];
        title = fieldDictionary.title.slice(0, -1); // remove ':' from the title
        field = fieldDictionary.name;
        var $tbody = $('<tbody>').addClass('table-row');
        var $tr = $('<tr>');
        var $th = $('<th>').attr('scope', 'row').text(title); // already translated??
        var $tdWanted = $('<td>').text(cakeWanted[field]); // already translated??
        var $tdCreated = $('<td>').text(cakeCreated[field]); // already translated??
        $table.append($tbody);
        $tbody.append($tr);
        $tr.append($th, $tdWanted, $tdCreated);
        // if correct add green background, if incorrect add red background
        // if is an array (e.g decorations) calculate set differences
        if ($.isArray(cakeWanted[field])) {
            var cakeWantedSet = new Set(cakeWanted[field]);
            var cakeCreatedSet = new Set(cakeCreated[field]);
            var inWantedNotCreated = setDifference(cakeWantedSet, cakeCreatedSet);
            var inCreatedNotWanted = setDifference(cakeCreatedSet, cakeWantedSet);
            if (inWantedNotCreated.size == 0 && inCreatedNotWanted.size == 0) {
                $tr.addClass('correct');
            } else {
                $tr.addClass('incorrect');
            }
        }
        else if (cakeWanted[field] === cakeCreated[field]) {
            $tr.addClass('correct');
        } else {
            $tr.addClass('incorrect');
        }
    }
    bakerySim.currentCustomer += 1; // should put this somewhere else
    // if customer num == 4 (3 is the last customer) show end button not next customer button
    if (bakerySim.currentCustomer == 4) {
        $('#next-customer').addClass('d-none');
        $('#restart').removeClass('d-none');
    } else {
        $('#next-customer').removeClass('d-none');
    }
}


/** 
 * Calulate a\b 
 * E.g if a = {1,2,3,4} and b = {5,4,3,2} this function would return {1}
 */
function setDifference(a, b) {
    var aMinusB = new Set([...a].filter(x => !b.has(x)));
    return aMinusB;
  }
  