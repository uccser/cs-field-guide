RegularExpressionFilter = {};

$(document).ready(function () {

  // If reset button triggered
  $("#interactive-regular-expression-filter-filter").click(function(){
    var regex = document.getElementById('interactive-regular-expression-filter-regex').value
    RegularExpressionFilter.regex = new RegExp(regex);
    displayWords();
    updateWordCount();
  });


  readWords();
  RegularExpressionFilter.regex = new RegExp('');
});

function fileLoaded () {
  document.getElementById('interactive-regular-expression-filter-words').style.display = 'none';
  document.getElementById('interactive-regular-expression-filter-loading-progress').style.display = 'none';
  document.getElementById('interactive-regular-expression-filter-processing-progress').style.display = 'block';
  RegularExpressionFilter.words = this.responseText.split('\n');
  displayWords();
  updateWordCount();
  document.getElementById('interactive-regular-expression-filter-processing-progress').style.display = 'none';
  document.getElementById('interactive-regular-expression-filter-words').style.display = 'block';
};

function readWords() {
  document.getElementById('interactive-regular-expression-filter-loading-progress').style.display = 'block';
  var request = new XMLHttpRequest();
  request.addEventListener('load', fileLoaded);
  request.addEventListener('progress', updateLoadingProgress);
  request.open('get', 'en-words.txt');
  request.send();
};

function displayWords() {
  var progress_bar = document.getElementById('interactive-regular-expression-filter-processing-progress-bar').style.width = '0%';
  RegularExpressionFilter.displayed = 0;
  text = ""
  var display = document.getElementById('interactive-regular-expression-filter-words');
  var progress_bar = document.getElementById('interactive-regular-expression-filter-processing-progress-bar')
  for (var i = 0; i < RegularExpressionFilter.words.length; i++) {
    if (RegularExpressionFilter.regex.test(RegularExpressionFilter.words[i])) {
      text += RegularExpressionFilter.words[i];
      RegularExpressionFilter.displayed++;
    }
    progress_bar.style.width = ((i / RegularExpressionFilter.words.length) * 100) + '%';
  }
  display.innerHTML = text;
};


function updateWordCount() {
  var text = "Showing " + RegularExpressionFilter.displayed + " out of " + RegularExpressionFilter.words.length + " words"
  document.getElementById('interactive-regular-expression-filter-word-count').innerHTML = text;
};


function updateLoadingProgress(request) {
  if (request.lengthComputable) {
    // Calculates percent complete (as a whole number e.g. 80%)
    var completed = (request.loaded / request.total) * 100;
    document.getElementById('interactive-regular-expression-filter-loading-progress-bar').style.width = completed + '%';
  }
};
