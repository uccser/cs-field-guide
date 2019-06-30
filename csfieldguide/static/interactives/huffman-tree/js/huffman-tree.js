"use strict";

$(document).ready(function () {
  $('#generate-tree').removeClass('disabled');
  $('#generate-tree').text('Generate tree');

  $('#generate-tree:not(.disabled)').on('click', function(){
    generateTree();
  });
});

var id_count = 0;

// Returns the HTML for the card label to represent a given
// value. Decimals are represented as fractions.
function generateTree() {
  var text = $("#text-input").val();
  var letter_counts = letterCounts(text);
  var letter_count_array = createNodeArray(letter_counts);
  var dot_notation = '';

  // Create labels
  for (var i=0; i < letter_count_array.length; i++) {
    var count = letter_count_array[i][0];
    var id = letter_count_array[i][1];
    var letter = letter_count_array[i][2];
    if (letter === " ") {
        letter = "Space";
    }
    dot_notation += id + '[label="{' + count + '|' + letter + '}"];';
  }

  while (letter_count_array.length > 1) {
    var first_node_index = findSmallest(letter_count_array);
    var count1 = letter_count_array[first_node_index][0];
    var id1 = letter_count_array[first_node_index][1];
    letter_count_array.splice(first_node_index, 1);

    var second_node_index = findSmallest(letter_count_array);
    var count2 = letter_count_array[second_node_index][0];
    var id2 = letter_count_array[second_node_index][1];
    letter_count_array.splice(second_node_index, 1);

    var parent_count = count1 + count2;
    var parent_id = 'node' + id_count;
    id_count++;
    letter_count_array.push([parent_count, parent_id]);
    dot_notation += parent_id + '[label="' + parent_count + '"];';
    dot_notation += parent_id + '->' + id1 + '[label="0"];';
    dot_notation += parent_id + '->' + id2 + '[label="1"];';
    letter_count_array.sort(sortByNumber);
  }

  dot_notation = finalizeGraphString(dot_notation);
  $('#output').html(Viz(dot_notation));
}

function sortByNumber(a, b) {
  return a[0] > b[0];
}

function findSmallest(letter_count_array) {
  var lowest_node_index = 0;
  var lowest_node_value = letter_count_array[0][0];
  for (var i=1; i < letter_count_array.length; i++) {
    var node_value = letter_count_array[i][0];
    if (node_value < lowest_node_value) {
      lowest_node_index = i;
      lowest_node_value = node_value;
    }
  }
  return lowest_node_index;
}

function finalizeGraphString(node_dot_notation) {
  var dot_notation = 'digraph {' +
    'graph [ranksep=0,bgcolor=transparent];' +
    'node [shape=Mrecord];' +
    node_dot_notation +
    '}';
  return dot_notation;
}

function createNodeArray(letter_counts) {
  var letter_count_array = [];
  for (var [letter, count] of letter_counts) {
    letter_count_array.push([count, 'node' + id_count, letter]);
    id_count++;
  }
  return letter_count_array;
}

function letterCounts(text) {
  var letter_counts = new Map();
  for (var i=0; i < text.length; i++) {
    var letter = text[i];
    var current_value = letter_counts.get(letter);
    if (current_value === undefined) {
      letter_counts.set(letter, 1);
    } else {
      letter_counts.set(letter, current_value + 1);
    }
  }
  return letter_counts;
}
