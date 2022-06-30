var urlParameters = require('../../../js/third-party/url-parameters.js');

const SHOW_ARROWS = urlParameters.getUrlParameter('complete') || false;
const SHOW_FSA = urlParameters.getUrlParameter('fsa') || false;
const SVG_WRAPPER = document.getElementById('trainsylvania-map');

function setupLayers() {
    if (SHOW_ARROWS || SHOW_FSA) {
        SVG_WRAPPER.querySelector('#a-arrows').style.display = 'inherit';
        SVG_WRAPPER.querySelector('#a-arrow-labels').style.display = 'inherit';
        SVG_WRAPPER.querySelector('#b-arrows').style.display = 'inherit';
        SVG_WRAPPER.querySelector('#b-arrow-labels').style.display = 'inherit';
    }
    if (SHOW_FSA) {
        SVG_WRAPPER.querySelector('#fsa').style.display = 'inherit';
    }
}

setupLayers();
// TODO: Setup translations
SVG_WRAPPER.style.display = 'inherit';
