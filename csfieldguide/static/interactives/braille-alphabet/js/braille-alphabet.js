const braille_character_data = [
    {
        character: 'a',
        dots: [1]
    },
    {
        character: 'b',
        dots: [1, 2]
    },
    {
        character: 'c',
        dots: [1, 4]
    },
    {
        character: 'd',
        dots: [1, 4, 5]
    },
    {
        character: 'e',
        dots: [1, 5]
    },
    {
        character: 'f',
        dots: [1, 2, 4]
    },
    {
        character: 'g',
        dots: [1, 2, 4, 5]
    },
    {
        character: 'h',
        dots: [1, 2, 5]
    },
    {
        character: 'i',
        dots: [2, 4]
    },
    {
        character: 'j',
        dots: [2, 4, 5]
    },
    {
        character: 'k',
        dots: [1, 3]
    },
    {
        character: 'l',
        dots: [1, 2, 3]
    },
    {
        character: 'm',
        dots: [1, 3, 4]
    },
    {
        character: 'n',
        dots: [1, 3, 4, 5]
    },
    {
        character: 'o',
        dots: [1, 3, 5]
    },
    {
        character: 'p',
        dots: [1, 2, 3, 4]
    },
    {
        character: 'q',
        dots: [1, 2, 3, 4, 5]
    },
    {
        character: 'r',
        dots: [1, 2, 3, 5]
    },
    {
        character: 's',
        dots: [2, 3, 4]
    },
    {
        character: 't',
        dots: [2, 3, 4, 5]
    },
    {
        character: 'u',
        dots: [1, 3, 6]
    },
    {
        character: 'v',
        dots: [1, 2, 3, 6]
    },
    {
        character: 'w',
        dots: [2, 4, 5, 6]
    },
    {
        character: 'x',
        dots: [1, 3, 4, 6]
    },
    {
        character: 'y',
        dots: [1, 3, 4, 5, 6]
    },
    {
        character: 'z',
        dots: [1, 3, 5, 6]
    },
    {
        character: gettext('Capital sign'),
        dots: [6],
        note: gettext('Placed before a letter to make the next letter a capital letter.')
    },
    {
        character: gettext('Number sign'),
        dots: [3, 4, 5, 6],
        note: gettext('Placed before the characters a to j to make a number digit. a=1, b=2, c=3, d=4, e=5, f=6, g=7, h=8, i=9, j=0.')
    },
    {
        character: gettext('Period (full stop)'),
        dots: [2, 5, 6]
    },
    {
        character: gettext('Comma'),
        dots: [2]
    },
    {
        character: gettext('Question Mark'),
        dots: [2, 3, 6]
    },
    {
        character: gettext('Semicolon'),
        dots: [2, 3]
    },
    {
        character: gettext('Exclamation point'),
        dots: [2, 3, 5]
    }
];
const max_dots = 6;
const dot_id_prefix = '#braille-dot-';
const dot_class_black = 'braille-dot-black';
const dot_class_white = 'braille-dot-white';
var braille_character_index = 0;

$(document).ready(function () {
    updateBrailleCharacter();


    $('#braille-next').on('click', function () {
        braille_character_index++;
        updateBrailleCharacter();
    });

    $('#braille-prev').on('click', function () {
        braille_character_index--;
        updateBrailleCharacter();
    });
});


function updateBrailleCharacter() {
    var character_label = $('#braille-character');
    var character_note = $('#braille-character-note');
    braille_character_index = mod(braille_character_index, braille_character_data.length);
    var data = braille_character_data[braille_character_index];

    for (let dot_number = 0; dot_number <= max_dots; dot_number++) {
        var dot_element = $(dot_id_prefix + dot_number);
        if (data.dots.includes(dot_number)) {
            dot_element.addClass(dot_class_black);
            dot_element.removeClass(dot_class_white);
        } else {
            dot_element.addClass(dot_class_white);
            dot_element.removeClass(dot_class_black);
        }
    }

    character_label.text(data.character);
    if (data.note) {
        character_note.text(data.note);
    } else {
        character_note.html('<br>');
    }
;}

// Mod function that always returns positive
// From https://stackoverflow.com/a/17323608
function mod(n, m) {
    return ((n % m) + m) % m;
}
