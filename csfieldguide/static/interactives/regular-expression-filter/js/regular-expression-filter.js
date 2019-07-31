var RegularExpressionFilter = {};
RegularExpressionFilter.regex = new RegExp('');
var MatchedWords = [];

$(document).ready(function () {

  $('#interactive-regular-expression-filter-regex').val('');

  // If filter button clicked
  $("#interactive-regular-expression-filter-filter").click(processRegularExpression);

  // If enter pushed in input box
  $("#interactive-regular-expression-filter-regex").keyup(function(event) {
    if (event.keyCode == 13) {
      processRegularExpression();
    }
  });

  // Read file if load button clicked
  $("#interactive-regular-expression-filter-load").click(readWords);

  // Load more words if load button clicked
  $("#interactive-regular-expression-filter-load-more").click(displayMoreWords);
});


// Update when a new regular expression is entered
function processRegularExpression() {
  var regex = document.getElementById('interactive-regular-expression-filter-regex').value
  RegularExpressionFilter.regex = new RegExp(regex);
  displayWords();
};


// Displays the filtered words
function displayWords() {
  // Get the button out of the way so it doesn't get deleted
  $('#interactive-regular-expression-filter-load-more').appendTo($('#interactive-regular-expression-filter-loading'));

  var window = document.getElementById('interactive-regular-expression-filter-words');
  window.innerHTML = "";
  RegularExpressionFilter.displayed = 0;
  RegularExpressionFilter.matched = 0;
  MatchedWords = [];
  var length = RegularExpressionFilter.words.length;
  var words = RegularExpressionFilter.words;
  for (var i = 0; i < length; i++) {
    if (RegularExpressionFilter.regex.test(words[i])) {
      MatchedWords.push(words[i]);
      RegularExpressionFilter.matched++;
    }
  }
  updateWordCount();
  displayMoreWords(5000);
};

// Displays 1000 more words (unless val is specified) and moves the 'display more' button to the end of the list
function displayMoreWords(val) {
  var num = 1000;
  if (val > 0) {
    num = val;
  }
  var wordsToDisplay = MatchedWords.slice(RegularExpressionFilter.displayed, RegularExpressionFilter.displayed + num);
  var window = document.getElementById('interactive-regular-expression-filter-words');
  window.insertAdjacentHTML('beforeend', wordsToDisplay.join('\n') + '\n');
  RegularExpressionFilter.displayed += num;
  if (RegularExpressionFilter.displayed < RegularExpressionFilter.matched) {
    // Move the button to the bottom of the list
    $('#interactive-regular-expression-filter-load-more').appendTo($('#interactive-regular-expression-filter-words'));
    $('#interactive-regular-expression-filter-load-more').removeClass('d-none');
  } else {
    // Get the button out of the way so it doesn't get deleted
    $('#interactive-regular-expression-filter-load-more').appendTo($('#interactive-regular-expression-filter-loading'));
    $('#interactive-regular-expression-filter-load-more').addClass('d-none');
  }
}

// Updates the word count
function updateWordCount() {
  format = gettext('Matched %(matched)s out of %(total)s lower case words');
  var text = interpolate(
    format, 
    {
      "matched": RegularExpressionFilter.matched, 
      "total": RegularExpressionFilter.words.length
    }, 
    true
  );
  document.getElementById('interactive-regular-expression-filter-feedback').innerHTML = text;
};


// Reads the words from the file
function readWords() {
  document.getElementById('interactive-regular-expression-filter-load').style.display = 'none';
  document.getElementById('interactive-regular-expression-filter-loading').style.display = 'block';
  var request = new XMLHttpRequest();
  request.addEventListener('load', fileLoaded);
  request.addEventListener('error', function() {
    alert('This interactive must be viewed online to load cross origin text file. Sorry for the inconvenience.');
  });
  request.open('get', words_file_location);
  request.send();
};


// This function is triggered when the file is finished loading
function fileLoaded () {
  document.getElementById('interactive-regular-expression-filter-words').style.display = 'none';
  document.getElementById('interactive-regular-expression-filter-loading').style.display = 'none';
  RegularExpressionFilter.words = this.responseText.split('\n');
  displayWords();
  document.getElementById('interactive-regular-expression-filter-words').style.display = 'block';
  document.getElementById('interactive-regular-expression-filter-controls').style.display = 'block';
};
