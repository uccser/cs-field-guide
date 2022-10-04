const JsBarcode = require('jsbarcode');

const productCodeData = {
    'UPC': {
        name: '12 digits (UPC)',
        digits: 12,
        digitSpacings: new Set([1, 6, 11]),
        weightings: [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
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
        weightings: [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
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
var elementMultiplicationGrid;
var productCodeTopRowInputElements;
var productCodeBottomRowInputElements;
var productCodeBottomRowSumElement;
var subtractionElement;

// Other variables
var productCode;
var productCodeSlug;
var productCodeLength;
var productCodeWeightings;
var highestRevealedDigit;
var stepNumber;

const buttonContainerID = 'button-container';
const multiplicationSymbol = '\u00D7';
const arrowSymbol = '🠃';
const validEditingKeys = new Set([
    'Backspace',
    'Clear',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
]);

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
    elementBarcodeImage = undefined;
    elementBarcodeImageHider = undefined;
    elementMultiplicationGrid = undefined;
    productCodeTopRowInputElements = undefined;
    productCodeBottomRowInputElements = undefined;
    productCodeBottomRowSumElement = undefined;
    setupStepOne();
}

function setupStepOne() {
    stepNumber = 1;
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
    stepNumber = 2;
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
    elementBarcodeImageHider.textContent = '?';
    elementBarcodeImageContainer.appendChild(elementBarcodeImageHider);

    // Create input grid
    elementMultiplicationGrid = document.createElement('div');
    elementMultiplicationGrid.id = 'multiplication-grid';
    let columnLayout = '';
    for (let i = 1; i <= productCodeLength; i++) {
        if (productCodeDigitSpacings.has(i)) {
            columnLayout += '1.5fr ';
        } else {
            columnLayout += '1fr ';
        }
    }
    columnLayout += '1ch 1fr';
    elementMultiplicationGrid.style.gridTemplateColumns = columnLayout;
    elementContainer.appendChild(elementMultiplicationGrid);

    // Create top row inputs
    productCodeTopRowInputElements = [];
    for (let i = 1; i <= productCodeLength; i++) {
        let element = document.createElement('div');
        element.style.gridArea = `1 / ${i} / 2 / ${i+1}`;
        // if (productCodeDigitSpacings.has(i)) {
        //     element.classList.add('input-space-after');
        // }
        elementMultiplicationGrid.appendChild(element);

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
            inputElement.dataset.position = i;
            inputElement.addEventListener('input', processTopRowInputDigit);
            inputElement.addEventListener('keydown', processTopRowInputKeyDown);
            inputElement.addEventListener('focus', function () { this.select(); });
            inputElement.addEventListener('blur', function () {
                if (this.value == '') {
                    this.value = this.dataset.lastInput || '';
                }
            });
        }
        element.appendChild(inputElement);
        productCodeTopRowInputElements.push(inputElement);
    }

    updateProductCode();
    updateBarcodeImage();
}


function setupStepThree() {
    stepNumber = 3;
    productCodeBottomRowInputElements = [];
    productCodeWeightings = productCodeData[productCodeSlug].weightings;
    let productCodeDigitSpacings = productCodeData[productCodeSlug].digitSpacings;

    // For each digit except checksum
    for (let i = 1; i < productCodeLength; i++) {
        // Middle row
        let middleRowElement = document.createElement('div');
        middleRowElement.style.gridArea = `2 / ${i} / 3 / ${i + 1}`;
        middleRowElement.classList.add('middle-row');
        elementMultiplicationGrid.appendChild(middleRowElement);
        // Arrow
        let middleRowArrowElement = document.createElement('div');
        middleRowArrowElement.classList.add('middle-row-arrow');
        middleRowArrowElement.textContent = arrowSymbol;
        middleRowElement.appendChild(middleRowArrowElement);
        // Label
        let middleRowLabelElement = document.createElement('div');
        middleRowLabelElement.classList.add('middle-row-label');
        middleRowLabelElement.textContent = `${multiplicationSymbol}${productCodeWeightings[i - 1]}`;
        middleRowElement.appendChild(middleRowLabelElement);
        // Modulo label
        let middleRowLabelModuloElement = document.createElement('div');
        middleRowLabelModuloElement.classList.add('modulo-label');
        middleRowLabelModuloElement.textContent = 'mod 10';
        middleRowLabelElement.appendChild(middleRowLabelModuloElement);

        let bottomRowElement = document.createElement('div');
        bottomRowElement.classList.add('bottom-row')
        bottomRowElement.style.gridArea = `3 / ${i} / 4 / ${i + 1}`;
        elementMultiplicationGrid.appendChild(bottomRowElement);

        // Bottom row - Multipled value
        let inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.maxLength = '2';
        inputElement.classList.add('product-code-digit');
        inputElement.dataset.position = i;
        inputElement.addEventListener('input', checkBottomRowInputs);
        inputElement.addEventListener('keydown', processBottomRowInputKeyDown);
        // inputElement.addEventListener('keyup', processBottomRowInputKeyUp);
        bottomRowElement.appendChild(inputElement);

        // Symbol for step 4
        let bottomRowSymbolElement = document.createElement('div');
        bottomRowSymbolElement.classList.add('bottom-row-symbol');
        if (i < (productCodeLength - 1)) {
            bottomRowSymbolElement.textContent = '+';
        } else {
            bottomRowSymbolElement.textContent = '=';
        }
        bottomRowElement.appendChild(bottomRowSymbolElement)

        productCodeBottomRowInputElements.push(inputElement);
    }
}


function setupStepFour() {
    stepNumber = 4;
    elementMultiplicationGrid.classList.add('step-four');

    let i = productCodeLength;
    let bottomRowElement = document.createElement('div');
    bottomRowElement.style.gridArea = `3 / ${i} / 4 / ${i + 1}`;
    elementMultiplicationGrid.appendChild(bottomRowElement);

    // Bottom row - Multipled sum
    productCodeBottomRowSumElement = document.createElement('input');
    productCodeBottomRowSumElement.id = 'multiplication-sum';
    productCodeBottomRowSumElement.type = 'text';
    productCodeBottomRowSumElement.maxLength = '3';
    productCodeBottomRowSumElement.classList.add('product-code-digit');
    productCodeBottomRowSumElement.addEventListener('input', checkMultiplicationSumInput);
    bottomRowElement.appendChild(productCodeBottomRowSumElement)
}


function setupStepFive() {
    // Minus step
    stepNumber = 5;
    elementMultiplicationGrid.classList.add('step-five');

    let i = productCodeLength;

    subtractionElement = document.createElement('div');
    subtractionElement.id = 'subtraction-equation';
    subtractionElement.classList.add('product-code-digit');
    subtractionElement.style.gridArea = `4 / 1 / 5 / ${i + 1}`;
    elementMultiplicationGrid.appendChild(subtractionElement);
    updateSubtractionEquation();
}

function updateSubtractionEquation() {
    let subtractValue = productCodeBottomRowSumElement.value % 10;
    subtractionElement.textContent = `10 \u2212 ${subtractValue}`;
}



function processBottomRowInputKeyDown(event) {
    let inputElement = event.target;
    let inputCursorPosition = inputElement.selectionStart;
    let inputLength = inputElement.value.length;

    if (event.key === "ArrowRight" && inputCursorPosition == inputLength) {
        // Move to next box (if possible)
        // TODO: Currently cursor position is not implemented
        let currentPosition = parseInt(inputElement.dataset.position);
        if (currentPosition < (productCodeLength - 1)) {
            // Don't add one as it's zero indexed array (offset by 1)
            let newElement = productCodeBottomRowInputElements[currentPosition];
            newElement.focus();
        }
    } else if (event.key === "ArrowLeft" && inputCursorPosition == 0) {
        // Move to previous box (if possible)
        // TODO: Currently cursor position is not implemented
        let currentPosition = parseInt(inputElement.dataset.position);
        if (currentPosition > 1) {
            // Minus two as it's zero indexed array (offset by 1)
            let newElement = productCodeBottomRowInputElements[currentPosition - 2];
            newElement.focus();
        }
    } else if (!(event.key.match(/\d/) || validEditingKeys.has(event.key))) {
        event.preventDefault();
    }
}

function processBottomRowInputKeyUp(event) {
    let inputElement = event.target;
    if (event.key.match(/\d/) && inputElement.value.match(/\d{2}/)) {
        // Move to next box (if possible)
        // TODO: Currently cursor position is not implemented
        let currentPosition = parseInt(inputElement.dataset.position);
        if (currentPosition < (productCodeLength - 1)) {
            // Don't add one as it's zero indexed array (offset by 1)
            let newElement = productCodeBottomRowInputElements[currentPosition];
            newElement.focus();
        }
    }
}


function checkMultiplicationSumInput() {
    let correctSum = 0;
    for (let i = 0; i < (productCodeBottomRowInputElements.length); i++) {
        let bottomInputElement = productCodeBottomRowInputElements[i];
        correctSum += parseInt(bottomInputElement.value);
    }
    let givenSum = productCodeBottomRowSumElement.value;
    if (productCodeBottomRowSumElement.value == '') {
        productCodeBottomRowSumElement.classList.remove('correct', 'incorrect');
    } else if (givenSum == correctSum) {
        productCodeBottomRowSumElement.classList.add('correct');
        productCodeBottomRowSumElement.classList.remove('incorrect');
        if (stepNumber < 5) {
            setupStepFive();
        }
    } else {
        productCodeBottomRowSumElement.classList.add('incorrect');
        productCodeBottomRowSumElement.classList.remove('correct');
    }
    if (stepNumber >= 5) {
        updateSubtractionEquation();
    }
}

function checkBottomRowInputs() {
    let correctValues = 0;
    for (let i = 0; i < (productCodeTopRowInputElements.length - 1); i++) {
        let topInputElement = productCodeTopRowInputElements[i];
        let bottomInputElement = productCodeBottomRowInputElements[i];
        let expectedValue = topInputElement.value * productCodeWeightings[i];
        if (bottomInputElement.value == '') {
            bottomInputElement.classList.remove('correct', 'incorrect');
        } else if (bottomInputElement.value == expectedValue) {
            bottomInputElement.classList.add('correct');
            bottomInputElement.classList.remove('incorrect');
            correctValues++;
        } else {
            bottomInputElement.classList.add('incorrect');
            bottomInputElement.classList.remove('correct');
        }
    }
    if (correctValues == productCodeTopRowInputElements.length - 1) {
        if (stepNumber < 4) {
            setupStepFour();
        }
    }
    if (stepNumber >= 4) {
        checkMultiplicationSumInput();
    }

}


function processTopRowInputDigit(event) {
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
            let newElement = productCodeTopRowInputElements[currentPosition];
            newElement.disabled = false;
            newElement.focus();
        }
    } else {
        inputElement.value = '';
    }
    if (stepNumber >= 3) {
        checkBottomRowInputs();
    }
}


function processTopRowInputKeyDown(event) {
    // If backspace, move to previous box (if possible)
    let inputElement = event.target;
    if (event.key === "Backspace" && inputElement.value == '') {
        let currentPosition = parseInt(inputElement.dataset.position);
        if (currentPosition > 1) {
            let newElement = productCodeTopRowInputElements[currentPosition - 2];
            newElement.focus();
        }
    }
}


function updateProductCode() {
    productCode = '';
    let allInputsFilled = true;
    for (let i = 0; i < (productCodeTopRowInputElements.length - 1); i++) {
        let inputElement = productCodeTopRowInputElements[i];
        if (inputElement.value.match(/\d{1}/)) {
            productCode += inputElement.value;
        } else {
            productCode += "-";
            allInputsFilled = false;
        }
    }
    updateBarcodeImage();
    if (allInputsFilled) {
        if (stepNumber < 3) {
            setupStepThree();
        }
        checkBottomRowInputs();
    }
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
