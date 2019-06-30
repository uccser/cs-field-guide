const FSA = require('./../../../js/modules/fsa/fsa.js');

var nfa_guesser = {};
nfa_guesser.result = [];
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
    nfa_guesser.model = new FSA.FSARunner(nfa_guesser.config);
    createStateCheckboxes();
    createNewInput();

    $('#interactive-nfa-guesser-check').on('click', function() {
        checkAnswer();
    });

    $('#interactive-nfa-guesser-new-sequence').on('click', function() {
        nfa_guesser.model.goto(nfa_guesser.model.fsa.start);
        nfa_guesser.result = [];
        createNewInput();
    });
});


function checkAnswer() {
    var checked_states = [];
    $("div#interactive-nfa-guesser-state-checkboxes input:checked").each(function () {
        checked_states.push(this.id.split('-')[1]);
    });
    var result_element = document.getElementById('interactive-nfa-guesser-result');
    if (checked_states.equals(nfa_guesser.result)) {
        result_element.innerHTML = gettext('Correct');
        result_element.classList = 'valid'
    } else {
        result_element.innerHTML = gettext('Incorrect');
        result_element.classList = ''
    }
}


function createNewInput() {
    while (nfa_guesser.result.length < 2) {
        generateInput();
        calculateEndStates();
    }
    updateInterface();
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


function updateInterface() {
    $("div#interactive-nfa-guesser-state-checkboxes input:checked").prop('checked', false);
    document.getElementById('interactive-nfa-guesser-input-sequence-value').innerHTML = nfa_guesser.input;
    document.getElementById('interactive-nfa-guesser-result').innerHTML = '';
}


function createStateCheckboxes() {
    var checkbox_group = document.getElementById('interactive-nfa-guesser-state-checkboxes');

    for (var state in nfa_guesser.config.States) {
        var checkbox_label = document.createElement('label');
        var checkbox_id = 'state-' + state + '-checkbox'
        checkbox_label.setAttribute('for', checkbox_id);

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = checkbox_id;
        checkbox_label.appendChild(checkbox);
        var state_text = document.createTextNode(state);
        checkbox_label.appendChild(state_text);

        checkbox_group.appendChild(checkbox_label);
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
