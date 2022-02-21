const FSA = require('./../../../js/modules/fsa/fsa.js');

var nfa_guesser = {};
nfa_guesser.result = [];
nfa_guesser.active = true;
nfa_guesser.number_of_guesses = 0;
nfa_guesser.config = {
    Alphabet: ['a', 'b'],
    Start: '1',
    States: {
        '1': {
            transitions: {
                'a': ['1', '2'],
                'b': '3'
            }
        },
        '2': {
            transitions: {
                'a': '5',
                'b': ['2', '4']
            }
        },
        '3': {
            transitions: {
                'a': '2',
                'b': ['2', '5']
            }
        },
        '4': {
            transitions: {
                'a': ['2', '5'],
                'b': '4'
            }
        },
        '5': {
            transitions: {
                'a': '3',
                'b': '5'
            }
        }
    }
}


$(document).ready(function() {
    nfa_guesser.check_button = document.getElementById('interactive-nfa-guesser-check');
    nfa_guesser.check_button.addEventListener('click', checkAnswer, false);
    nfa_guesser.answer_options = document.getElementById('interactive-nfa-guesser-answer-options');
    nfa_guesser.new_sequence_button = document.getElementById('interactive-nfa-guesser-new-sequence')
    nfa_guesser.new_sequence_button.addEventListener('click', createNewInput, false);

    nfa_guesser.model = new FSA.FSARunner(nfa_guesser.config);
    createAnswerOptions();
    createNewInput();
});


function checkAnswer() {
    var checked_states = [];
    for (var i = 0; i < nfa_guesser.answer_options.children.length; i++) {
        var state_element = nfa_guesser.answer_options.children[i];
        if (state_element.classList.contains('selected')) {
            checked_states.push(state_element.dataset.value);
        }
    }

    var result_element = document.getElementById('interactive-nfa-guesser-result');
    if (checked_states.equals(nfa_guesser.result)) {
        result_element.innerHTML = gettext('Correct');
        result_element.classList = 'valid'
        disableQuestionControls();
    } else {
        result_element.innerHTML = gettext('Incorrect');
        result_element.classList = ''
        nfa_guesser.number_of_guesses++;
    }
}


function disableQuestionControls() {
    nfa_guesser.check_button.disabled = true;
    nfa_guesser.active = false;
}


function createNewInput() {
    nfa_guesser.model.goto(nfa_guesser.model.fsa.start);
    nfa_guesser.result = [];
    while (nfa_guesser.result.length < 2) {
        generateInput();
        calculateEndStates();
    }
    resetInterface();
}


function generateInput() {
    var sequence = '';
    nfa_guesser.input_length = Math.floor(Math.random() * 3) + 3;
    for (var i = 0; i < nfa_guesser.input_length; i++) {
        if (Math.floor(Math.random() * 2) + 1 == 1) {
            sequence += 'a';
        } else {
            sequence += 'b';
        }
    }
    nfa_guesser.input = sequence;
}


function calculateEndStates() {
    nfa_guesser.model.feed(nfa_guesser.input.split(''));
    nfa_guesser.result = nfa_guesser.model.state();
}


function resetInterface() {
    document.getElementById('interactive-nfa-guesser-input-sequence-value').innerHTML = nfa_guesser.input;
    document.getElementById('interactive-nfa-guesser-result').innerHTML = '';
    nfa_guesser.check_button.disabled = false;
    nfa_guesser.number_of_guesses = 0;
    nfa_guesser.active = true;
    for (var i = 0; i < nfa_guesser.answer_options.children.length; i++) {
        nfa_guesser.answer_options.children[i].classList.remove('selected');
    }
}


function createAnswerOptions() {
    for (var state in nfa_guesser.config.States) {
        var state_element = document.createElement('div');
        state_element.dataset.value = state;
        state_element.classList.add('state-option');
        var state_text = document.createTextNode(state);
        state_element.appendChild(state_text);
        state_element.addEventListener('click', toggleStateOption);
        nfa_guesser.answer_options.appendChild(state_element);
    }
}


function toggleStateOption(event) {
    if (nfa_guesser.active) {
        event.target.classList.toggle('selected');
    }
}

// Function source from http://stackoverflow.com/a/14853974
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
