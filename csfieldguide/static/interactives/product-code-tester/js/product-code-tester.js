const JsBarcode = require('jsbarcode');
const arrowSVG = require('arrows-svg');
const arrowCreate = arrowSVG.default;
const arrowDirections = arrowSVG.DIRECTION;
const arrowHeads = arrowSVG.HEAD;

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
var containerElement;
var restartButtonElement;
var moduloCheckboxElement;
var windowSizeAlertElement;
var topRightGridElement;
var barcodeImageElement;
var barcodeImageHiderElement;
var calculationGridElement;
var productCodeTopRowInputElements;
var productCodeThirdRowInputElements;
var productCodeThirdRowSumElement;
var subtractionValueElement;
var subtractionResultElement;
var checkDigitElement;
var arrowTailPositionerElement;
var arrowElements = [];

// Other variables
var productCode;
var productCodeSlug;
var productCodeLength;
var productCodeWeightings;
var productCodeCheckDigit;
var highestRevealedDigit;
var stepNumber;
var useModulo = false;

const buttonContainerID = 'button-container';
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
    containerElement = document.getElementById('product-code-tester-interactive-container');
    restartButtonElement = document.getElementById('restart-button');
    moduloCheckboxElement = document.getElementById('use-modulo');
    windowSizeAlertElement = document.getElementById('window-size-alert');

    // Add event listeners
    restartButtonElement.addEventListener('click', resetTester);
    moduloCheckboxElement.addEventListener('input', function () { toggleModulo(); });
    window.addEventListener('resize', checkWindowSize, true);

    // Check for URL parameters
    let searchParameters = new URL(window.location.href).searchParams;
    if (searchParameters.has('use-modulo')) {
        useModulo = true;
    }

    // Start interactive
    resetTester();

    if (searchParameters.has('type')) {
        let providedProductCodeType = searchParameters.get('type');
        if (providedProductCodeType in productCodeData) {
            document.querySelector(`#product-code-tester-interactive-container button[value=${providedProductCodeType}]`).click();
        }
    }
}


function resetTester() {
    containerElement.innerHTML = '';
    while (arrowElements.length > 0) {
        arrowElements.pop().clear();
    }
    checkWindowSize();
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
    containerElement.appendChild(elementButtonContainer);
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
    let barcodeImageElementGridElement = document.createElement('div');
    barcodeImageElementGridElement.id = 'barcode-image-container';
    containerElement.appendChild(barcodeImageElementGridElement);

    let barcodeImageElementContainer = document.createElement('div');
    barcodeImageElementGridElement.appendChild(barcodeImageElementContainer);

    barcodeImageElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    barcodeImageElement.id = 'barcode-image';
    barcodeImageElementContainer.appendChild(barcodeImageElement);

    barcodeImageHiderElement = document.createElement('div');
    barcodeImageHiderElement.id = 'barcode-image-hider';
    barcodeImageHiderElement.textContent = '?';
    barcodeImageElementContainer.appendChild(barcodeImageHiderElement);

    // Create input grid
    calculationGridElement = document.createElement('div');
    calculationGridElement.id = 'calculation-grid';
    if (useModulo) {
        calculationGridElement.classList.add('show-modulo');
    }
    let columnLayout = '';
    for (let i = 1; i <= productCodeLength; i++) {
        if (productCodeDigitSpacings.has(i)) {
            columnLayout += '1.5fr ';
        } else {
            columnLayout += '1fr ';
        }
    }
    calculationGridElement.style.gridTemplateColumns = columnLayout;
    containerElement.appendChild(calculationGridElement);

    // Create top row inputs
    productCodeTopRowInputElements = [];
    for (let i = 1; i <= productCodeLength; i++) {
        let element = document.createElement('div');
        element.style.gridArea = `1 / ${i} / 2 / ${i+1}`;
        element.classList.add('first-row');
        calculationGridElement.appendChild(element);

        let inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.maxLength = '1';
        inputElement.classList.add('product-code-digit');
        if (i != 1) {
            inputElement.disabled = true;
            checkDigitElement = inputElement;
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
            productCodeTopRowInputElements.push(inputElement);
        }
        element.appendChild(inputElement);

        // Hidden symbol for spacing
        let symbolElement = document.createElement('div');
        symbolElement.classList.add('equation-symbol', 'invisible');
        symbolElement.textContent = '+';
        element.appendChild(symbolElement)
        if (i == productCodeLength) {
            topRightGridElement = symbolElement;
        }
    }

    updateProductCode();
    updateBarcodeImage();
    checkWindowSize();

    let firstElement = productCodeTopRowInputElements[0];
    firstElement.focus();
}


function setupStepThree() {
    stepNumber = 3;
    productCodeThirdRowInputElements = [];
    productCodeWeightings = productCodeData[productCodeSlug].weightings;

    // For each digit except checksum
    for (let i = 1; i < productCodeLength; i++) {
        // Second row
        let secondRowElement = document.createElement('div');
        secondRowElement.style.gridArea = `2 / ${i} / 3 / ${i + 1}`;
        secondRowElement.classList.add('second-row');
        calculationGridElement.appendChild(secondRowElement);

        // Label
        let secondRowLabelElement = document.createElement('div');
        secondRowLabelElement.classList.add('second-row-label', 'modulo-label-parent');
        secondRowLabelElement.textContent = `\u00D7${productCodeWeightings[i - 1]}`;
        secondRowElement.appendChild(secondRowLabelElement);
        // Modulo label
        let secondRowLabelModuloElement = document.createElement('div');
        secondRowLabelModuloElement.classList.add('modulo-label');
        secondRowLabelModuloElement.textContent = 'mod 10';
        secondRowLabelElement.appendChild(secondRowLabelModuloElement);

        let thirdRowElement = document.createElement('div');
        thirdRowElement.classList.add('third-row')
        thirdRowElement.style.gridArea = `3 / ${i} / 4 / ${i + 1}`;
        calculationGridElement.appendChild(thirdRowElement);

        // Third row - Multipled value
        let inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.maxLength = '2';
        inputElement.classList.add('product-code-digit');
        inputElement.dataset.position = i;
        inputElement.addEventListener('input', checkThirdRowInputs);
        inputElement.addEventListener('keydown', processInputKeyDown);
        inputElement.addEventListener('focus', function () { this.select(); });
        thirdRowElement.appendChild(inputElement);

        // Symbol for step 4
        let thirdRowSymbolElement = document.createElement('div');
        thirdRowSymbolElement.classList.add('equation-symbol');
        if (i < (productCodeLength - 1)) {
            thirdRowSymbolElement.textContent = '+';
        } else {
            thirdRowSymbolElement.textContent = '=';
            thirdRowSymbolElement.classList.add('modulo-label-parent');
            // Modulo label
            let moduloElement = document.createElement('div');
            moduloElement.classList.add('modulo-label');
            moduloElement.textContent = 'mod 10';
            thirdRowSymbolElement.appendChild(moduloElement);
        }
        thirdRowElement.appendChild(thirdRowSymbolElement)
        productCodeThirdRowInputElements.push(inputElement);

        let arrow = arrowCreate({
            from: productCodeTopRowInputElements[i - 1],
            to: productCodeThirdRowInputElements[i - 1],
            className: 'product-code-tester-arrow',
            head: arrowHeads.NORMAL,
            updateDelay: 25,
        });
        document.body.appendChild(arrow.node);
        arrowElements.push(arrow);
    }

    let firstElement = productCodeThirdRowInputElements[0];
    firstElement.focus();
}


function setupStepFour() {
    stepNumber = 4;
    calculationGridElement.classList.add('step-four');

    let i = productCodeLength;
    let thirdRowElement = document.createElement('div');
    thirdRowElement.id = 'multiplication-sum-container';
    thirdRowElement.style.gridArea = `3 / ${i} / 4 / ${i + 1}`;
    calculationGridElement.appendChild(thirdRowElement);

    // Third row - Multipled sum
    productCodeThirdRowSumElement = document.createElement('input');
    productCodeThirdRowSumElement.id = 'multiplication-sum';
    productCodeThirdRowSumElement.type = 'text';
    productCodeThirdRowSumElement.maxLength = '3';
    productCodeThirdRowSumElement.classList.add('product-code-digit');
    productCodeThirdRowSumElement.addEventListener('input', checkMultiplicationSumInput);
    productCodeThirdRowSumElement.addEventListener('keydown', processInputKeyDown);
    thirdRowElement.appendChild(productCodeThirdRowSumElement)

    // Third row - Character position element (used for arrow in step five)
    arrowTailPositionerElement = document.createElement('div');
    arrowTailPositionerElement.id = 'arrow-tail-positioner';
    thirdRowElement.appendChild(arrowTailPositionerElement);
}


function setupStepFive() {
    // Minus step
    stepNumber = 5;
    calculationGridElement.classList.add('step-five');

    // Fifth row - First cell
    let firstCellElement = document.createElement('div');
    firstCellElement.style.gridArea = `5 / ${productCodeLength - 2} / 6 / ${productCodeLength - 1}`;
    firstCellElement.classList.add('fifth-row');
    calculationGridElement.appendChild(firstCellElement);

    let tenElement = document.createElement('div');
    tenElement.classList.add('product-code-digit', 'fifth-row-digit');
    tenElement.textContent = '10';
    firstCellElement.appendChild(tenElement);

    let minusSymbolElement = document.createElement('div');
    minusSymbolElement.classList.add('equation-symbol');
    minusSymbolElement.textContent = '\u2212';
    firstCellElement.appendChild(minusSymbolElement)

    // Fifth row - Second cell
    let secondCellElement = document.createElement('div');
    secondCellElement.style.gridArea = `5 / ${productCodeLength - 1} / 6 / ${productCodeLength}`;
    secondCellElement.classList.add('fifth-row');
    calculationGridElement.appendChild(secondCellElement);

    subtractionValueElement = document.createElement('div');
    subtractionValueElement.classList.add('product-code-digit', 'fifth-row-digit');
    secondCellElement.appendChild(subtractionValueElement);

    let equalsElement = document.createElement('div');
    equalsElement.classList.add('equation-symbol');
    equalsElement.textContent = '=';
    equalsElement.classList.add('modulo-label-parent');
    // Modulo label
    let moduloElement = document.createElement('div');
    moduloElement.classList.add('modulo-label');
    moduloElement.textContent = 'mod 10';
    equalsElement.appendChild(moduloElement);
    secondCellElement.appendChild(equalsElement);

    // Fifth row - Third cell
    let thirdCellElement = document.createElement('div');
    thirdCellElement.style.gridArea = `5 / ${productCodeLength} / 6 / ${productCodeLength + 1}`;
    thirdCellElement.classList.add('fifth-row');
    calculationGridElement.appendChild(thirdCellElement);

    subtractionResultElement = document.createElement('input');
    subtractionResultElement.id = 'subtraction-result';
    subtractionResultElement.type = 'text';
    subtractionResultElement.maxLength = '2';
    subtractionResultElement.classList.add('product-code-digit');
    subtractionResultElement.addEventListener('input', checkSubtractionInput);
    subtractionResultElement.addEventListener('keydown', processInputKeyDown);
    thirdCellElement.appendChild(subtractionResultElement)

    // Fill value before rendering arrow so points to top of element
    updateSubtractionEquation();

    // Arrow
    let arrow = arrowCreate({
        from: {
            node: arrowTailPositionerElement,
            direction: arrowDirections.BOTTOM,
            translation: [0, 1],
        },
        to: {
            node: subtractionValueElement,
            direction: arrowDirections.TOP,
            translation: [0, -1],
        },
        className: 'product-code-tester-arrow',
        head: [
            arrowHeads.NORMAL,
            {
                func: ({width}) => {
                    let node = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    // https://yqnn.github.io/svg-path-editor/#P=m_0_-10_h_-6_v_2_h_4_v_16_h_-4_v_2_h_6_z
                    let tailPath = 'm 0 -10 h -6 v 2 h 4 v 16 h -4 v 2 h 6 z';
                    path.setAttributeNS('http://www.w3.org/2000/svg', 'd', tailPath);
                    node.appendChild(path);
                    return {
                        node: node,
                        width: width,
                        height: width,
                    }
                },
                width: 5,
                distance: 0.001,
            },
        ],
        updateDelay: 25,
    });
    document.body.appendChild(arrow.node);
    arrowElements.push(arrow);
}


function setupStepSix() {
    stepNumber = 6;
    let arrow = arrowCreate({
        from: {
            node: subtractionResultElement,
            direction: arrowDirections.RIGHT,
            translation: [1, 0],
        },
        to: {
            node: checkDigitElement,
            direction: arrowDirections.RIGHT,
            translation: [2, 0],
        },
        className: 'product-code-tester-arrow',
        head: arrowHeads.NORMAL,
        updateDelay: 25,
    });
    document.body.appendChild(arrow.node);
    arrowElements.push(arrow);
}


function updateSubtractionEquation() {
    subtractionValueElement.textContent = productCodeThirdRowSumElement.value % 10;
    checkSubtractionInput();
}


function processInputKeyDown(event) {
    if (!(event.key.match(/\d/) || validEditingKeys.has(event.key))) {
        event.preventDefault();
    }
}


function checkMultiplicationSumInput(allCorrect) {
    let expectedSum = 0;
    for (let i = 0; i < (productCodeThirdRowInputElements.length); i++) {
        let thirdInputElement = productCodeThirdRowInputElements[i];
        expectedSum += parseInt(thirdInputElement.value);
    }
    if (useModulo) {
        expectedSum = expectedSum % 10;
    }
    let givenSum = productCodeThirdRowSumElement.value;
    if (productCodeThirdRowSumElement.value == '') {
        productCodeThirdRowSumElement.classList.remove('correct', 'incorrect');
    } else if (givenSum == expectedSum) {
        productCodeThirdRowSumElement.classList.add('correct');
        productCodeThirdRowSumElement.classList.remove('incorrect');
        if (stepNumber < 5) {
            setupStepFive();
        }
    } else {
        productCodeThirdRowSumElement.classList.add('incorrect');
        productCodeThirdRowSumElement.classList.remove('correct');
    }
    if (stepNumber >= 5) {
        updateSubtractionEquation();
        if (givenSum == expectedSum) {
            subtractionResultElement.focus();
        }
    }
}

function checkSubtractionInput() {
    let correctSum = 10 - parseInt(subtractionValueElement.textContent);
    if (useModulo) {
        correctSum = correctSum % 10;
    }
    let givenSum = parseInt(subtractionResultElement.value);
    if (subtractionResultElement.value == '') {
        subtractionResultElement.classList.remove('correct', 'incorrect');
    } else if (givenSum == correctSum) {
        subtractionResultElement.classList.add('correct');
        subtractionResultElement.classList.remove('incorrect');
        if (stepNumber < 6) {
            setupStepSix();
        }
    } else {
        subtractionResultElement.classList.add('incorrect');
        subtractionResultElement.classList.remove('correct');
    }
    if (stepNumber >= 6) {
        checkCheckDigit();
    }
}


function checkCheckDigit() {
    let givenDigit = subtractionResultElement.value;
    checkDigitElement.value = givenDigit;

    if (givenDigit == productCodeCheckDigit) {
        checkDigitElement.classList.add('correct');
        checkDigitElement.classList.remove('incorrect');
        highestRevealedDigit = productCodeLength;
    } else {
        checkDigitElement.classList.add('incorrect');
        checkDigitElement.classList.remove('correct');
        highestRevealedDigit = productCodeLength - 1;
    }
    updateBarcodeImage();
}


function calculateCheckDigit() {
    let total = 0;
    for (let i = 0; i < (productCodeTopRowInputElements.length); i++) {
        let digit = parseInt(productCodeTopRowInputElements[i].value);
        let weighting = productCodeWeightings[i];
        total += digit * weighting;
    }
    productCodeCheckDigit = 10 - (total % 10);
}


function checkThirdRowInputs(event) {

    let correctValues = 0;
    for (let i = 0; i < (productCodeTopRowInputElements.length); i++) {
        let topInputElement = productCodeTopRowInputElements[i];
        let thirdInputElement = productCodeThirdRowInputElements[i];
        let expectedValue = topInputElement.value * productCodeWeightings[i];
        if (useModulo) {
            expectedValue = expectedValue % 10;
        }
        if (thirdInputElement.value != '') {
            thirdInputElement.dataset.edited = true;
        }
        if (thirdInputElement.value == '' && !thirdInputElement.dataset.edited) {
            thirdInputElement.classList.remove('correct', 'incorrect');
        } else if (thirdInputElement.value == expectedValue) {
            thirdInputElement.classList.add('correct');
            thirdInputElement.classList.remove('incorrect');
            correctValues++;

            if (event) {
                let inputElement = event.target;
                // If currently focused input is correct, move to next box (if possible)
                if (thirdInputElement == inputElement && i < (productCodeThirdRowInputElements.length - 1)) {
                    let newElement = productCodeThirdRowInputElements[i + 1];
                    newElement.focus();
                }
            }
        } else {
            thirdInputElement.classList.add('incorrect');
            thirdInputElement.classList.remove('correct');
        }
    }
    let allCorrect = correctValues == productCodeTopRowInputElements.length;
    if (allCorrect) {
        if (stepNumber < 4) {
            setupStepFour();
        }
        productCodeThirdRowSumElement.focus();
    }
    if (stepNumber >= 4) {
        checkMultiplicationSumInput(allCorrect);
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
        checkThirdRowInputs();
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
    for (let i = 0; i < (productCodeTopRowInputElements.length); i++) {
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
        calculateCheckDigit();
    }
}


function updateBarcodeImage() {
    let hiderPosition = productCodeData[productCodeSlug].imagePositionPixelValues[highestRevealedDigit];
    barcodeImageHiderElement.style.left = hiderPosition;

    JsBarcode(
        barcodeImageElement,
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


function toggleModulo(force) {
    if (force) {
        useModulo = force;
    } else {
        useModulo = !useModulo;
    }
    updateModuloInterface();
}


function updateModuloInterface() {
    if (calculationGridElement) {
        calculationGridElement.classList.toggle('show-modulo', useModulo);
    }
    if (stepNumber >= 3) {
        checkThirdRowInputs();
    }
}


function checkWindowSize() {
    // Check if any elements are outside their bounds, and display message
    let showAlert = false;
    if (calculationGridElement && topRightGridElement) {
        let calculationGridElementPosition = calculationGridElement.getBoundingClientRect().right;
        let topRightGridElementPosition = topRightGridElement.getBoundingClientRect().right;
        showAlert = topRightGridElementPosition != calculationGridElementPosition;
    }
    windowSizeAlertElement.classList.toggle('show', showAlert);
}


function ready(fn) {
    if (document.readyState != 'loading') {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }
}
ready();
