RegularExpressionFilter = {};
RegularExpressionFilter.regex = new RegExp('');

$(document).ready(function () {

  // If filter button clicked
  $("#interactive-regular-expression-filter-filter").click(processRegularExpression);

  // If enter pushed in input box
  $("#interactive-regular-expression-filter-regex").keyup(function(event){
    if(event.keyCode == 13){
      processRegularExpression();
    }
  });

  // Read file if load button clicked
  $("#interactive-regular-expression-filter-load").click(function(){
    readWords();
  });
});


// Update when a new regular expression is entered
function processRegularExpression() {
  var regex = document.getElementById('interactive-regular-expression-filter-regex').value
  RegularExpressionFilter.regex = new RegExp(regex);
  displayWords();
  updateWordCount();
};


// Displays the filtered words
function displayWords() {
  RegularExpressionFilter.displayed = 0;
  html = ""
  var display = document.getElementById('interactive-regular-expression-filter-words');
  for (var i = 0; i < RegularExpressionFilter.words.length; i++) {
    if (RegularExpressionFilter.regex.test(RegularExpressionFilter.words[i])) {
      html += RegularExpressionFilter.words[i] + '\n';
      RegularExpressionFilter.displayed++;
    }
  }
  display.innerHTML = html.trim();
};


// Updates the word count
function updateWordCount() {
  var text = "Showing " + RegularExpressionFilter.displayed + " out of " + RegularExpressionFilter.words.length + " lower case words"
  document.getElementById('interactive-regular-expression-filter-feedback').innerHTML = text;
};


// Reads the words from the file
function readWords() {
  document.getElementById('interactive-regular-expression-filter-load').style.display = 'none';
  document.getElementById('interactive-regular-expression-filter-loading-progress').style.display = 'block';
  var request = new XMLHttpRequest();
  request.addEventListener('load', fileLoaded);
  request.addEventListener('progress', updateLoadingProgress);
  request.addEventListener('error', function() { alert('This interactive must be viewed online to load cross origin text file. Sorry for the inconvenience.')});
  request.open('get', 'en-words.txt');
  request.send();
};


// Updates the file loading bar
function updateLoadingProgress(request) {
  if (request.lengthComputable) {
    // Calculates percent complete (as a whole number e.g. 80%)
    var completed = (request.loaded / request.total) * 100;
    document.getElementById('interactive-regular-expression-filter-loading-progress-bar').style.width = completed + '%';
  }
};


// This function is triggered when the file is finished loading
function fileLoaded () {
  document.getElementById('interactive-regular-expression-filter-words').style.display = 'none';
  document.getElementById('interactive-regular-expression-filter-loading-progress').style.display = 'none';
  RegularExpressionFilter.words = this.responseText.split('\n');
  displayWords();
  updateWordCount();
  document.getElementById('interactive-regular-expression-filter-words').style.display = 'block';
  document.getElementById('interactive-regular-expression-filter-controls').style.display = 'block';
};
