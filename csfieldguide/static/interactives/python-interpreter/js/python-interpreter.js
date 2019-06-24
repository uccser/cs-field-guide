// Based on the example:
// https://github.com/skulpt/skulpt/blob/master/example/calling_from_js.html
var Sk = require("skulpt");

const WELCOME_TXT = gettext('Welcome to computer programming, student');

$(document).ready(function () {
  $("#interactive-python-interpreter-run").click(function() {
    var program = document.getElementById("interactive-python-interpreter-code").value;
    var output = document.getElementById("interactive-python-interpreter-output");
    output.innerHTML = '';
    Sk.configure({
      // This 'read' is required, always, but the documentation doesn't show that very well
      read: function (x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
          throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
      },
      output: skuplt_out,
      python3: true
    });

    try {
      Sk.importMainWithBody("<stdin>", false, program);
    } catch (e) {
      alert(e);
    }
  });

  // From https://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
  // Edited for this use case
  // Inserts two spaces instead of tabbing to the next element
  $(document).delegate('#interactive-python-interpreter-code', 'keydown', function(key) {
    if(key.which == 9) {
      // Tab was pressed
      key.preventDefault();

      var start = this.selectionStart;
      var end = this.selectionEnd;
    
      // Insert the 2 spaces
      $(this).val($(this).val().substring(0, start)
                + "  "
                + $(this).val().substring(end));
      
      // Put the cursor bar | where the user expects
      this.selectionStart = start + 2
      this.selectionEnd = this.selectionStart;
    }
  });

  var programBox = document.getElementById("interactive-python-interpreter-code");
  programBox.value = '';
  var printText = '';

  printText += 'print("**********************************************")\n';
  printText += 'print("**********************************************")\n';
  printText += 'print("** ' + WELCOME_TXT + ' **")\n';
  printText += 'print("**********************************************")\n';
  printText += 'print("**********************************************")\n';
                
  programBox.value = printText;
});

/**
 * Pushes the result of the python calculation to the output box
 */
function skuplt_out(text) {
  var output = document.getElementById("interactive-python-interpreter-output");
  text = text.replace(/</g, '&lt;');
  output.innerHTML = output.innerHTML + text;
}
