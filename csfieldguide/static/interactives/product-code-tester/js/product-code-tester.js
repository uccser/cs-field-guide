const JsBarcode = require('jsbarcode');

const productCodeData = {
    'UPC': {
        name: '12 digits (UPC)',
        digits: 12,
        digitSpacings: new Set([1, 6, 11]),
        imagePositionPixelValues: [
            '8px',
            '20px',
            '34px',
            '48px',
            '62px',
            '76px',
            '98px',
            '114px',
            '128px',
            '142px',
            '156px',
            '170px',
            '190px',
        ],
    },
    'EAN13': {
        name: '13 digits (EAN-13)',
        digits: 13,
        digitSpacings: new Set([1, 7]),
        imagePositionPixelValues: [
            '6px', // First value isn't encoded as bars
            '6px',
            '20px',
            '34px',
            '48px',
            '62px',
            '76px',
            '98px',
            '114px',
            '128px',
            '142px',
            '156px',
            '170px',
            '190px',
        ],
    },
};
// Order to show buttons for product code versions
const productCodeOrder = ["UPC", "EAN13"];

// Elements
var elementContainer;
var elementRestartButton;
var elementBarcodeImage;
var elementBarcodeImageHider;

// Other variables
var productCode;
var productCodeSlug;
var productCodeLength;
var productCodeInputElements;
var highestRevealedDigit;

const buttonContainerID = 'button-container';
const digitInputClass = 'input-digit';

function setup() {
    // Save elements to variables
    elementContainer = document.getElementById('product-code-tester-interactive-container');
    elementRestartButton = document.getElementById('restart-button');

    // Add event listeners
    elementRestartButton.addEventListener('click', resetTester);

    // Start interactive
    resetTester();

    // Check for URL parameter
    let searchParameters = new URL(window.location.href).searchParams;
    if (searchParameters.has('type')) {
        let providedProductCodeType = searchParameters.get('type');
        if (providedProductCodeType in productCodeData) {
            document.querySelector(`#product-code-tester-interactive-container button[value=${providedProductCodeType}]`).click();
        }
    }
}


function resetTester() {
    elementContainer.innerHTML = '';
    setupStepOne();
}

function setupStepOne() {
    // Buttons
    let elementButtonContainer = document.createElement('div');
    elementButtonContainer.id = buttonContainerID;
    productCodeOrder.forEach(productCodeSlug => {
        let elementButton = document.createElement('button');
        elementButton.value = productCodeSlug;
        elementButton.textContent = productCodeData[productCodeSlug].name;
        elementButton.classList.add('btn', 'btn-primary');
        elementButton.addEventListener('click', setupStepTwo);
        elementButtonContainer.appendChild(elementButton);
    })
    elementContainer.appendChild(elementButtonContainer);
}

function setupStepTwo(event) {
    // Disable all step one buttons
    let elementButtonContainer = document.getElementById(buttonContainerID);
    for (let i = 0; i < elementButtonContainer.children.length; i++) {
        let button = elementButtonContainer.children[i];
        button.disabled = true;
    }
    // Show selected button
    event.target.classList.add('selected');

    productCodeSlug = event.target.value;
    productCodeLength = productCodeData[productCodeSlug].digits;
    let productCodeDigitSpacings = productCodeData[productCodeSlug].digitSpacings;

    // Create image with hider
    highestRevealedDigit = 0;
    let elementBarcodeImageGridElement = document.createElement('div');
    elementBarcodeImageGridElement.id = 'barcode-image-container';
    elementContainer.appendChild(elementBarcodeImageGridElement);

    let elementBarcodeImageContainer = document.createElement('div');
    elementBarcodeImageGridElement.appendChild(elementBarcodeImageContainer);

    elementBarcodeImage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    elementBarcodeImage.id = 'barcode-image';
    elementBarcodeImageContainer.appendChild(elementBarcodeImage);

    elementBarcodeImageHider = document.createElement('div');
    elementBarcodeImageHider.id = 'barcode-image-hider';
    elementBarcodeImageContainer.appendChild(elementBarcodeImageHider);

    // Create input grid
    let elementGrid = document.createElement('div');
    elementGrid.id = 'checker-grid';
    elementContainer.appendChild(elementGrid);

    // Create top row inputs
    productCodeInputElements = [];
    for (let i = 1; i <= productCodeLength; i++) {
        let element = document.createElement('div');
        element.style.gridArea = `1 / ${i} / 2 / ${i+1}`;
        if (productCodeDigitSpacings.has(i)) {
            element.classList.add('input-space-after');
        }
        elementGrid.appendChild(element);

        let inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.maxLength = '1';
        inputElement.classList.add('product-code-digit');
        if (i != 1) {
            inputElement.disabled = true;
        }
        if (i == productCodeLength) {
            inputElement.value = "?";
        } else {
            inputElement.classList.add(digitInputClass);
            inputElement.dataset.position = i;
            inputElement.addEventListener('input', processInputDigit);
            inputElement.addEventListener('keydown', processInputKeyDown);
            inputElement.addEventListener('focus', function () { this.select(); });
            inputElement.addEventListener('blur', function () {
                if (this.value == '') {
                    this.value = this.dataset.lastInput || '';
                }
            });
        }
        element.appendChild(inputElement);
        productCodeInputElements.push(inputElement);
    }


    updateProductCode();
    updateBarcodeImage();
}


function processInputDigit(event) {
    let inputElement = event.target;
    if (inputElement.value.match(/\d{1}/)) {
        inputElement.dataset.lastInput = inputElement.value;

        let currentPosition = parseInt(inputElement.dataset.position);

        // Move hider image
        if (currentPosition > highestRevealedDigit) {
            highestRevealedDigit = currentPosition;
        }
        updateProductCode();

        // Move to next box (if possible)
        if (currentPosition < (productCodeLength - 1)) {
            // Don't add 1 to index as it's zero indexed (offset by 1)
            let newElement = productCodeInputElements[currentPosition];
            newElement.disabled = false;
            newElement.focus();
        }
    } else {
        inputElement.value = '';
    }
}


function processInputKeyDown(event) {
    // If backspace, move to previous box (if possible)
    let inputElement = event.target;
    if (event.key === "Backspace" && inputElement.value == '') {
        let currentPosition = parseInt(inputElement.dataset.position);
        if (currentPosition > 1) {
            let newElement = productCodeInputElements[currentPosition - 2];
            newElement.focus();
        }
    }
}


function updateProductCode() {
    productCode = '';
    for (let i = 0; i < (productCodeInputElements.length - 1); i++) {
        let inputElement = productCodeInputElements[i];
        if (inputElement.value.match(/\d{1}/)) {
            productCode += inputElement.value;
        } else {
            productCode += "-";
        }
    }
    updateBarcodeImage();
}


function updateBarcodeImage() {
    let hiderPosition = productCodeData[productCodeSlug].imagePositionPixelValues[highestRevealedDigit];
    elementBarcodeImageHider.style.left = hiderPosition;

    JsBarcode(
        elementBarcodeImage,
        productCode.replaceAll('-', '0'),
        {
            format: productCodeSlug,
            background: '#f8f9fa',
            displayValue: false,
            width: 2,
            margin: 0,
        }
    );
}


function ready(fn) {
    if (document.readyState != 'loading') {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }
}
ready();
