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

function skuplt_out(text) {
  var output = document.getElementById("interactive-python-interpreter-output");
  text = text.replace(/</g, '&lt;');
  output.innerHTML = output.innerHTML + text;
}
