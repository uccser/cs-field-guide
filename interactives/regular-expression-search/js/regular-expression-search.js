// Regular expression search using CodeMirrors
// Author: Jack Morgan

RegularExpressionSearch = {};

$(document).ready(function () {

  // Save URL parameters (undefined if not available)
  var starting_regex = getUrlParameter('regex');
  var starting_text = getUrlParameter('text');
  var reference = getUrlParameter('reference');

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
    RegularExpressionSearch.regex.setValue(starting_regex);
  }
  if (starting_text) {
    RegularExpressionSearch.search_text.setValue(starting_text);
  }
  if (reference == 'true') {
    $('ul.panel div.collapsible-header').addClass('active');
  }


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


// From jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
