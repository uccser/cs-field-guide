// Regular expression search using CodeMirrors
// Author: Jack Morgan

const urlParameters = require('../../../js/third-party/url-parameters.js');
const CodeMirror = require('codemirror');

// Add RegEx syntax highlighting mode to Codemirror
const _ = require('../../../js/codemirror-mode-regex.js');

RegularExpressionSearch = {};

// Save URL parameters (undefined if not available)
var starting_regex = urlParameters.getUrlParameter('regex');
var starting_text = urlParameters.getUrlParameter('text');
var reference = urlParameters.getUrlParameter('reference');

// Create regex CodeMirror
RegularExpressionSearch.regex = CodeMirror(document.getElementById('interactive-regular-expression-search-regex'),{
  value: "",
  mode: "regex",
  scrollbarStyle: "null"
});

// Create search text CodeMirror
RegularExpressionSearch.search_text = CodeMirror.fromTextArea(document.getElementById('interactive-regular-expression-search-text'),{
  mode: "text"
  });

// If regex box is changed
RegularExpressionSearch.regex.on("change", function(){
  processRegularExpression();
});

// If text box is changed
RegularExpressionSearch.search_text.on("change", function() {
  processRegularExpression();
});

// Prevent new lines occuring in regex
RegularExpressionSearch.regex.on("beforeChange", function(cm, change) {
  var newtext = change.text.join("").replace(/\n/g, "");
  if (change.update) {
    change.update(change.from, change.to, [newtext]);
  }
});

// Process any given URL parameters
if (starting_regex) {
  RegularExpressionSearch.regex.setValue(decodeURI(starting_regex));
}
if (starting_text) {
  RegularExpressionSearch.search_text.setValue(decodeURI(starting_text));
}
if (reference == 'true') {
  $('#quick-reference').collapse('show');
}

// Highlight inital regular expression
processRegularExpression();


// Find and highlight regex matches
function processRegularExpression() {
  // Create and save overlay object
  try {
    var regex = new RegExp(RegularExpressionSearch.regex.getValue(), 'g');
    valid_regex = true;
  }
  catch (e) {
    // Not a valid regex
    valid_regex = false;
  }
  if (valid_regex) {
    // Remove current overlay if it exists
    if (RegularExpressionSearch.search_text_overlay) {
      RegularExpressionSearch.search_text.removeOverlay(RegularExpressionSearch.search_text_overlay);
    }
    // Display if regex is not empty
    if (regex != '/(?:)/g') {
      RegularExpressionSearch.search_text_overlay = searchOverlay(regex);
      // Add new overlay
      RegularExpressionSearch.search_text.addOverlay(RegularExpressionSearch.search_text_overlay);
    }
  }
};


// Create overlay object that contains token for overlay creation
function searchOverlay(query) {
  return {token: function(stream) {
    query.lastIndex = stream.pos;
    var match = query.exec(stream.string);
    if (match && match.index == stream.pos) {
      stream.pos += match[0].length || 1;
      return "highlight";
    } else if (match) {
      stream.pos = match.index;
    } else {
      stream.skipToEnd();
    }
  }};
}
