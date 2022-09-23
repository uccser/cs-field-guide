const qrcode = require('qrcode-generator');

var qrCodeElement;
var textContentInput;
var correctionLevelSelect;


function setup() {
    qrCodeElement = document.getElementById('qr-code-table');
    textContentInput = document.getElementById('qr-code-text-content');
    correctionLevelSelect = document.getElementById('qr-code-correction-level');

    // Setup event listeners
    textContentInput.addEventListener('input', createQRCode);
    correctionLevelSelect.addEventListener('change', createQRCode);

    processURLParameters();
    createQRCode();
}


function processURLParameters() {
    let searchParameters = new URL(window.location.href).searchParams;
    if (searchParameters.has('text')) {
        textContentInput.value = searchParameters.get('text');
    }
    if (searchParameters.has('level')) {
        let providedLevel = searchParameters.get('level');
        let validLevels = [...correctionLevelSelect.options].map(option => option.value)
        if (validLevels.includes(providedLevel)) {
            correctionLevelSelect.value = providedLevel;
        }
    }
}


function createQRCode() {
    var qr = qrcode(0, correctionLevelSelect.value);  // Auto type
    qr.addData(textContentInput.value);
    qr.make();
    qrCodeElement.innerHTML = qr.createTableTag(20, 0);
}


function ready(fn) {
    if (document.readyState != 'loading') {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }
}
ready();
