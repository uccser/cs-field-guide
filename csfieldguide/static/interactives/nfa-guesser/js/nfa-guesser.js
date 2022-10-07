var nfa_guesser = {};
nfa_guesser.result = [];
nfa_guesser.input = '';
nfa_guesser.active = true;
nfa_guesser.number_of_guesses = 0;
nfa_guesser.config = {
    alphabet: ['a', 'b'],
    start: '1',
    states: {
        '1': {
            transitions: {
                'a': ['1', '2'],
                'b': ['3']
            }
        },
        '2': {
            transitions: {
                'a': ['5'],
                'b': ['2', '4']
            }
        },
        '3': {
            transitions: {
                'a': ['2'],
                'b': ['2', '5']
            }
        },
        '4': {
            transitions: {
                'a': ['2', '5'],
                'b': ['4']
            }
        },
        '5': {
            transitions: {
                'a': ['3'],
                'b': ['5']
            }
        }
    }
}
GUESS_THRESHOLD = 3;


$(document).ready(function() {
    nfa_guesser.check_button = document.getElementById('interactive-nfa-guesser-check');
    nfa_guesser.check_button.addEventListener('click', checkAnswer, false);

    nfa_guesser.show_answer_button = document.getElementById('interactive-nfa-guesser-show-answer');
    nfa_guesser.show_answer_button.addEventListener('click', function () {showCorrectAnswers(false);}, false);

    nfa_guesser.answer_options = document.getElementById('interactive-nfa-guesser-answer-options');

    nfa_guesser.new_sequence_button = document.getElementById('interactive-nfa-guesser-new-sequence')
    nfa_guesser.new_sequence_button.addEventListener('click', createNewInput, false);

    createAnswerOptions();
    createNewInput();
});


function checkAnswer() {
    var checked_states = new Set();
    for (var i = 0; i < nfa_guesser.answer_options.children.length; i++) {
        var state_element = nfa_guesser.answer_options.children[i];
        if (state_element.classList.contains('selected')) {
            checked_states.add(state_element.dataset.value);
        }
    }

    var result_element = document.getElementById('interactive-nfa-guesser-result');
    if (checkSetsAreEqual(checked_states, nfa_guesser.result)) {
        result_element.innerHTML = gettext('Correct');
        result_element.classList = 'valid'
        showCorrectAnswers(true);
    } else {
        result_element.innerHTML = gettext('Incorrect');
        result_element.classList = ''
        nfa_guesser.number_of_guesses++;
        if (nfa_guesser.number_of_guesses >= GUESS_THRESHOLD) {
            nfa_guesser.show_answer_button.classList.remove('hidden');
        }
    }
}


function showCorrectAnswers(show_message) {
    disableQuestionControls();
    var result_element = document.getElementById('interactive-nfa-guesser-result');
    if (show_message) {
        result_element.innerHTML = gettext('Correct');
        result_element.classList = 'valid'
    } else {
        result_element.innerHTML = '';
        result_element.classList = ''
    }
    for (var i = 0; i < nfa_guesser.answer_options.children.length; i++) {
        var state_element = nfa_guesser.answer_options.children[i];
        if (nfa_guesser.result.has(state_element.dataset.value)) {
            state_element.classList.remove('selected');
            state_element.classList.add('valid');
        }
    }
}


function disableQuestionControls() {
    nfa_guesser.check_button.disabled = true;
    nfa_guesser.active = false;
}


function createNewInput() {
    nfa_guesser.result = new Set();
    generateInput();
    while (nfa_guesser.result.size < 2) {
        calculateEndStates();
    }
    resetInterface();
}


function generateInput() {
    // TODO: Don't create the same input twice in a row
    var sequence = '';
    nfa_guesser.input_length = Math.floor(Math.random() * 3) + 3;
    for (var i = 0; i < nfa_guesser.input_length; i++) {
        if (Math.floor(Math.random() * 2) == 0) {
            sequence += 'a';
        } else {
            sequence += 'b';
        }
    }
    nfa_guesser.input = sequence;
}


function calculateEndStates() {
    processInput(nfa_guesser.config.start, nfa_guesser.config.states, nfa_guesser.input);
}


function processInput(state, states, inputString) {
    let inputCharacter = inputString.charAt(0);
    let remainingInputCharacters = inputString.slice(1);
    if (inputCharacter) {
        let possibleTransitions = states[state].transitions[inputCharacter];
        for (let i = 0; i < possibleTransitions.length; i++) {
            let newState = possibleTransitions[i];
            processInput(newState, states, remainingInputCharacters)

        }
    } else {
        nfa_guesser.result.add(state);
    }
}


function resetInterface() {
    document.getElementById('interactive-nfa-guesser-input-sequence-value').innerHTML = nfa_guesser.input;
    document.getElementById('interactive-nfa-guesser-result').innerHTML = '';
    nfa_guesser.check_button.disabled = false;
    nfa_guesser.show_answer_button.classList.add('hidden');
    nfa_guesser.number_of_guesses = 0;
    nfa_guesser.active = true;
    for (var i = 0; i < nfa_guesser.answer_options.children.length; i++) {
        nfa_guesser.answer_options.children[i].classList.remove('selected', 'valid');
    }
}


function createAnswerOptions() {
    for (var state in nfa_guesser.config.states) {
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


// Common approach to check if two sets are equal.
// Check they are the same size, then check all of the first
// set's values are in the second set.
function checkSetsAreEqual(setA, setB) {
    if (setA.size !== setB.size) {
        return false;
    } else {
        return Array.from(setA).every(value => {
            return setB.has(value);
        });
    }
}
