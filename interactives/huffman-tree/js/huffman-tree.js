"use strict";

$(document).ready(function () {
  $('#generate-tree').on('click', function(){
    generateTree();
  });
});



// Returns the HTML for the card label to represent a given
// value. Decimals are represented as fractions.
function generateTree() {
  var text = $("#text-input").val();
  var letter_counts = new Map();
  for (var i=0; i < text.length; i++) {
    var letter = text[i];
    if (letter.match(/[a-zA-Z0-9\ \.\,"']/)) {
      var current_value = letter_counts.get(letter);
      if (current_value === undefined) {
        letter_counts.set(letter, 1);
      } else {
        letter_counts.set(letter, current_value + 1);
      }
    }
  }

  var dot_notation = 'digraph {' +
    'graph [ranksep=0,bgcolor=transparent];' +
    'node [shape=Mrecord];';

  var letter_count_array = [];
  var id_count = 0;
  for (var [letter, count] of letter_counts) {
    letter_count_array.push([count, 'node' + id_count, letter]);
    id_count++;
  }

  letter_count_array.sort(sortByNumber);

  // Create labels
  for (var i=0; i < letter_count_array.length; i++) {
    var count = letter_count_array[i][0];
    var id = letter_count_array[i][1];
    var letter = letter_count_array[i][2];
    dot_notation += id + '[label="{' + count + '|' + letter + '}"];';
  }

  while (letter_count_array.length > 1) {
    console.log(letter_count_array.length);
    console.log("Child 1");
    console.log(letter_count_array[0]);
    console.log("Child 2");
    console.log(letter_count_array[1]);
    var count1 = letter_count_array[0][0];
    var id1 = letter_count_array[0][1];
    var count2 = letter_count_array[1][0];
    var id2 = letter_count_array[1][1];
    console.log("Parent");
    var parent_count = count1 + count2;
    var parent_id = 'node' + id_count;
    id_count++;
    console.log(parent_count, parent_id);
    letter_count_array.push([parent_count, parent_id]);
    dot_notation += parent_id + '[label="' + parent_count + '"];';
    dot_notation += parent_id + '->' + id1 + '[label="0"];';
    dot_notation += parent_id + '->' + id2 + '[label="1"];';
    letter_count_array.splice(0,2);
    letter_count_array.sort(sortByNumber);
  }
  dot_notation += '}'
  $('#output').html(Viz(dot_notation));
}

function sortByNumber(a, b) {
  return a[0] > b[0];
}
