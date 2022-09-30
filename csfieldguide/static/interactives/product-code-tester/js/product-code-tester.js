const JsBarcode = require('jsbarcode');

const productCodeData = {
    'UPC': {
        digits: 12,
        name: '12 digits (UPC)',
    },
    'EAN13': {
        digits: 13,
        name: '13 digits (EAN-13)',
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

const buttonContainerID = 'button-container';

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
    productCode = '0'.repeat(productCodeData[productCodeSlug].digits);

    // Create grid
    let elementGrid = document.createElement('div');
    elementGrid.id = 'checker-grid';
    elementContainer.appendChild(elementGrid);

    // Create image with hider
    let elementBarcodeImageGridElement = document.createElement('div');
    elementBarcodeImageGridElement.id = 'barcode-image-container';
    elementGrid.appendChild(elementBarcodeImageGridElement);

    let elementBarcodeImageContainer = document.createElement('div');
    elementBarcodeImageGridElement.appendChild(elementBarcodeImageContainer);

    elementBarcodeImage = document.createElement('img');
    elementBarcodeImage.id = 'barcode-image';
    elementBarcodeImageContainer.appendChild(elementBarcodeImage);

    elementBarcodeImageHider = document.createElement('div');
    elementBarcodeImageHider.id = 'barcode-image-hider';
    elementBarcodeImageContainer.appendChild(elementBarcodeImageHider);

    createBarcodeImage();

}

function createBarcodeImage() {
    JsBarcode(
        elementBarcodeImage,
        productCode,
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
