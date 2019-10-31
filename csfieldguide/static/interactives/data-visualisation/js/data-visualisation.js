// const  = CAPS
// global = CamelCase (start upper)
// local  = camelCase (start lower)

const CHART = require('chart.js');

const MIN = 0;      // Numbers for data
const MAX = 9;
const WAIT = 5000;  // Time (milliseconds) to show the chart
const BASE_DATA_POINTS = 16;
const CHART_TYPES = {
  GRID: gettext("Plain grid"),
  MAP:  gettext("Heatmap"),
  PIE:  gettext("Pie chart"),
  BAR:  gettext("Bar chart"),
};
const TITLES = {
  PIE:  gettext("Relative frequency of each number (%)."),
  BAR:  gettext("Frequency of each number."),
};
const COLOURS = [    // Pie chart colours
  "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850",
  "#28a745","#2a3da0","#34fcfe","#fb8532","#a37533",
];
const HEATMAP = [   // Heatmap colours
  "#0006bf", "#2500c3", "#5200c7", "#8200cb", "#b400cf",
  "#d400bf","#d80092","#dc0063","#e00032","#e50000",
];

var NextChart;

var NumDataPoints;  // Number of values in the data

var Solutions;      // List of lists: [[type, correct answer]]
var Responses;      // User's choices

var DataSet;
var Frequencies;    // Frequency of each value in DataSet

var BarChart;
var PieChart;

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

  NextChart = CHART_TYPES.GRID;
  NumDataPoints = BASE_DATA_POINTS;
  Solutions = [];
  Responses = [];
  DataSet = [];
  Frequencies = {};

  newDataSet();
}

function runStart() {
  $('#button-start').addClass('d-none');
  buildChart();
  setTimeout(showGuessScreen, WAIT);
}

function runGuessCheck() {
  var guess = $('#data-vis-selector').val();
  Responses.push(guess);
  if (Responses.length != Solutions.length) { // At this point the two should always be equal
    console.log("ERROR: Number of responses does not match number of solutions.")
  }
  showPerformanceScreen();
}

function runNext() {
  getNextChart();
  showStartScreen();
  newDataSet();
}

function runQuit() {
  //showResultsScreen();
  //populatePerformanceTable();
}

function getNextChart() {
  if (NextChart == CHART_TYPES.GRID) {
    NextChart = CHART_TYPES.MAP;
  } else if (NextChart == CHART_TYPES.MAP) {
    NextChart = CHART_TYPES.PIE;
  } else if (NextChart == CHART_TYPES.PIE) {
    NextChart = CHART_TYPES.BAR;
  } else /*(NextChart == CHART_TYPES.BAR)*/ {
    NumDataPoints = min(128, NumDataPoints * 2); // More data points for the next cycle
    NextChart = CHART_TYPES.GRID;
  }
}

/**
 * Creates the next chart to be displayed
 */
function buildChart() {
  $('#data-vis-barchart').addClass('d-none');
  $('#data-vis-piechart').addClass('d-none');
  $('#data-vis-grid').addClass('d-none');
  var type = NextChart;
  if (type == CHART_TYPES.GRID || type == CHART_TYPES.MAP) {
    buildGridChart();
  } else if (type == CHART_TYPES.BAR) {
    buildBarChart();
  } else if (type == CHART_TYPES.PIE) {
    buildPieChart();
  }
  $('#data-vis-game').removeClass('d-none');
}

function buildGridChart() {
  var numValues = DataSet.length;

  // We can afford to have fewer columns with a low number of values
  var numColumns = numValues > (BASE_DATA_POINTS * 3) ? (BASE_DATA_POINTS / 2) : (BASE_DATA_POINTS / 4);

  var html = "";
  var i=0;
  while (i < numValues) {
    html += "<tr>\n";
    for (var x=0; x < numColumns; x++) {
      if (NextChart == CHART_TYPES.MAP) {
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
      responsive: false,
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
      responsive: false,
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
 * Prepares a new set of data for the next chart.
 * Also sets the next solution appropriately.
 */
function newDataSet() {
  fillDataSet(NumDataPoints);
  var solution, frequencies = getFrequencies();
  Solutions.push([NextChart, solution])
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
 * Returns two values:
 * The mode (most common value) of the global DataSet, ensuring only one value is most common.
 * The frequency of each value in the global DataSet.
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

  // Set the dataset and return the frequencies
  return mode, frequencies;
}

/**
 * Returns a random integer between min and max inclusive.
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  $('#data-vis-results-table').addClass('d-none');

  $('#data-vis-next').removeClass('d-none');
  $('#data-vis-performance-table').removeClass('d-none');
  $('#data-vis-results').removeClass('d-none');

  //populatePerformanceTable();
}
