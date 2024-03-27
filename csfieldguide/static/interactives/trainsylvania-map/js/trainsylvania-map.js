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

function setupTranslations() {
    const translations = {
        'station-0': gettext('Start'),
        'station-1': gettext('Station 1: Airport'),
        'station-2': gettext('Station 2: West'),
        'station-3': gettext('Station 3: South'),
        'station-4': gettext('Station 4: Central'),
        'station-5': gettext('Station 5: Harbour'),
        'station-6': gettext('Station 6: Factory'),
        'station-7': gettext('Station 7: Midway'),
        'station-8': gettext('Station 8: North'),
        'station-9': gettext('Station 9: East'),
    };
    for (let [key, value] of Object.entries(translations)) {
        SVG_WRAPPER.querySelector('#' + key).textContent = value;
    }
}

setupLayers();
setupTranslations();
SVG_WRAPPER.style.display = 'inherit';
