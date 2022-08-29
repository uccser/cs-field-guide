
var alphabet = []

const LANGUAGE_DEFAULTS = {
    'de': {
        'alphabet': [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä',
            'Ö', 'Ü', 'ẞ',
        ],
        // TODO: Create German default sentence.
        'sentence': ''
    },
    'en': {
        'alphabet': [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        ],
        'sentence': 'THERE IS NO REVERSE GEAR ON A MOTORCYCLE.'
    },
    'fr': {
        'alphabet': [
            'A', 'B', 'Ç', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Œ',
            'Æ', 'Â', 'Ê', 'Î', 'Ô', 'Û',
        ],
        // TODO: Create French default sentence.
        'sentence': ''
    },
    'mi': {
        'alphabet': [
            'A', 'Ā', 'E', 'Ē', 'H', 'I', 'Ī', 'K', 'M',
            'N', 'NG', 'O', 'Ō', 'P', 'R', 'T', 'U', 'Ū',
            'W', 'WH',
        ],
        // TODO: Create Māori default sentence.
        'sentence': ''
    }
}
// Get language
var sentence;
var nextCharacter;
var language;
var elementAlphabetButtonsContainer;
var elementSentenceContainer;
var elementCurrentSentenceCharacter;
var elementCurrentSentenceCharacterGuesses;
var characterPosition = 0;
var characterGuesses = 0;

function setup() {
    language = document.documentElement.lang;
    elementAlphabetButtonsContainer = document.getElementById('alphabet-buttons-container');
    elementSentenceContainer = document.getElementById('sentence-container');

    let alphabet = LANGUAGE_DEFAULTS[language]['alphabet'];

    var searchParameters = new URL(window.location.href).searchParams;
    if (searchParameters.has('sentence')) {
        sentence = searchParameters.get('sentence').toUpperCase()
    } else {
        sentence = LANGUAGE_DEFAULTS[language]['sentence'];
    }

    // Get extra characters from sentence and add to alphabet.
    const uniqueSentenceCharacters = new Set(sentence.split(''));
    let extraSentenceCharacters = new Set([...uniqueSentenceCharacters].filter(x => !new Set(alphabet).has(x)));
    extraSentenceCharacters = shuffle(Array.from(extraSentenceCharacters));
    alphabet = alphabet.concat(extraSentenceCharacters);

    createAlphabetButtons(alphabet);
    createSentenceElement();
}

function createAlphabetButtons(alphabet) {
    alphabet.forEach(createAlphabetButton);
}

function createAlphabetButton(character) {
    let elementButton = document.createElement('button');
    var text;
    if (character == ' ') {
        // TODO: Translate
        text = 'Space';
    } else {
        text = character;
    }
    let elementText = document.createTextNode(text);
    elementButton.appendChild(elementText);
    elementButton.classList.add('alphabet-button');
    elementButton.dataset.character = character;
    elementButton.addEventListener('click', alphabetButtonClicked);
    elementAlphabetButtonsContainer.appendChild(elementButton);
}

function alphabetButtonClicked(event) {
    let elementButton = event.target;
    let character = elementButton.dataset.character;
    if (character == nextCharacter) {
        foundNextCharacter();
    } else {
        elementButton.setAttribute('disabled', '');
        characterGuesses++;
    }
}

function resetAlphabetButtons() {
    let buttons = elementAlphabetButtonsContainer.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('disabled');
    }
}

function setNextCharacter() {
    nextCharacter = sentence[characterPosition];
}

function foundNextCharacter() {
    // Display correct letter

    // Reset interface for next character
    characterPosition++;
    resetAlphabetButtons();
    setNextCharacter();
    characterGuesses = 0;
}

function createSentenceElement() {
    // Character
    let elementSentenceCharacter = document.createElement('div');
    let elementSentenceCharacterText = document.createTextNode('?');
    elementSentenceCharacter.appendChild(elementSentenceCharacterText);
    elementSentenceCharacter.classList.add('sentence-character');

    // Character guesses
    let elementSentenceCharacterGuesses = document.createElement('div');
    let elementSentenceCharacterGuessesText = document.createTextNode('0');
    elementSentenceCharacterGuesses.appendChild(elementSentenceCharacterGuessesText);
    elementSentenceCharacterGuesses.classList.add('sentence-character-guesses');

    // Combine elements
    let elementSentenceCharacterContainer = document.createElement('div');
    elementSentenceCharacterContainer.classList.add('sentence-character-container');
    elementSentenceCharacterContainer.appendChild(elementSentenceCharacter);
    elementSentenceCharacterContainer.appendChild(elementSentenceCharacterGuesses);

    // Save into global variables
    elementCurrentSentenceCharacter = elementSentenceCharacter;
    elementCurrentSentenceCharacterGuesses = elementSentenceCharacterGuesses;

    // Add into DOM
    elementSentenceContainer.appendChild(elementSentenceCharacterContainer);
}


// Used under CC BY-SA 4.0
// https://stackoverflow.com/a/2450976/10345299
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
// End of CC BY-SA 4.0 snippet

setup();
setNextCharacter();
