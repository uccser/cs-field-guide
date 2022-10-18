const qrcode = require('qrcode-generator');

// Elements
var elementQRCodeContainer;
var elementTextContentInput;
var elementCorrectionLevelSelect;
var elementResetButton;
var elementHighlightChangedButton;
var statisticsTotalBits;
var statisticsChangedBits;

// Statistic tracking
const BIT_MODIFIED_CLASS = 'inverted';
const SHOW_MODIFIED_BITS_CLASS = 'show-changed';
var totalBits = 0;
var totalChangedBits = 0;


function setup() {
    elementQRCodeContainer = document.getElementById('qr-code-container');
    elementTextContentInput = document.getElementById('qr-code-text-content');
    elementCorrectionLevelSelect = document.getElementById('qr-code-correction-level');
    elementResetButton = document.getElementById('reset-button');
    elementHighlightChangedButton = document.getElementById('highlight-changed-button');
    statisticsTotalBits = document.getElementById('statistics-total-bits');
    statisticsChangedBits = document.getElementById('statistics-changed-bits');

    // Setup event listeners
    elementTextContentInput.addEventListener('input', createQRCode);
    elementCorrectionLevelSelect.addEventListener('change', createQRCode);
    elementResetButton.addEventListener('click', createQRCode);
    elementHighlightChangedButton.addEventListener('click', function () { highlightChangedBits() });

    processURLParameters();
    createQRCode();
}


function processURLParameters() {
    let searchParameters = new URL(window.location.href).searchParams;
    if (searchParameters.has('hide-controls')) {
        let element = document.getElementById('qr-code-interactive');
        element.classList.add('hide-controls');
    }
    if (searchParameters.has('text')) {
        elementTextContentInput.value = searchParameters.get('text');
    }
    if (searchParameters.has('level')) {
        let providedLevel = searchParameters.get('level');
        let validLevels = [...elementCorrectionLevelSelect.options].map(option => option.value)
        if (validLevels.includes(providedLevel)) {
            elementCorrectionLevelSelect.value = providedLevel;
        }
    }
}


function createQRCode() {
    var qr = qrcode(0, elementCorrectionLevelSelect.value);  // 0 = Auto QR type
    qr.addData(elementTextContentInput.value);
    qr.make();

    // Create QR using <div> elements
    elementQRCodeContainer.innerHTML = '';
    let qrSize = qr.getModuleCount();
    for (let rowIndex = 0; rowIndex < qrSize; rowIndex++) {
        let elementRowDiv = document.createElement('div');
        for (let columnIndex = 0; columnIndex < qrSize; columnIndex++) {
            let elementCellDiv = document.createElement('div');
            elementCellDiv.classList.add('qr-code-cell');
            if (qr.isDark(rowIndex, columnIndex)) {
                elementCellDiv.classList.add('qr-code-cell-black');
            } else {
                elementCellDiv.classList.add('qr-code-cell-white');
            }
            elementRowDiv.appendChild(elementCellDiv);
        }
        elementQRCodeContainer.appendChild(elementRowDiv);
    }

    qrCodeTable = document.querySelector('#qr-code-table table');
    totalBits = qrSize * qrSize;
    totalChangedBits = 0;
    highlightChangedBits(false);
    updateStatistics();
    elementQRCodeContainer.addEventListener('click', qrCellClicked);
}


function qrCellClicked(event) {
    let cell = event.target;
    if (cell.classList.toggle(BIT_MODIFIED_CLASS)) {
        totalChangedBits++;
    } else {
        totalChangedBits--;
    }
    updateStatistics();
}


function updateStatistics() {
    statisticsTotalBits.textContent = totalBits;
    let percentageChanged = totalChangedBits / totalBits;
    statisticsChangedBits.textContent = `${totalChangedBits} (${Math.round(percentageChanged * 10000) / 100}%)`;
}


function highlightChangedBits(force) {
    if (elementQRCodeContainer.classList.toggle(SHOW_MODIFIED_BITS_CLASS, force)) {
        elementHighlightChangedButton.textContent = gettext('Hide changed bits');
    } else {
        elementHighlightChangedButton.textContent = gettext('Show changed bits');
    }
}


function ready(fn) {
    if (document.readyState != 'loading') {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }
}
ready();
