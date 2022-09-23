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

    createQRCode();
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
