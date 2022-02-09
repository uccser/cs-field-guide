/**
 * A script for displaying tree diagrams.
 */

var urlParameters = require('../../../js/third-party/url-parameters.js');

/**
 * The configuration of diagrams.
 * @type {number}
 */
let configs = {
    "basic-parse-tree": require('./configs/basic-parse-tree.json'),
    "mathematical-expression": require('./configs/mathematical-expression.json'),
}


$(document).ready(function () {
    var configName = urlParameters.getUrlParameter('config');
    var config = configs[configName];
    if (config) {
        diagram = new Treant(config);
    } else {
        var element = document.getElementById("tree-diagram");
        element.textContent = "ERROR: Invalid config name";
        element.classList.add("error");
    }
});
