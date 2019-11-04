// For readability this is the variable name syntax used:
// const  = CAPS
// global = CamelCase (start upper)
// local  = camelCase (start lower)

const CHART = require('chart.js');

const MIN = 0;      // Numbers for data
const MAX = 9;
const WAIT = 5000;  // Time (milliseconds) to show the chart
const BASE_DATA_POINTS = 16;
const MAX_DATA_POINTS = 256;
const CHART_TYPES = {
  GRID: gettext("Plain grid"),
  MAP:  gettext("Heatmap"),
  PIE:  gettext("Pie chart"),
  BAR:  gettext("Bar chart"),
};
const TITLES = {    // Bar/Pie chart titles
  PIE:  gettext("Relative frequency of each number (%)."),
  BAR:  gettext("Occurences of each number."),
  RESULTS: gettext("Your accuracy (%) when finding the mode of data with different visualisations.")
};
const COLOURS = [   // Pie chart colours
  "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850",
  "#28a745","#2a3da0","#34fcfe","#fb8532","#a37533",
];
const HEATMAP = [   // Heatmap colours
  "#0006bf", "#2500c3", "#5200c7", "#8200cb", "#b400cf",
  "#d400bf","#d80092","#dc0063","#e00032","#e50000",
];

var CurrentChart;   // Chart to be rendered

var NumDataPoints;  // Number of values in the data

var Solutions;      // List of lists: [[type of representation, correct answer]]
var Responses;      // User's choices

var DataSet;
var Frequencies;    // Frequency of each value in DataSet

var BarChart;       // Charts
var PieChart;
var ResultsChart;

var BaseTable;      // For storing just the headings of the results table

$(document).ready(function() {
  init();

  $('#button-start').on('click', runStart);
  $('#button-submit').on('click', runGuessCheck);
  $('#button-next').on('click', runNext);
  $('#button-quit').on('click', runQuit);
  $('#button-restart').on('click', init);
});

/**
 * Returns everything to the initial 'page loaded' state
 */
function init() {
  showStartScreen();

  CurrentChart = CHART_TYPES.GRID;
  NumDataPoints = BASE_DATA_POINTS;
  Solutions = [];
  Responses = [];
  DataSet = [];
  Frequencies = {};
  if (BaseTable) {
    $('#data-vis-performance').html(BaseTable);
  } else {
    BaseTable = $('#data-vis-performance').html();
  }

  newDataSet();
}

/**
 * Shows the next data representation then, after some time, shows the guess checker
 */
function runStart() {
  $('#button-start').addClass('d-none');
  buildChart();
  setTimeout(showGuessScreen, WAIT);
}

/**
 * Runs the guess-checking functionality, then shows the user their performance so far
 */
function runGuessCheck() {
  var guess = $('#data-vis-selector').val();
  Responses.push(guess);
  if (Responses.length != Solutions.length) { // At this point the two should always be equal
    console.log("ERROR: Number of responses does not match number of solutions.")
  }
  populatePerformanceTable();
  showPerformanceScreen();
}

/**
 * Prepares the next chart type and dataset
 */
function runNext() {
  getNextChart();
  showStartScreen();
  newDataSet();
}

/**
 * Runs the quit functionality; shows the user their overall performace (results)
 */
function runQuit() {
  buildResultsChart();
  showResultsScreen();
}

/**
 * Assigns the chart type that should be used next, in a circular fashion.
 * If the loop has completed, doubles the amount of data to create, up to MAX_DATA_POINTS
 */
function getNextChart() {
  if (CurrentChart == CHART_TYPES.GRID) {
    CurrentChart = CHART_TYPES.MAP;
  } else if (CurrentChart == CHART_TYPES.MAP) {
    CurrentChart = CHART_TYPES.PIE;
  } else if (CurrentChart == CHART_TYPES.PIE) {
    CurrentChart = CHART_TYPES.BAR;
  } else /*(CurrentChart == CHART_TYPES.BAR)*/ {
    NumDataPoints = Math.min(MAX_DATA_POINTS, NumDataPoints * 2); // More data points for the next cycle
    CurrentChart = CHART_TYPES.GRID;
  }
}

/**
 * Creates the next chart to be displayed
 */
function buildChart() {
  $('#data-vis-barchart').addClass('d-none');
  $('#data-vis-piechart').addClass('d-none');
  $('#data-vis-grid').addClass('d-none');
  var type = CurrentChart;
  if (type == CHART_TYPES.GRID || type == CHART_TYPES.MAP) {
    buildGridChart();
  } else if (type == CHART_TYPES.BAR) {
    buildBarChart();
  } else if (type == CHART_TYPES.PIE) {
    buildPieChart();
  }
  $('#data-vis-game').removeClass('d-none');
}

/**
 * Builds a grid of values in the data.
 * If the representation should be a heatmap, also colours each grid square appropriately
 */
function buildGridChart() {
  var numValues = DataSet.length;

  // We can afford to have fewer columns with a low number of values
  var numColumns = numValues > (BASE_DATA_POINTS * 3) ? (BASE_DATA_POINTS / 2) : (BASE_DATA_POINTS / 4);

  var html = "";
  var i=0;
  while (i < numValues) {
    html += "<tr>\n";
    for (var x=0; x < numColumns; x++) {
      if (CurrentChart == CHART_TYPES.MAP) {
        html += "<td style='color: white; background-color: " + HEATMAP[DataSet[i]] + ";'>" + DataSet[i] + "</td>\n";
      } else {
        html += "<td>" + DataSet[i] + "</td>\n";
      }
      i++;
    }
    html += "</tr>\n";
  }

  $('#data-vis-grid').html(html).removeClass('d-none');
}

/**
 * Builds a pie chart showing the relative frequency of each point in the data
 */
function buildPieChart() {
  var valueLabels = [];
  var dataPoints = [];
  for (var i in Frequencies) {
    if (Frequencies[i]) {
      valueLabels.push(i.toString());
      dataPoints.push(Math.round(Frequencies[i] / DataSet.length * 100)); // Percentage of total
    }
  }
  var canvas = $('#data-vis-piechart');
  if (PieChart) {
    PieChart.destroy();
  }
  canvas.attr('width', Math.min(600, 0.8 * $( window ).width())); // 600 is the value in the html
  canvas.attr('height', canvas.attr('width') / 2);
  PieChart = new CHART.Chart(canvas, {
    type: 'pie',
    data: {
      labels: valueLabels,
      datasets: [{
        backgroundColor: COLOURS,
        data: dataPoints
      }]
    },
    options: {
      responsive: true,
      legend: {
        display: true,
        position: 'right'
      },
      title: {
        display: true,
        text: TITLES.PIE
      }
    }
  });
  canvas.removeClass('d-none');
}

/**
 * Builds a bar chart showing the number of times each value appears in the data
 */
function buildBarChart() {
  var valueLabels = [];
  var dataPoints = [];
  for (var i in Frequencies) {
    valueLabels.push(i.toString());
    dataPoints.push(Frequencies[i]);
  }
  var canvas = $('#data-vis-barchart');
  if (BarChart) {
    BarChart.destroy();
  }
  canvas.attr('width', Math.min(800, 0.8 * $( window ).width())); // 800 is the value in the html
  canvas.attr('height', canvas.attr('width') / 2);
  BarChart = new CHART.Chart(canvas, {
    type: 'bar',
    data: {
      labels: valueLabels,
      datasets: [{
        label: gettext("Occurences"),
        backgroundColor: '#2a3da0', // Primary CSFG colour
        data: dataPoints
      }]
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
      title: {
        display: true,
        text: TITLES.BAR
      }
    }
  });
 canvas.removeClass('d-none');
}

/**
 * Builds a bar chart showing the user's accuracy when finding the mode for each representation of data
 */
function buildResultsChart() {
  var valueLabels = [CHART_TYPES.GRID, CHART_TYPES.MAP, CHART_TYPES.PIE, CHART_TYPES.BAR];
  var dataPoints = getFinalResults();
  var canvas = $('#data-vis-results-chart');
  if (ResultsChart) {
    ResultsChart.destroy();
  }
  canvas.attr('width', Math.min(800, 0.8 * $( window ).width())); // 800 is the value in the html
  canvas.attr('height', canvas.attr('width') / 2);
  ResultsChart = new CHART.Chart(canvas, {
    type: 'bar',
    data: {
      labels: valueLabels,
      datasets: [{
        label: gettext("Success (%)"),
        backgroundColor: '#2a3da0', // Primary CSFG colour
        data: dataPoints
      }]
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            stepValue: 10,
            max: 100
          }
        }]
      },
      title: {
        display: true,
        text: TITLES.RESULTS
      }
    }
  });
 canvas.removeClass('d-none');
}

function populatePerformanceTable() {
  var table = $('#data-vis-performance');
  var data = [last(Solutions), last(Responses)]; // [[type, solution], response]
  var newRow = "<tr style='background-color: " + (data[0][1] == data[1] ? "#cdffd8" : "#ffc2a6") + "'>\n"
             +   "<td>" + data[0][0] + "</td>\n"
             +   "<td>" + data[0][1] + "</td>\n"
             +   "<td>" + data[1]    + "</td>\n"
             + "</tr>\n";
  table.append(newRow);
}

/**
 * Returns a list of four items:
 * The percentage of correct answers for the mode of each data visualisation type
 * 
 * [grid, heatmap, pie, bar]
 */
function getFinalResults() {
  var localSolutions = Solutions; // List of [[type, solution]]
  var localResponses = Responses; // List of [response]
  var proportionGrid = [0, 0];    // [correct, out-of]
  var proportionHeatmap = [0, 0];
  var proportionPie = [0, 0];
  var proportionBar = [0, 0];
  for (var i=0; i < localSolutions.length; i++) {
    if (localSolutions[i][0] == CHART_TYPES.GRID) {
      if (localSolutions[i][1] == localResponses[i]) {
        proportionGrid[0]++;
      }
      proportionGrid[1]++;
    } else if (localSolutions[i][0] == CHART_TYPES.MAP) {
      if (localSolutions[i][1] == localResponses[i]) {
        proportionHeatmap[0]++;
      }
      proportionHeatmap[1]++;
    } else if (localSolutions[i][0] == CHART_TYPES.PIE) {
      if (localSolutions[i][1] == localResponses[i]) {
        proportionPie[0]++;
      }
      proportionPie[1]++;
    } else if (localSolutions[i][0] == CHART_TYPES.BAR) {
      if (localSolutions[i][1] == localResponses[i]) {
        proportionBar[0]++;
      }
      proportionBar[1]++;
    }
  }
  return [
    Math.round(proportionGrid[0]    / proportionGrid[1]    * 100),
    Math.round(proportionHeatmap[0] / proportionHeatmap[1] * 100),
    Math.round(proportionPie[0]     / proportionPie[1]     * 100),
    Math.round(proportionBar[0]     / proportionBar[1]     * 100)
  ];
}

/**
 * Prepares a new set of data for the next chart.
 * Also sets the next solution appropriately.
 */
function newDataSet() {
  fillDataSet(NumDataPoints);
  var [solution, frequencies] = getFrequencies();
  Solutions.push([CurrentChart, solution])
  Frequencies = frequencies;
}

/**
 * Sets the 'DataSet' global to a list of the given number of random values.
 */
function fillDataSet(num) {
  var newDataSet = [];
  for (var i=0; i < num; i++) {
    newDataSet.push(getRandomInteger(MIN, MAX))
  }

  DataSet = newDataSet;
}

/**
 * Returns two values in a list:
 * [
 * The mode (most common value) of the global DataSet - ensuring only one value is most common
 * ,
 * The frequency of each value in the global DataSet
 * ]
 * 
 * If two or more values share the mode (most common value), one of the mode values is chosen at random.
 * A random datapoint that is not that value is replaced with that value, resulting in a singular mode value.
 */
function getFrequencies() {
  // Get the mode(s)
  // Based on parts of https://stackoverflow.com/questions/3783950/get-the-item-that-appears-the-most-times-in-an-array
  var modes = [];
  var frequencies = {};
  var max = 0;
  var localDataSet = DataSet;                         // Store a copy locally for performance
  for (var v in localDataSet) {
    frequencies[localDataSet[v]] = (frequencies[localDataSet[v]] || 0) + 1;
    if (frequencies[localDataSet[v]] == max) {        // More than one current mode
      modes.push(localDataSet[v]);
    } else if (frequencies[localDataSet[v]] > max) {  // New (singular) mode
      modes = [localDataSet[v]];
      max = frequencies[localDataSet[v]];
    }
  }

  // Deal with conflicts
  var mode;
  if (modes.length > 1) {
    mode = modes[getRandomInteger(0, modes.length - 1)];  // Choose a random best mode
    var randomValue = getRandomInteger(0, localDataSet.length);
    while (localDataSet[randomValue] == mode) { // Find a random not-best-mode number
      randomValue++;
    }
    frequencies[localDataSet[randomValue]]--;   // Reduce the frequecy of that number
    DataSet[randomValue] = mode;                // Set best mode (actual DataSet)
    frequencies[localDataSet[randomValue]]++;   // Increase the frequency of best-mode
  } else {
    mode = modes[0];
  }

  // Return the mode and frequencies
  return [mode, frequencies];
}

/**
 * Returns a random integer between min and max inclusive.
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns the last item in the array, like the python expression: `array[-1]`
 */
function last(array) {
  return array[array.length - 1];
}

/**
 * Hides irrrelevant HTML divs, then reveals relevant ones.
 */
function showStartScreen() {
  $('#data-vis-guesser').addClass('d-none');
  $('#data-vis-next').addClass('d-none');
  $('#data-vis-restart').addClass('d-none');
  $('#data-vis-game').addClass('d-none');
  $('#data-vis-results').addClass('d-none');

  $('#data-vis-instructions').removeClass('d-none');
  $('#button-start').removeClass('d-none');
}

/**
 * Hides irrrelevant HTML divs, then reveals relevant ones.
 */
function showGuessScreen() {
  $('#data-vis-instructions').addClass('d-none');
  $('#data-vis-game').addClass('d-none');

  $('#data-vis-guesser').removeClass('d-none');
}

/**
 * Hides irrrelevant HTML divs, then reveals relevant ones.
 */
function showPerformanceScreen() {
  $('#data-vis-guesser').addClass('d-none');
  $('#data-vis-restart').addClass('d-none');
  $('#data-vis-game').addClass('d-none');
  $('#data-vis-results-chart').addClass('d-none');

  $('#data-vis-next').removeClass('d-none');
  $('#data-vis-performance').removeClass('d-none');
  $('#data-vis-results').removeClass('d-none');
}

/**
 * Hides irrrelevant HTML divs, then reveals relevant ones.
 */
function showResultsScreen() {
  $('#data-vis-next').addClass('d-none');
  $('#data-vis-performance').addClass('d-none');

  $('#data-vis-restart').removeClass('d-none');
  $('#data-vis-results-chart').removeClass('d-none');
}
