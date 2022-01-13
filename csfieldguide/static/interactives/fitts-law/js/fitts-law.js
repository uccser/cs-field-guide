/**
 * A script for handling the interactivity of the Fitts' law experiment interactive.
 */

/**
 * How many clickable columns (div elements) there are.
 * @type {number}
 */
let numCols = 0;

/**
 * The time the timer started. Required to determine how long it took the user to click the current target. Reset every
 * time the user successfully clicks the current target.
 * @type {Date}
 */
let startTime = null;

/**
 * A flag for switching between placing the target on the left or right.
 * @type {boolean}
 */
let swap = false;

/**
 * The mouse X-coordinate of the last time the user clicked the target. Used to determine the distance to the new
 * target.
 * @type {number}
 */
let lastMousePosition = null;

/**
 * Keeps track of which iteration the script is at for the current set.
 * @type {number}
 */
let count = 0;

/**
 * The number of iterations per set.
 * @type {number}
 */
const MAX_COUNT = 11;

/**
 * A list of the clickable column elements.
 * @type {*[]}
 */
let cols = [];

/**
 * A list of lists. Each list is a pair of elements representing (colIndex, width). Used to ensure all possible
 * combinations have been used.
 * @type {*[]}
 */
let colsToWidths = [];

/**
 * The current pair selected from colsToWidths.
 * @type {null}
 */
let currentColToWidth = null;

/**
 * A list of lists. The ith element is the results for the ith set. Each list contains POJOs with 'distance',
 * 'width', and 'time' keys.
 * @type {*[]}
 */
let results = [];

/**
 * The index of which set the script is at. There are as many sets as elements in colsToWidths.
 * @type {number}
 */
let set = 0;

/**
 * The div element that appears when the game is over.
 * @type {null}
 */
let playAgainDiv = null;

/**
 * The div element that allows the user to download the table.
 * @type {null}
 */
let downloadCSVDiv = null;

/**
 * The Datatable for displaying the results.
 * @type {null}
 */
let table = null;


/**
 * Initialises the page. Sets some of the global variables. Sets up the results datatable. Adds click events to the
 * columns and play again button. Calls reset for the first time.
 */
$(document).ready(function() {
    numCols = $('.col').length;
    cols = $(".col").map(function() { return this; }).get();
    playAgainDiv = document.getElementById("play-again-div");
    downloadCSVDiv = document.getElementById("download-table-csv");
    table = $('#results-table').DataTable( {
        "paging":   false,
        "info":     false,
        "searching": false,
        "oLanguage": {
            "sEmptyTable": "Complete the experiment to show statistics"
        },
        "dom": 'frti',
        "buttons": [
            'csv'
        ]
    });

    for (let col of cols) {
        $(col).click(clickHandler);
    }
    $('#play-again').click(reset);
    $(downloadCSVDiv).click(downloadCSV);
    reset();
});


/**
 * Prepares state for the next game. Re-hides the play again div and clears the results table. Clears the results list
 * and resets the set number back to zero. Repopulates the colsToWidths list.
 *
 * Picks and removes a random element from the colsToWidths and sets it to currentColToWidth. Calls setColumns and
 * starts the timer.
 */
function reset() {
    playAgainDiv.hidden = true;
    downloadCSVDiv.hidden = true;
    table.clear().draw();
    results = [];
    set = 0;

    for (let col = 0; col < Math.floor(numCols / 2); col++) {
        for (let width = 1; width <= 3; width++) {
            colsToWidths.push({ "col": col, "width": width })
        }
    }
    for (let i = 0; i < colsToWidths.length; i++) {
        results.push([]);
    }
    currentColToWidth = getRandomItemFromList(colsToWidths);
    colsToWidths.splice(colsToWidths.indexOf(currentColToWidth), 1);
    setColumns(currentColToWidth["col"], currentColToWidth["width"]);
    startTime = new Date().getTime();
}


/**
 * Handles when a column is clicked.
 *
 * Calculates the time it took the user to click the column, and the distance from the last successful click to the
 * center of this column. Adds an entry to the corresponding set in results.
 *
 * If the count has reached MAX_COUNT then the set is over. Another element is selected from colsToWidths and calls
 * setColumns with the new currentColToWidth or the old one if the set is not over yet. If colsToWidths is empty,
 * then all set are complete, thus showResults is called.
 *
 * Restarts the timer.
 *
 * @param event The click event. Used to obtain the coordinates of the click.
 */
function clickHandler(event) {
    if (this.classList.contains("bg-danger")) {
        let end = new Date().getTime();
        let time = end - startTime;
        let width = this.offsetWidth;
        let distance = Math.abs((this.offsetLeft + this.offsetWidth / 2) - lastMousePosition);
        results[set].push({ "distance": distance, "time": time, "width": width });

        lastMousePosition = event.pageX;

        resetCols();
        if (count === MAX_COUNT) {
            currentColToWidth = getRandomItemFromList(colsToWidths);

            count = 0;
            set++;
            if (currentColToWidth == null) {
                showResults();
                return;
            }
            colsToWidths.splice(colsToWidths.indexOf(currentColToWidth), 1);
        }
        setColumns(currentColToWidth["col"], currentColToWidth["width"]);
        count++;
        startTime = new Date().getTime();
    }
}


/**
 * Updates the current pair of columns for the current set. One column from this pair is the target. The swap flag
 * is used to switch the target every time.
 * @param index The index of the left column for the current set. The right column can be determined from this.
 * @param width The width for the target. This is a BootStrap col width (i.e. not pixel widths).
 */
function setColumns(index, width) {
    let otherIndex = numCols - 1 - index;
    if (swap) {
        [index, otherIndex] = [otherIndex, index];
    }
    swap = !swap;

    cols[index].classList.replace("col", "col-" + width);
    cols[otherIndex].classList.replace("col", "col-" + width);
    cols[index].classList.add("bg-danger");
}


/**
 * Resets all the col divs by ensuring the cols only have the col class.
 */
function resetCols() {
    for (let col of cols) {
        col.className = "col";
    }
}


/**
 * Returns a random element from a given list.
 * @param list The list to pick from.
 * @return {*} The element from the list.
 */
function getRandomItemFromList(list) {
    return list[Math.floor(Math.random()*list.length)];
}


/**
 * Shows the results for the last game.
 *
 * Un-hides the play again div. Iterates through all the set lists in results. Determines the average distance and
 * time, the target width, the set number, and index of difficulty for each set. Adds a new row to the results
 * table for that set.
 *
 * Note the first successful click of each set is ignored. This is because this is the first time the target pair has
 * changed, meaning this would have a significant different in the distance from the rest of the entries in the set.
 */
function showResults() {
    playAgainDiv.hidden = false;
    downloadCSVDiv.hidden = false;

    for (let i = 0; i < results.length; i++) {
        let setList = results[i];
        setList.shift();
        let averageDistance = Math.round(setList.reduce((partial_sum, result) => partial_sum + result["distance"], 0)
        / setList.length * 100)  / 100;
        let averageTime = Math.round(setList.reduce((partial_sum, result) => partial_sum + result["time"], 0)
        / setList.length * 100) / 100;
        let width = setList[0]["width"];
        let set = i + 1;
        let indexOfDifficulty = Math.round(Math.log2(averageDistance / width + 1) * 100) / 100;

        table.row.add([
            set,
            averageDistance,
            width,
            indexOfDifficulty,
            averageTime
        ]).draw( false );
    }
}


/**
 * Downloads the table data as a CSV file.
 */
function downloadCSV() {
    table.button(0).trigger();
}
