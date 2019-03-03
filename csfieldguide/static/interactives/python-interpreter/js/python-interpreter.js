var Sk = require("skulpt");

const WELCOME_TXT = gettext('Welcome to computer programming, student');

$(document).ready(function () {
    $("#interactive-python-interpreter-run").click(function() {
        var program = document.getElementById("interactive-python-interpreter-code").value;
        var output = document.getElementById("interactive-python-interpreter-output");
        output.innerHTML = '';
        Sk.configure({output:skuplt_out});
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
