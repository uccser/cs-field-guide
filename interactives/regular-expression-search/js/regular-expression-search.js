// Regular expression search using CodeMirrors
// Author: Jack Morgan

RegularExpressionSearch = {};

$(document).ready(function () {

  // Create regex CodeMirror
  RegularExpressionSearch.regex = CodeMirror(document.getElementById('interactive-regular-expression-search-regex'),{
    value: "ca?t",
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

  // Highlight inital regular expression
  processRegularExpression();
});


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
    RegularExpressionSearch.search_text_overlay = searchOverlay(regex);
    // Add new overlay
    RegularExpressionSearch.search_text.addOverlay(RegularExpressionSearch.search_text_overlay);
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
