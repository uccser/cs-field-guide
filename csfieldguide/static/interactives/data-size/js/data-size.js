const DRAGULA = require('dragula');
const CHART = require('chart.js');

const DATA_SIZES = { // HTML size datas in order
  'Bit'     : gettext("Bit"),
  'Byte'    : gettext("Byte"),
  'Kilobyte': gettext("Kilobyte"),
  'Megabyte': gettext("Megabyte"),
  'Gigabyte': gettext("Gigabyte"),
  'Terabyte': gettext("Terabyte"),
  'Petabyte': gettext("Petabyte"),
  'Exabyte' : gettext("Exabyte")
};
const DATA_VALUES = [ // Number of bytes in each value in order
  0.125,
  1,
  1000,
  1000000,
  1000000000,
  1000000000000,
  1000000000000000,
  1000000000000000000
];

const TIMEOUT = 2000;

const TXT_CORRECT_ORDER = gettext("The boxes are in order!");
const TXT_INCORRECT_ORDER = gettext("The boxes are not in order! Try again");

var sizeChart;
var sizeChartData;

$(document).ready(function() {
  shuffleBoxes();

  var containerList = $('.dashed-box').toArray();
  var drake = DRAGULA(containerList);
  drake.on('drop', (div, target, source) => {
    // When an image is dropped on top of another image
    if (target.children.length == 2) {
      source.appendChild(target.children[0]);
    }
  });

  $('#submit-button').on('click', submit);
  $('#continue-button').on('click', nextPhase);
});

/**
 * Checks if each box is where it should be if they were in order. Highlights accordingly
 */
function submit() {
  $('#status-text').html('');
  $('.dashed-box').each(function() {
    var box = $(this);
    var child = box.children().eq(0);
    if (box.attr('data-size') == child.attr('id')) {
      box.removeClass('bg-danger');
    } else {
      box.addClass('bg-danger');
    }
  });
  if ($('.bg-danger').length > 0) {
    $('#status-text').html('<span class="txt-red">' + TXT_INCORRECT_ORDER + '</span>');
  } else {
    $('#status-text').html('<span class="txt-grn">' + TXT_CORRECT_ORDER + '</span>');
    $('#submit-button').addClass('d-none');
    $('#continue-button').removeClass('d-none');
  }
}

/**
 * TODO More functionality to be added
 */
function nextPhase() {
  setUpForBarChart();
}

/**
 * 
 */
function setUpForBarChart() {
  $('#continue-button').prop('disabled', true).fadeOut();
  $('#status-text').fadeOut(revealBarChart);
}

function revealBarChart() {
  if (sizeChart) {
    sizeChart.destroy();
  }
  var canvas = $('#sizeChart');
  canvas.attr('width', Math.min(1000, 0.8 * $( window ).width()));
  canvas.attr('height', canvas.attr('width') / 2);
  sizeChartData = [];
  sizeChart = new CHART.Chart(canvas, {
    type: 'bar',
    data: sizeChartData,
    options: {
      responsive: true,
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'TEMPRelative sizes'
      },
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            suggestedMax: 1
          }
        }]
      }
    }
  });
  setTimeout(function() {revealBar(0)}, 1000);
}

/**
 * Recursively reveals bars (and hides respective size) in the sizes chart until there are no more.
 */
function revealBar(n) {
  if (n < DATA_SIZES.length) {
    setTimeout(function() {revealBar(n+1)}, TIMEOUT);
    var label = DATA_SIZES[n];
    sizeChartData.labels.push(label);
    sizeChartData.datasets[0].data.push(DATA_VALUES[Object.keys(DATA_SIZES)[n]]);
    sizeChart.update();
  }
}

/**
 * Shuffles the order of the size boxes
 */
function shuffleBoxes() {
  var newOrder = Object.keys(DATA_SIZES)//shuffle(Object.keys(DATA_SIZES));
  var boxes = $('.dashed-box');
  for (var i=0; i < newOrder.length; i++) {
    $('#' + newOrder[i]).appendTo(boxes.eq(i));
  }
}

/**
 * Returns a shuffled copy of the given array.
 * 
 * Shuffle function adapted from https://bost.ocks.org/mike/shuffle
 */
function shuffle(array) {
  var clone = array.slice(0);
  var elementIndex = clone.length;
  var randomIndex;
  var currentElement;

  while (elementIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * elementIndex--);

    // And swap it with the current element
    currentElement = clone[elementIndex];
    clone[elementIndex] = clone[randomIndex];
    clone[randomIndex ] = currentElement;
  }

  return clone;
}
