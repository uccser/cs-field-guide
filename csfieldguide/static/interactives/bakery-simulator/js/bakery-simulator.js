var CONFIG = require('./config.js');

var bakerySim = {};

bakerySim.currentCustomer = 1;
bakerySim.numQuestionsAsked = 0;
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
    $('#bake-cake').click(checkResult);
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

    bakerySim.numQuestionsAsked += 1
    $('#num-asked').text(bakerySim.numQuestionsAsked);
    // remove question so it cannot be asked again
    $(this).remove();

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


function checkResult() {
    // get options chosen via active class
    $('.active').each(function(i, obj) {
        
    });
    // compare them to cake answers in config
}


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


function createRadioButtons() {
    for (i=0; i < CONFIG.RADIO_OPTIONS.length; i++) {
        var option = CONFIG.RADIO_OPTIONS[i];
        var $container = $('<div>').addClass('mb-2 col-8').attr('id', option.name + '-radio');
        var $title = $('<p>').addClass('d-inline text-left').text(option.title);
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
            // shorthand if statement means if it is first radio option make it active
            var $radioLabel = $('<label>').text(value).addClass('btn btn-secondary' + ((j == 0) ? ' active' : ''));
            var $radioInput = $('<input>').attr({
                type: (option.name === 'decorations' ? 'checkbox' : 'radio'),
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
