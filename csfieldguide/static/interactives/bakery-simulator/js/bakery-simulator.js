var CONFIG = require('./config.js');

var bakerySim = {};

bakerySim.currentCustomer = 1;
bakerySim.questionsAsked = 0;
bakerySim.maxQuestions = 6;

$(document).ready(function() {
    createModal();
    createRadioButtons();
    $('#start-button').click(loadCustomer);
    $('#start-asking').click(function() {
        $('#customer-answer').addClass('d-none');
        $('#question-list').removeClass('d-none');
        $('#start-asking').addClass('d-none');
        $('#num-qs-asked-text').addClass('d-none');
    });
    $('#question-list p').click(askQuestion);
    $('#time-to-bake').click(startBaking);
});


function loadCustomer() {
    $('#starter-info').addClass('d-none');
    $('#background-image').attr('src', bakerySimImages['customer-1']);
    $('#customer-answer').text(CONFIG.CUSTOMER_INTRO).removeClass('d-none');
    $('#dialogue-box').removeClass('d-none');
    $('#start-asking').removeClass('d-none');
}


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

    bakerySim.questionsAsked += 1
    $('#num-asked').text(bakerySim.questionsAsked);
    // remove question so it cannot be asked again
    $(this).remove();

    if (bakerySim.questionsAsked == 6) {
        $('#question-list').addClass('d-none');
        $('#start-asking').addClass('d-none');
        $('#num-qs-asked-text').text(CONFIG.QUESTIONS_MAX_REACHED);
        $('#time-to-bake').removeClass('d-none');
    } else {
        $('#num-qs-asked-text').removeClass('d-none');
        $('#start-asking').removeClass('d-none');
    }
}


function startBaking() {
    
}


function createModal() {
    var $modalContainer = $('<div>').addClass('modal').attr({
        id: 'baking-options',
        tabindex: '-1',
        role: 'dialog',
    });
    var $modalDialog = $('<div>').addClass('modal-dialog').attr('role', 'document');
    var $modalContent = $('<div>').addClass('modal-content');
    var $modalHeader = $('<div>').addClass('modal-header');
    var $modalTitle = $('<div>').addClass('modal-title').text(CONFIG.MODAL_TITLE);
    var $modalBody = $('<div>').addClass('modal-body text-left').attr('id', 'modal-body');
    var $modalFooter = $('<div>').addClass('modal-footer');
    var $bakeButton = $('<button>').addClass('btn btn-success').attr('data-dismiss', 'modal').text(gettext('Bake!'));
    $modalContainer.append($modalDialog);
    $modalDialog.append($modalContent);
    $modalContent.append($modalHeader);
    $modalHeader.append($modalTitle);
    $modalContent.append($modalBody);
    $modalContent.append($modalFooter);
    $modalFooter.append($bakeButton);
    $('#bakery-simulator-container').append($modalContainer);
}


function createRadioButtons() {
    for (i=0; i < CONFIG.RADIO_OPTIONS.length; i++) {
        var option = CONFIG.RADIO_OPTIONS[i];
        var $container = $('<div>').addClass('mb-1');
        var $title = $('<p>').addClass('d-inline text-left mr-5').text(option.title);
        $container.append($title);
        var $buttonGroup = $('<div>').addClass('btn-group btn-group-toggle').attr('data-toggle', 'buttons');
        $container.append($buttonGroup);
        // start iterating
        for (j=0; j < option.values.length; j++) {
            // converting to lowercase for constructing ID. 
            // some values cannot be converted to lowercase e.g integers
            try {
                var value = option.values[j].toLowerCase();
            }
            catch {
                var value = option.values[j]
            }
            var $radioLabel = $('<label>').addClass('btn btn-secondary').text(value);
            var $radioInput = $('<input>').attr({
                type: 'radio',
                name: option.name,
                id: option.name + '-' + value,
                autocomplete: 'off',
            });
            $radioLabel.append($radioInput);
            $buttonGroup.append($radioLabel);
        }
        $('#modal-body').append($container);
    }
}
