/**
 * Pixel Grid Interactive
 * @author Alasdair Smith
 */

var urlParameters = require('../../../js/third-party/url-parameters.js');

const DEFAULT_HEIGHT = 20;
const DEFAULT_WIDTH = 20;
const PATTERN_EXAMPLE = [
    ['', [2, 9]], ['', [2, 10]], ['', [2, 11]], ['', [2, 12]], ['', [2, 13]], ['', [2, 14]], ['', [2, 15]], ['', [2, 16]],
    ['', [5, 8]], ['', [6, 9]], ['', [6, 10]], ['', [7, 11]], ['', [7, 12]], ['', [8, 13]], ['', [8, 14]],
    ['', [7, 7]], ['', [8, 8]], ['', [9, 9]], ['', [10, 10]], ['', [11, 11]], ['', [12, 12]],
    ['', [8, 5]], ['', [9, 6]], ['', [10, 6]], ['', [11, 7]], ['', [12, 7]], ['', [13, 8]], ['', [14, 8]],
    ['', [9, 2]], ['', [10, 2]], ['', [11, 2]], ['', [12, 2]], ['', [13, 2]], ['', [14, 2]], ['', [15, 2]], ['', [16, 2]]
];
const PATTERN_3_LINES = [
    ['', [2, 17]], ['', [3, 17]], ['', [4, 17]], ['', [5, 17]], ['', [6, 17]], ['', [7, 17]], ['', [8, 17]], ['', [9, 17]], ['', [10, 17]],
    ['', [1, 5]], ['', [2, 6]], ['', [3, 7]], ['', [4, 8]], ['', [5, 9]], ['', [6, 10]], ['', [7, 11]], ['', [8, 12]],
    ['', [18, 2]], ['', [18, 3]], ['', [18, 4]], ['', [18, 5]], ['', [18, 6]], ['', [18, 7]],
    ['', [18, 8]], ['', [18, 9]], ['', [18, 10]], ['', [18, 11]], ['', [18, 12]], ['', [18, 13]], ['', [18, 14]]
];
const PATTERN_OFF_DIAG = [
    ['A', [3, 4]], ['', [4, 4]], ['', [5, 5]], ['', [6, 5]], ['', [7, 6]], ['', [8, 6]], ['', [9, 6]],
    ['', [10, 7]], ['', [11, 7]], ['', [12, 7]], ['', [13, 8]], ['', [14, 8]], ['', [15, 9]], ['B', [16, 9]]
];

$( document ).ready(function() {
    var gridSize = [
        urlParameters.getUrlParameter("h") || DEFAULT_HEIGHT,
        urlParameters.getUrlParameter("w") || DEFAULT_WIDTH
    ];
    var active = [
        ["A", [urlParameters.getUrlParameter("Ax") || null, urlParameters.getUrlParameter("Ay") || null]],
        ["B", [urlParameters.getUrlParameter("Bx") || null, urlParameters.getUrlParameter("By") || null]],
        ["C", [urlParameters.getUrlParameter("Cx") || null, urlParameters.getUrlParameter("Cy") || null]],
        ["D", [urlParameters.getUrlParameter("Dx") || null, urlParameters.getUrlParameter("Dy") || null]],
        ["R", [urlParameters.getUrlParameter("Rx") || null, urlParameters.getUrlParameter("Ry") || null]]
    ];
    var showExample = urlParameters.getUrlParameter("eg") || null;
    var denyEdit = urlParameters.getUrlParameter("noedit");

    switch (showExample) {
        case("basic"):
            // Initial 5 lines example
            active = PATTERN_EXAMPLE; break;
        case("s3l"):
            // Solution 3 Lines
            active = PATTERN_3_LINES; break;
        case("sod"):
            // Solution Off Diagonal
            active = PATTERN_OFF_DIAG; break;
    }

    buildGrid(gridSize, active, !denyEdit);
});

/**
 * Builds an HTML grid of size[0] by size[1] inactive squares for display.
 * Adds an extra column and row to display index numbers.
 * If editable is false, clicking squares will not activate them.
 * Additionally: for any [character, location] pair in vars, the square at the
 * given location is set to active and to display the given character.
 */
function buildGrid(size, vars, editable) {
    var cols = size[0];
    var rows = size[1];
    var activeChars = [];
    var activeCharLocs = [];
    var foundNode;
    var printHTML = '';

    if (vars.length > 0) {
        // Deal with the pre-active nodes
        for (x=0; x < vars.length; x++) {
            activeChars.push(vars[x][0]);
            activeCharLocs.push(vars[x][1]);
        }
    }

    // Create the grid
    for (i=rows-1; i >= 0; i--) {
        if (editable) {
            printHTML += '<div class="row btn-group-toggle" data-toggle="buttons">\n'
        } else {
            printHTML += '<div class="row">\n'
        }
        printHTML += '  <button type="button" class="btn div-square">' + i + '</button>\n';
        for (j=0; j < cols; j++) {
            foundNode = activeCharLocs.findIndex(function(y) {return y[0] == j && y[1] == i});
            if (foundNode >= 0) {
                // Activate the square
                printHTML += '  <button type="button" class="btn div-square active">' + activeChars[foundNode] + '</button>\n';
            } else {
                printHTML += '  <button type="button" class="btn div-square"></button>\n';
            }
        }
        printHTML += '</div>\n';
    }

    // Last row of column indexes
    if (editable) {
        printHTML += '<div class="row btn-group-toggle" data-toggle="buttons">\n'
    } else {
        printHTML += '<div class="row">\n'
    }
    printHTML += '  <button type="button" class="btn div-square"></button>\n';
    for (j=0; j < cols; j++) {
        printHTML += '  <button type="button" class="btn div-square">' + j + '</button>\n';
    }
    printHTML += '</div>\n'

    // Display the grid
    $('#pixel-grid').html(printHTML);
}
