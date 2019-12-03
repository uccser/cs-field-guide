const DRAGULA = require('dragula');
const CHART = require('chart.js');

const DATAS = { // Data points ordered by size.
  //          Name (translated)               , size (bytes)           , colour (for graph, reflects colour of box)
  'Bit'     : [gettext("1 Bit")               , 0.125                  , '#8181ff'],
  'Hex'     : [gettext("Hexadecimal digit")   , 0.5                    , null     ],
  'Byte'    : [gettext("1 Byte")              , 1                      , '#ff9a54'],
  'Kilobyte': [gettext("1 Kilobyte")          , 1    * Math.pow(10, 3) , '#54ff9a'],
  'Inter'   : [gettext("This interactive")    , 4.5  * Math.pow(10, 3) , null     ],
  'Megabyte': [gettext("1 Megabyte")          , 1    * Math.pow(10, 6) , '#ac88df'],
  'First HD': [gettext("1st HDD for home PCs"), 5    * Math.pow(10, 6) , null     ],
  'CSFG'    : [gettext("The CSFG")            , 6.05 * Math.pow(10, 8) , null     ],
  'Gigabyte': [gettext("1 Gigabyte")          , 1    * Math.pow(10, 9) , '#54deff'],
  'Terabyte': [gettext("1 Terabyte")          , 1    * Math.pow(10, 12), '#ff5454'],
  'SSD'     : [gettext("Largest single SSD")  , 1    * Math.pow(10, 14), null     ],
  'Petabyte': [gettext("1 Petabyte")          , 1    * Math.pow(10, 15), '#80ff25'],
  'GoogEar' : [gettext("Google Earth (2016)") , 3    * Math.pow(10, 15), null     ],
  'Exabyte' : [gettext("1 Exabyte")           , 1    * Math.pow(10, 18), '#df88ce'],
  'Zetta'   : [gettext("1 Zettabyte")         , 1    * Math.pow(10, 21), null     ],
  'Internet': [gettext("The internet (2020)") , 4    * Math.pow(10, 22), null     ],
};
const HTML_BOXES = [
  'Bit',
  'Byte',
  'Kilobyte',
  'Megabyte',
  'Gigabyte',
  'Terabyte',
  'Petabyte',
  'Exabyte',
];

const TIMEOUT = 1500;
const DEFAULT_COLOUR = '#fffd81';

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
  canvas.attr('width', Math.min(1000, 0.8 * $(window).width()));
  canvas.attr('height', canvas.attr('width') / 2);
  sizeChartData = {
    labels: [],
    datasets: [{
      label: gettext("Number of Bytes"),
      backgroundColor: [],
      data: []
    }]
  };
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
        text: gettext("Estimated size of various groups of data (Bytes)")
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
  setTimeout(revealBar, 1000);
}

/**
 * Recursively reveals bars (and hides respective box) in the sizes chart until there are no more.
 * If there are more than 6 values, hides the smallest one
 */
function revealBar(n) {
  if (!n) {
    n = 0;
  }
  if (n < Object.keys(DATAS).length) {
    setTimeout(function() {revealBar(n+1)}, TIMEOUT);
    var maxLength = 6;
    var key = Object.keys(DATAS)[n];
    var object = DATAS[key];
    var name = object[0],
        size = object[1],
        colour = object[2];
    if (HTML_BOXES.includes(key)) {
      $('#' + key).fadeOut('slow');
    }
    sizeChartData.labels.push(name);
    sizeChartData.datasets[0].data.push(size);
    if (colour === null) {
      colour = DEFAULT_COLOUR;
    }
    sizeChartData.datasets[0].backgroundColor.push(colour);
    if (sizeChartData.datasets[0].data.length > maxLength) {
      sizeChartData.datasets[0].data.shift();
      sizeChartData.datasets[0].backgroundColor.shift();
      sizeChartData.labels.shift();
    }
    sizeChart.update();
  }
}

/**
 * Shuffles the order of the size boxes
 */
function shuffleBoxes() {
  var newOrder = shuffle(HTML_BOXES);
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
