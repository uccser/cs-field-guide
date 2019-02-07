//require('./../../../js/url-parameters.js');

const DEFAULT_SIZE = [20, 20] // Columns, Rows

$( document ).ready(function() {
    buildGrid(DEFAULT_SIZE, [['x', [2, 5]], ['A', [15, 7]]]);
});

// Builds an HTML grid of size[0] by size[1] inactive squares.
// Adds an extra column and row to display index numbers.
// Additionally, for any [character, location] pairs in vars, the square at the
// given location will be set to active and have the character displayed on it.
// Finally, the created HTML text is written to the appropriate location.
function buildGrid(size, vars) {
    var cols = size[0];
    var rows = size[1];
    var activeChars = [];
    var activeCharLocs = [];
    var foundNode;
    var printText = '';

    if (vars.length > 0) {
        // Deal with the pre-active nodes
        for (x=0; x < vars.length; x++) {
            activeChars.push(vars[x][0]);
            activeCharLocs.push(vars[x][1]);
        }
    }

    // Create the grid
    for (i=rows-1; i >= 0; i--) {
        printText += '<div class="row btn-group-toggle" data-toggle="buttons">\n'
        printText += '  <button type="button" class="btn div-square">' + i + '</button>\n';
        for (j=0; j < cols; j++) {
            foundNode = activeCharLocs.findIndex(function(y) {return y[0] == j && y[1] == i});
            if (foundNode >= 0) {
                // Activate the square
                printText += '  <button type="button" class="btn div-square active">' + activeChars[foundNode] + '</button>\n';
            } else {
                printText += '  <button type="button" class="btn div-square"></button>\n';
            }
        }
        printText += '</div>\n';
    }

    // Last row of column indexes
    printText += '<div class="row btn-group-toggle" data-toggle="buttons">\n'
    printText += '  <button type="button" class="btn div-square"></button>\n';
    for (j=0; j < cols; j++) {
        printText += '  <button type="button" class="btn div-square">' + j + '</button>\n';
    }

    // Display the grid
    $('#pixel-grid').html(printText);
}
