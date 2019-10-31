// const  = CAPS
// global = CamelCase (start upper)
// local  = camelCase (start lower)

const CHART = require('chart.js');

const MIN = 0;        // Numbers for data
const MAX = 9;
const WAIT = 5000;    // Time (milliseconds) to show the chart
const CHART_TYPES = {
  GRID: gettext("Plain grid"),
  MAP:  gettext("Heatmap"),
  BAR:  gettext("Bar chart"),
  PIE:  gettext("Pie chart")
};
const TITLES = {
  BAR:  gettext("Frequency of each number."),
  PIE:  gettext("Relative frequency of each number."),
};
const COLOURS = [
  "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850",
  "#28a745","#2a3da0","#34fcfe","#fb8532","#a37533",
];

var NextChart;

var NumDataPoints;   // Number of values in the data

var Solutions;    // List of lists: [[type, correct answer]]
var Responses;    // User's choices

var DataSet;
var Frequencies;  // Frequency of each value in DataSet

$(document).ready(function() {
  init();

});

/**
 * Returns everything to the initial 'page loaded' state
 */
function init() {
  NextChart = CHART_TYPES.GRID;
  NumDataPoints = 20;
  Solutions = [];
  Responses = [];
  DataSet = [];
  Frequencies = {};

  newDataSet();
  buildChart();
}

/**
 * Creates the next chart to be displayed
 * TODO Can this be done before 'start' is pressed but still be invisible to the user even if they inspect the page?
 */
function buildChart() {
  $('#data-vis-barchart').addClass('d-none');
  $('#data-vis-piechart').addClass('d-none');
  $('#data-vis-table').addClass('d-none');
  var type = NextChart;
  if (type == CHART_TYPES.BAR) {
    buildBarChart();
  } else if (type == CHART_TYPES.PIE) {
    buildPieChart();
  }
  $('#data-vis-game').removeClass('d-none');
}

function buildBarChart() {
  var valueLabels = [];
  var dataPoints = [];
  for (var i in Frequencies) {
    valueLabels.push(i.toString());
    dataPoints.push(Frequencies[i]);
  }
  var canvas = $('#data-vis-barchart');
  new CHART.Chart(canvas, {
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
  $('#data-vis-barchart').removeClass('d-none');
}

function buildPieChart() {
  var valueLabels = [];
  var dataPoints = [];
  var num = Object.keys(Frequencies).length;
  for (var i in Frequencies) {
    if (Frequencies[i]) {
      valueLabels.push(i.toString());
      dataPoints.push(Frequencies[i]);
    }
  }
  var canvas = $('#data-vis-piechart');
  new CHART.Chart(canvas, {
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
  $('#data-vis-piechart').removeClass('d-none');
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
