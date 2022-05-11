const DRAGULA = require('dragula');
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

const TXT_CORRECT_ORDER = gettext("The boxes are in order!");
const TXT_INCORRECT_ORDER = gettext("The boxes are not in order! Try again");
const TXT_EXAMPLE_SORT = gettext("Try to match the examples below with their relative size.");

$(document).ready(function() {
  //shuffleBoxes();

  var containerList = $('.dashed-box').toArray();
  var drakeSorting = DRAGULA(containerList);
  drakeSorting.on('drop', (div, target, source) => {
    // When an image is dropped on top of another image
    if (target.children.length == 2) {
      source.appendChild(target.children[0]);
    }
  });

  var exampleList = $('.example-container').toArray();
  var drakeExamples = DRAGULA(exampleList);

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
  $('#example-boxes').addClass('d-flex').removeClass('d-none');
  $('#example-items').addClass('d-flex').removeClass('d-none');
  $('#continue-button').addClass('d-none');
  $('#submit-button').removeClass('d-none');
  $('#status-text').html('');
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
