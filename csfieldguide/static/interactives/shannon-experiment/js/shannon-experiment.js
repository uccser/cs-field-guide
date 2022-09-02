// This is not a constant as we remove sentences once they are completed.
var allLanguageData = {
    // 'de': {
    //     'title': 'Deutsch',
    //     'alphabet': [
    //         'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    //         'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    //         'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä',
    //         'Ö', 'Ü', 'ẞ',
    //     ],
    //     // TODO: Create German default sentence.
    //     'sentences': [],
    // },
    'en': {
        'title': 'English',
        'alphabet': [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        ],
        'sentences': [
            'PLEASE WAIT OUTSIDE THE DOOR',
            'HE ALWAYS WORE HIS SUNGLASSES AT NIGHT',
            "IT MUST BE FIVE O'CLOCK SOMEWHERE",
            'HIS GET RICH QUICK SCHEME WAS TO GROW A CACTUS FARM',
            'BLUE PARROTS ARE IN THE SKY',
            'THE CLOUDS FORMED BEAUTIFUL ANIMALS IN THE SKY',
            'SHE WAS TOO SHORT TO SEE OVER THE FENCE',
            'A GLITTERING GEM IS NOT ENOUGH',
            'THE TREE FELL UNEXPECTEDLY SHORT',
            'THE PAINTBRUSH WAS ANGRY AT THE COLOR THE ARTIST CHOSE TO USE',
        ],
    },
    'en-1951-paper': {
        'title': 'English (1951 paper)',
        'description': "English language with sentences from Shannon Claude's original research paper from 1951.",
        'alphabet': [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        ],
        'sentences': [
            // Found in https://www.princeton.edu/~wbialek/rome/refs/shannon_51.pdf
            'THERE IS NO REVERSE ON A MOTORCYCLE. A FRIEND OF MINE FOUND THIS OUT RATHER DRAMACTICALLY THE OTHER DAY.',
            'THE ROOM WAS NOT VERY LIGHT. A SMALL OBLONG READING LAMP ON THE DESK SHED GLOW ON POLISHED WOOD BUT LESS ON THE SHABBY RED CARPET.',
        ],
    },
    // 'fr': {
    //     'title': 'Français',
    //     'alphabet': [
    //         'A', 'B', 'Ç', 'D', 'E', 'F', 'G', 'H', 'I',
    //         'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    //         'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Œ',
    //         'Æ', 'Â', 'Ê', 'Î', 'Ô', 'Û',
    //     ],
    //     // TODO: Create French default sentence.
    //     'sentences': [],
    // },
    'mi': {
        'title': 'Te Reo Māori',
        'alphabet': [
            'A', 'Ā', 'E', 'Ē', 'H', 'I', 'Ī', 'K', 'M',
            'N', 'NG', 'O', 'Ō', 'P', 'R', 'T', 'U', 'Ū',
            'W', 'WH',
        ],
        'sentences': [
            'KAREKAU HE MEA E HAERE WHAKAMURI I TE MOTOPAIKA.', // THERE IS NO SUCH THING AS REVERSE ON A MOTORBIKE.
            'I MAU IA TĀNA MŌWHITI RĀ IA RĀ, IA PŌ.', // HE ALWAYS WORE HIS SUNGLASSES AT NIGHT.
            'I MAU TE TANGATA WHAKAHANGAREKA HE TARAU KŌWHAI.', // THE CLOWN WORE YELLOW PANTS.
            'I KAI TE KEA I NGĀ KAMUPŪTU.', // THE KEA ATE THE GUMBOOTS.
            'KORE RAWA TE MOA E ORA ANA.', // THE MOA IS DEFINITELY NOT ALIVE.
            'ANEI HE KĒKĒ HEI KAI MĀ KOUTOU.', // HERE IS A CAKE FOR YOU ALL TO EAT.
            'KEI TE HAERE RĀTOU KI TĀTAHI.', // THEY ARE GOING TO THE BEACH.
            'KUA PIKI AKE RĀTOU I A AORAKI.', // THEY CLIMBED AORAKI.
            'I PATUA TE MANU E TE NGERU.', // THE BIRD WAS KILLED BY THE CAT.
            'I RERE TE MANU KI TE NGĀHERE.', // THE BIRD FLEW TO THE BUSH.
            'I KITE IA I TE TĪWAIWAKA.', // SHE SAW THE FANTAIL.
            'I TŪ TE KERERŪ KI RUNGA I TE TEKOTEKO.', // THE KERERŪ STOOD ON THE GABLE OF THE MEETING HOUSE.
            'I HĪKOI RĀTOU KI TE WHANGANUI-A-TARA KI TE KŌRERO KI TE PIRIMIA.', // THEY WALKED TO WELLINGTON TO TALK TO THE PRIME MINISTER.
            'I HAERE MĀTOU KATOA KI KAIKOURA KI TE KITE NGĀ TOHORĀ ME NGĀ KEKENO.', // WE ALL WENT TO KAIKOURA TO SEE THE WHALES AND SEALS.
            'HE REKA TE KŌHUA KAI A KORO AHAKOA TE MAHA O TE KĀPITI.', // THE BOIL UP KORO COOKED WAS DELICIOUS DESPITE THE LARGE AMOUNT OF CABBAGE IN IT.
            'EHARA RAWA I TE MEA HE TĀWARA KINO TŌ TE KŌURA.', // THERE IS NO SUCH THING AS A BAD TASTING CRAYFISH.
        ],
    },
};

// Get language
var searchParameters;
var alphabet;
var sentence;
var nextCharacter;
var language;
var characterPosition;
var characterGuesses;
var multiLetterCharacters;
var totalCharacterGuesses;
var elementLanguageSelect;
var elementNewSentenceButton;
var elementLanguageDescription;
var elementAlphabetButtonsContainer;
var elementSentenceContainer;
var elementCurrentSentenceCharacter;
var elementCurrentSentenceCharacterGuesses;

function setup() {
    searchParameters = new URL(window.location.href).searchParams;
    elementAlphabetButtonsContainer = document.getElementById('alphabet-buttons-container');
    elementSentenceContainer = document.getElementById('sentence-container');
    elementLanguageSelect = document.getElementById('shannon-language-select');
    elementLanguageDescription = document.getElementById('shannon-language-description');
    elementNewSentenceButton = document.getElementById('new-sentence-button');

    elementLanguageSelect.addEventListener('change', function (event) {
        updateLanguage(event);
        resetExperiment();
    });
    elementNewSentenceButton.addEventListener('click', resetExperiment);

    setupLanguagePicker();
    updateLanguage();
    checkProvidedSentences();
    resetExperiment();
}

function setupLanguagePicker() {
    for (const [languageSlug, languageData] of Object.entries(allLanguageData)) {
        let elementOption = document.createElement('option');
        elementOption.value = languageSlug;
        elementOption.textContent = languageData.title;
        elementLanguageSelect.appendChild(elementOption);
    }
}

function getLanguage() {
    // Set langauge on load based on parameter or body.
    if (searchParameters.has('language')) {
        let providedLanguage = searchParameters.get('language').toLowerCase();
        if (providedLanguage in allLanguageData) {
            document.getElementById('shannon-language-picker').style.display = 'none';
            return providedLanguage;
        }
    }
    return document.documentElement.lang;
}

function updateLanguage(event) {
    if (!event) {
        language = getLanguage();
        elementLanguageSelect.value = language;
    } else {
        language = elementLanguageSelect.value;
    }

    elementLanguageDescription.textContent = allLanguageData[language].description || '';
}

function setDefaultAlphabet() {
    alphabet = allLanguageData[language]['alphabet'];
    // Get any alphabet characters longer than 1 character.
    // This occurs in Te Reo Māori with 'NG' and 'WH'.
    multiLetterCharacters = alphabet.filter(character => character.length > 1);
}

function resetExperiment() {
    // Clear existing sentence and alphabet buttons
    elementAlphabetButtonsContainer.replaceChildren();
    elementSentenceContainer.replaceChildren();
    characterPosition = 0;
    characterGuesses = 0;
    totalCharacterGuesses = 0;

    setDefaultAlphabet();
    setSentence();
    alphabet = updateAlphabet(alphabet);
    createAlphabetButtons(alphabet);
    createSentenceElement();
    setNextCharacter();
}

function checkProvidedSentences() {
    if (searchParameters.has('sentence')) {
        // Hide language picker since sentences are specific to a language
        document.getElementById('shannon-language-picker').style.display = 'none';
        // Override sentences for language
        providedSentences = searchParameters.getAll('sentence');
        allLanguageData[language]['sentences'] = providedSentences.map(sentence => sentence.toUpperCase());
    }
}

function setSentence() {
    let languageSentences = allLanguageData[language]['sentences'];
    // If this is the last sentence, hide new sentence button
    if (languageSentences.length <= 1) {
        document.getElementById('new-sentence-button').style.display = 'none';
    }
    let selectedSentence = languageSentences[Math.floor(Math.random() * languageSentences.length)];

    // Break sentence into array of characters.
    sentence = [];
    while (selectedSentence.length > 0) {
        let characterLength;
        let foundMultiLetterCharacter = multiLetterCharacters.find(character => selectedSentence.startsWith(character));
        if (foundMultiLetterCharacter) {
            characterLength = foundMultiLetterCharacter.length;
        } else {
            characterLength = 1;
        }
        sentence.push(selectedSentence.substring(0, characterLength));
        selectedSentence = selectedSentence.substring(characterLength);
    }
}

function updateAlphabet(alphabet) {
    // Get any extra unique characters from sentence
    let extraSentenceCharacters = new Set(sentence.filter(x => !new Set(alphabet).has(x)));
    extraSentenceCharacters = shuffle(Array.from(extraSentenceCharacters));
    return alphabet.concat(extraSentenceCharacters);
}

function removeCompletedSentence() {
    let languageSentences = allLanguageData[language]['sentences'];
    let sentenceString = sentence.join('');
    languageSentences.splice(languageSentences.indexOf(sentenceString), 1);
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
    elementCurrentSentenceCharacter.textContent = character;
    characterGuesses++;
    totalCharacterGuesses++;
    elementCurrentSentenceCharacterGuesses.textContent = characterGuesses;
    if (character == nextCharacter) {
        elementCurrentSentenceCharacter.classList.remove('incorrect');
        foundNextCharacter(character);
    } else {
        elementButton.setAttribute('disabled', '');
        elementCurrentSentenceCharacter.classList.add('incorrect');
    }
}

function resetAlphabetButtons() {
    let buttons = elementAlphabetButtonsContainer.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('disabled');
    }
}

function disableAlphabetButtons() {
    let buttons = elementAlphabetButtonsContainer.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('disabled', '');
    }
}

function setNextCharacter() {
    nextCharacter = sentence[characterPosition];
}

function foundNextCharacter(foundCharacter) {
    characterPosition++;
    if (characterPosition == sentence.length) {
        removeCompletedSentence();
        disableAlphabetButtons();
        showStatistics();
    } else {
        // Reset interface for next character
        resetAlphabetButtons();
        setNextCharacter();
        characterGuesses = 0;
        createSentenceElement();
    }
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

function showStatistics() {
    // Total guesses
    let elementTotalGuessesText = document.getElementById('statistic-total-guesses');
    elementTotalGuessesText.textContent = totalCharacterGuesses;

    // Show statistics
    document.getElementById('statistics-container').style.display = 'block';
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

function ready(fn) {
    if (document.readyState != 'loading') {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }
}
ready();
